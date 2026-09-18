import { useEffect } from "react";
import styled from "styled-components";
import Icon from "../Icons/Icon";
import { InternalLink } from "../elements/CustomLink";
import { useStore, onToggleMenu } from "../../store/useStore";

export default function Nav() {
  const { state, dispatch } = useStore();
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") onToggleMenu(dispatch, false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [dispatch]);
  return (
    <Bar className="nav-bar" aria-label="main navigation" data-entry-reveal>
      <div className="nav-inner">
        <InternalLink href="landing" className="brand">
          <Icon name="logo-nav" />
          <span>
            Zak Williams<span className="brand-role">DESIGN & DEVELOPMENT</span>
          </span>
        </InternalLink>
        <button
          className="menu-toggle"
          aria-controls="main-menu"
          aria-expanded={state.menuExpanded}
          aria-label={state.menuExpanded ? "close nav menu" : "open nav menu"}
          onClick={() => onToggleMenu(dispatch, !state.menuExpanded)}
        >
          {state.menuExpanded ? "Close −" : "Menu +"}
        </button>
        <div
          id="main-menu"
          className={state.menuExpanded ? "links open" : "links"}
        >
          <InternalLink href="projects" className="menu-link">
            Work <span>01</span>
          </InternalLink>
          <InternalLink href="about" className="menu-link">
            About <span>02</span>
          </InternalLink>
          <InternalLink href="contact" className="menu-link">
            Contact <span>03</span>
          </InternalLink>
        </div>
        <InternalLink href="contact" className="nav-cta">
          Let’s make something <span aria-hidden="true">↗</span>
        </InternalLink>
      </div>
    </Bar>
  );
}
const Bar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  background: #05080de8;
  backdrop-filter: blur(18px);
  border-bottom: 1px solid #accfd214;
  .nav-inner {
    height: 90px;
    width: calc(100% - 112px);
    max-width: 1320px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #e0ecec;
    font-size: 14px;
    font-weight: 500;
  }
  .brand svg {
    width: 38px;
    height: 38px;
  }
  .brand-role {
    display: block;
    font:
      8px ui-monospace,
      monospace;
    letter-spacing: 0.1em;
    color: #758d98;
    margin-top: 3px;
  }
  .links {
    display: flex;
    align-items: center;
    gap: 32px;
  }
  .menu-link {
    font-size: 12px;
    color: #a4b8bf;
    transition: color 0.2s;
  }
  .menu-link span {
    font:
      8px ui-monospace,
      monospace;
    color: #4c626d;
    margin-left: 3px;
    vertical-align: super;
  }
  .menu-link:hover,
  .menu-link[aria-current="location"] {
    color: #50e3c2;
  }
  .nav-cta {
    font-size: 12px;
    color: #c5d7d8;
    border-bottom: 1px solid #79959855;
    padding: 10px 0;
  }
  .nav-cta span {
    color: #50e3c2;
    margin-left: 16px;
  }
  .menu-toggle {
    display: none;
  }
  @media (max-width: 1000px) {
    .nav-inner {
      width: calc(100% - 64px);
    }
    .nav-cta {
      display: none;
    }
  }
  @media (max-width: 767px) {
    .nav-inner {
      width: calc(100% - 40px);
      height: 76px;
    }
    .brand svg {
      width: 32px;
      height: 32px;
    }
    .brand {
      font-size: 12px;
    }
    .brand-role {
      font-size: 7px;
    }
    .menu-toggle {
      display: block;
      border: 1px solid #829cab44;
      border-radius: 6px;
      color: #bdcccf;
      background: transparent;
      padding: 8px 12px;
      font-size: 11px;
      cursor: pointer;
    }
    .links {
      display: none;
      position: absolute;
      top: 76px;
      left: 0;
      right: 0;
      background: #090e16;
      border-bottom: 1px solid #799baa33;
      padding: 22px 24px;
    }
    .links.open {
      display: flex;
      justify-content: space-between;
    }
    .menu-link {
      font-size: 16px;
    }
  }
`;
