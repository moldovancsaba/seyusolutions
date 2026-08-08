# Seyu Solutions — Repository & Issue Audit

**Date:** 2026-06-30
**Repo:** `moldovancsaba/seyusolutions`

---

## 1. What this repository is

A small **static marketing website** for *Seyu Solutions Kft.* (fan‑engagement / ROI tech),
built with **Vite 8** (vanilla HTML/CSS/JS — no framework).

| Area | Detail |
|------|--------|
| Build tool | Vite 8 (`dev` / `build` / `preview`), `base: '/seyusolutions/'` (GitHub Pages project path) |
| Pages | 6 total, all wired as Vite build inputs: `index.html` (landing), `marketing-agency.html`, `founder.html`, and 3 legal pages (`gtc.html`, `privacy.html`, `cookie-policy.html`) |
| Styling | `src/style.css` — the shared SEYU design system used by 5 pages. `founder.html` is a fully standalone landing page with its own `src/founder.css` + `src/founder.js` (deliberately not sharing the site-wide design system — see §6). |
| JS | `src/founder.js` only (theme toggle + scroll-reveal for the founder page). No other page currently loads JavaScript. There is no `src/map.js` — the world-map feature was removed in commit `db10b3b`, and its dead CSS/comments were cleaned up in §6. |
| Assets | `public/favicon.svg`, `public/brand/seyu-white.png`, `public/founder/tom-vecsernyes.jpg`; Google Fonts (Anton/Montserrat/Space Mono, and Sora/Inter on the founder page) via `<link>` tags |
| CI/CD | `.github/workflows/deploy.yml` — push to `main` → `npm ci && npm run build` → `JamesIves/github-pages-deploy-action` publishes `dist/` to `gh-pages` → served at `https://moldovancsaba.github.io/seyusolutions/` |
| Governance docs | `CLAUDE.md` (standing agent operating rules) and `AI_ATTRIBUTION_POLICY.md` (binding AI-branding policy) — both added since this audit was first written; see §6 |

---

## 2. Audit of the tracked issues (the actual ask)

> **Finding:** There is **nothing currently tracked to audit.**

- **Project board #38 `{seyusolutions} - From IDEA to LIVE`** exists and has a full custom
  workflow — `IDEABANK (SOMEDAY)` → `Roadmap (LATER)` → `Backlog (SOONER)` → `Todo (NEXT)` →
  `In Progress (NOW)` → `Review (ALMOST)` → `Done` → `Declined (NEVER)` — but contains **0 items**
  (`totalCount = 0`, every column empty).
- The **repository issue tracker** has **0 issues** (open or closed); GitHub reports
  *"Issue creation is restricted in this repository."*

Because the board is empty, the useful deliverable is the **code/quality audit below** — i.e.
the issues that *should* be seeded onto that board. Each is tagged with a suggested board Status.

---

## 3. Findings (proposed issues)

### 🔴 Bugs / blockers — suggested column: **Todo (NEXT)**

**A‑1 · Malformed HTML: unclosed `<div>` in the "Engagement Core" section**
`index.html` — the 4th card (`AI SOLUTIONS`) is missing its closing `</div>`, so the
`.grid-4` wrapper is never closed before `</section>` (net **+1 unbalanced div** in the file).
Browsers auto‑recover, but the grid container leaks and layout/footer nesting is fragile.
*Fix:* add the missing `</div>` after the `AI SOLUTIONS` paragraph.

**A‑2 · Primary CTAs are dead links**
Every call‑to‑action is `href="#"`: nav **Contact us**, **Purchase Package**, the second
**Contact us**, **Start Global Partnership**, and **Support Center**. Only the footer
`mailto:info@seyusolutions.com` works. For a conversion‑focused marketing site this means the
main funnel does nothing. *Fix:* point CTAs at a real contact/checkout/mailto target.

**A‑3 · No deployment path**
The last commit removed the GitHub Actions workflows, yet `base: '/seyusolutions/'` clearly
targets a GitHub Pages project site. There is now no automated (or documented) build‑and‑deploy.
*Fix:* add a Pages deploy workflow (build → upload `dist/`) or document the manual process.

### 🟠 Quality / hygiene — suggested column: **Backlog (SOONER)**

**B‑1 · Dead Vite‑starter leftovers**
`src/counter.js` (`setupCounter`, never imported), `src/assets/vite.svg`,
`src/assets/javascript.svg`, and `src/assets/hero.png` are unreferenced template residue.
*Fix:* delete them.

