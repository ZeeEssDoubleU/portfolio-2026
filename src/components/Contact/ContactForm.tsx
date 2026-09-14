import React, { useRef } from "react"
import styled from "styled-components"
// import utils
// // function pushes contact data for Firebase & Firestore
// import { pushInquiry } from "../../utils/firebase"

// **********
// component
// **********

const ContactForm = () => {
  // refs to push contact data to Firebase & Firestore
  const inputName = useRef<HTMLInputElement>(null)
  const inputEmail = useRef<HTMLInputElement>(null)
  const inputSubject = useRef<HTMLInputElement>(null)
  const inputMessage = useRef<HTMLTextAreaElement>(null)

  return (
    <Grid
      id="contact-form"
      name="contact-form"
      method="POST"
      action="/thanks/"
      data-netlify="true"
      data-netlify-honeypot="honeypot-field"
      // // logic to push contact data to Firebase & Firestore
      // onSubmit={event => {
      //   event.preventDefault()
      //   pushInquiry(
      //     inputName.current,
      //     inputEmail.current,
      //     inputSubject.current,
      //     inputMessage.current
      //   )
      // }}
    >
      {/* Form name required by Netlify for static form submissions */}
      <input type="hidden" name="form-name" value="contact-form" />
      {/* hidden honeypot field meant to capture bots */}
      <input name="honeypot-field" style={{ display: "none" }} />
      <div className="form-div">
        <input
          className="form-field"
          type="text"
          name="name"
          id="name"
          aria-label="name"
          placeholder="Name"
          ref={inputName}
          required
        />
      </div>
      <div className="form-div">
        <input
          className="form-field"
          type="email"
          name="email"
          id="email"
          aria-label="email"
          placeholder="Email"
          ref={inputEmail}
          required
        />
      </div>
      <div className="form-div">
        <input
          className="form-field"
          type="text"
          name="subject"
          id="subject"
          aria-label="subject"
          placeholder="Subject"
          ref={inputSubject}
          required
        />
      </div>
      <div className="form-div">
        <textarea
          className="form-field form-textarea"
          name="message"
          id="message"
          aria-label="message"
          placeholder="Message"
          ref={inputMessage}
          required
          spellCheck={true}
          // TODO: May need to revise in future in case Grammarly needed
          data-gramm_editor="false"
        />
      </div>
    </Grid>
  )
}
export default ContactForm

// **********
// styles
// **********

const Grid = styled.form`
  display: grid;
  grid-row-gap: 20px;
  .form-field {
    width: 100%;
    background: rgba(3, 9, 18, .45);
    color: #c9d8e0;
    font-size: 16px;
    padding: 12px 24px;
    border: 1px solid rgba(157,191,210,.18);
    border-radius: 12px;
    transition: transform 0.2s, box-shadow 0.2s;
    &.form-textarea {
      min-height: 150px;
      resize: vertical;
    }
    &:required {
      box-shadow: none;
    }
    &::placeholder {
      color: #c9d8e0;
      opacity: .7;
    }
    &:focus {
      outline: none;
      border-color: rgba(80,227,194,.65);
      box-shadow: 0 0 0 1px hsla(${props => props.theme.appGreenPartial}, 0.5);
      &::placeholder {
        opacity: 0;
      }
    }
  }
`
