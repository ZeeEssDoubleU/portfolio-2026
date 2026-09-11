import React, { useLayoutEffect, useRef } from "react"
import styled from "styled-components"
import { gsap } from "gsap"
// import store
import { useStore, onToggleMenu } from "../../store/useStore" // import store / utils

// **********
// component
// **********

const NavHamburger = props => {
  const { state, dispatch } = useStore()

  const top = useRef(null)
  const middle = useRef(null)
  const bottom = useRef(null)
  const tl = useRef(null)

  // componentDidMount.  Assign new timeline to tl
  // prevents re-initialization of timeline on re-renders
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.set(top.current, { y: 0, yPercent: -400, rotation: 0 })
      gsap.set(bottom.current, { y: 0, yPercent: 400, rotation: 0 })
      tl.current = gsap.timeline({ paused: true, defaults: { ease: 'power1.out' } })
        .to([top.current, bottom.current], { duration: 0.2, yPercent: 0 }, 0)
        .to(middle.current, { duration: 0.01, autoAlpha: 0 }, 0.2)
        .to(top.current, { duration: 0.2, rotation: 45 }, 0.2)
        .to(bottom.current, { duration: 0.2, rotation: -45 }, 0.2)
    })
    return () => context.revert()
  }, [])

  // componentDidUpdate.  Play/reverse timeline
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      tl.current.progress(state.menuExpanded ? 1 : 0).pause()
    } else {
      state.menuExpanded ? tl.current.play() : tl.current.reverse()
    }
  }, [state.menuExpanded])

  // // DEBUG
  // console.log("timeline", tl)

  return (
    <Container
      className="nav-hamburger"
      aria-expanded={state.menuExpanded}
      aria-label={!state.menuExpanded ? "open nav menu" : "close nav menu"}
      onClick={() => onToggleMenu(dispatch, !state.menuExpanded)}
    >
      <Inner>
        {/* bars of hamburger */}
        <Top ref={top} />
        <Middle ref={middle} />
        <Bottom ref={bottom} />
      </Inner>
    </Container>
  )
}
export default React.memo(NavHamburger)

// **********
// styles
// **********

// variables for quick customization of hamburger
const hamVars = {}
hamVars.layerHeight = 2
hamVars.layerSpacing = 3 * hamVars.layerHeight
hamVars.layerWidth = 25
hamVars.layerRadius = 4

const Container = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  @media (min-width: ${props => props.theme.tablet + "px"}) {
    display: none;
  }
`
// sizing of hamburger
const Inner = styled.div`
  position: relative;
  width: ${hamVars.layerWidth}px;
  height: ${2 * hamVars.layerSpacing + 3 * hamVars.layerHeight}px;
  transition: transform 0.2s, opacity 0.2s;
  will-change: transform;
  @media (hover: hover) and (pointer: fine) {
    &:hover { opacity: 0.7; transform: scale(1.2); }
  }
`
// shape of each hamburger bar
const Shape = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: ${hamVars.layerHeight}px;
  background: ${props => props.theme.appBlueGreen};
  border: none;
  border-radius: ${hamVars.layerRadius}px;
`
const Top = styled(Shape)`
  top: calc(50% - ${hamVars.layerHeight / 2}px);
  transform: translateY(-400%);
`
const Middle = styled(Shape)`
  top: calc(50% - ${hamVars.layerHeight / 2}px);
`
const Bottom = styled(Shape)`
  top: calc(50% - ${hamVars.layerHeight / 2}px);
  transform: translateY(400%);
`
