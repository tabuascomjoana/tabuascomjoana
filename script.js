// Ano do rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll (similar ao manual)
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Countdown do Workshop de Natal
(function initCountdown(){
  const el = document.querySelector('.countdown');
  if(!el) return;
  const deadlineAttr = el.getAttribute('data-deadline');
  const deadline = deadlineAttr ? new Date(deadlineAttr) : null;
  const dd = el.querySelector('[data-dd]');
  const hh = el.querySelector('[data-hh]');
  const mm = el.querySelector('[data-mm]');
  const ss = el.querySelector('[data-ss]');

  function pad(v){ return String(v).padStart(2,'0'); }

  function tick(){
    if(!deadline) return;
    const now = new Date();
    const diff = deadline - now;
    if (diff <= 0){
      dd.textContent = '00'; hh.textContent = '00'; mm.textContent = '00'; ss.textContent = '00';
      const cta = el.closest('.card-workshop')?.querySelector('.cta');
      if (cta) cta.textContent = 'Inscrições encerradas';
      return clearInterval(tid);
    }
    const s = Math.floor(diff/1000);
    const d = Math.floor(s/86400);
    const h = Math.floor((s%86400)/3600);
    const m = Math.floor((s%3600)/60);
    const r = (s%60);
    dd.textContent = pad(d);
    hh.textContent = pad(h);
    mm.textContent = pad(m);
    ss.textContent = pad(r);
  }

  tick();
  const tid = setInterval(tick, 1000);
})();

// Acessibilidade: teclado ativa "click" nos cards (Enter/Espaço)
document.querySelectorAll('.card').forEach(card=>{
  card.setAttribute('tabindex','0');
  card.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      const href = card.getAttribute('href');
      if(href) window.location.href = href;
    }
  });
});
