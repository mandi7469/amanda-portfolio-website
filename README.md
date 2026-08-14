# Amanda Changa — Portfolio Website

A production-ready, accessible one-page portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS. The interface uses neutral glass surfaces so the supplied smoke video remains the primary color source.

## Highlights

- Responsive layouts for desktop, tablet, mobile, and a tested 320px minimum width
- Separate glass containers for Home, Skills, Projects, Experience, Contact, and Footer
- Responsive silent video sources with a static poster and reduced-motion fallback
- Verified project content, direct email actions, résumé download, GitHub, and LinkedIn links
- Keyboard-friendly sticky navigation, mobile Escape handling, skip link, semantic landmarks, and visible focus states
- Static metadata routes for Open Graph, manifest, robots, sitemap, and JSON-LD
- Unit/component tests with Vitest and React Testing Library
- Cross-device browser tests with Playwright

## Local development

Requirements: Node.js 20.9 or newer and pnpm 11.19.0.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
pnpm verify
```

The release gate runs ESLint, TypeScript, Vitest, a production build, and Playwright at 1440×1000, 1024×1366, and 390×844.

## Production URL

Set `NEXT_PUBLIC_SITE_URL` to the final canonical HTTPS origin before deployment. If it is omitted, metadata uses `http://localhost:3000` for local development.

## Media pipeline

The original video is retained at the project root. Optimized, muted H.264 variants are served from `public/media`:

- Desktop landscape: approximately 7.3 MB
- Tablet portrait: approximately 5.8 MB
- Mobile portrait: approximately 4.2 MB
- Static WebP poster: approximately 154 KB

The site is ready for a standard Vercel Next.js deployment, but no production deployment is performed by this repository setup.
