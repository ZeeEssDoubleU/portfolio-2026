import styled from 'styled-components'

export const Layout = styled.section`
  position: relative;
  display: grid;
  width: calc(100% - 32px);
  max-width: ${props => props.theme.insetWidth};
  padding: 28px 22px;
  margin: 0 auto 24px;
  scroll-margin-top: 100px;
  overflow: hidden;
  border: 1px solid rgba(157, 191, 210, .16);
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(80,227,194,.055), transparent 45%), rgba(8, 14, 22, .83);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 20px 60px rgba(0,0,0,.18);
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 28px;
    right: 28px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(80,227,194,.65), rgba(68,94,255,.5), transparent);
    pointer-events: none;
  }
  @media (min-width: ${props => props.theme.tablet + 'px'}) {
    width: calc(100% - 64px);
    padding: 48px;
    margin-bottom: 36px;
    border-radius: 28px;
  }
  /* Three bounded, static blur surfaces. No animated filters or per-row blur. */
  @media (min-width: 1025px) and (hover: hover) and (pointer: fine) {
    @supports ((backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px))) {
      background: linear-gradient(135deg, rgba(80,227,194,.045), transparent 45%), rgba(7, 13, 22, .78);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
  }
  @media (prefers-reduced-transparency: reduce), (prefers-reduced-motion: reduce) {
    background: #0a121c;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`
export const Header = styled.h2`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin: 0 0 12px;
  font-weight: 500;
  font-size: clamp(26px, 3vw, 34px);
  letter-spacing: -.035em;
  color: #ecf6f5;
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    margin-left: 8px;
    background: linear-gradient(90deg, rgba(80,227,194,.32), transparent);
  }
`
export const Body = styled.div`
  display: grid;
  padding: 24px 0;
`
