import type { StoreState } from '../store/useStore'
import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

// Mobile threshold visibility is a CSS fade; it must not restart child tweens.
// Header entrance and mobile menu expansion own different elements on mobile.
// Toggling the menu must never restart the logo or hamburger entrance.
export const useAnim_showNav = (state: StoreState) => {
  useLayoutEffect(() => {
    if (state.isMobile || (!state.isDesktop && !state.navVisible)) return
    const context = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const from = { autoAlpha: 0, x: 0, y: -40 }
      const to = { autoAlpha: 1, x: 0, y: 0, duration: reduced ? 0 : 0.5, ease: 'power1.out', clearProps: 'opacity,visibility,transform' }
      const timeline = gsap.timeline()
      if (state.isDesktop) {
        // One ordered sequence: logo, home, about, projects, contact.
        const items = [document.querySelector('.nav-bar .logo-link'), ...document.querySelectorAll('.nav-bar .menu-link')].filter(Boolean)
        timeline.fromTo(items, from, { ...to, stagger: reduced ? 0 : 0.1 }, 0)
      } else {
        timeline.fromTo('.nav-bar .logo-items', from, { ...to, stagger: reduced ? 0 : 0.1 }, 0)
        timeline.fromTo('.nav-bar .menu-link', from, { ...to, stagger: reduced ? 0 : 0.1 }, 0)
      }
    })
    return () => context.revert()
  }, [state.isDesktop, state.navVisible, state.isMobile])

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
