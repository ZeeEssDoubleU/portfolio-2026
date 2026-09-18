// Opt in before first paint. Without JavaScript the server-rendered page stays visible.
export const initialRevealBootstrap = `(() => {
  if (location.pathname !== '/') return;
  const root = document.documentElement;
  root.dataset.siteEntry = 'waiting';
  let assetsReady = false;
  let sheenReady = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let fallback;
  const reveal = () => {
    if (root.dataset.siteEntry !== 'waiting') return;
    clearTimeout(fallback);
    document.removeEventListener('animationend', onShineEnd);
    root.dataset.siteEntry = 'revealing';
    const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420;
    setTimeout(() => {
      delete root.dataset.siteEntry;
      delete window.__revealPortfolio;
    }, duration);
  };
  const onShineEnd = event => {
    if (event.animationName !== 'portfolio-ring-sheen') return;
    sheenReady = true;
    if (assetsReady) reveal();
  };
  document.addEventListener('animationend', onShineEnd);
  window.__revealPortfolio = () => {
    assetsReady = true;
    if (sheenReady || matchMedia('(prefers-reduced-motion: reduce)').matches) reveal();
  };
  // A failed bundle or stalled asset must never leave the site hidden.
  fallback = setTimeout(reveal, 4000);
  addEventListener('pageshow', event => {
    if (event.persisted) reveal();
  });
})();`
