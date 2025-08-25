const exchangeRate = 3.85; // USD → PEN

function updatePrices() {
  const priceElements = document.querySelectorAll('.price');
  priceElements.forEach(el => {
    const usd = parseFloat(el.dataset.usd);
    if(document.documentElement.lang === 'es') {
      const sol = Math.round(usd * exchangeRate * 100) / 100;
      el.innerText = `S/ ${sol}`;
    } else {
      el.innerText = `$${usd}`;
    }
  });
}

function toggleLanguage() {
  const elements = document.querySelectorAll('[data-en]');
  const html = document.documentElement;

  elements.forEach(el => {
    if(html.lang !== 'es') {
      el.innerText = el.getAttribute('data-es');
    } else {
      el.innerText = el.getAttribute('data-en');
    }
  });

  html.lang = html.lang === 'es' ? 'en' : 'es';
  updatePrices();
}

// Make hero, profiles, and prices visible on load
window.addEventListener('load', () => {
  document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('animate-visible'));
  updatePrices();

  // Loader fade out after 2.5s
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('fade-out'), 2500);
});

// Scroll animation
const scrollElements = document.querySelectorAll("section, .project-card, .service-card, .services-grid, .projects-grid");
const elementInView = (el, offset=0) => el.getBoundingClientRect().top <= ((window.innerHeight || document.documentElement.clientHeight) - offset);
const displayScrollElement = el => el.classList.add("active");
const handleScrollAnimation = () => scrollElements.forEach(el => { if(elementInView(el,100)) displayScrollElement(el); });
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);
