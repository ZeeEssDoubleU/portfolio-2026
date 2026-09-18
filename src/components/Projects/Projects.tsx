import type { ProjectData } from "../../types/portfolio";
import projects from "../../data/projects.json";
import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import StyledButton from "../elements/StyledButton";
import Project from "./Project";
import { Layout, Header, Body } from "../../styles/elements";

export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  useLayoutEffect(() => {
    if (window.__portfolioRestore?.saved?.expanded) setExpanded(true);
  }, []);
  const reduced = useReducedMotion();
  const visibleProjects = projects.filter(
    (project) => project.slug !== "github-issue-tracker" && project.slug !== "portfolio",
  );
  const row = (project: ProjectData, index: number) => (
    <Project
      key={project.slug}
      index={index}
      title={project.title}
      description={project.description}
      slug={project.slug}
      image={project.image}
      tech={project.tech}
    />
  );
  return (
    <Section id="projects">
      <div className="work-heading">
        <Header>A few things I’ve built.</Header>
        <p>
          Ideas made tangible.
          <br />A selection of websites and applications.
        </p>
      </div>
      <Body>
        <div className="project-grid">
          {visibleProjects.slice(0, 5).map(row)}
        </div>
        <motion.div
          id="additional-projects"
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{
            duration: reduced ? 0 : 0.4,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          style={{ overflow: "hidden" }}
          inert={expanded ? undefined : true}
          aria-hidden={!expanded}
        >
          <div className="project-grid additional-grid">
            {visibleProjects
              .slice(5)
              .map((project, index) => row(project, index + 5))}
          </div>
        </motion.div>
      </Body>
      {visibleProjects.length > 5 && (
        <StyledButton
          icon={expanded ? "minus" : "plus"}
          aria-label={expanded ? "show less projects" : "show more projects"}
          aria-expanded={expanded}
          aria-controls="additional-projects"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show fewer projects" : "More from the archive"}
        </StyledButton>
      )}
    </Section>
  );
}
const Section = styled(Layout)`
  .work-heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 40px;
    margin-bottom: 48px;
  }
  .work-heading h2 {
    margin-bottom: 0;
  }
  .work-heading p {
    color: #728b99;
    font-size: 12px;
    line-height: 1.8;
    padding-bottom: 5px;
  }
  .project-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px 40px;
  }
  .additional-grid {
    padding-top: 48px;
  }
  > button {
    display: block;
    margin: 44px auto 0;
    border-radius: 100px;
    padding: 12px 24px;
    min-height: 48px;
    font-size: 12px;
    background: transparent;
  }
  @media (max-width: 767px) {
    .project-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .work-heading {
      display: block;
      margin-bottom: 32px;
    }
    .work-heading p {
      margin-top: 20px;
      font-size: 12px;
    }
    .additional-grid {
      padding-top: 32px;
    }
  }
`;