**B‑2 · Missing `.gitignore`**
No `.gitignore` exists. `node_modules/` is untracked only by luck; `dist/`, `.env`, and OS
files could be committed accidentally. *Fix:* add a standard Node/Vite `.gitignore`.

**B‑3 · Accessibility gaps**
- `<span class="ui-btn">Sport/Comm/TV/Events</span>` are styled as buttons but are not
  focusable or keyboard‑operable (no `<button>`/`<a>`, no `role`/`tabindex`).
- `<canvas id="worldMap">` has no `aria-label` or text fallback.
- Body text at `opacity: 0.8` and buttons with `rgba(255,255,255,0.4)` borders lower contrast.

**B‑4 · World‑map canvas is blurry on wide / high‑DPI screens**
`src/map.js` renders a fixed **1000×400** backbuffer stretched to `100vw` with no
`devicePixelRatio` scaling and no re‑render on resize or theme change. *Fix:* size the canvas
to its rendered pixel size × DPR and re‑render on `resize`.

### 🟡 SEO / performance / polish — suggested column: **Roadmap (LATER)**

**C‑1 · SEO & social metadata missing** — no Open Graph / Twitter Card tags, no canonical URL,
no `robots.txt` / `sitemap.xml`. Link previews will be bare.

**C‑2 · Render‑blocking fonts** — two Google Fonts `@import` statements sit at the top of
`style.css`, blocking first paint. *Fix:* move to `<link rel="preconnect">` + `<link>` in
`<head>`, or self‑host the fonts.

**C‑3 · Non‑root `base` + favicon/icons** — verify `<link rel="icon" href="/favicon.svg">`
resolves under the `/seyusolutions/` subpath in production; add `apple-touch-icon` and
`<meta name="theme-color">` while there.

**C‑4 · Content consistency** — site contact is `info@seyusolutions.com` (owner account email is
`office@seyuselfies.com`); hero stats (32 / 3000+ / 1M+ / +75%) read as placeholders; `lang="en"`
on a Hungarian entity's pages — confirm these are intentional.

---

## 4. Summary

| Severity | Count | Items |
|----------|-------|-------|
| 🔴 Bug / blocker | 3 | A‑1 unclosed div · A‑2 dead CTAs · A‑3 no deploy |
| 🟠 Quality / hygiene | 4 | B‑1 dead files · B‑2 no `.gitignore` · B‑3 a11y · B‑4 map DPR |
| 🟡 SEO / perf / polish | 4 | C‑1 SEO meta · C‑2 fonts · C‑3 base/favicon · C‑4 content |

