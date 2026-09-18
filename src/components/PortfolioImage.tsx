interface PortfolioImageProps {
  src: string; alt: string; title?: string; className?: string
  blurDataURL?: string; synchronized?: boolean; onReady?: () => void
}
import { useState } from 'react'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import placeholders from '../data/image-placeholders.json'

export default function PortfolioImage(props: PortfolioImageProps) {
  return <LoadingImage key={props.src} {...props} />
}

function LoadingImage({ src, alt, title, className, blurDataURL, synchronized = false, onReady }: PortfolioImageProps) {
  const [status, setStatus] = useState('loading')
  return <Frame className={className} data-image-state={status} data-synchronized={synchronized}>
    <Placeholder aria-hidden="true" style={{ backgroundImage: `url("${blurDataURL || (placeholders as Record<string, string>)[src] || ''}")` }} />
    <Image src={src} alt={alt} title={title} fill
      sizes="(min-width: 1024px) 30vw, 100vw"
      onLoad={async event => {
        const img = event.currentTarget
        try { await img.decode() } catch { /* onLoad already confirms a usable image */ }
        requestAnimationFrame(() => requestAnimationFrame(() => { setStatus('loaded'); onReady?.() }))
      }}
      onError={() => { setStatus('error'); onReady?.() }}
    />
  </Frame>
}

const breathe = keyframes`
  from { opacity: .6; }
  to { opacity: 1; }
`
const Frame = styled.div`
  overflow: hidden;
  isolation: isolate;
  > img {
    object-fit: cover;
    opacity: 0;
    filter: blur(14px);
    transition: opacity 600ms ease, filter 600ms ease;
  }
  &[data-image-state='loaded'] > img { opacity: 1; filter: blur(0); }
  &[data-image-state='loaded'] > div { opacity: 0; }
  &[data-image-state='loading'] > div { animation: ${breathe} 1.4s ease-in-out infinite alternate; }
  &[data-synchronized='true'] > img, &[data-synchronized='true'] > div { transition: none; }
  &[data-entry-image] > img, &[data-entry-image] > div { transition: none; }
  @media (prefers-reduced-motion: reduce) {
    > img, > div { transition: none; }
    > div { animation: none !important; }
  }
`
const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(12px);
  transform: scale(1.06);
  transition: opacity 600ms ease;
  pointer-events: none;
`
