import { createGlobalStyle } from "styled-components";

export default createGlobalStyle<{ menuExpanded?: boolean; modal?: boolean }>`
      html { scrollbar-gutter: stable; scroll-behavior: auto; }
      body { color: #dce8e8; -webkit-font-smoothing: antialiased; }
      ::selection { color: #021811; background: #50e3c2; }
      a, button { -webkit-tap-highlight-color: transparent; }
      a:focus-visible, button:focus-visible { outline: 2px solid #50e3c2; outline-offset: 5px; }
      .skip-link { position: fixed; left: 24px; top: -80px; z-index: 100; background: #50e3c2; color: #051a16; padding: 12px 20px; }
      .skip-link:focus { top: 12px; }

      /* The inline head script sets this before any content can paint. The logo
         mark stays in its final position; every surrounding layer shares one clock. */
      html[data-site-entry='waiting'] [data-entry-reveal],
      html[data-site-entry='waiting'] .site-background > a {
         opacity: 0 !important;
         visibility: hidden !important;
      }
      html[data-site-entry='revealing'] [data-entry-reveal],
      html[data-site-entry='revealing'] .site-background > a {
         animation: portfolio-entry 420ms cubic-bezier(.22, .61, .36, 1) both;
      }
      html[data-site-entry] .nav-bar { transition: none; }
      html[data-site-entry='waiting'] [data-entry-logo] {
         filter: drop-shadow(0 0 14px rgba(80, 227, 194, .22));
      }
      html[data-site-entry='revealing'] [data-entry-logo] {
         animation: portfolio-logo-settle 420ms ease-out both;
      }
      @keyframes portfolio-entry {
         from { opacity: 0; filter: blur(6px); }
         to { opacity: 1; filter: blur(0); }
      }
      @keyframes portfolio-logo-settle {
         from { filter: drop-shadow(0 0 14px rgba(80, 227, 194, .22)); }
         to { filter: drop-shadow(0 0 0 rgba(80, 227, 194, 0)); }
      }
      /* Let the brighter reflection finish against black before revealing the page.
         The bloom is applied after masking so light can spill beyond the ring. */
      [data-entry-logo] { overflow: visible; }
      .logo-ring-sheen {
         pointer-events: none;
         animation: portfolio-ring-sheen 1300ms 150ms cubic-bezier(.25, .1, .25, 1) both;
      }
      @keyframes portfolio-ring-sheen {
         0% { transform: translateX(-150px); opacity: 0; }
         8% { opacity: 1; }
         92% { opacity: 1; }
         100% { transform: translateX(410px); opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
         html[data-site-entry='revealing'] [data-entry-reveal],
         html[data-site-entry='revealing'] .site-background > a,
         html[data-site-entry='revealing'] [data-entry-logo] { animation: none; }
         html[data-site-entry='waiting'] [data-entry-logo] { filter: none; }
         .logo-ring-sheen { animation: none; opacity: 0; }
      }

      html[data-portfolio-expanded='true'] #additional-projects {
         height: auto !important;
         opacity: 1 !important;
      }
      html, body {
         font-family: Avenir, "Avenir Next", system-ui, sans-serif;
         background: black;
         /* handles scroll behavior when app menu is open */
         overflow-x: hidden;
         overflow-y: ${(props) =>
           props.menuExpanded || props.modal ? "hidden" : "auto"};
         &.using-mouse :focus {
            outline: none !important;
         }
      }
`;
