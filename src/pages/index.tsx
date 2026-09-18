import React, { useContext, useEffect, useRef } from "react"
import styled from "styled-components"
import { useTheme } from "styled-components"
// import components
import useSectionMotion from "../utils/useSectionMotion"
import SEO from "../components/SEO"
import Nav from "../components/Nav/Nav"
import Landing from "../components/Landing"
import About from "../components/About"
import Projects from "../components/Projects/Projects"
import Contact from "../components/Contact/Contact"
// import store / utils
import { useStore, onToggleNav } from "../store/useStore"
import { useIntersectionObserver } from "../utils/useIO"
import { useWindowResize } from "../utils/useWindowResize"

// **********
// component
// **********
const App = ({ background = false }) => {
  useSectionMotion()
  // let the document know when mouse is being used
  useEffect(() => {
    const mouse = () => document.body.classList.add("using-mouse")
    const keyboard = () => document.body.classList.remove("using-mouse")
    document.body.addEventListener("mousedown", mouse)
    document.body.addEventListener("keydown", keyboard)
    return () => {
      document.body.removeEventListener("mousedown", mouse)
      document.body.removeEventListener("keydown", keyboard)
    }
  }, [])

  // grab context from theme for use in component
  const themeContext = useTheme()

  // store and util functions
  const { state, dispatch } = useStore()
  // updates state with useWindowResize
  useWindowResize(dispatch, themeContext)
  // intersection obserserver - toggles Nav
  const intersectionObserverRef = useRef<HTMLElement>(null)
  useIntersectionObserver(
    dispatch,
    state.isDesktop,
    intersectionObserverRef,
    onToggleNav
  )

  return (
    <>
      {!background && <SEO />}
      <Nav />
      <Main id="main" data-entry-reveal>
        {/* ref forwarded to div INSIDE landing component */}
        <Landing ref={intersectionObserverRef} />
        <About />
        <Projects />
        <Contact />
      </Main>
    </>
  )
}

export default App

// **********
// styles
// **********
const Main = styled.main`
  @media (min-width: ${props => props.theme.desktop + "px"}) {
    margin-left: 10%;
  }
`
