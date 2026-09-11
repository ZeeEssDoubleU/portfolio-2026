# Portfolio 2026

Migration of [portfolio-2019](https://github.com/ZeeEssDoubleU/portfolio-2019) from Gatsby to Next.js 16, preserving the original design, biography, branding, project content, and routes. The original Git history is retained.

## Development

Use Node.js 22+ and Yarn Classic 1.22.22.

```sh
corepack enable
yarn install --frozen-lockfile
yarn dev
```

## Production

```sh
yarn build
yarn test
yarn start
```

`next build` exports the entire website to `out/`. `yarn start` serves that directory locally. No Node.js server, API keys, database, or paid runtime is required in production.

## Migration details

- Next.js Pages Router replaces Gatsby pages and `createPages`. This retains the component architecture and styled-components design while using the current Next.js release.
- Eleven `/project/<slug>/` routes are generated with `getStaticPaths`/`getStaticProps`, including the older `github-issue-tracker` URL. The home page retains the original ten-project listing and five-at-a-time reveal.
- `next/head` replaces React Helmet, `next/link` replaces Gatsby/Reach navigation, and `next/image` replaces Gatsby Image. Images are pre-existing local assets with static delivery, so there is no paid image optimization service.
- Styled-components server rendering includes the styles in generated HTML. React, styled-components, Framer Motion, and GSAP are upgraded for the new framework.
- The contact form remains a Netlify Form with a honeypot and now redirects to `/thanks/` after a successful submission. Enable form detection in the Netlify project before deploying.
- The close action returns to the portfolio even when a project URL is opened directly. External links preserve case and use correct `target`/`rel` attributes. Resize and input listeners clean up on unmount, and initial state is hydration-safe.
- Gatsby plugins and generated Gatsby output are removed. The original installable web manifest and icons remain. Gatsby's offline service worker is not carried over; this export does not promise offline support.
- Biography, project descriptions, and external project destinations are historical content, not a 2026 career update. Some external demo services may no longer be running.

## Content and DatoCMS

`src/data/projects.json` is a snapshot recovered from the original repository's committed Gatsby page data. Screenshots, portrait, and background are included in `public/assets/`, so the default build and published images do not depend on DatoCMS availability.

Edit the JSON to update content. An optional `yarn sync:cms` command refreshes it from the original DatoCMS Project model when a read-only `DATO_API_TOKEN` is configured in `.env.local`. It refuses to overwrite the snapshot if the request fails or returns invalid content. The optional sync cannot be verified without a CMS token. It restores remote CMS image URLs for refreshed content; ordinary builds never contact the CMS. Review and commit the changes, then rebuild. Never commit API tokens.

## Netlify

`netlify.toml` configures Node 22, `yarn build`, and the `out` publish directory. The Next.js runtime plugin is skipped because all pages are static. The canonical origin is configured for `https://zsw-portfolio-2026.netlify.app`; update `NEXT_PUBLIC_SITE_URL` when attaching a custom domain.

For Git-based continuous deployment, connect `ZeeEssDoubleU/portfolio-2026`, choose the main branch, and keep the settings in `netlify.toml`. Netlify's free subdomain and SSL avoid domain-registration costs. Keep the team on Free and do not enable paid upgrades or add-ons. Free hosting is subject to the account's monthly usage limits.

The static output can also be hosted on Cloudflare Pages or Vercel. The contact form is Netlify-specific and needs another form handler when moving hosts. Server-side Next.js features can be added later by removing `output: 'export'` and using the target host's Next.js runtime.
