// ===== LOYALTY MODAL =====
(function() {
  const modal      = document.getElementById('loyaltyModal');
  const openBtn    = document.getElementById('loyaltyTeaserBtn');
  const closeBtn   = document.getElementById('loyaltyModalClose');
  const dismissBtn = document.getElementById('loyaltyModalDismiss');
  const backdrop   = document.getElementById('loyaltyModalBackdrop');
  if (!modal || !openBtn) return;

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    openBtn.focus();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  dismissBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();

// ===== MOBILE NAVIGATION =====
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
const mobileLinks = mobileNav.querySelectorAll('a');

burger.addEventListener('click', () => {
  const isOpen = burger.classList.toggle('active');
  mobileNav.classList.toggle('open', isOpen);
  mobileNav.setAttribute('aria-hidden', !isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ===== HEADER SCROLL BEHAVIOR =====
const header = document.getElementById('header');
let lastScrollY = 0;
let ticking = false;

function updateHeader() {
  const currentScrollY = window.scrollY;
  if (currentScrollY > 80) {
    if (currentScrollY > lastScrollY && currentScrollY > 300) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }
  } else {
    header.classList.remove('header--hidden');
  }
  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
}, { passive: true });

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== HERO ENTRANCE ANIMATION =====
function animateHero() {
  const brand = document.querySelector('.hero__brand');
  const title = document.querySelector('.hero__title');
  const sub = document.querySelector('.hero__sub');
  const stats = document.querySelector('.hero__stats');
  const actions = document.querySelector('.hero__actions');
  const scroll = document.querySelector('.hero__scroll');

  const els = [brand, title, sub, stats, actions, scroll].filter(Boolean);
  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15 + 0.2}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15 + 0.2}s`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });
}

animateHero();

// ===== SCROLL REVEAL (IntersectionObserver) =====
const revealEls = document.querySelectorAll('.section, .promo-card, .zone-card, .price-zone, .feature, .gallery__item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger cards within same parent
  const siblings = el.parentElement ? Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal')) : [];
  const idx = siblings.indexOf(el);
  if (idx > 0) {
    el.style.transitionDelay = `${idx * 0.08}s`;
  }
  revealObserver.observe(el);
});

// ===== ZONES DRAG SCROLL =====
const zonesWrapper = document.querySelector('.zones-wrapper');
if (zonesWrapper) {
  let isDown = false;
  let startX;
  let scrollLeft;

  zonesWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - zonesWrapper.offsetLeft;
    scrollLeft = zonesWrapper.scrollLeft;
  });
  zonesWrapper.addEventListener('mouseleave', () => { isDown = false; });
  zonesWrapper.addEventListener('mouseup', () => { isDown = false; });
  zonesWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - zonesWrapper.offsetLeft;
    zonesWrapper.scrollLeft = scrollLeft - (x - startX);
  });
}

// ===== PERIPHERAL ACCORDION =====
document.querySelectorAll('.zone-card__peripheral-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    const content = toggle.nextElementSibling;
    content.classList.toggle('open', isOpen);
    content.setAttribute('aria-hidden', !isOpen);
  });
});

// ===== FLOATING PARTICLES IN HERO =====
function createParticles() {
  const container = document.querySelector('.hero__bg');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
      animation-duration: ${8 + Math.random() * 12}s;
      animation-delay: ${Math.random() * -20}s;
      opacity: ${0.1 + Math.random() * 0.3};
    `;
    container.appendChild(particle);
  }
}

createParticles();

// ===== PARALLAX GLOW ON MOUSE MOVE =====
const heroGlows = document.querySelectorAll('.hero__glow');
const hero = document.querySelector('.hero');

if (hero && heroGlows.length && window.matchMedia('(hover: hover)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    heroGlows.forEach((glow, i) => {
      const factor = i === 0 ? 30 : 20;
      glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
}

// ===== FEED RELATIVE TIMESTAMPS (Moscow UTC+3) =====
function moscowRelativeTime(dateStr) {
  const todayStr = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Moscow' });
  const [ty, tm, td] = todayStr.split('-').map(Number);
  const [dy, dm, dd] = dateStr.split('-').map(Number);

  const today  = new Date(ty, tm - 1, td);
  const target = new Date(dy, dm - 1, dd);
  const diff   = Math.round((today - target) / 86400000);

  const MONTHS = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];

  if (diff < 0) {
    const n = -diff;
    if (n === 1) return 'завтра';
    if (n < 7)  return `через\u00a0${n}\u00a0дн.`;
    return `${dd}\u00a0${MONTHS[dm - 1]}`;
  }
  if (diff === 0) return 'сегодня';
  if (diff === 1) return 'вчера';
  if (diff < 5)  return `${diff}\u00a0дня назад`;
  if (diff < 7)  return `${diff}\u00a0дней назад`;
  if (diff < 14) return 'неделю назад';
  if (diff < 30) return `${Math.floor(diff / 7)}\u00a0нед. назад`;
  if (diff < 45) return 'месяц назад';
  if (diff < 345) return `${Math.floor(diff / 30)}\u00a0мес. назад`;
  return 'больше года назад';
}

document.querySelectorAll('time.feed-card__date[datetime]').forEach(el => {
  const rel = moscowRelativeTime(el.getAttribute('datetime'));
  if (rel) el.textContent = rel;
});
