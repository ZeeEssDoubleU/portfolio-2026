// @ts-nocheck
import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
      html { scrollbar-gutter: stable; scroll-behavior: auto; }
      html[data-portfolio-expanded='true'] #additional-projects {
         height: auto !important;
         opacity: 1 !important;
      }
      html, body {
         font-family: Avenir, "Avenir Next", system-ui, sans-serif;
         background: black;
         /* handles scroll behavior when app menu is open */
         overflow-x: hidden;
         overflow-y: ${props =>
           props.menuExpanded || props.modal ? "hidden" : "auto"};
         &.using-mouse :focus {
            outline: none !important;
         }
      }
`
