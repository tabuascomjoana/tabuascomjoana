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
