import type { GetStaticPaths, GetStaticProps } from 'next'
import type { ProjectData } from '../../types/portfolio'
import ProjectInfo from '../../components/Projects/ProjectInfo'
import SEO from '../../components/SEO'
import projects from '../../data/projects.json'
export default function ProjectPage({ project }: { project: ProjectData }) {
  return <><SEO title={project.title} description={project.description} keywords={project.tech} /><ProjectInfo {...project} /></>
}
export const getStaticPaths: GetStaticPaths = () => {
  return { paths: projects.map(({slug}) => ({params:{slug}})), fallback: false }
}
export const getStaticProps: GetStaticProps<{ project: ProjectData }, { slug: string }> = ({ params }) => {
  const project = projects.find(project => project.slug === params?.slug)
  return project ? {props:{project}} : {notFound:true}
}
