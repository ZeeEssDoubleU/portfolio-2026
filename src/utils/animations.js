import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'

// One animation owns these elements. Separate paused desktop/mobile timelines
// used to overwrite each other's visibility when React mounted or resized.
export const useAnim_showNav = state => {
  useLayoutEffect(() => {
    if (!state.isDesktop && !state.navVisible) return
    const context = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const elements = gsap.utils.toArray('.nav-bar .logo-items, .nav-bar .nav-hamburger, .nav-bar .menu-link')
        .filter(element => getComputedStyle(element).display !== 'none' && element.getClientRects().length)
      gsap.fromTo(elements,
        { autoAlpha: 0, x: state.isDesktop ? -40 : 0, y: state.isDesktop ? 0 : -40 },
        { autoAlpha: 1, x: 0, y: 0, duration: reduced ? 0 : 0.5, stagger: reduced ? 0 : 0.1, clearProps: 'opacity,visibility,transform' }
      )
    })
    return () => context.revert()
  }, [state.isDesktop, state.navVisible, state.menuExpanded, state.isMobile])
}
