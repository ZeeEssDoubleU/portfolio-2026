// @ts-nocheck
import React from "react"
import styled from "styled-components"

// import components
import StyledButton from "../elements/StyledButton"
import Icon from "../Icons/Icon"
import ContactForm from "./ContactForm"
import Social from "../elements/Social"
// import styles
import { Layout, Header, Body } from "../../styles/elements"

// **********
// component
// **********

const Contact = props => {


  const currentDate = new Date().getFullYear()

  return (
    <Section tabIndex={-1} id="contact">
      <Header>get in touch</Header>
      <Body>
        <ContactForm />
      </Body>
      <StyledButton
        icon="check"
        type="submit"
        form="contact-form"
        aria-label="submit contact form"
        justifySelf="end"
      >
        send message
      </StyledButton>
      <Social />
      <Copyright>
        Zachary Williams <Icon name="copyright" className="icon-copyright" />{" "}
        Copyright
        {" " + currentDate}
      </Copyright>
    </Section>
  )
}
export default React.memo(Contact)

// **********
// query
// **********



// **********
// styles
// **********

const Section = styled(Layout)``
const Copyright = styled.p`
  display: grid;
  grid-template-columns: auto auto auto;
  color: ${props => props.theme.appGreen};
  padding: 0 10px;
  margin: 10px auto;
  align-items: center;
  grid-gap: 4px;
  .icon-copyright {
    height: 18px;
    width: 18px;
  }
`
