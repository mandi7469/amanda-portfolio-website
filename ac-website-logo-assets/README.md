# AC Website Logo Assets

All favicon, Apple Touch, and PWA icon files are transparent and borderless.
There is no colored outer stroke or filled background.

## Recommended use

Primary logo:
- logos/ac-logo-black.svg — light backgrounds
- logos/ac-logo-white.svg — dark backgrounds

Theme-aware SVG favicon:
```html
<link rel="icon" href="/brand/logos/ac-logo-black.svg"
      media="(prefers-color-scheme: light)">
<link rel="icon" href="/brand/logos/ac-logo-white.svg"
      media="(prefers-color-scheme: dark)">
```

Fallback ICO:
```html
<link rel="icon" href="/brand/favicons/favicon.ico" sizes="any">
```

Apple Touch:
```html
<link rel="apple-touch-icon" sizes="180x180"
      href="/brand/apple-touch-icons/apple-touch-icon.png">
```

Open Graph:
```html
<meta property="og:image" content="/brand/social/og-image-black-1200x630.png">
```

## Notes

- The icon canvases are square and transparent; no visible rounded-square frame is included.
- iOS and some browsers apply their own rounded-square icon mask automatically.
- White icon variants are included for dark UI surfaces.
- SVG files are vector approximations traced from the supplied source logo.
