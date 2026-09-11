import ProjectInfo from '../../components/Projects/ProjectInfo'
import SEO from '../../components/SEO'
import projects from '../../data/projects.json'
export default function ProjectPage({ project }) {
  return <><SEO title={project.title} description={project.description} keywords={project.tech} /><ProjectInfo {...project} /></>
}
export function getStaticPaths() {
  return { paths: projects.map(({slug}) => ({params:{slug}})), fallback: false }
}
export function getStaticProps({params}) {
  const project = projects.find(project => project.slug === params.slug)
  return project ? {props:{project}} : {notFound:true}
}
