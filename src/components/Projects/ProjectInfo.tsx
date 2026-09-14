import type { ProjectData } from '../../types/portfolio'
import React, { useContext } from "react"
import styled from "styled-components"
import Img from "../PortfolioImage"
// import components
import { Wrapper } from "../elements/StyledButton"
import { ExternalLink } from "../elements/CustomLink"
import Footer from "./ProjectInfoFooter"
import { ProjectTransitionContext } from "../../utils/ProjectTransitionContext"
// TODO: Import icons for tech stack
// import Icon from "../Icons/Icon"

// **********
// component
// **********

const ProjectInfo = (props: ProjectData) => {
  const onImageReady = useContext(ProjectTransitionContext)

  return (
    <Container>
      <Main className="project-info" tabIndex={0} aria-label="scroll project details">
      <Thumbnail
        synchronized
        onReady={onImageReady}
        title={`${props.title} thumbnail`}
        src={props.image.src}
        alt={`preview image of ${props.title} project`}
      />

        <Grid>
          <Header>
            <h1 className="project-info-title">{props.title}</h1>
            <p className="project-summary">{props.description}</p>
          </Header>
          <Links>
            <ExternalLink
              href={props.projectLink}
              aria-label={`external link to ${props.title} project`}
            >
              <ViewProject>view project</ViewProject>
            </ExternalLink>
            <ExternalLink
              href={props.codeLink}
              aria-label={`external link to ${props.title}'s Github repository`}
            >
              <ViewCode>view code</ViewCode>
            </ExternalLink>
          </Links>
          {props.moreInfo && <Overview>
            <h2>the project</h2>
            <p>{props.moreInfo}</p>
          </Overview>}
          <Details>
            <DetailSection>
              <h2>features</h2>
              <ul className="feature-list">{props.features.map(feature => <li key={feature}>
                <span className="feature-check" aria-hidden="true">✓</span>
                <span>{feature}</span>
              </li>)}</ul>
            </DetailSection>
            <DetailSection>
              <h2>development tools</h2>
              <ul className="tool-list">{props.tech.map(tool => <li key={tool}>{tool}</li>)}</ul>
            </DetailSection>
          </Details>
        </Grid>
      </Main>
      <Footer title={props.title} />
    </Container>
  )
}
export default ProjectInfo

// **********
// styles
// **********

const Container = styled.div`
  height: 100%;
  width: 100%;

  font-size: 16px;
  line-height: 1.5;
  color: ${props => props.theme.appTextWhiteM};
  background: transparent;
  @media (min-width: ${props => props.theme.tablet + "px"}) {
    padding-top: 24px;
  }
`
const Thumbnail = styled(Img)`
  position: absolute;
  top: 16px;
  left: 16px;
  width: calc(100% - 32px);
  height: calc(100vw - 32px);
  max-height: calc(100% - 86px);
  border: 1px solid rgba(80, 227, 194, .24);
  border-radius: 16px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07);
  /* Fade the full frame, including its border and loading placeholder, with
     eased opacity stops so there is no hard seam beneath the screenshot. */
  mask-image: linear-gradient(to bottom,
    black 0%, black 38%, rgba(0,0,0,.96) 48%,
    rgba(0,0,0,.84) 58%, rgba(0,0,0,.65) 68%,
    rgba(0,0,0,.38) 78%, rgba(0,0,0,.14) 88%,
    rgba(0,0,0,.025) 96%, transparent 100%);
  img {
    object-fit: cover;
    object-position: 0% 0% !important;
    transform-origin: 0% 0%;
  }
  background: transparent;
  @media (min-width: ${props => props.theme.tablet + "px"}) {
    left: 50%;
    transform: translateX(-50%);
    width: 30vw;
    height: 30vw;
    margin: 0 auto;
  }
`
const Main = styled.main`
  position: absolute;
  top: 0;
  height: calc(100% - 70px);
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  overflow: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; width: 0; height: 0; }
  &:focus-visible { outline: 1px solid rgba(80,227,194,.35); outline-offset: -4px; }
  overscroll-behavior: contain;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 3%,
    black 97%,
    transparent 100%
  );
  h1,
  h3,
  h4 {
    color: ${props => props.theme.appTextWhiteL};
  }
  @media (min-width: ${props => props.theme.tablet + "px"}) {
    left: 50%;
    transform: translateX(-50%);
  }
`
const Grid = styled.div`
  position: absolute;
  top: 60vw;
  display: grid;
  width: 100%;
  justify-items: center;
  grid-gap: 32px;
  text-align: center;
  padding: 96px 24px 24px;
  background: linear-gradient(to bottom, transparent 0, rgba(0,3,8,.75) 216px);
  @media (min-width: ${props => props.theme.tablet + "px"}) {
    top: 30vw;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 24px 24px;
    background: linear-gradient(to bottom, transparent 0, rgba(0,3,8,.75) 72px);
  }
`
const Header = styled.header`
  max-width: 720px;
  .project-info-title {
    font-size: clamp(32px, 4vw, 46px);
    font-weight: 550;
    letter-spacing: -.045em;
    line-height: 1.15;
    margin: .5em 0 18px;
  }
  .project-summary {
    max-width: 54ch;
    margin: 0 auto;
    color: #b6c7d1;
    font-size: clamp(16px, 1.6vw, 19px);
    line-height: 1.75;
    text-wrap: pretty;
  }
`
const Overview = styled.section`
  width: 100%;
  max-width: 860px;
  text-align: left;
  padding: 28px 0 4px;
  border-top: 1px solid rgba(157,191,210,.15);
  h2 {
    color: #50e3c2;
    font-size: 13px;
    letter-spacing: .06em;
    font-weight: 500;
    margin: 0 0 14px;
  }
  p { color: #b6c7d1; line-height: 1.85; text-wrap: pretty; white-space: pre-line; }
`
const Details = styled.div`
  width: 100%;
  max-width: 860px;
  display: grid;
  gap: 20px;
  text-align: left;
  padding-bottom: 28px;
  @media (min-width: 900px) { grid-template-columns: 1.3fr 1fr; }
`
const DetailSection = styled.section`
  padding: clamp(20px, 3vw, 28px);
  border: 1px solid rgba(157,191,210,.14);
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(80,227,194,.04), rgba(68,94,255,.025));
  h2 { margin: 0 0 20px; color: #e2eeef; font-size: 17px; font-weight: 500; letter-spacing: -.02em; }
  ul { list-style: none; padding: 0; margin: 0; }
  .feature-list { display: grid; gap: 14px; }
  .feature-list li { display: grid; grid-template-columns: 20px 1fr; gap: 10px; color: #b6c7d1; font-size: 15px; line-height: 1.7; }
  .feature-check { color: #50e3c2; font-size: 14px; }
  .tool-list { display: flex; flex-wrap: wrap; gap: 8px; }
  .tool-list li {
    padding: 7px 12px;
    border: 1px solid rgba(80,227,194,.17);
    border-radius: 24px;
    background: rgba(80,227,194,.035);
    color: #b9d9d4;
    font-size: 13px;
    line-height: 1.5;
  }
`
const Links = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0 0 12px;
  a { text-decoration: none; }
`
const ViewProject = styled(Wrapper).attrs({ as: "span" })`
  display: block;
  min-width: 148px;
  padding: 16px 22px;
  white-space: nowrap;
  border-radius: 12px;
`
const ViewCode = styled(ViewProject)`
  background: transparent;
  border-color: rgba(157,191,210,.2);
  color: #b6c7d1;
`
