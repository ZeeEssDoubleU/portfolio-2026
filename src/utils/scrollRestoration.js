// Run before the browser or Next.js can follow a stale hash during startup.
// Only the homepage owns document scrolling; project overlays keep their own lock.
export const scrollBootstrap = `(() => {
  if (location.pathname !== '/') return;
  const url = location.pathname + location.search + location.hash;
  const key = 'portfolio:scroll:';
  const type = performance.getEntriesByType('navigation')[0]?.type;
  let saved = null;
  try {
    if (type === 'reload' || type === 'back_forward') saved = JSON.parse(sessionStorage.getItem(key + url));
  } catch {}
  if (saved && (!Number.isFinite(saved.y) || saved.y < 0)) saved = null;
  window.__portfolioRestore = { url, hash: location.hash, saved };
  history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  if (saved?.expanded) document.documentElement.dataset.portfolioExpanded = 'true';
  const save = () => {
    if (location.pathname !== '/' || document.querySelector('[data-portfolio-layer]')?.style.position === 'fixed') return;
    try {
      sessionStorage.setItem(key + location.pathname + location.search + location.hash, JSON.stringify({
        y: scrollY, x: scrollX,
        expanded: document.querySelector('[aria-controls="additional-projects"]')?.getAttribute('aria-expanded') === 'true'
      }));
    } catch {}
  };
  addEventListener('pagehide', save);
  document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });
})();`

// The server-rendered layout is present here, so restore before the first paint.
export const restoreInitialScroll = `(() => {
  const entry = window.__portfolioRestore;
  if (!entry) return;
  const target = document.getElementById(entry.hash.slice(1));
  const y = entry.saved ? entry.saved.y : target ? Math.max(0, target.getBoundingClientRect().top + scrollY - (target.id === 'landing' ? 0 : 80)) : 0;
  scrollTo({ left: entry.saved?.x || 0, top: y, behavior: 'instant' });
})();`
