import { useEffect } from "react";

const nextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
const decode = (image: HTMLImageElement) => image.decode().catch(() => {});

export default function useInitialReveal() {
  useEffect(() => {
    if (document.documentElement.dataset.siteEntry !== "waiting") return;
    let cancelled = false;
    const prepare = async () => {
      // Let viewport state, scroll restoration and the first particle draw settle.
      await nextFrame();
      await nextFrame();
      if (cancelled) return;
      const images = [...document.images].filter((image) => {
        const rect = image.getBoundingClientRect();
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.bottom > 0 &&
          rect.top < innerHeight &&
          rect.right > 0 &&
          rect.left < innerWidth
        );
      });
      images.forEach((image) => {
        image.loading = "eager";
        image
          .closest("[data-image-state]")
          ?.setAttribute("data-entry-image", "");
      });
      await Promise.all([document.fonts.ready, ...images.map(decode)]);
      // PortfolioImage also commits its decoded state across two animation frames.
      await nextFrame();
      await nextFrame();
      await nextFrame();
      if (!cancelled) window.__revealPortfolio?.();
    };
    void prepare().catch(() => {
      if (!cancelled) window.__revealPortfolio?.();
    });
    return () => {
      cancelled = true;
    };
  }, []);
}
