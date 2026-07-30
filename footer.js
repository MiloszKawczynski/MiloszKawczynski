(function () {
  const BASE = '/MiloszKawczynski';
  
  const html = `
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__left-icons">
        <a href="${BASE}/index.html" class="footer__left-link" aria-label="Projekty">
          <i class="fa-solid fa-diagram-project"></i>
        </a>
        <a href="${BASE}/pixelart/pixelart.html" class="footer__left-link" aria-label="Pixelart">
          <i class="fa-solid fa-palette"></i>
        </a>
        <a href="${BASE}/about.html" class="footer__left-link" aria-label="O mnie">
          <i class="fa-solid fa-user"></i>
        </a>
      </div>
      <span class="footer__name">Miłosz Kawczyński</span>
      <div class="footer__links">
        <a href="https://github.com/MiloszKawczynski" target="_blank" rel="noopener" class="footer__link">
          <i class="fa-brands fa-github"></i><span class="footer__link-text"> GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/miłosz-kawczyński-9a8ab134a/" target="_blank" rel="noopener" class="footer__link">
          <i class="fa-brands fa-linkedin"></i><span class="footer__link-text"> LinkedIn</span>
        </a>
        <a href="mailto:kawczynskimilosz@gmail.com" class="footer__link">
          <i class="fa-solid fa-envelope"></i><span class="footer__link-text"> kawczynskimilosz@gmail.com</span>
        </a>
      </div>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('beforeend', html);
})();