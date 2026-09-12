# Portfolio 2026

Zak (Zachary) Williams' personal portfolio, migrated from Gatsby to Next.js while retaining the original design, project history, and URLs.

- **Website:** https://zswportfolio.netlify.app/
- **Application branch:** [`main`](https://github.com/ZeeEssDoubleU/portfolio-2026/tree/main)
- **Original project:** [portfolio-2019](https://github.com/ZeeEssDoubleU/portfolio-2019)

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

Deployments have been uploaded directly. For automatic Git deployments, connect this repository and select **main**. Imported legacy branches are retained; they are not the current application.

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

## Current design and archive

Production includes the glass cards, atmospheric dust, updated project layouts, mobile scroll-lock fixes, and saved refresh positions. The separate design preview remains at https://zsw-portfolio-2026-preview.netlify.app/.

The original Gatsby portfolio is preserved at https://zswportfolio-2019.netlify.app/. The `public/sw.js` endpoint retires legacy offline workers from the reused main address; the Next.js application does not register one.
