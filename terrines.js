// script.js — Terrines Irresistíveis

// Ano no rodapé
const yearEl = document.getElementById('year');
if (yearEl){
  yearEl.textContent = new Date().getFullYear();
}

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks){
  navToggle.addEventListener('click', () => {
    const opened = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Header sticky / shrink
const header = document.querySelector('.site-header');
if (header){
  window.addEventListener('scroll', () => {
    const y = window.scrollY || window.pageYOffset;
    header.classList.toggle('shrink', y > 6);
  });
}

// Scroll suave interno
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (target){
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/*
  Quando tiver o link final de pagamento, basta trocar o href do botão principal:

  const checkoutBtn = document.getElementById('checkout');
  if (checkoutBtn){
    checkoutBtn.href = "https://seulinkdepagamento.com";
  }
*/
