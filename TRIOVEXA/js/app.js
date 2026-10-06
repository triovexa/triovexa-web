/* ==========================================================================
   TRIOVEXA - Midnight Ocean & Electric Sky Theme Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticlesCanvas();
  initTypewriter();
  initHeaderScroll();
  initEstimator();
  initPortfolioFilter();
  initContactForm();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. Background Particles Canvas (Electric Cyan Ambient Nodes)
   -------------------------------------------------------------------------- */
function initParticlesCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 15), 65);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2.2 + 1;
      this.alpha = Math.random() * 0.6 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 125) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.18 * (1 - dist / 125)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. Typewriter Effect (Industry Solutions)
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter-target');
  if (!target) return;

  const phrases = [
    'Textiles & Garments Projects',
    'Transport & Logistics Apps',
    'Dyeing Factory Automation',
    'Travels & Reservation Apps',
    'Shop E-Commerce & POS Solutions',
    'Custom Software & ERP Builds'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 35 : 75;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 350;
    }

    setTimeout(type, speed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Header Scroll Detector
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   4. Interactive Project Estimator
   -------------------------------------------------------------------------- */
function initEstimator() {
  const serviceCards = document.querySelectorAll('.estimator-opt-card');
  const featureCheckboxes = document.querySelectorAll('.estimator-feature-cb');
  const priceDisplay = document.getElementById('estimator-price');
  const timeDisplay = document.getElementById('estimator-timeline');

  let basePrice = 1800;
  let baseWeeks = 3;

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      basePrice = parseInt(card.getAttribute('data-price') || '1800');
      baseWeeks = parseInt(card.getAttribute('data-weeks') || '3');
      updateEstimate();
    });
  });

  featureCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateEstimate);
  });

  function updateEstimate() {
    let addedPrice = 0;
    let addedWeeks = 0;

    featureCheckboxes.forEach(cb => {
      if (cb.checked) {
        addedPrice += parseInt(cb.getAttribute('data-add-price') || '500');
        addedWeeks += parseFloat(cb.getAttribute('data-add-weeks') || '0.5');
      }
    });

    const totalPrice = basePrice + addedPrice;
    const totalWeeks = Math.round(baseWeeks + addedWeeks);

    if (priceDisplay) priceDisplay.textContent = `$${totalPrice.toLocaleString()}`;
    if (timeDisplay) timeDisplay.textContent = `${totalWeeks} Weeks`;
  }
}

/* --------------------------------------------------------------------------
   5. Portfolio Filter
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCategory === filterCategory) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('triovexa-contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');

      if (!nameInput.value || !emailInput.value) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      showToast(`Thank you ${nameInput.value}! Your project request has been submitted. Our team will contact you within 2 hours.`, 'success');
      contactForm.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   7. Smooth Scrolling
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconClass = 'ri-checkbox-circle-fill';
  if (type === 'error') iconClass = 'ri-error-warning-fill';
  if (type === 'info') iconClass = 'ri-information-fill';

  toast.innerHTML = `<i class="${iconClass}" style="font-size:1.3rem; color:var(--text-sky-bright);"></i> <span>${message}</span>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
