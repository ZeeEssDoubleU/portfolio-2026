import type { Transition } from 'framer-motion'
import type { ScrollPosition } from '../types/portfolio'
import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { scrollToAnim } from '../utils/scrollToAnim'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Background } from './elements/Background'
import Home from '../pages/index'
import { PortfolioScrollContext } from '../utils/PortfolioScrollContext'
import { lockMobileProjectScroll } from '../utils/lockMobileProjectScroll'
import { ProjectDismissContext } from '../utils/ProjectDismissContext'
import { ProjectTransitionContext } from '../utils/ProjectTransitionContext'
import useInitialReveal from '../utils/useInitialReveal'

export default function Layout({ children, location }: React.PropsWithChildren<{ location: { pathname: string } }>) {
  useInitialReveal()
  const router = useRouter()
  useLayoutEffect(() => {
    const entry = window.__portfolioRestore
    if (!entry) return
    const target = document.getElementById(entry.hash.slice(1))
    const y = entry.saved ? entry.saved.y : target ? Math.max(0, target.getBoundingClientRect().top + scrollY - (target.id === 'landing' ? 0 : 80)) : 0
    window.scrollTo({ left: entry.saved?.x || 0, top: y, behavior: 'instant' })
  }, [])
  useEffect(() => {
    const entry = window.__portfolioRestore
    if (!entry) return
    const frame = requestAnimationFrame(() => {
      // React has adopted the initial layout. Restore the address without
      // navigating again or asking Next.js to scroll to its hash a second time.
      history.replaceState(history.state, '', entry.url)
      delete document.documentElement.dataset.portfolioExpanded
      delete window.__portfolioRestore
    })
    return () => cancelAnimationFrame(frame)
  }, [])
  const [desktopModal, setDesktopModal] = useState(false)
  const destination = useRef<string | null>(null)
  const closingHash = useRef<string | null>(null)
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = () => setDesktopModal(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  const pathname = location.pathname.split(/[?#]/)[0]
  const isProject = pathname.startsWith('/project/')
  const [exitingProject, setExitingProject] = useState(false)
  const shell = useRef<HTMLDivElement>(null)
  const savedScroll = useRef<ScrollPosition | null>(null)
  const rememberScroll = () => { savedScroll.current = { x: window.scrollX, y: window.scrollY } }
  const blocked = isProject || exitingProject
  // Keep the lock through image loading and the complete exit animation.
  useLayoutEffect(() => {
    if (!blocked) return
    const position = savedScroll.current || { x: window.scrollX, y: window.scrollY }
    if (window.matchMedia('(max-width: 767px)').matches) {
      return lockMobileProjectScroll(position)
    }
    const layer = shell.current
    if (!layer) return
    layer.style.position = 'fixed'
    layer.style.top = `-${position.y}px`
    layer.style.left = `-${position.x}px`
    layer.style.width = '100%'
    const root = document.documentElement
    const body = document.body
    const previous = [root.style.overflow, body.style.overflow, root.style.overscrollBehavior]
    root.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    root.style.overscrollBehavior = 'none'
    return () => {
      layer.style.position = ''
      layer.style.top = ''
      layer.style.left = ''
      layer.style.width = ''
      root.style.overflow = previous[0]
      body.style.overflow = previous[1]
      root.style.overscrollBehavior = previous[2]
      window.scrollTo({ left: position.x, top: position.y, behavior: 'instant' })
      savedScroll.current = null
    }
  }, [blocked])
  useEffect(() => {
    if (!blocked) savedScroll.current = null
    if (!blocked && closingHash.current) {
      history.replaceState(history.state, '', '/' + closingHash.current)
      closingHash.current = null
    }
    if (!blocked && destination.current) {
      const target = destination.current
      destination.current = null
      scrollToAnim(false, target)
    }
  }, [blocked])
  const closeProject = (hash?: string | null) => {
    destination.current = hash || null
    closingHash.current = hash || '#projects'
    // A hash route makes Next.js run scrollIntoView during the fade. Restore the
    // address only after exit, and scroll to a menu destination after unlocking.
    router.push('/', undefined, { scroll: false })
  }
  useEffect(() => {
    if (!isProject) return
    const dismiss = (event: MouseEvent | KeyboardEvent) => {
      if ('key' in event) {
        if (event.key !== 'Escape') return
      } else {
        if (!desktopModal || (event.target as Element | null)?.closest('#project-modal')) return
      }
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]')
      const hash = link?.getAttribute('href')
      destination.current = hash && document.querySelector(hash) ? hash : null
      event.preventDefault()
      event.stopPropagation()
      closeProject(destination.current)
    }
    document.addEventListener('click', dismiss, true)
    document.addEventListener('keydown', dismiss, true)
    return () => {
      document.removeEventListener('click', dismiss, true)
      document.removeEventListener('keydown', dismiss, true)
    }
  }, [isProject, desktopModal, router])
  const portfolio = pathname === '/' || isProject || exitingProject
  return <ProjectDismissContext.Provider value={closeProject}><PortfolioScrollContext.Provider value={rememberScroll}>
    <div ref={shell} data-portfolio-layer inert={blocked && !desktopModal ? true : undefined} aria-hidden={blocked && !desktopModal ? true : undefined}>
      <Background paused={blocked} />
      {portfolio ? <Home background={blocked} /> : children}
    </div>
    <AnimatePresence onExitComplete={() => setExitingProject(false)}>
      {isProject && <ProjectOverlay key={pathname} onMounted={() => setExitingProject(true)}>{children}</ProjectOverlay>}
    </AnimatePresence>
  </PortfolioScrollContext.Provider></ProjectDismissContext.Provider>
}
function ProjectOverlay({ children, onMounted }: React.PropsWithChildren<{ onMounted: () => void }>) {
  const [ready, setReady] = useState(false)
  useLayoutEffect(() => { onMounted() }, [])
  const reduced = useReducedMotion()
  const transition: Transition = { duration: reduced ? 0 : .45, ease: [.22, .61, .36, 1] }
  return <Shade initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}>
    <Modal id="project-modal">
    <ProjectTransitionContext.Provider value={() => setReady(true)}>
      <Panel id="page-transition" role="dialog" aria-modal="true" aria-label="project details"
        initial={{ opacity: .15, filter: 'blur(20px)' }}
        animate={ready ? { opacity: 1, filter: 'blur(0px)' } : { opacity: .15, filter: 'blur(20px)' }}
        exit={{ opacity: 0, filter: 'blur(20px)' }} transition={transition}>
        {children}
      </Panel>
    </ProjectTransitionContext.Provider>
    </Modal>
  </Shade>
}
const Shade = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 10;
  overflow: hidden;
  overscroll-behavior: none;
  pointer-events: none;
`
const Modal = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: auto;
  border: 1px solid rgba(157,191,210,.24);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07);
  background: rgba(0, 3, 8, .9);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  @media (min-width: 768px) {
    inset: 1rem auto;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 32px);
    max-width: calc(${props => props.theme.insetWidth} + 32px);
    border-radius: 20px;
  }
  @media (min-width: ${props => props.theme.desktop + 'px'}) {
    left: 55%;
    width: calc(90% - 32px);
  }
`
const Panel = styled(motion.div)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`
