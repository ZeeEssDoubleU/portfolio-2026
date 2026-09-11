import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { scrollToAnim } from '../utils/scrollToAnim'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Background } from './elements/Background'
import Home from '../pages/index'
import { PortfolioScrollContext } from '../utils/PortfolioScrollContext'
import { ProjectTransitionContext } from '../utils/ProjectTransitionContext'

export default function Layout({ children, location }) {
  const router = useRouter()
  const [desktopModal, setDesktopModal] = useState(false)
  const destination = useRef(null)
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
  const shell = useRef(null)
  const savedScroll = useRef(null)
  const rememberScroll = () => { savedScroll.current = { x: window.scrollX, y: window.scrollY } }
  const blocked = isProject || exitingProject
  // Lock the document for the entire overlay lifetime, including image loading
  // and the exit animation. Freeze the portfolio at its captured viewport offset,
  // then restore document scrolling only after the overlay has disappeared.
  useLayoutEffect(() => {
    if (!blocked) return
    const position = savedScroll.current || { x: window.scrollX, y: window.scrollY }
    const layer = shell.current
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
    if (!blocked && destination.current) {
      const target = destination.current
      destination.current = null
      scrollToAnim(false, target)
    }
  }, [blocked])
  useEffect(() => {
    if (!isProject) return
    const dismiss = event => {
      if (event.type === 'keydown') {
        if (event.key !== 'Escape') return
      } else {
        if (!desktopModal || event.target.closest('#project-modal')) return
      }
      const link = event.target.closest?.('a[href^="#"]')
      const hash = link?.getAttribute('href')
      destination.current = hash && document.querySelector(hash) ? hash : null
      event.preventDefault()
      event.stopPropagation()
      router.push('/' + (destination.current || '#projects'), undefined, { scroll: false })
    }
    document.addEventListener('click', dismiss, true)
    document.addEventListener('keydown', dismiss, true)
    return () => {
      document.removeEventListener('click', dismiss, true)
      document.removeEventListener('keydown', dismiss, true)
    }
  }, [isProject, desktopModal, router])
  const portfolio = pathname === '/' || isProject || exitingProject
  return <PortfolioScrollContext.Provider value={rememberScroll}>
    <div ref={shell} data-portfolio-layer inert={blocked && !desktopModal ? true : undefined} aria-hidden={blocked && !desktopModal ? true : undefined}>
      <Background />
      {portfolio ? <Home background={blocked} /> : children}
    </div>
    <AnimatePresence onExitComplete={() => setExitingProject(false)}>
      {isProject && <ProjectOverlay key={pathname} onMounted={() => setExitingProject(true)}>{children}</ProjectOverlay>}
    </AnimatePresence>
  </PortfolioScrollContext.Provider>
}
function ProjectOverlay({ children, onMounted }) {
  const [ready, setReady] = useState(false)
  useLayoutEffect(() => { onMounted() }, [])
  const reduced = useReducedMotion()
  const transition = { duration: reduced ? 0 : .45, ease: [.22, .61, .36, 1] }
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
  background: rgba(0, 3, 8, .9);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  @media (min-width: 768px) {
    inset: 1rem auto;
    left: 12.5%;
    width: 75%;
    border-radius: 20px;
  }
`
const Panel = styled(motion.div)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`
