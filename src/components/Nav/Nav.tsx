import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
// import components
import NavLogo from "./NavLogo"
import NavHamburger from "./NavHamburger"
import NavMenu from "./NavMenu"
// import store / utils
import { useStore } from "../../store/useStore"
import { useAnim_showNav } from "../../utils/animations"

// **********
// component
// **********

const Nav = () => {
  const { state } = useStore()
  // targetRef pointed at Container below
  const targetRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!targetRef.current) return
    // disables body scroll when navmenu expanded
    state.menuExpanded
      ? disableBodyScroll(targetRef.current)
      : enableBodyScroll(targetRef.current)
    const target = targetRef.current
    return () => enableBodyScroll(target)
  }, [state.menuExpanded])

  // navigation animations
  useAnim_showNav(state)

  return (
    <Container
      className="nav-bar"
      aria-label="main navigation"
      navVisible={state.navVisible}
      menuExpanded={state.menuExpanded}
      tabIndex={-1}
      ref={targetRef}
    >
      <NavGrid>
        <NavLogo />
        <NavHamburger />
        <NavMenu />
      </NavGrid>
    </Container>
  )
}
export default React.memo(Nav)

// **********
// styles
// **********

const Container = styled.nav<{ navVisible: boolean; menuExpanded: boolean }>`
  will-change: opacity;
  position: fixed;
  z-index: 1;
  top: 0;
  height: ${props => (props.menuExpanded ? "100%" : "80px")};
  width: 100%;
  border-bottom: solid 1px hsla(0, 0%, 8%, 1);
  overflow-x: hidden;
  overflow-y: ${props => (props.menuExpanded ? "auto" : "hidden")};

  background: ${props => props.theme.appBgDark};
  transition: height 0.3s, opacity 0.3s ease, visibility 0s ${props => (props.navVisible ? "0s" : "0.3s")};
  visibility: ${props => (props.navVisible ? "visible" : "hidden")};
  pointer-events: ${props => (props.navVisible ? "auto" : "none")};
  /* showNav animation */
  opacity: ${props => (props.navVisible ? "1" : "0")};
  @media (min-width: ${props => props.theme.tablet + "px"}) {
    background: hsla(${props => props.theme.appBgDarkPartial}, 0.9);
  }
  @media (min-width: ${props => props.theme.desktop + "px"}) {
    height: 100%;
    width: 10%;
    overflow-y: auto;

    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    box-shadow: 0px 0px 10px 0px ${props => props.theme.appShadowWhite};
  }
`
const NavGrid = styled.div`
  height: 100%;
  max-width: ${props => props.theme.insetWidth};
  padding: 0 24px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 80px auto 80px;
  justify-content: space-between;
  align-items: center;

  -webkit-overflow-scrolling: touch;
  @media (min-width: ${props => props.theme.desktop + "px"}) {
    padding: 0;
    justify-items: center;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 144px auto 144px;
    justify-content: center;
    grid-row-gap: 30px;
  }
`
