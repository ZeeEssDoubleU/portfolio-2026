import styled from "styled-components";
import Atmosphere from "./Atmosphere";
import ParticleDust from "./ParticleDust";
export const Background = ({ paused = false }) => (
  <Scene className="site-background" data-entry-reveal aria-hidden="true">
    <Atmosphere />
    <ParticleDust paused={paused} />
    <div className="grid" />
  </Scene>
);
const Scene = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background: #05080d;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 85% 20%, #415efa13, transparent 50%),
      radial-gradient(ellipse at 5% 60%, #50e3c20a, transparent 55%);
  }
  .grid {
    position: absolute;
    inset: 0;
    opacity: 0.22;
    background-image:
      linear-gradient(#7996ad14 1px, transparent 1px),
      linear-gradient(90deg, #7996ad14 1px, transparent 1px);
    background-size: 100px 100px;
    mask-image: linear-gradient(transparent, black 60%, transparent);
  }
  .particle-dust {
    opacity: 0.5;
  }
`;
