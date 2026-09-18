import { forwardRef, memo } from "react";
import styled, { keyframes } from "styled-components";
import Logo from "./Icons/logo-landing";
import { InternalLink } from "./elements/CustomLink";

const Landing = memo(
  forwardRef<HTMLElement>((props, ref) => (
    <Hero ref={ref} id="landing">
      <div className="hero-copy" data-entry-reveal>
        <p className="eyebrow">
          <span /> ZACHARY WILLIAMS / WEB DEVELOPER
        </p>
        <h1>
          Made with
          <br />
          <em>intention.</em>
        </h1>
        <p className="intro">
          Thoughtful design. Fluid interactions.
          <br />
          Web experiences that feel as good as they look.
        </p>
        <div className="hero-actions">
          <InternalLink href="projects" className="primary-link">
            Explore my work <span aria-hidden="true">↗</span>
          </InternalLink>
          <InternalLink href="contact" className="text-link">
            Let’s talk <span aria-hidden="true">↗</span>
          </InternalLink>
        </div>
      </div>
      <div className="hero-art">
        <div className="orbital-system" data-entry-reveal aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="orbital-label">DESIGN × DEVELOPMENT</span>
        </div>
        <Logo markOnly className="hero-logo" />
        <span className="art-caption" data-entry-reveal>
          the details make the difference.
        </span>
      </div>
      <div className="hero-bottom" data-entry-reveal>
        <span>
          <i /> Based in New York City
        </span>
        <span className="hero-principle">
          A little curiosity. A lot of craft.
        </span>
        <InternalLink href="projects" className="scroll-cue">
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </InternalLink>
      </div>
    </Hero>
  )),
);
export default Landing;
const orbit = keyframes`to { transform: rotate(360deg); }`;
const Hero = styled.section`
  position: relative;
  width: calc(100% - 112px);
  max-width: 1320px;
  min-height: min(960px, 100svh);
  margin: auto;
  padding: 142px 0 128px;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  align-items: center;
  gap: 40px;
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #a0b7be;
    font:
      10px ui-monospace,
      monospace;
    letter-spacing: 0.14em;
  }
  .eyebrow span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #50e3c2;
    box-shadow: 0 0 12px #50e3c255;
  }
  h1 {
    margin: 30px 0 25px;
    font-size: clamp(64px, 7.6vw, 108px);
    line-height: 1.02;
    font-weight: 500;
    letter-spacing: -0.075em;
    color: #f0f5f3;
  }
  h1 em {
    font-style: normal;
    background: linear-gradient(105deg, #50e3c2 5%, #83c9e2 55%, #7c8dfb);
    color: transparent;
    background-clip: text;
  }
  .intro {
    color: #a5b3bb;
    font-size: clamp(16px, 1.5vw, 19px);
    line-height: 1.8;
    letter-spacing: -0.02em;
  }
  .hero-actions {
    display: flex;
    gap: 30px;
    align-items: center;
    margin-top: 34px;
  }
  .primary-link {
    display: inline-flex;
    align-items: center;
    gap: 32px;
    padding: 17px 23px;
    border-radius: 8px;
    background: #50e3c2;
    color: #05221c;
    font-size: 14px;
    font-weight: 600;
    transition:
      background 0.2s,
      transform 0.2s;
  }
  .primary-link:hover {
    background: #8bf0d9;
    transform: translateY(-3px);
  }
  .text-link {
    color: #d7e5e4;
    font-size: 14px;
    border-bottom: 1px solid #5c767155;
    padding: 12px 0;
  }
  .text-link span {
    margin-left: 14px;
    color: #50e3c2;
  }
  .hero-art {
    position: relative;
    width: 100%;
    max-width: clamp(280px, calc(100svh - 300px), 520px);
    justify-self: center;
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    isolation: isolate;
  }
  .hero-art::before {
    content: "";
    position: absolute;
    inset: 10%;
    z-index: -1;
    background: radial-gradient(ellipse, #415efa14, transparent 70%);
  }
  .hero-logo {
    width: 64%;
    height: auto;
    position: relative;
    z-index: 1;
  }
  .orbital-system {
    position: absolute;
    inset: 0;
  }
  .orbit {
    position: absolute;
    inset: 2%;
    border: 1px solid #79aab61c;
    border-radius: 50%;
    animation: ${orbit} 55s linear infinite;
  }
  .orbit::after {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    background: #50e3c2;
    box-shadow: 0 0 14px #50e3c270;
    border-radius: 50%;
    left: 50%;
    top: -3px;
  }
  .orbit-two {
    inset: 12%;
    border-style: dashed;
    border-color: #718bed22;
    animation-direction: reverse;
    animation-duration: 75s;
  }
  .orbit-two::after {
    background: #718bed;
    width: 4px;
    height: 4px;
  }
  .orbital-label {
    position: absolute;
    right: -6%;
    top: 50%;
    font:
      9px ui-monospace,
      monospace;
    letter-spacing: 0.18em;
    color: #6e8894;
    transform: rotate(90deg);
  }
  .art-caption {
    position: absolute;
    bottom: -22px;
    color: #80949d;
    font:
      11px ui-monospace,
      monospace;
    letter-spacing: 0.02em;
  }
  .hero-bottom {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    border-top: 1px solid #98b7c01c;
    padding-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #8a9da5;
    font-size: 11px;
  }
  .hero-bottom i {
    display: inline-block;
    width: 5px;
    height: 5px;
    background: #50e3c2;
    border-radius: 50%;
    margin-right: 8px;
  }
  .hero-principle {
    color: #5e737e;
  }
  .scroll-cue {
    color: #b3c4ca;
    font:
      9px ui-monospace,
      monospace;
    letter-spacing: 0.1em;
  }
  .scroll-cue span {
    color: #50e3c2;
    margin-left: 24px;
    font-size: 18px;
  }
  @media (min-width: 1600px) {
    min-height: 900px;
  }
  @media (max-width: 1000px) {
    width: calc(100% - 64px);
    gap: 16px;
    h1 {
      font-size: clamp(62px, 8vw, 84px);
    }
    .orbital-label {
      display: none;
    }
  }
  @media (max-width: 767px) {
    width: calc(100% - 40px);
    min-height: 100svh;
    padding: 104px 0 104px;
    grid-template-columns: 1fr;
    gap: 44px;
    .hero-copy {
      order: 1;
    }
    .hero-art {
      order: 0;
      width: 210px;
      max-width: none;
      justify-self: center;
    }
    .hero-logo {
      width: 70%;
    }
    h1 {
      font-size: clamp(56px, 13vw, 80px);
      margin: 20px 0;
    }
    .eyebrow {
      font-size: 8px;
      letter-spacing: 0.12em;
    }
    .intro {
      font-size: 16px;
    }
    .art-caption,
    .orbital-label {
      display: none;
    }
    .hero-actions {
      gap: 24px;
      margin-top: 26px;
    }
    .primary-link {
      padding: 16px 18px;
      gap: 22px;
    }
    .hero-bottom {
      bottom: 22px;
      padding-top: 18px;
    }
    .hero-principle {
      display: none;
    }
    .scroll-cue {
      font-size: 8px;
      letter-spacing: 0;
    }
    .scroll-cue span {
      margin-left: 12px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .orbit {
      animation: none;
    }
    .primary-link:hover {
      transform: none;
    }
  }
`;
