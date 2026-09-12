// @ts-nocheck
import React from "react";
import styled from "styled-components";

import Img from "./PortfolioImage";
// import components
import { InternalLink } from "./elements/CustomLink";
import StyledButton from "./elements/StyledButton";
import Icon from "./Icons/Icon";
// import styles
import { Layout, Header, Body } from "../styles/elements";

// **********
// component
// **********

const About = (props) => {


	return (
		<Section id="about">
			<Header>about me</Header>
			<Bio>
				<Selfie
					title="selfie"
					src="/assets/selfie-tinted.png"
					alt="selfie photo of developer with dark filter"
				/>
				<div>
					<p className="bio-name">Zachary Williams</p>
					<p>
						<Highlight>
							<Icon name="map-marker" />
							{"  "}New York, NY, USA
						</Highlight>
					</p>
					<p>
						My name is Zachary Williams, or Zak for short.{"  "}I’m a{" "}
						<Highlight>front-end developer</Highlight> based in New York
						City.
						{"  "}I enjoy creating clean, intuitive web interfaces that
						provide a satisfying user experience.
					</p>
					<p>
						If you’re in need of a website, mobile or web application, or
						just want to say what’s up, give me a shout!
					</p>
				</div>
			</Bio>
			<InternalLink href="contact" className="link-contact-me">
				<StyledButton
					icon="email"
					onClick={() =>
						setTimeout(() => document.querySelector("#name").focus(), 700)
					}>
					contact me
				</StyledButton>
			</InternalLink>
		</Section>
	);
};
export default React.memo(About);

// **********
// query
// **********



// **********
// styles
// **********

const Section = styled(Layout)`
	.link-contact-me {
		justify-self: end;
	}
`;
const Bio = styled(Body)`
	display: grid;
	grid-template-rows: auto auto;
	grid-template-columns: auto;
	justify-items: center;
	color: #b8c6d0;
	font-size: 16px;
	line-height: 1.8;
	white-space: pre-wrap;
	.bio-name {
		font-size: 24px;
		letter-spacing: -.03em;
		color: #f0f7f8;
		font-weight: 500;
	}
	p {
		margin: 12px 0;
	}
	@media (min-width: ${(props) => props.theme.tablet + "px"}) {
		grid-template-rows: auto;
		grid-template-columns: auto auto;
		align-items: center;
	}
`;
const Selfie = styled(Img)`
  position: relative;
  height: 240px;
  width: 100%;
  border: 1px solid rgba(157,191,210,.24);
  border-radius: 20px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07);
  img { object-position: 80% 50% !important; }
  @media (min-width: ${(props) => props.theme.tablet + "px"}) {
    width: 240px;
    border-radius: 50%;
    margin-right: 36px;
    img { object-position: 100% 50% !important; }
  }
`;
const Highlight = styled.span`
	color: #50e3c2;
`;
