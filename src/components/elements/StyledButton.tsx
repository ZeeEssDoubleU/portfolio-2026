import type { IconName } from '../Icons/Icon'
import React from "react"
import styled from "styled-components"

// import components
import Icon from "../Icons/Icon"

// **********
// component
// **********

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: IconName }) => (
  <Wrapper
    type={props.type || "button"}
    aria-label={props["aria-label"]}
    aria-expanded={props["aria-expanded"]}
    aria-controls={props["aria-controls"]}
    form={props.form}
    onClick={props.onClick}
  >
    <div className="action-grid">
      <div className="action-text">{props.children}</div>
      <Icon name={props.icon} className="action-icon" />
    </div>
  </Wrapper>
)
export default Button

// **********
// styles
// **********

export const Wrapper = styled.button`
  justify-self: end;
  min-height: 56px;
  color: ${props => props.theme.appGreen};
  font-size: 16px;
  font-weight: 500;
  background: linear-gradient(120deg, rgba(80,227,194,.10), rgba(68,94,255,.10));
  padding: 16px 24px;
  border: 1px solid rgba(80,227,194,.22);
  border-radius: 10px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
  cursor: pointer;
  transition: color 200ms ease, transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
  .action-grid {
    display: grid;
    grid-template-columns: auto 0;
    align-items: center;
    .action-text {
      margin-right: 0;
      transition: margin-right 0.3s;
    }
    .action-icon {
      justify-self: end;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.2s;
    }
  }
  @media (prefers-reduced-motion: reduce) { transition: none; &:hover { transform: none; } }
  &:active { transform: translateY(0); }
  &:focus-visible { outline: 2px solid #50e3c2; outline-offset: 4px; }
  &:hover {
    transform: translateY(-2px);
    border-color: rgba(80,227,194,.5);
    box-shadow: 0 8px 24px rgba(80,227,194,.07);
    color: ${props => props.theme.appGreen};
    .action-text {
      margin-right: 25px;
    }
    .action-icon {
      opacity: 1;
      transition: opacity 0.2s 0.2s;
    }
  }
`
