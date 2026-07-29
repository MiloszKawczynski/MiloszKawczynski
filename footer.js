(function () {
  const html = `
  <footer class="footer">
    <div class="container footer__inner">
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