import { useEffect } from 'react'

export default function useSectionMotion() {
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('#about, #projects, #contact')]
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.menu-link')]
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Only animate cards still below the viewport. Never hide already visible cards,
    // including a card beneath a project modal or a direct hash destination.
    if (!media.matches) sections.forEach(section => {
      if (section.getBoundingClientRect().top > window.innerHeight) section.dataset.reveal = 'waiting'
    })
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target instanceof HTMLElement) entry.target.dataset.reveal = 'visible'
          links.forEach(link => {
            if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location')
            else link.removeAttribute('aria-current')
          })
        }
      })
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' })
    sections.forEach(section => observer.observe(section))
    const landing = document.querySelector('#landing')
    if (landing) observer.observe(landing)
    const showAll = () => sections.forEach(section => { section.dataset.reveal = 'visible' })
    media.addEventListener('change', showAll)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', showAll)
      showAll()
    }
  }, [])
}
