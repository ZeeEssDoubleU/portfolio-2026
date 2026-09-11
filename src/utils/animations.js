import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

// Header entrance and mobile menu expansion own different elements on mobile.
// Toggling the menu must never restart the logo or hamburger entrance.
export const useAnim_showNav = state => {
  useLayoutEffect(() => {
    if (!state.isDesktop && !state.navVisible) return
    const context = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const from = { autoAlpha: 0, x: state.isDesktop ? -40 : 0, y: state.isDesktop ? 0 : -40 }
      const to = { autoAlpha: 1, x: 0, y: 0, duration: reduced ? 0 : 0.5, ease: 'power1.out', clearProps: 'opacity,visibility,transform' }
      const timeline = gsap.timeline()
      timeline.fromTo('.nav-bar .logo-items', from, { ...to, stagger: reduced ? 0 : 0.1 }, 0)
      timeline.fromTo('.nav-bar .nav-hamburger', from, to, 0)
      if (!state.isMobile) timeline.fromTo('.nav-bar .menu-link', from, { ...to, stagger: reduced ? 0 : 0.1 }, 0)
    })
    return () => context.revert()
  }, [state.isDesktop, state.navVisible, state.isMobile])

  useLayoutEffect(() => {
    if (!state.isMobile || !state.menuExpanded) return
    const context = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.fromTo('.nav-bar .menu-link', { autoAlpha: 0, x: -40, y: 0 }, {
        autoAlpha: 1, x: 0, y: 0, duration: reduced ? 0 : 0.5,
        delay: reduced ? 0 : 0.2, stagger: reduced ? 0 : 0.1,
        ease: 'power1.out', clearProps: 'opacity,visibility,transform'
      })
    })
    return () => context.revert()
  }, [state.isMobile, state.menuExpanded])
}
