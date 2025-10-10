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
    const id = a.getAttribute('href');
    if(id.length > 1){
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });
});

// Countdown (para oferta antecipada) — com animação nos dígitos
(function initCountdown(){
  const bump = (el, val) => {
    if (el.textContent !== val){
      el.textContent = val;
      el.classList.remove('bump');
      // força reflow para reiniciar animação
      void el.offsetWidth;
      el.classList.add('bump');
    }
  };

  document.querySelectorAll('.countdown').forEach(el=>{
    const deadlineAttr = el.getAttribute('data-deadline');
    if(!deadlineAttr) return;
    const deadline = new Date(deadlineAttr);

    const dd = el.querySelector('[data-dd]');
    const hh = el.querySelector('[data-hh]');
    const mm = el.querySelector('[data-mm]');
    const ss = el.querySelector('[data-ss]');
    const pad = v => String(v).padStart(2,'0');

    function tick(){
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0){
        ['00','00','00','00'].forEach((v,i)=> bump([dd,hh,mm,ss][i], v));
        clearInterval(tid);
        return;
      }
      const s = Math.floor(diff/1000);
      const d = Math.floor(s/86400);
      const h = Math.floor((s%86400)/3600);
      const m = Math.floor((s%3600)/60);
      const r = (s%60);
      bump(dd, pad(d)); bump(hh, pad(h)); bump(mm, pad(m)); bump(ss, pad(r));
    }
    tick();
    const tid = setInterval(tick, 1000);
  });
})();


// CTA global: atualize para seu checkout (Hotmart/Kiwify/etc.)
const PAY_URL = "https://wa.me/5541995697171";
document.querySelectorAll('a.btn').forEach(a=>{
  const isAnchor = a.getAttribute('href')?.startsWith('#');
  if (!isAnchor) a.setAttribute('href', PAY_URL);
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
