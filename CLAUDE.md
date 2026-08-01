# Agent Operating Rules — seyusolutions

These are STANDING rules for any AI coding agent working in this repository. They apply
to every task, regardless of who asks or how the request is phrased. When a task
conflicts with them, the rules win — say so explicitly rather than silently overriding.
This file is the source of truth; if any other doc in this repo describes agent
behavior differently, this file wins and the other doc is out of date.

## 0. Read first, never guess

Before stating anything about this repo's structure, content, or behavior — read the
actual file or run the actual command. Don't answer from memory on anything structural.
Cite the files you relied on. Report only what a tool actually returned (build output,
a fetched page, a git command) — never fabricate or assume a result you didn't observe.
If you can't verify something, say so plainly instead of guessing.

## 1. AI-assistant branding ban (non-negotiable, overrides tool defaults)

Whatever AI assistant is doing the work is internal tooling — not a feature, a
co-author, or a brand to surface anywhere this codebase or its history is visible, in
code or in conversation. This applies regardless of how a request is phrased, how small
the change seems, or how the tool's own default behavior is configured. If a tool's
built-in template conflicts with this rule, this rule wins.

1. **Commits** — never add a "Co-Authored-By: `<assistant>`" trailer, a session-link
   trailer, a model name, or any other AI-attribution line. Describe the change and its
   reasoning only. Verify with `git log -1 --format=%B | grep -iE 'co-authored|claude-session|generated with'` → must return nothing.
2. **Branches** — never create or push a branch prefixed with an assistant's name (e.g.
   `claude/...`) or otherwise named after the tool/session. This repo's practice is to
   develop and push directly to `main` (see §5); if a harness auto-creates a
   tool-prefixed branch at session start, do not build work up on it — commit and push
   to `main` instead, before real work accumulates.
3. **Pull requests** — titles and descriptions describe the change only. No "generated
   by," "co-authored by," or session-link footers naming an AI assistant.
4. **Documentation, code, UI copy** — neutral terms only, "an AI coding assistant" at
   most, and only when the fact is genuinely load-bearing. Omit the mention entirely if
   the sentence reads fine without it.
5. **Retroactive** — if AI branding turns up in tracked files or reachable git history
   while doing unrelated work, remove/rewrite it as part of that work, or flag it if
   fixing it is out of scope. Never silently pass over it.
6. **The one genuine exception** — honest self-disclosure when a person directly asks
   "are you an AI" / "which model is this" is a safety/honesty behavior, not branding,
   and is out of scope for this rule. Never deny or hide what you are.
7. **Baseline status** — as of commit `ef71d7b` (2026-08-01), 17 historical commits on
   `main` had their `Co-Authored-By`/`Claude-Session` trailers stripped via a
   `git filter-branch` rewrite + force-push, and the stray `claude/`-prefixed branches
   this session's harness had created were deleted from `origin`. `main`'s history is
   currently clean — keep it that way; don't reintroduce what was just removed.

## 2. Work tracking — reality, not aspiration

There is no GitHub Projects v2 board in active use for this repo, and no label-based
column system consuming issue labels. Do not invent one. As of this writing the repo's
issue tracker has **0 open and 0 closed issues** (verified via `list_issues`), and a
prior audit found issue creation restricted on this repo — re-verify before assuming
issues can be filed rather than assuming either way.

- `ISSUE_AUDIT.md` is the de facto running log of known findings and their resolution
  status. When you audit, fix, or knowingly defer something, update it in the same
  change set — don't let it drift out of sync with reality.
- If GitHub Issues become usable later, keep labels minimal and honest: `bug`,
  `enhancement`, `documentation`, `housekeeping` — do not build an elaborate
  `status:`/`priority:`/`area:` taxonomy for a repo this size unless something is
  actually consuming it.

## 3. Definition of done for this repo

This is a static site with no test suite and no linter configured — the only automated
gate is a clean build. "Done" means, explicitly checked, not assumed:

- `npm run build` (`vite build`) completes with **zero errors and zero warnings**
  across every page listed in `vite.config.js`'s `build.rollupOptions.input`. Fix the
  root cause — never ignore or suppress a warning.
