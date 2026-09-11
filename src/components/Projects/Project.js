import React, { useContext } from 'react'
import { PortfolioScrollContext } from '../../utils/PortfolioScrollContext'
import styled from 'styled-components'
import Link from 'next/link'
import PortfolioImage from '../PortfolioImage'

export default function Project({ className, title, description, slug, index, image, tech }) {
  const rememberScroll = useContext(PortfolioScrollContext)
  return <Row onNavigate={rememberScroll} scroll={false} className={className} href={`/project/${slug}/`} aria-label={`show ${title} project info panel`}>
    <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    <Thumbnail src={image.src} alt="" />
    <span className="project-copy">
      <span className="project-title">{title}</span>
      <span className="project-description">{description}</span>
      <span className="project-tech">{tech.slice(0,3).map(item => <span key={item}>{item}</span>)}</span>
    </span>
    <span className="project-arrow" aria-hidden="true">↗</span>
  </Row>
}
const Row = styled(Link)`
  position: relative;
  display: grid;
  grid-template-columns: 24px 96px minmax(0, 1fr) 32px;
  gap: 16px;
  align-items: center;
  padding: 24px 16px;
  margin: 2px -16px;
  border: 1px solid transparent;
  border-bottom-color: rgba(160,190,210,.1);
  border-radius: 12px;
  color: #ecf6f5;
  text-decoration: none;
  cursor: pointer;
  isolation: isolate;
  transition: border-color 180ms ease, color 180ms ease;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background: linear-gradient(105deg, rgba(80,227,194,.12), rgba(68,94,255,.06));
    opacity: 0;
    transition: opacity 180ms ease;
  }
  .project-tech { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px; }
  .project-tech > span { font-size: 10px; color: #91aaaF; border: 1px solid rgba(145,170,175,.16); border-radius: 20px; padding: 3px 8px; }
  .project-number { font-size: 13px; color: #788d9d; font-variant-numeric: tabular-nums; }
  .project-copy { display: grid; gap: 8px; }
  .project-title { font-size: 19px; font-weight: 500; letter-spacing: -.025em; }
  .project-description { font-size: 14px; line-height: 1.65; color: #a4b3bf; }
  .project-arrow { font-size: 24px; color: #788d9d; justify-self: end; transition: transform 180ms ease, color 180ms ease; }
  &:hover, &:focus-visible {
    color: #50e3c2;
    border-color: rgba(80,227,194,.23);
    &::before { opacity: 1; }
    .project-arrow { color: #50e3c2; transform: translate(2px, -2px); }
  }
  &:focus-visible { outline: 2px solid #50e3c2; outline-offset: 3px; }
  @media (max-width: 767px) {
    grid-template-columns: minmax(0, 1fr) 24px;
    padding: 20px 12px;
    margin-inline: -12px;
    gap: 10px;
    .project-number { display: none; }
    .project-title { font-size: 18px; }
  }
`

const Thumbnail = styled(PortfolioImage)`
  position: relative;
  width: 96px;
  height: 76px;
  border-radius: 10px;
  border: 1px solid rgba(160,190,210,.15);
  transition: transform 250ms ease;
  img { object-position: top; }
  ${Row}:hover &, ${Row}:focus-visible & { transform: translateY(-3px) rotate(-2deg); }
  @media (max-width: 767px) { display: none; }
  @media (prefers-reduced-motion: reduce) { transition: none; ${Row}:hover & { transform: none; } }
`
