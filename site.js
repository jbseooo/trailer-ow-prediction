// 언어 전환(KO/EN)과 현재 섹션 표시 — index.html, kcc.html 공용
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

  // 현재 읽고 있는 섹션을 내비에 표시
  var links=[].slice.call(document.querySelectorAll('nav.toc a[href^="#"]')),
      secs=links.map(function(a){return document.getElementById(a.getAttribute('href').slice(1));});
  function mark(i){
    links.forEach(function(a,k){
      if(k===i){a.setAttribute('aria-current','true');}else{a.removeAttribute('aria-current');}
    });
  }
  function current(){
    var line=window.innerHeight*0.32, best=-1;
    secs.forEach(function(el,k){
      if(el && el.getBoundingClientRect().top<=line) best=k;
    });
    mark(best);
  }
  var tick=false;
  window.addEventListener('scroll',function(){
    if(tick) return; tick=true;
    requestAnimationFrame(function(){current();tick=false;});
  },{passive:true});
  current();
})();
