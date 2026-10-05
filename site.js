// 언어 전환(KO/EN), 현재 섹션 표시, 화면에 들어올 때 한 번 그리는 도식: index.html, kcc.html 공용
(function(){
  var root=document.documentElement;
  root.classList.add('js');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO='IntersectionObserver' in window;

  // ── 언어 전환 ──
  var btns=document.querySelectorAll('[data-lang-set]'),
      imgs=[].slice.call(document.querySelectorAll('img[data-alt-en]'));
  imgs.forEach(function(im){im.dataset.altKo=im.alt;});
  function apply(v){
    if(v==='en'){root.setAttribute('data-lang','en');root.lang='en';}else{root.removeAttribute('data-lang');root.lang='ko';}
    btns.forEach(function(b){b.setAttribute('aria-pressed', String(b.dataset.langSet===v));});
    imgs.forEach(function(im){im.alt=(v==='en')?im.dataset.altEn:im.dataset.altKo;});
    placeInd();
  }

  // ── 현재 섹션: 화면 위쪽 32% 지점을 지나는 섹션, 표시선이 그 항목으로 미끄러진다 ──
  var ul=document.querySelector('nav.toc ul');
  var links=[].slice.call(document.querySelectorAll('nav.toc a[href^="#"]'));
  var secs=links.map(function(a){return document.getElementById(a.getAttribute('href').slice(1));});
  var ind=null, shown=false;
  if(ul){
    ind=document.createElement('span'); ind.className='toc-ind'; ind.setAttribute('aria-hidden','true');
    ul.appendChild(ind); ul.classList.add('has-ind');
  }
  function placeInd(){
    if(!ind) return;
    var a=null;
    links.forEach(function(l){ if(l.getAttribute('aria-current')==='true') a=l; });
    if(!a){ ind.style.opacity='0'; shown=false; return; }
    var t='translateX('+a.offsetLeft+'px) scaleX('+(a.offsetWidth/100)+')';
    if(!shown){                       // 처음 나타날 때는 제자리에서 흐려졌다 선명해지기만
      ind.style.transition='opacity 200ms ease'; ind.style.transform=t;
      void ind.offsetWidth; ind.style.transition='';
    } else { ind.style.transform=t; }
    ind.style.opacity='1'; shown=true;
    // 좁은 화면: 현재 항목이 목차 밖에 있으면 보이도록 옮긴다
    if(a.offsetLeft<ul.scrollLeft || a.offsetLeft+a.offsetWidth>ul.scrollLeft+ul.clientWidth){
      ul.scrollTo({left:Math.max(0,a.offsetLeft-16),behavior:reduce?'auto':'smooth'});
    }
  }
  function mark(visible){
    var best=-1;
    secs.forEach(function(el,k){ if(visible.has(el)) best=k; });
    links.forEach(function(a,k){
      if(k===best){a.setAttribute('aria-current','true');}else{a.removeAttribute('aria-current');}
    });
    placeInd();
  }
  if(hasIO && links.length){
    var visible=new Set();
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
      mark(visible);
    },{rootMargin:'-32% 0px -67% 0px'});
    secs.forEach(function(el){ if(el) io.observe(el); });
  }
  if(ul && 'ResizeObserver' in window){ new ResizeObserver(placeInd).observe(ul); }

  // ── 화면에 들어올 때 한 번: 도식 2의 합류선, KCC 영화별 가중치 막대 ──
  var once=[].slice.call(document.querySelectorAll('.figscroll, .films'))
    .filter(function(el){ return el.classList.contains('films') || el.querySelector('.flow'); });
  if(hasIO && !reduce){
    var io2=new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io2.unobserve(en.target); } });
    },{threshold:.35});
    once.forEach(function(el){ io2.observe(el); });
  } else {
    once.forEach(function(el){ el.classList.add('in'); });
  }

  // 저장된 언어 적용과 버튼 연결
  var saved='ko';
  try{ if(localStorage.getItem('tw-lang')==='en') saved='en'; }catch(e){}
  apply(saved);
  btns.forEach(function(b){
    b.addEventListener('click',function(){
      var v=b.dataset.langSet;
      apply(v);
      try{localStorage.setItem('tw-lang',v);}catch(e){}
    });
  });
})();
