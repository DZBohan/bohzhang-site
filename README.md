# bohzhang-site

Personal site — [bohzhang.com](https://bohzhang.com)

## Stack

- **[Astro 5](https://astro.build)** — static output, zero JS by default. Scripts ship only where
  something actually needs to be interactive.
- **No framework, no animation library** — the hero background is hand-written Canvas, ~1.7 KB inlined.
- **Bilingual** — `/en/` and `/zh/` as separate routes, English by default.

## Development

```bash
npm install       # first time
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the built output
```

Requires Node ≥ 18.17 (`.nvmrc` pins 22).

## Layout

```
src/
  i18n/ui.ts           translation strings + locale path helpers
  layouts/Base.astro   page shell: nav, language switch, footer, hreflang
  components/Hero.astro  first screen + Canvas background
  pages/en/  pages/zh/   one route tree per language
  pages/index.astro    root → /en/
  styles/global.css    all styling; no CSS framework
```

## Design notes

A few decisions that aren't obvious from the code:

**Language switching stays on the same page.** `switchLangPath()` swaps only the locale segment,
so `/zh/work` → `/en/work` rather than bouncing the reader back to the homepage. The chosen
language is remembered, but never force-redirects — a `/zh/` link shared with an English reader
still opens in Chinese, as the sender intended.

**Typography is set per language.** Negative letter-spacing tightens Latin text but crowds Chinese
characters, and uppercase + wide tracking is meaningless for a script without case. `:lang(zh)`
rules reset both.

**The Canvas background is deliberately restrained.** It renders only above 1024px, stays out of
the text column via a gradient mask (transparent to 55%, fully visible by 75%), and its particle
count is derived from the *visible* decorated area rather than the full canvas. Motion is
integrated over elapsed time, not per frame — otherwise a 120 Hz display runs it twice as fast as
a 60 Hz one. It pauses off-screen and renders a single static frame when
`prefers-reduced-motion` is set.

## Deployment

Cloudflare Pages, building from `main`:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
