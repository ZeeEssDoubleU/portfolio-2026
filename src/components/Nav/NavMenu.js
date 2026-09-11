// @ts-nocheck
import React from "react"
import styled from "styled-components"
// import store
import { useStore } from "../../store/useStore"
// import components
import { InternalLink } from "../elements/CustomLink"

// **********
// component
// **********

const NavMenu = props => {
  const { state } = useStore()

  // TODO: add active state to menu items when section in view
  return (
    <Container menuExpanded={state.menuExpanded}>
      <InternalLink className="menu-link menu-home" href="landing">
        home
      </InternalLink>
      <InternalLink className="menu-link" href="about">
        about
      </InternalLink>
      <InternalLink className="menu-link" href="projects">
        projects
      </InternalLink>
      <InternalLink className="menu-link" href="contact">
        contact
      </InternalLink>
    </Container>
  )
}
export default React.memo(NavMenu)

// **********
// styles
// **********

const Container = styled.div`
  display: ${props => (props.menuExpanded ? "grid" : "none")};
  grid-area: ${props => (props.menuExpanded ? "2/1 / 3/3" : "inherit")};
  grid-row-gap: 60px;
  justify-items: center;
  .menu-link {
    font-size: ${props => (props.menuExpanded ? "1.5em" : "inherit")};
    color: #a4b3bf;
    text-decoration: none;
    cursor: pointer;

    transition: color 0.2s;
    font-weight: 500;
    &:focus-visible { outline: 2px solid #50e3c2; outline-offset: 8px; border-radius: 3px; }
    &:hover,
    &:active {
      color: ${props => props.theme.appGreen};
    }
    &.menu-home {
      display: ${props => (props.menuExpanded ? "inherit" : "none")};
    }
  }
  /* NavMenu tablet and bigger */
  @media (min-width: ${props => props.theme.tablet + "px"}) {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 30px;
  }
  /* NavMenu tablet and bigger */
  @media (min-width: ${props => props.theme.desktop + "px"}) {
    display: grid;
    grid-area: 2/1 / 3/2;
    grid-template-columns: auto;
    align-self: start;
    .menu-link {
      opacity: 1;
      &.menu-home {
        display: inherit;
      }
    }
  }
`
