import styled from "styled-components";
import Img from "./PortfolioImage";
import { InternalLink } from "./elements/CustomLink";
import { Layout, Header } from "../styles/elements";
export default function About() {
  return (
    <Section id="about">
      <div className="about-copy">
        <Header>
          A developer’s mind.
          <br />A designer’s eye.
        </Header>
        <p className="lead">Hey, I’m Zak.</p>
        <p>
          I’m a front-end developer based in New York City. I care about the
          space where design and code meet: the thoughtful details that turn a
          functional website into a satisfying experience.
        </p>
        <p>
          From the first impression to the smallest interaction, I like things
          to feel clear, considered, and easy to use.
        </p>
        <InternalLink href="contact" className="about-link">
          A good project starts with a conversation <span>↗</span>
        </InternalLink>
      </div>
      <div className="portrait">
        <Img
          className="photo"
          src="/assets/selfie-tinted.png"
          title="Zak Williams"
          alt="Zak Williams, front-end developer based in New York"
        />
        <div className="portrait-note">
          <span>ZAK WILLIAMS</span>
          <span>
            NEW YORK, NY <i>↗</i>
          </span>
        </div>
      </div>
      <div className="approach">
        <div>
          <span>01</span>
          <h3>Clarity comes first.</h3>
          <p>Simple navigation, useful content, and a clear next step.</p>
        </div>
        <div>
          <span>02</span>
          <h3>Details do the work.</h3>
          <p>Type, spacing, and motion that feel intentional.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Built for real use.</h3>
          <p>Responsive interfaces that work across screens.</p>
        </div>
      </div>
    </Section>
  );
}
const Section = styled(Layout)`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 64px 100px;
  .about-copy > p {
    font-size: 16px;
    color: #8ea4b0;
    line-height: 1.9;
    max-width: 550px;
    margin: 0 0 20px;
  }
  .about-copy .lead {
    font-size: 24px;
    color: #dae8e7;
    letter-spacing: -0.03em;
    margin-bottom: 16px;
  }
  .about-link {
    display: inline-flex;
    align-items: center;
    gap: 22px;
    color: #50e3c2;
    font-size: 12px;
    margin-top: 20px;
    line-height: 1.6;
  }
  .portrait {
    align-self: center;
    position: relative;
    padding: 12px;
    background: linear-gradient(135deg, #50e3c215, #415efa15);
    border: 1px solid #8daeb326;
    border-radius: 18px;
    transform: rotate(2deg);
  }
  .photo {
    position: relative;
    width: 100%;
    aspect-ratio: 4/4.4;
    border-radius: 10px;
    background: #0b1720;
  }
  .photo img {
    object-position: 75% 50%;
  }
  .portrait-note {
    display: flex;
    justify-content: space-between;
    font:
      8px ui-monospace,
      monospace;
    letter-spacing: 0.1em;
    color: #91a8b1;
    padding: 18px 8px 7px;
  }
  .portrait-note i {
    color: #50e3c2;
    font-size: 15px;
  }
  .approach {
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    padding-top: 24px;
  }
  .approach > div {
    border-top: 1px solid #9bb8c529;
    padding-top: 24px;
  }
  .approach span {
    font:
      10px ui-monospace,
      monospace;
    color: #50e3c2;
  }
  .approach h3 {
    font-size: 20px;
    font-weight: 400;
    letter-spacing: -0.03em;
    color: #dfeae8;
    margin: 22px 0 12px;
  }
  .approach p {
    font-size: 13px;
    line-height: 1.8;
    color: #849ba7;
    max-width: 270px;
  }
  @media (max-width: 1000px) {
    gap: 48px;
  }
  .portrait {
    max-width: 410px;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 40px;
    .portrait {
      width: 100%;
      max-width: 360px;
      justify-self: center;
      transform: rotate(1deg);
    }
    .approach {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .approach > div {
      display: grid;
      grid-template-columns: 24px 1fr;
      gap: 12px;
    }
    .approach h3 {
      margin: 0;
      font-size: 18px;
    }
    .approach p {
      grid-column: 2;
      max-width: none;
    }
    .approach span {
      padding-top: 4px;
    }
  }
`;
