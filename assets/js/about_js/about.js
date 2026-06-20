/**
 * Waves Laundry - About Us Page Interactive Scripts
 * Implements smooth scroll reveals and interactive team animations
 */

const revealObserverOptions = {
  root: null,
  rootMargin: '0px -20px -50px -20px', // slight negative bottom margin to trigger shortly after entering viewport
  threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }
  });
}, revealObserverOptions);

document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');
  
  revealElements.forEach(el => {
    // Stagger Core Value cards
    if (el.classList.contains('value-card')) {
      const cards = Array.from(el.parentNode.querySelectorAll('.value-card'));
      const idx = cards.indexOf(el);
      el.style.transitionDelay = `${idx * 0.15}s`;
    }
    
    // Stagger Team profiles
    if (el.classList.contains('team-card')) {
      const cards = Array.from(el.parentNode.querySelectorAll('.team-card'));
      const idx = cards.indexOf(el);
      el.style.transitionDelay = `${idx * 0.2}s`;
    }
    
    revealObserver.observe(el);
  });
});
