import projects from '../../data/projects.json'
import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, useReducedMotion } from 'framer-motion'
import StyledButton from '../elements/StyledButton'
import Project from './Project'
import { Layout, Header, Body } from '../../styles/elements'

export default function Projects() {
  const [expanded, setExpanded] = useState(false)
  const reduced = useReducedMotion()
  const visibleProjects = projects.filter(project => project.slug !== 'github-issue-tracker')
  const row = (project, index) => <Project key={project.slug} index={index} title={project.title} description={project.description} slug={project.slug} image={project.image} tech={project.tech} />
  return <Section id="projects">
    <Header>selected projects</Header>
    <Body>
      <div>{visibleProjects.slice(0, 5).map(row)}</div>
      <motion.div id="additional-projects" initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : .4, ease: [.22, .61, .36, 1] }}
        style={{ overflow: 'hidden', marginInline: -18, paddingInline: 18 }}
        inert={expanded ? undefined : true} aria-hidden={!expanded}>
        {visibleProjects.slice(5).map((project, index) => row(project, index + 5))}
      </motion.div>
    </Body>
    {visibleProjects.length > 5 && <StyledButton icon={expanded ? 'minus' : 'plus'}
      aria-label={expanded ? 'show less projects' : 'show more projects'}
      aria-expanded={expanded} aria-controls="additional-projects"
      onClick={() => setExpanded(value => !value)}>
      {expanded ? 'show less' : 'show more'}
    </StyledButton>}
  </Section>
}
const Section = styled(Layout)``
