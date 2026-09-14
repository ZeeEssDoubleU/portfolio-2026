import type { ScrollPosition } from '../types/portfolio'
// Keep the portfolio in its existing layout/compositing layers on mobile.
// Changing its ancestor to position:fixed at the animation boundaries can flash
// the cards on Safari. Only the project details may consume scroll gestures.
export function lockMobileProjectScroll(position: ScrollPosition) {
  let touchY = 0
  const restore = () => {
    if (window.scrollX !== position.x || window.scrollY !== position.y) {
      window.scrollTo({ left: position.x, top: position.y, behavior: 'instant' })
    }
  }
  const canScroll = (target: EventTarget | null, delta: number) => {
    const panel = (target as Element | null)?.closest?.('.project-info')
    if (!panel) return false
    const maximum = panel.scrollHeight - panel.clientHeight
    return maximum > 0 && (delta < 0 ? panel.scrollTop > 0 : panel.scrollTop < maximum - 1)
  }
  const touchStart = (event: TouchEvent) => { touchY = event.touches[0]?.clientY || 0 }
  const touchMove = (event: TouchEvent) => {
    if (event.touches.length !== 1) return // Preserve pinch zoom.
    const nextY = event.touches[0].clientY
    const delta = touchY - nextY
    touchY = nextY
    if (!canScroll(event.target, delta)) event.preventDefault()
  }
  const wheel = (event: WheelEvent) => {
    if (event.ctrlKey) return
    if (!canScroll(event.target, event.deltaY)) event.preventDefault()
  }
  const key = (event: KeyboardEvent) => {
    if (!['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) return
    if (!(event.target as Element | null)?.closest?.('.project-info')) event.preventDefault()
  }
  document.addEventListener('touchstart', touchStart, { passive: true, capture: true })
  document.addEventListener('touchmove', touchMove, { passive: false, capture: true })
  document.addEventListener('wheel', wheel, { passive: false, capture: true })
  document.addEventListener('keydown', key, true)
  window.addEventListener('scroll', restore)
  restore()
  return () => {
    document.removeEventListener('touchstart', touchStart, true)
    document.removeEventListener('touchmove', touchMove, true)
    document.removeEventListener('wheel', wheel, true)
    document.removeEventListener('keydown', key, true)
    window.removeEventListener('scroll', restore)
    restore()
  }
}
