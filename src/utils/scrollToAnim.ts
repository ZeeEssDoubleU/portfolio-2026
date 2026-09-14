import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

export const scrollToAnim = (menuExpanded: boolean, destination: string | number) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  gsap.to(window, {
    duration: menuExpanded || reduced ? 0 : 0.7,
    ease: 'power1.out', overwrite: 'auto',
    scrollTo: { y: destination, offsetY: Number.isNaN(Number(destination)) ? 80 : 0, autoKill: false }
  })
}