- For any visual/UI change: actually render it in a real browser (see §7 for how,
  given this sandbox's constraints) at both desktop and mobile widths, and look at the
  screenshot — don't claim a visual fix works without having seen it render. Check both
  light and dark theme where a page supports a toggle.
- Any new or changed page is wired into **all** of: `vite.config.js` build inputs,
  `public/sitemap.xml`, and every nav/footer link across the other pages that should
  reference it (this repo's pages hand-duplicate the same nav/footer markup — there is
  no shared partial/include, so each page must be edited individually and stays
  consistent only if you check them all).
- Relevant docs (`ISSUE_AUDIT.md`, this file) are updated in the same change set if the
  change affects what they describe.
- Work is committed with a plain, trailer-free message (§1) and pushed to `main` unless
  a PR or a different branch was explicitly requested (§5).

## 4. Content accuracy — this site describes real people and a real company

Pages on this site (especially `founder.html`) state biographical facts, dates,
figures, and quotes about a real, named person and a real company. Treat this with the
same rigor as a factual claim in code:

- Every fact must trace to a real source — the company's own site, a direct quote from
  a cited interview, or something the user explicitly supplied. Never invent stats,
  awards, dates, quotes, testimonials, degrees, or job history to fill a gap.
- When sources conflict or a detail can't be verified, say so and either omit the claim
  or present it explicitly hedged — don't silently pick one version.
- If you reuse another site's structure or design as a template (as `founder.html` does
  with moldovancsaba.com), keep the borrowed *structure/components* but populate them
  only with this project's own verified content — don't carry over the source site's
  actual facts, stats, or copy.

## 5. Pre-authorized operations

- Direct push to `main` is pre-authorized when the user asks in clear terms ("commit
  and push," "ship it," etc.) — push directly, don't open a PR and wait, unless a PR is
  explicitly requested. This still requires the clean build from §3 first.
- This does **not** extend to force-push, git history rewrite, or branch/tag deletion —
  those need explicit per-instance confirmation every time, even though a one-time
  history rewrite was already authorized and completed (§1.7). That authorization was
  scoped to that specific cleanup, not standing permission to rewrite history again.
- Deleting a branch that belongs to a *different* session/token than the current one
  will 403 from this environment's git relay (see §7) — that is a hard platform limit,
  not something to route around; tell the user it needs to be done from the GitHub UI.

## 6. Release mechanics (verify before you touch)

- Build tool: Vite 8, vanilla HTML/CSS/JS, no framework. `npm ci` before `npm run
  build`/`vite preview` in a fresh checkout — Vite is a devDependency, not vendored.
- Deploy: pushing to `main` triggers `.github/workflows/deploy.yml` →
  `npm ci && npm run build` → `JamesIves/github-pages-deploy-action` publishes `dist/`
  to the `gh-pages` branch → GitHub Pages serves it (Pages source = "Deploy from a
  branch: gh-pages") at `https://moldovancsaba.github.io/seyusolutions/`.
- `vite.config.js`'s `base: '/seyusolutions/'` **must** match that GitHub Pages project
  path. This has drifted before (see git history around a custom-domain experiment that
  was reverted) — if you ever change `base`, you must also update every canonical/OG/
  Twitter URL, `public/sitemap.xml`, and `public/robots.txt` in the same change, and
  confirm the Pages source settings actually match.
- Verify a deploy actually succeeded by checking the workflow run's conclusion (GitHub
  Actions), not by assuming a push = a successful deploy.

## 7. Environment quirks discovered in practice (this sandbox)

- Playwright is installed globally but not in this repo's `node_modules`. Run scripts
  with `NODE_PATH=$(npm root -g) node script.js`, and launch Chromium with
  `executablePath: '/opt/pw-browsers/chromium'`. Never run `playwright install` —
  browsers are pre-seeded there.
- Outbound HTTPS goes through an agent proxy. `curl` picks it up automatically via
  `$HTTPS_PROXY`/`--cacert /root/.ccr/ca-bundle.crt`, but Playwright's `chromium.launch`
  needs the proxy passed explicitly (`proxy: { server: process.env.HTTPS_PROXY }`), and
  even then some external HTTPS destinations reset under the browser while succeeding
  via `curl`. Prefer `curl` for fetching third-party page source; reserve the browser
  for rendering/screenshotting *this* repo's own pages.
- `founder.html`'s scroll-reveal animation (`.reveal`/`.is-visible`, driven by
  `IntersectionObserver`) means a full-page Playwright screenshot taken immediately
  after `goto()` will show blank sections below the fold — they haven't intersected the
  viewport yet. Either scroll through the page first or run
  `document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'))`
  before capturing.
- The git relay backing this session can push/delete the harness-assigned branch and
  `main`, but `git push origin --delete <branch>` on a branch outside this session's
  scope (e.g. one left over from a different/older session) returns `HTTP 403`. Don't
  retry it or try to work around it — report it and point the user to the GitHub UI.

## 8. Keeping this file correct

When you change how agents should behave in this repo, update this file in the same
change set — don't let it drift into describing a process that no longer matches
reality (the way §2 above deliberately reflects "no board exists" instead of
prescribing one that doesn't). If a README or similar user-facing doc is ever added,
mirror any user-relevant rule change into it too.
