// Ano do rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links){
  toggle.addEventListener('click', ()=>{
    const opened = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }));
}

// Sticky header leve
const header = document.querySelector('.site-header');
window.addEventListener('scroll', ()=>{
  header.classList.toggle('shrink', (window.scrollY||window.pageYOffset) > 6);
});

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

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href') || '';
    if (!href.startsWith('#')) return; // se virou Hotmart, não intercepta
    const el = document.querySelector(href);
    if (el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// CTA global: direcione para seu checkout / WhatsApp
const PAY_URL = "https://pay.hotmart.com/U102477582G";
document.querySelectorAll('a.btn').forEach(a=>{
  a.setAttribute('href', PAY_URL);     // força todos os botões para a Hotmart
  // opcional:
  // a.setAttribute('target', '_blank');
  // a.setAttribute('rel', 'noopener');
});

const checkout = document.getElementById('checkout');
if (checkout){ checkout.setAttribute('href', PAY_URL); }

// Viewport real (100vh confiável no mobile)
(function(){
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVH();
  window.addEventListener('resize', setVH);
})();
