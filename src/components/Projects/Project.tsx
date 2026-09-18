import type { ProjectData } from "../../types/portfolio";
import { useContext } from "react";
import { PortfolioScrollContext } from "../../utils/PortfolioScrollContext";
import styled from "styled-components";
import Link from "next/link";
import PortfolioImage from "../PortfolioImage";
const categories: Record<string, string> = {
  mathe: "BRAND WEBSITE",
  "street-eats": "WEB APPLICATION",
  portfolio: "PERSONAL WEBSITE",
  watchstuff: "VIDEO APPLICATION",
  "git-the-issue": "DEVELOPER TOOL",
};
const summaries: Record<string, string> = {
  mathe: "A considered digital home for a local tea company.",
  "street-eats": "A food delivery concept, from browsing to checkout.",
  portfolio: "The original home for my design and development work.",
  watchstuff:
    "A familiar video experience, built to explore React and the YouTube API.",
};
export default function Project({
  className,
  title,
  description,
  slug,
  index,
  image,
  tech,
}: Pick<ProjectData, "title" | "description" | "slug" | "image" | "tech"> & {
  className?: string;
  index: number;
}) {
  const rememberScroll = useContext(PortfolioScrollContext);
  return (
    <Card
      onNavigate={rememberScroll}
      scroll={false}
      className={className}
      href={`/project/${slug}/`}
      aria-label={`show ${title} project info panel`}
      data-featured={index === 0}
    >
      <div className="project-visual">
        <div className="visual-top">
          <span>● ● ●</span>
          <span>{categories[slug] || "WEB EXPERIENCE"}</span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <Thumbnail src={image.src} alt={`${title} website preview`} />
        <span className="view-case">Explore project ↗</span>
      </div>
      <div className="project-copy">
        <div className="project-kicker">
          {categories[slug] || "WEB EXPERIENCE"}
        </div>
        <h3>
          {title}
          <span aria-hidden="true">↗</span>
        </h3>
        <p>{summaries[slug] || description}</p>
        <div className="project-tech">
          {tech.slice(0, 3).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </Card>
  );
}
const Card = styled(Link)`
  display: block;
  min-width: 0;
  color: #e5f0ee;
  text-decoration: none;
  cursor: pointer;
  .project-visual {
    position: relative;
    overflow: hidden;
    background: linear-gradient(145deg, #183f3b, #101e26);
    padding: 24px 32px 0;
    border: 1px solid #9bb5c525;
    border-radius: 16px;
    aspect-ratio: 1.45;
    isolation: isolate;
  }
  &:nth-child(2n) .project-visual {
    background: linear-gradient(145deg, #1c254b, #111727);
  }
  .visual-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font:
      8px ui-monospace,
      monospace;
    letter-spacing: 0.1em;
    color: #c5d9db77;
    margin-bottom: 22px;
  }
  .visual-top > span:first-child {
    letter-spacing: 3px;
    font-size: 7px;
  }
  .project-copy {
    padding: 28px 0 12px;
  }
  .project-kicker {
    font:
      9px ui-monospace,
      monospace;
    letter-spacing: 0.14em;
    color: #5db6a4;
    margin-bottom: 13px;
  }
  h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: -0.045em;
    line-height: 1.2;
    margin-bottom: 12px;
  }
  h3 > span {
    font-size: 25px;
    font-weight: 300;
    color: #91a7b0;
    transition:
      transform 0.3s,
      color 0.3s;
  }
  .project-copy > p {
    color: #8fa3ae;
    font-size: 14px;
    line-height: 1.8;
    max-width: 420px;
  }
  .project-tech {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 22px;
  }
  .project-tech > span {
    font:
      9px ui-monospace,
      monospace;
    color: #9fb1ba;
    border: 1px solid #89a6af26;
    border-radius: 5px;
    padding: 5px 9px;
  }
  .view-case {
    position: absolute;
    bottom: 24px;
    right: 24px;
    padding: 12px 17px;
    background: #50e3c2;
    color: #082c25;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    opacity: 0;
    transform: translateY(8px);
    transition:
      opacity 0.25s,
      transform 0.25s;
  }
  &:hover,
  &:focus-visible {
    h3 > span {
      color: #50e3c2;
      transform: translate(3px, -3px);
    }
    .view-case {
      opacity: 1;
      transform: none;
    }
  }
  &[data-featured="true"] {
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 60px;
    align-items: center;
    padding-bottom: 32px;
    border-bottom: 1px solid #9bbfc21c;
  }
  &[data-featured="true"] .project-copy {
    padding: 0;
  }
  &[data-featured="true"] h3 {
    font-size: 50px;
  }
  &[data-featured="true"] .project-copy > p {
    font-size: 16px;
  }
  &[data-featured="true"] .project-visual {
    aspect-ratio: 1.48;
  }
  @media (max-width: 1000px) {
    &[data-featured="true"] {
      gap: 32px;
    }
    .project-visual {
      padding: 20px 22px 0;
    }
  }
  @media (max-width: 767px) {
    &[data-featured="true"] {
      display: block;
      padding-bottom: 0;
      border: 0;
    }
    &[data-featured="true"] h3,
    h3 {
      font-size: 30px;
    }
    &[data-featured="true"] .project-copy {
      padding: 24px 0 12px;
    }
    &[data-featured="true"] .project-copy > p {
      font-size: 14px;
    }
    .project-copy {
      padding: 24px 0 12px;
    }
    .project-visual {
      aspect-ratio: 1.35;
    }
    .project-tech {
      margin-top: 16px;
    }
    .visual-top {
      font-size: 7px;
    }
    .view-case {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .view-case,
    h3 > span {
      transition: none;
    }
  }
`;
const Thumbnail = styled(PortfolioImage)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 15px 50px #0007;
  transform: translateY(3px);
  transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
  img {
    object-position: top;
    object-fit: cover;
  }
  ${Card}:hover & {
    transform: translateY(-6px);
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    ${Card}:hover & {
      transform: none;
    }
  }
`;
