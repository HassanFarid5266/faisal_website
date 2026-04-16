// ── Nav scroll ──────────────────────────────
const nav = document.getElementById('navbar');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });
}

// ── Hamburger ───────────────────────────────
const ham = document.getElementById('ham');
const mob = document.getElementById('mobNav');
if (ham && mob) {
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
  });
  mob.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mob.classList.remove('open');
      ham.classList.remove('open');
    })
  );
}

// ── Scroll reveal ────────────────────────────
const obs = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.r').forEach(el => obs.observe(el));

// ── Smooth scroll ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Active nav link (for inner pages) ───────
(function () {
  const links = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ── Contact form ─────────────────────────────
function submitForm() {
  const required = ['firstName', 'lastName', 'email', 'service', 'message'];
  let valid = true;
  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!el.value.trim()) {
      el.style.borderColor = '#ef4444';
      valid = false;
    } else {
      el.style.borderColor = '';
    }
  });
  if (!valid) return;
  const formBody = document.getElementById('formBody');
  const formSuccess = document.getElementById('formSuccess');
  if (formBody) formBody.style.display = 'none';
  if (formSuccess) formSuccess.classList.add('show');
}

// ── Legal sidebar active link ────────────────
(function () {
  const sections = document.querySelectorAll('.legal-content h2[id]');
  const navLinks = document.querySelectorAll('.legal-nav ul li a');
  if (!sections.length || !navLinks.length) return;

  const activate = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', activate, { passive: true });
  activate();
})();
