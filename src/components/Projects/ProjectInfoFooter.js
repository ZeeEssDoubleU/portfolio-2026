import Link from 'next/link'
import styled from 'styled-components'
export default function ProjectInfoFooter({title}) {
 return <Container><Link href="/#projects" aria-label={`close ${title} project info panel`}>close</Link></Container>
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
