import React, { forwardRef, memo } from 'react'
import styled from 'styled-components'
const Landing = memo(forwardRef<HTMLElement>((props, ref) => <Section ref={ref} id="landing" />))
export default Landing
const Section = styled.section`
  height: 100vh;
  height: 100svh;
  width: 100%;
`
