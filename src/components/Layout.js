import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Background } from './elements/Background'
import Home from '../pages/index'
import { ProjectTransitionContext } from '../utils/ProjectTransitionContext'

export default function Layout({ children, location }) {
  const pathname = location.pathname.split(/[?#]/)[0]
  const isProject = pathname.startsWith('/project/')
  const [exitingProject, setExitingProject] = useState(false)
  const blocked = isProject || exitingProject
  const portfolio = pathname === '/' || isProject || exitingProject
  return <>
    <div inert={blocked ? true : undefined} aria-hidden={blocked ? true : undefined}>
      <Background />
      {portfolio ? <Home background={blocked} /> : children}
    </div>
    <AnimatePresence onExitComplete={() => setExitingProject(false)}>
      {isProject && <ProjectOverlay key={pathname} onEntered={() => setExitingProject(true)}>{children}</ProjectOverlay>}
    </AnimatePresence>
  </>
}
function ProjectOverlay({ children, onEntered }) {
  const [ready, setReady] = useState(false)
  const reduced = useReducedMotion()
  const transition = { duration: reduced ? 0 : .45, ease: [.22, .61, .36, 1] }
  return <Shade initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition}>
    <ProjectTransitionContext.Provider value={() => setReady(true)}>
      <Panel id="page-transition" role="dialog" aria-modal="true" aria-label="project details"
        initial={{ opacity: .15, filter: 'blur(20px)' }}
        animate={ready ? { opacity: 1, filter: 'blur(0px)' } : { opacity: .15, filter: 'blur(20px)' }}
        exit={{ opacity: 0, filter: 'blur(20px)' }} transition={transition}
        onAnimationComplete={() => { if (ready) onEntered() }}>
        {children}
      </Panel>
    </ProjectTransitionContext.Provider>
  </Shade>
}
const Shade = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 10;
  background: rgba(0, 3, 8, .9);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
`
const Panel = styled(motion.div)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`