**Headline:** the board (#38) and issue tracker are both empty — there were no existing issues to
audit, so the 11 findings above are offered as the initial backlog. The single concrete *bug* to
fix first is **A‑1 (unclosed `<div>` in `index.html`)**; the biggest *product* gaps are
**A‑2 (dead CTAs)** and **A‑3 (no deployment pipeline)**.

---

## 5. Resolution status (this branch)

| ID | Finding | Status |
|----|---------|--------|
| A‑1 | Unclosed `<div>` in Engagement Core | ✅ Fixed — card closed, `index.html` div balance now 0 |
| A‑2 | Dead CTAs (`href="#"`) | ✅ Fixed — all 5 CTAs point to `mailto:info@seyusolutions.com` with pre-filled subjects |
| A‑3 | No deployment pipeline | ✅ Fixed — `.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages (requires Pages source = "GitHub Actions" in repo settings) |
| B‑1 | Dead Vite‑starter files | ✅ Fixed — `counter.js`, `vite.svg`, `javascript.svg`, `hero.png` removed |
| B‑2 | Missing `.gitignore` | ✅ Fixed — Node/Vite `.gitignore` added |
| B‑3 | Accessibility gaps | ✅ Fixed — chips → `<button>`, canvas `role="img"` + `aria-label` + fallback, `:focus-visible` outlines |
| B‑4 | Map blurry on wide/hi‑DPI | ✅ Fixed — `src/map.js` scales backing store to CSS px × DPR, re‑renders on resize |
| C‑1 | SEO / social metadata | ✅ Fixed — canonical + OG/Twitter on all 4 pages, `robots.txt` + `sitemap.xml` added |
| C‑2 | Render‑blocking font `@import` | ✅ Fixed — moved to `<head>` `preconnect` + `<link>`, removed from CSS |
| C‑3 | Favicon under non‑root base | ✅ Verified — Vite rebases `/favicon.svg` → `/seyusolutions/favicon.svg` in build; added `apple-touch-icon` + `theme-color` |
| C‑4 | Content consistency | ✅ Resolved (2026-08-08) — see breakdown below |

**C-4 breakdown:**
- *Placeholder stats (32 / 3000+ / 1M+ / +75%)* — resolved earlier, before this note was ever updated: replaced with real, sourced figures (1M+ fans, 4000+ events, 42 countries, 28 sports) when the homepage was rebuilt around real Seyu/FanCAM content (commit `2e928f0`).
- *`lang="en"` on a Hungarian entity's pages* — confirmed intentional and correct, not a bug. `lang` describes the language of the page *content*, not the operating company's nationality. Every page's visible copy is written in English (the site targets an international audience across NY/London/Budapest/Szeged offices and clients in 40+ countries), so `lang="en"` is accurate. No change made.
- *Contact email inconsistency* — `founder.html` used `tom.vechy@seyuselfies.com` (a different domain from the rest of the site) while every other page uses `info@seyusolutions.com`. Standardized: `founder.html` now uses `info@seyusolutions.com` with subject-tagged mailto links, matching the site-wide convention. His LinkedIn (his own verified personal channel) was left as-is.

A separate follow‑up is a proper raster **Open Graph image** (the current `og:image` points at the
SVG favicon, which some social platforms don't render) — still outstanding, not part of this audit.

### Not in the original 11 — new request
- **Design system import & implementation** — ✅ Done. The *SEYU Design System.dc.html* handoff
  bundle was delivered as a zip and implemented as a full rebrand of the marketing site:
  - **Tokens** (`src/style.css`): light Pearl background, Navy Ink `#1B1F3C` + Mist `#F2F6F9`
    core, Magenta `#B62684` / Deep Blue `#2C5680` / Bright Blue `#0085C6` accents, 4px spacing
    scale, radius scale (8/11/18/22/999px), Pearl + Deep Glow signature gradients.
  - **Typography**: Anton (display) · Montserrat (body) · Space Mono (labels) — replacing Outfit.
  - **Components**: pill buttons (999px, mist/magenta/blue/glass), white cards with hover lift,
    dark featured panel, dark ink navbar + footer, Deep Glow hero with inline-SVG Seyu-leaf motifs.
  - **Map**: restyled to a full-bleed Deep Glow band with magenta/bright-blue city highlights
    (dedicated `--map-*` tokens read by `map.js`).
  - **New section**: "Trusted Worldwide" partner logo wall (UEFA, MotoGP, EHF, Villarreal, CHL,
    DVSC) using optimized brand assets in `public/brand/` (each ≤66 KB; MOL & MKOSZ omitted —
    MOL's SVG fills didn't resolve, MKOSZ artwork carried dark bars).
  - All four pages (`index` + 3 legal) re-skinned via the shared stylesheet; verified with
    `npm run build` and Playwright screenshots (desktop, mobile, legal).

---

## 6. What happened between this audit and today (2026-08-08), and a second deep sweep

This document went stale after the entries above — real work landed on `main` for over a month
without ever being logged here. Recording it now, then the findings from a full documentation/
code-comment/content-accuracy audit run today, all resolved in the same change set.

### 6.1 Undocumented work since the June audit

- **`marketing-agency.html`** added — a full second landing page (Agency positioning: campaign-
  period fan-engagement activations for brands, via a global rights-holder network).
- **`founder.html`** added — a profile page for Tom "Vechy" Vecsernyes (CEO & Co-Founder),
  rebuilt as a **completely standalone landing page** (own `src/founder.css` / `src/founder.js`,
  mirroring moldovancsaba.com's structure and dark-theme design system) rather than reusing the
  shared SEYU design system.
- **`CLAUDE.md`** and **`AI_ATTRIBUTION_POLICY.md`** added — standing agent operating rules and
  a binding, provider-agnostic AI-attribution/branding policy. Both are now the source of truth
  for agent behavior in this repo; `CLAUDE.md` §1 is a summary of the full policy.
- **Git history cleanup** — 17 historical commits on `main` had `Co-Authored-By`/`Claude-Session`
  trailers stripped via a `git filter-branch` rewrite + force-push (per the policy above); stray
  `claude/`-prefixed branches were cleaned up or force-updated where deletion wasn't permitted by
  the environment's git relay. Full details and the two genuinely unresolved platform limitations
  (a branch this session can't delete, and a closed PR's immutable commit history) are recorded in
  `CLAUDE.md` §1.7–1.8.

### 6.2 Second audit: documentation, code comments, versioning, and content accuracy

A full bit-by-bit sweep of every tracked file — all `.md` docs, every HTML page's copy, every CSS
comment and custom property, `package.json`/versioning, and confirmation of what genuinely doesn't
exist (no tour/onboarding feature, no i18n/locale files). All findings below were fixed in the same
change set.

**Stale code comments (all fixed):**
- `src/style.css`'s header comment still listed "Material Symbols" as a loaded font — removed
  from every page's `<head>` back in the design-system rebrand, but the comment was never updated.
- A "Map colors... read by `map.js`" comment survived the removal of `map.js` itself.
- A "backward-compatible names" comment described CSS custom-property aliases that had zero
  actual references anywhere in the file.

**Dead code (all removed, cross-referenced class-by-class and property-by-property against every
page before deletion, then rebuilt and re-verified with Playwright screenshots on every page,
light + dark theme, desktop + mobile — no visual regressions):**
- `src/style.css`: 17 unused custom properties (`--gold`, `--map-*`, `--slate`, `--mist`,
  `--font-main`, `--radius-global`, `--r-chip`, `--r-input`, `--s-16`, the unused "semantic alias"
  set, etc.) and every selector tied to the removed Material Symbols icon font, the removed
  world-map, and the removed partner-logo-wall section, plus a dozen never-applied utility
  classes. File went from 602 → 468 lines; the shared CSS bundle shrank from 16.4 kB to 13.3 kB
  gzipped.
- `src/founder.css` / `src/founder.js`: both were adapted from moldovancsaba.com's script, which
  included a project-filter UI, a "show full timeline" toggle, and a photo gallery — none of which
  `founder.html` actually has. All three JS behavior blocks and their ~95 lines of matching dead
  CSS (`.filters`, `.chip`, `.gallery*`, `.rating*`, `.creds*`, `.collabs*`, `.timeline*` (the
  unused simple variant), `.review__stars`, `.ftl__photo`, `.ftl__stars`, `.ftl__gallery-title`,
  the `--speaking`/`--personal` timeline-type variants) were removed.
- Orphaned assets deleted: `public/brand/seyu-ink.png` and `public/icons.svg` (both zero
  references anywhere).

**Content accuracy — the legal pages described a product that doesn't exist (all fixed):**
- `gtc.html` §2 listed "Greenbox Experience," "Raffles & Interactive Games," face-matching AI, and
  a "SaaS Marketplace" as live services — all explicitly identified as generic filler and removed
  from the homepage back in commit `db10b3b`. Rewritten to describe the actual product (real-time
  moderated fan photos, branded frames, venue display, agency campaigns). Also removed leftover
  "raffles"/"mapping infrastructures" mentions in §1 and §4, and an out-of-place "absolute vertical
  symmetry in our layouts" phrase from the liability clause (§6).
- `privacy.html` §3–§6 claimed to process data for face-matching profiles, raffle tickets, SaaS/API
  billing, and "our global mapping interface" — none of which exist. Rewritten to describe the
  data actually collected (fan photo/message submissions, contact info, technical/usage data), and
  §5 no longer claims third-party analytics sharing, for consistency with the Cookie Policy fix
  below.
- `cookie-policy.html` claimed Google Analytics and Meta/LinkedIn pixels were in active use.
  Verified via full-source grep: **zero** tracking scripts exist anywhere in the codebase. Rewritten
  to state plainly that the site currently sets no cookies at all (the only browser storage is a
  local-storage theme preference on `founder.html`, which never leaves the visitor's device), with
  the four-category taxonomy reframed as "what we'd use if we add this later."
- All three legal pages' "Last updated" date bumped to reflect these substantive changes.
- Copyright-year handling was inconsistent — 5 pages hardcode `© 2026`, `founder.html` computed it
  live via JS. Standardized on the hardcoded approach site-wide (and removed the now-dead
  "current year" script block from `founder.js`).

**Versioning — a deliberate non-decision, now documented rather than left ambiguous:**
`package.json`'s version has been `0.0.0` since the first commit, through 40+ commits and two full
visual rebrands, and no git tag has ever been cut. This is intentional, not drift: the package is
`"private": true`, has no external consumers, and is never published anywhere — it exists only as
a Vite build input list. See `CLAUDE.md` for the standing note so this isn't re-flagged as a gap.

**Confirmed as genuinely not present (not gaps — this product doesn't have these):** no tour/
onboarding feature or copy anywhere; no i18n/locale/translation files of any kind — the site is
single-language by design, and `lang="en"` is correct for that (see the C‑4 breakdown above).
