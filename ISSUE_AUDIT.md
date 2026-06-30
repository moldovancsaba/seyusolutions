# Seyu Solutions — Repository & Issue Audit

**Date:** 2026-06-30
**Branch:** `claude/repo-sandbox-issue-audit-tz7yl3`
**Repo:** `moldovancsaba/seyusolutions`

---

## 1. What this repository is

A small **static marketing website** for *Seyu Solutions Kft.* (fan‑engagement / ROI tech),
built with **Vite 8** (vanilla HTML/CSS/JS — no framework).

| Area | Detail |
|------|--------|
| Build tool | Vite 8 (`dev` / `build` / `preview`), `base: '/seyusolutions/'` (GitHub Pages project path) |
| Pages | `index.html` (landing) + 3 legal pages: `gtc.html`, `privacy.html`, `cookie-policy.html` — all wired as Vite build inputs |
| JS | `src/map.js` (canvas world map of cities, theme‑synced via CSS vars) |
| Styling | `src/style.css` (307 lines, design‑token system: colors, base‑8 spacing, 4 type sizes) |
| Assets | `public/favicon.svg`, `public/icons.svg`; Google Fonts (Outfit + Material Symbols) via CSS `@import` |
| CI/CD | **None** — GitHub Actions workflows were deleted in the most recent commit |

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
