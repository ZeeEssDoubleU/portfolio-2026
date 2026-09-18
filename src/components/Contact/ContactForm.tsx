import React, { useRef } from "react";
import styled from "styled-components";
// import utils
// // function pushes contact data for Firebase & Firestore
// import { pushInquiry } from "../../utils/firebase"

// **********
// component
// **********

const ContactForm = () => {
  // refs to push contact data to Firebase & Firestore
  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputSubject = useRef<HTMLInputElement>(null);
  const inputMessage = useRef<HTMLTextAreaElement>(null);

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
        <label htmlFor="name">Your name</label>
        <input
          className="form-field"
          type="text"
          autoComplete="name"
          name="name"
          id="name"
          aria-label="name"
          placeholder="What should I call you?"
          ref={inputName}
          required
        />
      </div>
      <div className="form-div">
        <label htmlFor="email">Email address</label>
        <input
          className="form-field"
          autoComplete="email"
          type="email"
          name="email"
          id="email"
          aria-label="email"
          placeholder="you@example.com"
          ref={inputEmail}
          required
        />
      </div>
      <div className="form-div wide">
        <label htmlFor="subject">What’s on your mind?</label>
        <input
          className="form-field"
          type="text"
          name="subject"
          id="subject"
          aria-label="subject"
          placeholder="A new website, a collaboration, a question…"
          ref={inputSubject}
          required
        />
      </div>
      <div className="form-div wide">
        <label htmlFor="message">Tell me a little more</label>
        <textarea
          className="form-field form-textarea"
          name="message"
          id="message"
          aria-label="message"
          placeholder="The idea, the details, or just a hello."
          ref={inputMessage}
          required
          spellCheck={true}
          // TODO: May need to revise in future in case Grammarly needed
          data-gramm_editor="false"
        />
      </div>
    </Grid>
  );
};
export default ContactForm;

// **********
// styles
// **********

const Grid = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 20px;
  .wide {
    grid-column: 1/-1;
  }
  label {
    display: block;
    color: #bacbd0;
    font-size: 11px;
    margin-bottom: 10px;
  }
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }

  .form-field {
    width: 100%;
    background: #0b121a;
    color: #c9d8e0;
    font-size: 16px;
    padding: 14px 16px;
    border: 1px solid rgba(157, 191, 210, 0.18);
    border-radius: 6px;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    &.form-textarea {
      min-height: 140px;
      resize: vertical;
    }
    &:required {
      box-shadow: none;
    }
    &::placeholder {
      color: #617783;
      opacity: 1;
    }
    &:focus {
      outline: none;
      border-color: rgba(80, 227, 194, 0.65);
      box-shadow: 0 0 0 1px hsla(${(props) => props.theme.appGreenPartial}, 0.5);
      &::placeholder {
        opacity: 0;
      }
    }
  }
`;
