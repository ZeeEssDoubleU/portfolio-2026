// Keep the portfolio in its existing layout/compositing layers on mobile.
// Changing its ancestor to position:fixed at the animation boundaries can flash
// the cards on Safari. Only the project details may consume scroll gestures.
export function lockMobileProjectScroll(position) {
  let touchY = 0
  const restore = () => {
    if (window.scrollX !== position.x || window.scrollY !== position.y) {
      window.scrollTo({ left: position.x, top: position.y, behavior: 'instant' })
    }
  }
  const canScroll = (target, delta) => {
    const panel = target.closest?.('.project-info')
    if (!panel) return false
    const maximum = panel.scrollHeight - panel.clientHeight
    return maximum > 0 && (delta < 0 ? panel.scrollTop > 0 : panel.scrollTop < maximum - 1)
  }
  const touchStart = event => { touchY = event.touches[0]?.clientY || 0 }
  const touchMove = event => {
    if (event.touches.length !== 1) return // Preserve pinch zoom.
    const nextY = event.touches[0].clientY
    const delta = touchY - nextY
    touchY = nextY
    if (!canScroll(event.target, delta)) event.preventDefault()
  }
  const wheel = event => {
    if (event.ctrlKey) return
    if (!canScroll(event.target, event.deltaY)) event.preventDefault()
  }
  const key = event => {
    if (!['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) return
    if (!event.target.closest?.('.project-info')) event.preventDefault()
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
