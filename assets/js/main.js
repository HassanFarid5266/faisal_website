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

// ── FAQ Page ─────────────────────────────────
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

function filterCat(cat, btn) {
  document.querySelectorAll('.faq-cats button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('faqSearch').value = '';
  document.querySelectorAll('.faq-group').forEach(g => {
    g.style.display = (cat === 'all' || g.dataset.cat === cat) ? '' : 'none';
  });
  document.querySelectorAll('.faq-item').forEach(i => i.style.display = '');
  document.getElementById('faqEmpty').style.display = 'none';
}

function filterSearch(val) {
  val = val.toLowerCase().trim();
  let anyVisible = false;
  document.querySelectorAll('.faq-group').forEach(g => g.style.display = '');
  document.querySelectorAll('.faq-cats button').forEach(b => b.classList.remove('active'));
  const firstBtn = document.querySelector('.faq-cats button');
  if (firstBtn) firstBtn.classList.add('active');

  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q').textContent.toLowerCase();
    const a = item.querySelector('.faq-a-inner').textContent.toLowerCase();
    const match = !val || q.includes(val) || a.includes(val);
    item.style.display = match ? '' : 'none';
    if (match) anyVisible = true;
  });

  document.querySelectorAll('.faq-group').forEach(g => {
    const visible = [...g.querySelectorAll('.faq-item')].some(i => i.style.display !== 'none');
    g.style.display = visible ? '' : 'none';
  });

  const empty = document.getElementById('faqEmpty');
  if (empty) empty.style.display = anyVisible ? 'none' : 'block';
}

// ── Cookie Banner ────────────────────────────
function acceptCookies() {
  localStorage.setItem('fa_cookie_consent', 'all');
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.add('hidden');
}
function declineCookies() {
  localStorage.setItem('fa_cookie_consent', 'essential');
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.add('hidden');
}
// Auto-hide banner if already consented
(function() {
  const banner = document.getElementById('cookieBanner');
  if (banner && localStorage.getItem('fa_cookie_consent')) {
    banner.classList.add('hidden');
  }
})();

// ── Careers Page ─────────────────────────────
function filterJobs(dept, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const cards = document.querySelectorAll('.job-card');
  let count = 0;
  cards.forEach(c => {
    const match = dept === 'all' || c.dataset.dept === dept;
    c.style.display = match ? '' : 'none';
    if (match) count++;
  });
  const countEl = document.getElementById('jobCount');
  if (countEl) countEl.textContent = count;
  const noneEl = document.getElementById('jobsNone');
  if (noneEl) noneEl.style.display = count === 0 ? 'block' : 'none';
}

function openModal(dept, title) {
  const modal = document.getElementById('applyModal');
  if (!modal) return;
  document.getElementById('modalRole').textContent = dept + ' · Open Position';
  document.getElementById('modalTitle').textContent = 'Apply — ' + title;
  document.getElementById('applyForm').style.display = '';
  document.getElementById('applySuccess').style.display = 'none';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  const modal = document.getElementById('applyModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}
// Close modal on backdrop click
(function() {
  const modal = document.getElementById('applyModal');
  if (modal) modal.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
})();

function submitApplication() {
  const fields = ['aName','aEmail','aPhone','aCity','aExp','aCover'];
  let valid = true;
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!el.value.trim()) { el.style.borderColor = '#ef4444'; valid = false; }
    else el.style.borderColor = '';
  });
  if (!valid) return;
  document.getElementById('applyForm').style.display = 'none';
  document.getElementById('applySuccess').style.display = 'block';
}