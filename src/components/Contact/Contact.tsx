import styled from "styled-components";
import ContactForm from "./ContactForm";
import Social from "../elements/Social";
import StyledButton from "../elements/StyledButton";
import { InternalLink } from "../elements/CustomLink";
import { Layout, Header } from "../../styles/elements";
export default function Contact() {
  return (
    <Section id="contact" tabIndex={-1}>
      <div className="contact-copy">
        <Header>
          Have something
          <br />
          <em>in mind?</em>
        </Header>
        <p>
          A website, an idea, or just a hello.
          <br />
          I’d love to hear what you’re thinking.
        </p>
        <a className="email-link" href="mailto:zak.williams2287@gmail.com">
          zak.williams2287@gmail.com <span>↗</span>
        </a>
        <Social />
      </div>
      <div className="contact-form-wrap">
        <ContactForm />
        <StyledButton
          icon="arrow-down"
          type="submit"
          form="contact-form"
          aria-label="submit contact form"
        >
          Send your message ↗
        </StyledButton>
        <p className="form-note">A direct line to me. No mailing lists.</p>
      </div>
      <footer>
        <span>© {new Date().getFullYear()} Zachary Williams</span>
        <span className="footer-note">Built with care. In New York.</span>
        <InternalLink href="landing" className="back-top">
          Back to top ↑
        </InternalLink>
      </footer>
    </Section>
  );
}
const Section = styled(Layout)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px 100px;
  padding-bottom: 28px;
  h2 em {
    font-style: normal;
    color: #50e3c2;
  }
  .contact-copy > p {
    font-size: 16px;
    line-height: 1.9;
    color: #8fa6b2;
    margin-top: -12px;
  }
  .email-link {
    display: inline-flex;
    color: #dbe9e7;
    font-size: 14px;
    margin-top: 32px;
    padding-bottom: 12px;
    border-bottom: 1px solid #7ca69c44;
    gap: 20px;
  }
  .email-link span {
    color: #50e3c2;
  }
  .contact-copy > div {
    justify-content: flex-start;
    margin: 24px 0;
  }
  .contact-copy .social-link {
    margin: 0 14px 0 0;
    background: #162830;
    padding: 1px;
  }
  .contact-copy .social-link:hover {
    transform: translateY(-3px);
  }
  .contact-form-wrap {
    padding-top: 12px;
    display: grid;
    gap: 22px;
    align-content: start;
  }
  .contact-form-wrap > button {
    justify-self: stretch;
    text-align: center;
    background: #50e3c2;
    color: #05231b;
    border: 0;
    box-shadow: none;
    border-radius: 6px;
  }
  .contact-form-wrap > button:hover {
    color: #05231b;
    background: #8bf0d9;
  }
  .contact-form-wrap .action-grid {
    display: block;
  }
  .contact-form-wrap .action-icon {
    display: none;
  }
  .contact-form-wrap .action-text {
    margin: 0 !important;
  }
  .form-note {
    font-size: 10px;
    text-align: center;
    color: #617984;
  }
  footer {
    grid-column: 1/-1;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    border-top: 1px solid #90b2ba20;
    padding-top: 28px;
    color: #627b89;
    font-size: 10px;
  }
  footer a {
    color: #a5babf;
  }
  @media (max-width: 1000px) {
    gap: 48px;
  }
  .email-link {
    overflow-wrap: anywhere;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 28px;
    padding-bottom: 30px;
    footer {
      margin-top: 26px;
      font-size: 9px;
    }
    .footer-note {
      display: none;
    }
    .email-link {
      font-size: 12px;
    }
    .contact-copy > div {
      margin-bottom: 10px;
    }
  }
`;
