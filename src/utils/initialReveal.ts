// Opt in before first paint. Without JavaScript the server-rendered page stays visible.
export const initialRevealBootstrap = `(() => {
  if (location.pathname !== '/') return;
  const root = document.documentElement;
  root.dataset.siteEntry = 'waiting';
  let fallback;
  window.__revealPortfolio = () => {
    if (root.dataset.siteEntry !== 'waiting') return;
    clearTimeout(fallback);
    root.dataset.siteEntry = 'revealing';
    const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420;
    setTimeout(() => {
      delete root.dataset.siteEntry;
      delete window.__revealPortfolio;
    }, duration);
  };
  // A failed bundle or stalled asset must never leave the site hidden.
  fallback = setTimeout(window.__revealPortfolio, 4000);
  addEventListener('pageshow', event => {
    if (event.persisted) window.__revealPortfolio?.();
  });
})();`
