import styled from "styled-components";
export const Layout = styled.section`
  position: relative;
  width: calc(100% - 112px);
  max-width: 1320px;
  margin: 0 auto;
  padding: 110px 0;
  scroll-margin-top: 90px;
  border-top: 1px solid #9bbfc21c;
  transition:
    opacity 600ms ease,
    translate 600ms ease;
  &[data-reveal="waiting"] {
    opacity: 0;
    translate: 0 24px;
  }
  &[data-reveal="visible"] {
    opacity: 1;
    translate: 0;
  }
  @media (max-width: 1000px) {
    width: calc(100% - 64px);
    padding: 80px 0;
  }
  @media (max-width: 767px) {
    width: calc(100% - 40px);
    padding: 64px 0;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &[data-reveal] {
      opacity: 1;
      translate: none;
    }
  }
`;
export const Header = styled.h2`
  position: relative;
  font-size: clamp(36px, 4.5vw, 64px);
  line-height: 1.1;
  letter-spacing: -0.055em;
  font-weight: 400;
  color: #eef5f4;
  margin-bottom: 44px;
  &::before {
    display: block;
    margin-bottom: 24px;
    font:
      10px ui-monospace,
      monospace;
    letter-spacing: 0.16em;
    color: #50e3c2;
  }
  #projects &::before {
    content: "01 / SELECTED WORK";
  }
  #about &::before {
    content: "02 / A LITTLE ABOUT ME";
  }
  #contact &::before {
    content: "03 / START A CONVERSATION";
  }
  @media (max-width: 767px) {
    margin-bottom: 32px;
  }
`;
export const Body = styled.div`
  position: relative;
`;
