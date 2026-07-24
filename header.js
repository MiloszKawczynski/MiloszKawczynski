(function () 
{
  const BASE = '/miloszkawczynskidesign.github.io';

  const html = `
  <header class="header">
    <div class="container">
      <div class="nav">
        <button id="ragdollToggle" class="ragdoll-btn" aria-label="Toggle ragdoll" title="Ragdoll">👤 Ragdoll</button>
        <a href="${BASE}/index.html" class="nav__logo">Miłosz Kawczyński</a>
        <div class="mode-toggle" id="modeToggle" role="switch" aria-checked="false" aria-label="Tryb: Design / Programming" tabindex="0">
          <span class="mode-toggle__label">💡 Design</span>
          <div class="mode-toggle__track">
            <div class="mode-toggle__thumb"></div>
          </div>
          <span class="mode-toggle__label">Programming 💻</span>
        </div>
        <nav class="tabs" role="tablist">
          <a href="${BASE}/index.html"                class="tab" role="tab">Projects</a>
          <a href="${BASE}/pixelart/pixelart.html"    class="tab" role="tab">Pixel Art</a>
          <a href="${BASE}/about.html"                class="tab" role="tab">About</a>
        </nav>
      </div>
    </div>
  </header>`;

  document.body.insertAdjacentHTML('afterbegin', html);

  const params = new URLSearchParams(window.location.search);
  const modeFromUrl = params.get('mode');

  const savedMode = (modeFromUrl === 'design' || modeFromUrl === 'programming')
    ? modeFromUrl
    : (sessionStorage.getItem('portfolio-mode') ?? 'design');

  if (modeFromUrl === 'design' || modeFromUrl === 'programming') 
  {
    sessionStorage.setItem('portfolio-mode', modeFromUrl);
  }

  document.body.classList.toggle('mode--programming', savedMode === 'programming');

  function initToggle() 
  {
    const toggle = document.getElementById('modeToggle');
    if (!toggle) return;

    toggle.setAttribute('aria-checked', String(savedMode === 'programming'));

    toggle.addEventListener('click', () => 
    {
      const next = document.body.classList.contains('mode--programming') ? 'design' : 'programming';
      document.body.classList.toggle('mode--programming', next === 'programming');
      toggle.setAttribute('aria-checked', String(next === 'programming'));
      sessionStorage.setItem('portfolio-mode', next);
      document.dispatchEvent(new CustomEvent('modechange', { detail: { mode: next } }));
    });

    toggle.addEventListener('keydown', e => 
    {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle.click(); }
    });
  }

  function initRagdollToggle() 
  {
    const btn = document.getElementById('ragdollToggle');
    if (!btn) return;

    if (window.innerWidth < 1920 || window.innerHeight < 1080) 
    {
      btn.style.display = 'none';
      return;
    }

    const savedRagdoll = localStorage.getItem('ragdoll-enabled') ?? 'true';
    let enabled = savedRagdoll === 'true';

    function updateBtn() 
    {
      btn.classList.toggle('ragdoll-btn--off', !enabled);
    }

    function applyRagdoll() 
    {
      const el = document.getElementById('character');
      if (!el) return;
      el.style.display = enabled ? '' : 'none';
    }

    updateBtn();
    window.addEventListener('load', applyRagdoll);

    btn.addEventListener('click', () => 
    {
      enabled = !enabled;
      localStorage.setItem('ragdoll-enabled', String(enabled));
      updateBtn();
      applyRagdoll();
    });
  }

  if (document.readyState === 'loading') 
  {
    document.addEventListener('DOMContentLoaded', () => { initToggle(); initRagdollToggle(); });
  } 
  else 
  {
    initToggle();
    initRagdollToggle();
  }
})();