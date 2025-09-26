// script.js
// Ano do rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
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

// Sticky header
const header = document.querySelector('.site-header');
window.addEventListener('scroll', ()=>{
  const y = window.scrollY || window.pageYOffset;
  header.classList.toggle('shrink', y > 6);
});

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  })
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Contador da badge "+ pedidos"
const counterEl = document.querySelector('[data-counter]');
if (counterEl){
  const target = parseInt(counterEl.getAttribute('data-counter'),10) || 100;
  let current = 0;
  const duration = 1200;
  let start;
  const step = ts=>{
    if(!start) start = ts;
    const p = Math.min((ts - start)/duration, 1);
    current = Math.floor(p * target);
    counterEl.textContent = current.toLocaleString('pt-BR');
    if (p < 1) requestAnimationFrame(step);
    else counterEl.textContent = `+${target}`;
  };
  const badge = counterEl.closest('.floating-badge');
  const badgeObserver = new IntersectionObserver(e=>{
    e.forEach(v=>{
      if(v.isIntersecting){
        requestAnimationFrame(step);
        badgeObserver.disconnect();
      }
    })
  },{threshold:.5});
  badgeObserver.observe(badge);
}

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

// Modais
const modalPrivacy = document.getElementById('modal-privacy');
const modalTerms = document.getElementById('modal-terms');
const openPrivacy = document.getElementById('open-privacy');
const openTerms = document.getElementById('open-terms');

const openModal = (modal)=>{
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeModal = (modal)=>{
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

if(openPrivacy) openPrivacy.addEventListener('click', (e)=>{e.preventDefault(); openModal(modalPrivacy)});
if(openTerms) openTerms.addEventListener('click', (e)=>{e.preventDefault(); openModal(modalTerms)});
document.querySelectorAll('[data-close]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const modal = btn.closest('.modal');
    closeModal(modal);
  });
});
document.querySelectorAll('.modal').forEach(modal=>{
  modal.addEventListener('click', (e)=>{
    if(e.target === modal) closeModal(modal);
  });
});

// Pulso do CTA na oferta
const offer = document.querySelector('#oferta');
if(offer){
  const cta = offer.querySelector('.btn-pulse');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        cta.classList.add('btn-pulse');
      } else {
        cta.classList.remove('btn-pulse');
      }
    })
  },{threshold:.3});
  obs.observe(offer);
}

// ===== Público: igualar alturas dos TÍTULOS e das CAIXAS (desktop) =====
(function(){
  const sel = {
    h:   '#publico .grid-2 > div > h2',
    fit: '#publico .fit-list',
    not: '#publico .not-list'
  };
  const mq = window.matchMedia('(min-width: 921px)');
  let rAF, tid;

  function equalize(){
    const headings = Array.from(document.querySelectorAll(sel.h));
    const fit = document.querySelector(sel.fit);
    const not = document.querySelector(sel.not);
    if (headings.length < 2 || !fit || !not) return;

    // reset
    headings.forEach(h => h.style.minHeight = '');
    fit.style.minHeight = '';
    not.style.minHeight = '';

    if (!mq.matches) return; // só no desktop

    // 1) iguala a ALTURA dos títulos (para os boxes começarem na mesma linha)
    const maxH = Math.max(...headings.map(h => h.offsetHeight));
    headings.forEach(h => h.style.minHeight = maxH + 'px');

    // 2) iguala a ALTURA dos boxes (terminarem na mesma linha)
    const boxH = Math.max(fit.offsetHeight, not.offsetHeight);
    fit.style.minHeight = boxH + 'px';
    not.style.minHeight = boxH + 'px';
  }

  function schedule(){
    cancelAnimationFrame(rAF);
    clearTimeout(tid);
    tid = setTimeout(() => {
      rAF = requestAnimationFrame(equalize);
    }, 50);
  }

  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule);
})();
