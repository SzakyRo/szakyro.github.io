# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page personal CV / résumé site for Liviu Gelca, styled as a faux-terminal interface (dark palette, monospace headings, `$ command` section prompts, blinking caret, animated CSS rabbit at the bottom). Built as a static SPA and deployed to GitHub Pages under the custom domain `liviugelca.it` (see `public/CNAME`).

Stack: **Vite + React 19 + TypeScript + Tailwind 3**. Lint with **oxlint** (not ESLint).

## Commands

```bash
npm run dev       # vite dev server on :5173 (strictPort: false)
npm run build     # tsc -b && vite build   (also runs the type check)
npm run lint      # oxlint
npm run preview   # vite preview of the built bundle
```

There is no separate `test` script and no test framework — there are no automated tests. For a one-off type check without producing `dist/`: `npx tsc -b --noEmit` (or just `tsc --noEmit` if the project references are already resolved).

To verify a production bundle locally with SPA-style 404 fallback: `npm run build && npx serve dist -l 4173 --single`.

## Architecture

### Content lives in `src/content/`, not in components

Every visible string — name, role, experience entries, skill groups, focus areas, education, certifications, writing links — is exported from a typed module under `src/content/`. Components import those modules; they contain no copy of their own.

Schemas (`Experience`, `SkillGroup`, `FocusArea`, `Education`, `Certification`, `Language`, `profile`) live alongside the data and are exported from the same files. `src/content/experience.ts` also exports a `durationLabel(start, end)` helper that computes "N years and M months" between ISO `YYYY-MM` dates at render time — leave `duration` blank in source data and let `Experience.tsx` call this.

To change copy or add a role, edit `src/content/*.ts` — never edit `src/components/*.tsx` to inline text. The build's `tsc -b` step enforces the schemas; a missing required field will fail the build.

### The `Section` wrapper and the § command pattern

`<Section id index prompt title>` (`src/components/Section.tsx`) is the structural primitive for each block on the page. It renders a section header that looks like a terminal prompt:

```
§ 03
who -a
$ Experience
```

`App.tsx` mounts seven sections (Now, Focus, Experience, Skills, Writing, Education, Contact) plus `Hero` and `Rabbit`. Each Section title links via `#id` from `Nav` — keep those IDs in sync if you add/rename sections.

### `Reveal` is the universal scroll-reveal

Any element that should fade in on scroll is wrapped in `<Reveal>` (`src/components/Reveal.tsx`). It uses `IntersectionObserver` + a fallback scroll listener (catches deep-link jumps that already scrolled past the element). Honors `prefers-reduced-motion` at the JS level — skips observation and reveals immediately.

Reveal only animates `opacity` and `transform` (compositor-only). Per-element stagger is controlled via the `delay` prop, which sets `--reveal-delay`. CSS for the reveal lives in `src/index.css` under the `.reveal` / `.is-revealed` utility classes.

### Other components worth knowing

- `Nav` — fixed top bar that slides in once the hero scrolls out; tracks the active section by scroll position. Links are hard-coded at the top of the file.
- `ScrollProgress` — 2px hairline at the very top, `scaleX`-driven. Hidden entirely under `prefers-reduced-motion`.
- `Hero` — uses `useTypingLoop('whoami')` to animate a terminal-style prompt in the hero. `useTypingLoop` short-circuits under reduced-motion.
- `Rabbit` — pure CSS animation at the bottom of the page. A single `<div class="rabbit">` driven by `box-shadow` and `transform` keyframes (see `src/index.css`). Hidden if `useReducedMotionFlag()` returns true.
- `Focus` — pairs `src/content/focus.ts` with lucide-react icons. Icons are looked up by index modulo the array — keep the icon list length ≥ focus areas.

### Styling conventions

Tailwind is configured with a custom palette (`tailwind.config.js`):

```
bg #0B0F12   surface #0F1418   line #1C242B
fg #D6DEE5   muted  #8A97A1    accent #7FD962
warn #FFB454 link #82AAFF
```

Tokens are used as Tailwind classes throughout — `bg-bg`, `text-fg`, `border-line`, `text-accent`, etc. Add new tokens by extending `tailwind.config.js`'s `theme.extend.colors`; do not hardcode hex in components.

Two utility classes wrap the JetBrains Mono font and the font-feature-settings: `text-mono` (in `index.css`) for elements that should be monospace; `font-sans` / `font-mono` Tailwind classes for the rest. Font files are imported at the top of `src/main.tsx` from `@fontsource-variable/inter` and `@fontsource-variable/jetbrains-mono`.

All animations are defined in `src/index.css` (`@keyframes boot-up`, `caret-blink`, `grid-drift`, `rabbit-hop`, `rabbit-kick`, `rabbit-cloudy`) and gated by the `prefers-reduced-motion: reduce` media query at the bottom of the file. New animations should follow the same pattern: define keyframes, add the `prefers-reduced-motion` override.

Accessibility: skip-to-content link in `index.html`, `aria-labelledby` on sections, `aria-hidden` on decorative icons, visible focus ring via `*:focus-visible`.

### TypeScript strictness

`tsconfig.app.json` and `tsconfig.node.json` enable: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noFallthroughCasesInSwitch`. These are non-optional — unused imports will fail `tsc -b`.

`verbatimModuleSyntax` means: use `import type { ... }` for type-only imports (the codebase does this consistently — keep doing it). `erasableSyntaxOnly` forbids non-erasable TS syntax (no enums, no namespaces, no parameter properties). Stick to plain interfaces, type aliases, and unions.

### Vite config notes

`vite.config.ts`: `base: '/'` (the site is served at the domain root, not under a `/cv/` subpath — see the CNAME). `build.target: 'es2022'`. `rollupOptions.output.manualChunks` splits `react` and `lucide-react` into their own chunks so the entry chunk stays small. The dev server uses port 5173 but is not strict.

The `public/` directory is copied to `dist/` as-is. `public/404.html` is a hand-written terminal-style 404 page served by GitHub Pages for unknown paths; `public/CNAME` configures the custom domain; `public/robots.txt` and `public/sitemap.xml` handle crawl directives.

## Deployment

The site is built and deployed to GitHub Pages. Every push to `main` triggers a workflow that runs `npm ci` → `npm run lint` → `tsc --noEmit` → `npm run build` → uploads `dist/` as a Pages artifact. Custom domain is `liviugelca.it` via `public/CNAME`.

For local verification of the production bundle with SPA fallback: `npm run build && npx serve dist -l 4173 --single`.

## Conventions when editing

- **Add or change copy** by editing `src/content/*.ts`; do not inline strings into components.
- **Add a new section**: define the data in `src/content/`, add a component in `src/components/`, mount it in `App.tsx` inside a `<Section>` wrapper, and add the anchor to the `links` array at the top of `Nav.tsx`.
- **Reveal-on-scroll**: wrap with `<Reveal>` and pass a `delay` (in ms) for staggering. The CSS class `reveal` is added by the component — don't apply it manually elsewhere.
- **Animation**: add keyframes to `src/index.css` and an override under `@media (prefers-reduced-motion: reduce)`. Use only `transform` / `opacity` / `box-shadow` to stay on the compositor.
- **Icons**: import from `lucide-react`. Pass `aria-hidden="true"` for decorative use.
- **Tailwind colors**: use the themed tokens (`bg-bg`, `text-fg`, `border-line`, `text-accent`, etc.), not raw hex values.
- **Type-only imports**: use `import type { ... }` because of `verbatimModuleSyntax`.
