// 언어 전환(KO/EN)과 현재 섹션 표시: index.html, kcc.html 공용
(function(){
  var root=document.documentElement,
      btns=document.querySelectorAll('[data-lang-set]'),
      imgs=[].slice.call(document.querySelectorAll('img[data-alt-en]'));
  imgs.forEach(function(im){im.dataset.altKo=im.alt;});
  function apply(v){
    if(v==='en'){root.setAttribute('data-lang','en');root.lang='en';}else{root.removeAttribute('data-lang');root.lang='ko';}
    btns.forEach(function(b){b.setAttribute('aria-pressed', String(b.dataset.langSet===v));});
    imgs.forEach(function(im){im.alt=(v==='en')?im.dataset.altEn:im.dataset.altKo;});
  }
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

  // 현재 읽고 있는 섹션을 내비에 표시: 화면 위쪽 32% 지점을 지나는 섹션
  var links=[].slice.call(document.querySelectorAll('nav.toc a[href^="#"]'));
  var secs=links.map(function(a){return document.getElementById(a.getAttribute('href').slice(1));});
  if(!('IntersectionObserver' in window)) return;
  var visible=new Set();
  function mark(){
    var best=-1;
    secs.forEach(function(el,k){ if(visible.has(el)) best=k; });
    links.forEach(function(a,k){
      if(k===best){a.setAttribute('aria-current','true');}else{a.removeAttribute('aria-current');}
    });
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
    mark();
  },{rootMargin:'-32% 0px -67% 0px'});
  secs.forEach(function(el){ if(el) io.observe(el); });
})();
