# Seyu Solutions website

Static marketing website for Seyu Solutions. This repository contains the company, agency, founder and legal pages, built from HTML, CSS and a small browser script with Vite.

**Published site:** https://moldovancsaba.github.io/seyusolutions/

This is the marketing website source. The fan-photo services described in its copy are not implemented as a backend or event application here. Contact links open the visitor's email client at `info@seyusolutions.com`.

## Find the right page

| Page | Source | Purpose |
| --- | --- | --- |
| Company | `index.html` | Main marketing page |
| Agencies | `marketing-agency.html` | Agency-facing information |
| Founder | `founder.html` | Founder profile |
| Terms | `gtc.html` | Terms and conditions |
| Privacy | `privacy.html` | Privacy information |
| Cookies | `cookie-policy.html` | Cookie information |

Shared styling lives in `src/style.css`. The founder page has its own `src/founder.css` and `src/founder.js`; its script handles theme preference in local storage and reveal effects. Static assets, the sitemap and robots file live under `public/`. There is no server, database, account system or payment processing in this repository.

## Run locally

Use Node.js 24, verified for the current dependency refresh. Vite's locked version also declares support for Node.js `^20.19.0 || >=22.12.0`.

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. The project base is `/seyusolutions/`; use that path when following local links.

To check the published output:

```sh
npm run build
npm run preview
```

Open the preview address with `/seyusolutions/` appended. All six HTML pages must be produced in `dist/` and load under that base path. No separate automated test or lint script is configured; do not substitute a nonexistent command for the build and page checks.

## Change and publish

Read the [repository operating guide](CLAUDE.md) and [repository contribution policy](AI_ATTRIBUTION_POLICY.md) before changing files. Record findings and fixes in [ISSUE_AUDIT.md](ISSUE_AUDIT.md), the product's existing running audit log. The [portfolio welcome task](https://github.com/moldovancsaba/mvp-factory-control/issues/930) tracks this documentation delivery, not general product ownership.

Before committing, run a clean build with zero build warnings or errors. For visual changes, inspect desktop and mobile layouts across affected pages, including light and dark founder themes. When adding an HTML page, update `vite.config.js`, `public/sitemap.xml` and navigation as required by the operating guide. Do not invent business statistics, biographical facts or legal claims.

The existing [deployment workflow](.github/workflows/deploy.yml) runs on pushes to `main` or manual dispatch. It installs dependencies using Node.js 20, builds `dist/` and publishes that directory to the `gh-pages` branch. Check the actual workflow result and the published destination after a push; a successful commit alone does not establish a successful publication. For recovery, revert the faulty change and verify the resulting deployment and pages.

## Maintenance notes

The private build package intentionally remains at version `0.0.0`; it is not a published package. Git commits identify website revisions. Keep release details in the audit log rather than introducing package releases or a separate changelog.

The 19 October 2026 candidate check built and previewed all six pages with no build warnings or errors. The bounded lockfile refresh retained the existing Vite manifest range and returned zero advisories at that check; future dependency reports can change. Historical audit entries describe their own revision and are not blanket assertions about today's website. Existing social-image and historical-reference follow-ups remain in the audit and operating guide.
