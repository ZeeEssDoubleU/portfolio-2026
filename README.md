# Portfolio 2026 — modern design preview

Zak (Zachary) Williams' personal portfolio, migrated from Gatsby to Next.js while retaining the original design, project history, and URLs.

- **Website:** https://zsw-portfolio-2026-preview.netlify.app/
- **Application branch:** [`design/modern-preview`](https://github.com/ZeeEssDoubleU/portfolio-2026/tree/design/modern-preview)
- **Original project:** [portfolio-2019](https://github.com/ZeeEssDoubleU/portfolio-2019)

## Preview scope

This branch is an isolated design exploration. Production remains on `main` and https://zsw-portfolio-2026.netlify.app/. Deploy this branch only to the separate `zsw-portfolio-2026-preview` Netlify project (ID `d9598791-09cf-4b50-ad57-d6c6efde2296`).

The design adds dark glass cards, desktop-only 10px backdrop blur, updated typography and buttons, and fully clickable project rows with hover/focus illumination. Small screens and reduced-motion/transparency preferences use an opaque fallback. Filters are not animated. Real-device frame rates should be reviewed before promoting the design.

The preview sends `noindex, nofollow` in HTML and response headers. It is publicly accessible to anyone with its URL. Contact submissions belong to the separate preview project.

## Stack and structure

Next.js 16 Pages Router, React 19, styled-components 6, GSAP 3, and Framer Motion 12. The site is fully statically exported; production does not require a Node server, database, or CMS credentials.

| Location | Purpose |
| --- | --- |
| `src/pages/` | Homepage, project routes, confirmation and error pages |
| `src/components/` | Navigation, biography, projects, contact form and branding |
| `src/data/projects.json` | Project content snapshot |
| `src/data/image-placeholders.json` | Embedded previews for image loading |
| `public/assets/` | Local screenshots, portrait and background |
| `src/utils/animations.js` | Header and mobile menu entrance animations |
| `netlify.toml` | Build, publish directory, environment and cache settings |

Eleven `/project/<slug>/` pages preserve original project URLs. The homepage lists ten projects, initially showing five. Biography and project descriptions are historical content; some external demos may no longer be available.

## Run locally

Use Node.js 22 or newer and Yarn Classic 1.22.22.

```sh
corepack enable
yarn install --frozen-lockfile
yarn dev
```

```sh
yarn build   # Export static pages to out/
yarn test    # Check exported routes, assets and form markup
yarn start   # Serve out/ locally
```

## Content and images

Edit `src/data/projects.json` and the relevant components to update content. Store screenshots in `public/assets/`. Images display embedded blurred previews while loading, then fade into the decoded full image. Loading previews animate gently; reduced-motion preferences disable those effects. SVG branding renders directly.

When replacing a raster image, update its entry in `src/data/image-placeholders.json` with a small JPEG data URL so the preview matches. Avoid large embedded previews.

An optional `yarn sync:cms` refreshes project content from the original DatoCMS model using `DATO_API_TOKEN` in `.env.local`. This integration has not been tested with a live token. It can restore remote image URLs, which need corresponding preview entries and availability checks. Review changes before committing. Ordinary builds do not contact DatoCMS. Never commit secrets.

## Deployment and contact form

The site is deployed to Netlify with `yarn build` and publish directory `out`. `netlify.toml` sets Node 22 and skips the Next.js server runtime plugin because this is a static export.

Deployments have been uploaded directly. For automatic preview Git deployments, connect this repository and select **design/modern-preview**. Imported legacy branches are retained; they are not the current application.

The contact form uses Netlify Forms with a honeypot and `/thanks/` confirmation page. Form detection must be enabled on Netlify. Local static serving does not process form submissions.

The deployment uses the existing Free plan and Netlify subdomain. Usage limits still apply; no paid runtime or image optimization service is required. Change `NEXT_PUBLIC_SITE_URL` when attaching a custom domain. Other static hosts can serve `out/`, but require a replacement for Netlify Forms.

## Maintenance

- Preserve `/#about`, `/#projects`, `/#contact`, and direct project URLs when changing navigation.
- Check hamburger opening, closing, interrupted taps, breakpoint changes and project transitions after animation changes.
- GSAP follows the original entrance and scroll timings; reduced-motion preferences are respected.
- Review uncached image loading as well as cached navigation.
- Gatsby configuration, page-generation templates, generated page data, static-directory duplicates and unused legacy routing utilities have been removed. Gatsby references in historical project descriptions describe those projects, not this site's runtime.
- Gatsby's offline service worker was not migrated; offline support is not guaranteed.

## License

MIT. See [LICENSE](LICENSE).

### Preview motion

Section headings and actions are lowercase. The hero background is fixed on all viewport sizes. Project routes retain the portfolio underneath a dark surface with 22px backdrop blur. At widths of 768px and above, this is a modal 32px wider than the base cards (up to 1232px), with 1rem top and bottom margins. When the vertical navigation is visible, the modal is centered in the content area to its right. Blur is confined to the modal. Outside clicks or Escape dismiss it; an outside section link dismisses it before scrolling to its destination. The entire project panel fades and unblurs over 450ms, after its screenshot decodes; screenshot loading transitions are disabled inside the synchronized panel. Exit reverses the panel fade/blur. Reduced-motion preferences skip the panel animation.

Project navigation disables Next.js automatic scrolling. Opening a project retains the portfolio at its captured scroll offset and locks document scrolling until the exit animation completes. Mobile keeps the portfolio in normal document flow and contains touch, wheel and keyboard scrolling within the project, avoiding fixed-position layer changes at transition boundaries. Desktop retains the fixed-layer lock. Close navigation restores its hash only after the fade so Next.js cannot scroll the base page during the transition. Only project content scrolls; closing restores the saved document offset. The project list has a 400ms height transition with reversible show more/show less controls and retains expansion while a project is open.

The second design preview adds transform-only, 24-second ambient light drift, one-time 650ms card entrances, desktop project thumbnails and technology tags, active section navigation, and small hover lifts. Cards already on screen are never hidden when opening a project. Reduced-motion preferences disable ambient drift and entrance movement; hidden tabs pause ambient animation. No paid services or new runtime dependencies are used.

### Dust particle experiment (preview only)

The fixed background includes a decorative 2D canvas with 18–64 softly glowing teal, blue and pale dust particles. Cached sprites, a 30fps limit and a 1.5x pixel-density cap keep rendering bounded. The canvas ignores pointer input. Animation pauses while a project is open or the tab is hidden; reduced-motion users see a static field. No particle package or paid service is required.
