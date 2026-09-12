import { useEffect, useRef } from 'react'
import styled from 'styled-components'

export default function ParticleDust({ paused = false }) {
  const canvasRef = useRef(null)
  const pausedRef = useRef(paused)
  const playback = useRef(() => {})
  useEffect(() => {
    pausedRef.current = paused
    playback.current()
  }, [paused])
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0, height = 0, frame = 0, previous = 0
    let particles = []
    // Small cached sprites keep gradients and blur work out of the animation loop.
    const sprites = ['80,227,194', '105,129,255', '180,222,218'].map(color => {
      const sprite = document.createElement('canvas')
      sprite.width = sprite.height = 32
      const brush = sprite.getContext('2d')
      const glow = brush.createRadialGradient(16, 16, 0, 16, 16, 16)
      glow.addColorStop(0, `rgba(${color},.9)`)
      glow.addColorStop(.12, `rgba(${color},.65)`)
      glow.addColorStop(.3, `rgba(${color},.16)`)
      glow.addColorStop(1, `rgba(${color},0)`)
      brush.fillStyle = glow
      brush.fillRect(0, 0, 32, 32)
      return sprite
    })
    const draw = delta => {
      context.clearRect(0, 0, width, height)
      particles.forEach(particle => {
        particle.phase += delta * .22
        particle.x += (particle.speed * .25 + Math.sin(particle.phase) * 1.4) * delta
        particle.y -= particle.speed * delta
        if (particle.y < -20) particle.y = height + 20
        if (particle.x > width + 20) particle.x = -20
        if (particle.x < -20) particle.x = width + 20
        context.globalAlpha = particle.opacity
        context.drawImage(sprites[particle.color], particle.x, particle.y, particle.size, particle.size)
      })
      context.globalAlpha = 1
    }
    const tick = now => {
      frame = requestAnimationFrame(tick)
      if (!previous) previous = now
      const elapsed = now - previous
      if (elapsed < 1000 / 30) return
      previous = now
      draw(Math.min(elapsed / 1000, .1))
    }
    const updatePlayback = () => {
      cancelAnimationFrame(frame)
      previous = 0
      const active = !pausedRef.current && !document.hidden && !reduced.matches
      canvas.dataset.motion = active ? 'running' : 'paused'
      if (active) frame = requestAnimationFrame(tick)
    }
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const count = Math.min(64, Math.max(18, Math.round(width * height / 22000)))
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width, y: Math.random() * height,
        size: 6 + Math.random() * 12, opacity: .24 + Math.random() * .42,
        speed: 3 + Math.random() * 5, phase: Math.random() * Math.PI * 2,
        color: index % sprites.length
      }))
      draw(0)
    }
    playback.current = updatePlayback
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()
    updatePlayback()
    document.addEventListener('visibilitychange', updatePlayback)
    reduced.addEventListener('change', updatePlayback)
    return () => {
      playback.current = () => {}
      observer.disconnect()
      cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', updatePlayback)
      reduced.removeEventListener('change', updatePlayback)
    }
  }, [])
  return <Canvas ref={canvasRef} className="particle-dust" aria-hidden="true" />
}
const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`
