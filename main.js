// Carn LLC — main.js

// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (navLinks && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
    navLinks.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
});

// Contact form — async Formspree submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        contactForm.reset();
        document.getElementById('form-success').style.display = 'block';
        btn.style.display = 'none';
      } else {
        btn.disabled = false;
        btn.textContent = 'Send message →';
        alert('Something went wrong — please email sean@carn.llc directly.');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = 'Send message →';
      alert('Something went wrong — please email sean@carn.llc directly.');
    }
  });
}

// Highlight active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.style.opacity = '1';
    link.style.fontWeight = '500';
  }
});
