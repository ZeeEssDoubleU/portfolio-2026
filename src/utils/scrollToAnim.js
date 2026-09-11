export const scrollToAnim = (menuExpanded, destination) => {
  const target = typeof destination === 'string' ? document.querySelector(destination) : null
  const top = target ? target.getBoundingClientRect().top + window.scrollY - 80 : Number(destination) || 0
  window.scrollTo({top, behavior: menuExpanded || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})
}
