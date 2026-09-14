import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

// Transform-only ambient motion: no animation loop, canvas or moving blur filters.
export default function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const visibility = () => {
      if (ref.current) ref.current.style.animationPlayState = document.hidden || media.matches ? 'paused' : 'running'
    }
    visibility()
    document.addEventListener('visibilitychange', visibility)
    media.addEventListener('change', visibility)
    return () => {
      document.removeEventListener('visibilitychange', visibility)
      media.removeEventListener('change', visibility)
    }
  }, [])
  return <Lights ref={ref} aria-hidden="true"><span /><span /></Lights>
}
const drift = keyframes`
  from { transform: translate3d(-2%, -1%, 0) rotate(-4deg); }
  to { transform: translate3d(2%, 2%, 0) rotate(4deg); }
`
const Lights = styled.div`
  position: absolute;
  inset: -12%;
  pointer-events: none;
  overflow: hidden;
  animation: ${drift} 24s ease-in-out infinite alternate;
  span {
    position: absolute;
    width: 70%;
    aspect-ratio: 1;
    left: -10%;
    top: -10%;
    background: radial-gradient(ellipse, rgba(80,227,194,.12), transparent 65%);
  }
  span + span {
    left: auto;
    top: auto;
    right: -10%;
    bottom: -15%;
    background: radial-gradient(ellipse, rgba(68,94,255,.18), transparent 65%);
  }
  @media (prefers-reduced-motion: reduce) { animation: none; }
`
