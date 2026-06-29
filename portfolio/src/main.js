import './style.css';
import data from './data.json';

// ── Footer year ──────────────────────────────────────────────────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── Skills ───────────────────────────────────────────────────────────────────
function loadSkills() {
  const grid = document.getElementById('skills-grid');
  (data.skills || []).forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.setAttribute('data-reveal', '');
    card.setAttribute('data-reveal-stagger', '');
    card.style.cssText = 'background: #f6f2ea; border: 1px solid rgba(26,24,19,0.1); border-radius: 12px; padding: 28px;';
    card.innerHTML = `
      <div style="font-size: 22px; margin-bottom: 18px;">${skill.icon}</div>
      <h3 style="margin: 0 0 10px; font-size: 18px; font-weight: 600; letter-spacing: -0.01em;">${skill.title}</h3>
      <p style="margin: 0; font-size: 14px; line-height: 1.55; color: #6b665a;">${skill.items}</p>
    `;
    grid.appendChild(card);
  });
}

// ── Projects ─────────────────────────────────────────────────────────────────
function loadProjects() {
  const grid = document.getElementById('projects-grid');
  (data.projects || []).forEach(project => {
    const href = project.github || project.live || '#';
    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = href;
    if (href !== '#') { card.target = '_blank'; card.rel = 'noopener'; }
    card.setAttribute('data-reveal', '');
    card.setAttribute('data-reveal-stagger', '');
    card.style.cssText = 'display: flex; flex-direction: column; border-radius: 16px; overflow: hidden; background: #f6f2ea; border: 1px solid rgba(26,24,19,0.1); text-decoration: none; color: inherit;';

    const tags = (project.tech || []).map(t =>
      `<span style="font-family: ui-monospace,'SF Mono',Menlo,monospace; font-size: 12px; color: #6b665a; border: 1px solid rgba(26,24,19,0.16); padding: 4px 10px; border-radius: 980px;">${t}</span>`
    ).join('');

    const shotLabel = project.title.toLowerCase().replace(/\s+/g, '-') + '.png';
    

    const linkLabel = project.github ? 'View on GitHub' : project.live ? 'View Live' : '';
    const linkHtml = linkLabel
      ? `<span style="margin-top: auto; display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 500; color: #2f2dd0;">${linkLabel} <span style="font-size: 16px;">&#8599;</span></span>`
      : '';

    card.innerHTML = `
      <div style="aspect-ratio: 16/8; background-color: #e8e3d6; background-image: repeating-linear-gradient(135deg, rgba(47,45,208,0.06) 0 14px, transparent 14px 28px); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(26,24,19,0.08);">
        <span style="font-family: ui-monospace,'SF Mono',Menlo,monospace; font-size: 11px; color: #8a8475; letter-spacing: 0.04em;">${shotLabel}</span>
      </div>
      <div style="padding: 18px 20px 20px; display: flex; flex-direction: column; flex: 1;">
        <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 8px;">
          <h3 style="margin: 0; font-family: 'Instrument Serif', serif; font-weight: 400; font-size: 22px; line-height: 1.1; letter-spacing: -0.01em;">${project.title}</h3>
        </div>
        <p style="margin: 0 0 14px; font-size: 13px; line-height: 1.55; color: #5a554a;">${project.desc}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;">${tags}</div>
        ${linkHtml}
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── Experience ────────────────────────────────────────────────────────────────
function loadExperience() {
  const list = document.getElementById('experience-list');
  (data.careers || []).forEach(entry => {
    const row = document.createElement('div');
    row.className = 'exp-row';
    row.setAttribute('data-reveal', '');
    row.style.cssText = 'display: grid; grid-template-columns: max-content 1fr; gap: 28px; padding: 30px 0; border-top: 1px solid rgba(26,24,19,0.14);';
    row.innerHTML = `
      <div style="font-family: ui-monospace,'SF Mono',Menlo,monospace; font-size: 13px; color: #8a8475; padding-top: 5px; white-space: nowrap;">${entry.timeline}</div>
      <div>
        <h3 style="margin: 0 0 4px; font-size: 21px; font-weight: 600; letter-spacing: -0.01em;">${entry.title}</h3>
        <div style="font-size: 15px; font-weight: 500; color: #2f2dd0; margin-bottom: 10px;">${entry.organization}</div>
        <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #5a554a;">${entry.desc}</p>
      </div>
    `;
    list.appendChild(row);
  });
}

// Populate all sections before initialising observers
loadSkills();
loadProjects();
loadExperience();

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function initReveal() {
  const els = Array.from(document.querySelectorAll('[data-reveal]'));
  els.forEach(el => {
    const dur = el.getAttribute('data-reveal-dur') || 900;
    el.style.opacity = '0';
    el.style.transform = 'translateY(34px)';
    el.style.transition = `opacity ${dur}ms cubic-bezier(0.16,1,0.3,1), transform ${dur}ms cubic-bezier(0.16,1,0.3,1)`;
    el.style.willChange = 'opacity, transform';
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      let delay = parseInt(e.target.getAttribute('data-reveal-delay') || '0', 10);
      if (e.target.hasAttribute('data-reveal-stagger')) {
        const sibs = Array.from(e.target.parentElement.children).filter(c => c.hasAttribute('data-reveal-stagger'));
        delay += sibs.indexOf(e.target) * 110;
      }
      e.target.style.transitionDelay = delay + 'ms';
      e.target.style.opacity = '1';
      e.target.style.transform = 'none';
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  els.forEach(el => io.observe(el));
}

// ── Parallax ──────────────────────────────────────────────────────────────────
function initParallax() {
  const blob = document.getElementById('parallax-blob');
  const drifts = Array.from(document.querySelectorAll('[data-parallax-y]'));

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (blob) blob.style.transform = `translateY(${(y * 0.22).toFixed(1)}px)`;
    const vh = window.innerHeight || 800;
    drifts.forEach(el => {
      const rect = el.getBoundingClientRect();
      const speed = parseFloat(el.getAttribute('data-parallax-y')) || 0;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.translate = `0 ${(progress * speed).toFixed(1)}px`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Contact form ──────────────────────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.style.display = 'none';
        success.style.display = 'flex';
      }
    } catch {
      form.style.display = 'none';
      success.style.display = 'flex';
    }
  });
}

initReveal();
initParallax();
initContactForm();
