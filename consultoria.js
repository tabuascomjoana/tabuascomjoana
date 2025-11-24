// Ano do rodapé
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links){
  toggle.addEventListener('click', ()=>{
    const opened = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', ()=>{
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    });
  });
}

// Sticky header
const header = document.querySelector('.site-header');
if (header){
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY || window.pageYOffset;
    header.classList.toggle('shrink', y > 6);
  });
}

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
},{threshold:.15});

document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if(id && id.length > 1){
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });
});

// CTA pulsando na seção de investimento
const investimentoSection = document.querySelector('#investimento');
if (investimentoSection){
  const cta = investimentoSection.querySelector('.btn-pulse');
  if (cta){
    const obsCTA = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          cta.classList.add('btn-pulse');
        } else {
          cta.classList.remove('btn-pulse');
        }
      });
    },{threshold:.3});
    obsCTA.observe(investimentoSection);
  }
}

// Viewport real no mobile: define --vh para usar no CSS
(function(){
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVH();
  window.addEventListener('resize', setVH);
})();
