import type { StoreState } from '../store/useStore'
import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

// Initial navigation joins the page reveal. Only opening the mobile menu staggers.
export const useAnim_showNav = (state: StoreState) => {
  useLayoutEffect(() => {
    if (!state.isMobile || !state.menuExpanded) return
    const context = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.fromTo('.nav-bar .menu-link', { autoAlpha: 0, x: 0, y: -40 }, {
        autoAlpha: 1, x: 0, y: 0, duration: reduced ? 0 : 0.5,
        delay: reduced ? 0 : 0.2, stagger: reduced ? 0 : 0.1,
        ease: 'power1.out', clearProps: 'opacity,visibility,transform'
      })
    })
    return () => context.revert()
  }, [state.isMobile, state.menuExpanded])
}
