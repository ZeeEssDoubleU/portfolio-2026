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
 }} aria-label={`close ${title} project info panel`}><span aria-hidden="true">×</span>close</Link></Container>
}
const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, transparent, rgba(0,3,8,.8));
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 44px;
    padding: 0 16px;
    color: #8da3af;
    font-size: 14px;
    text-decoration: none;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color 180ms ease;
    span { font-size: 20px; font-weight: 300; }
    &:hover { color: #50e3c2; }
    &:focus-visible { outline: 1px solid #50e3c2; outline-offset: 2px; border-radius: 6px; }
  }
`
