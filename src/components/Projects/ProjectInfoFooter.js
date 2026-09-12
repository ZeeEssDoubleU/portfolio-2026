import Link from 'next/link'
import { useContext } from 'react'
import { ProjectDismissContext } from '../../utils/ProjectDismissContext'
import styled from 'styled-components'
export default function ProjectInfoFooter({title}) {
 const closeProject = useContext(ProjectDismissContext)
 return <Container><Link scroll={false} href="/#projects" onClick={event => {
   if (closeProject && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
     event.preventDefault()
     closeProject()
   }
 }} aria-label={`close ${title} project info panel`}>close</Link></Container>
}
const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  display: grid;
  grid-template-rows: 70px;
  justify-content: center;
  align-content: center;
  a {
    border: none;

    color: ${props => props.theme.appTextWhiteL};
    font-size: 20px;
    background: black;
    cursor: pointer;
  }
`
