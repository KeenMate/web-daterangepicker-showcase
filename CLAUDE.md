# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Showcase/documentation site for `@keenmate/web-daterangepicker` - a date range picker library. Built with SvelteKit 2 + Svelte 5, using `@keenmate/svelte-docs` as the documentation framework. Outputs a fully static site via `@sveltejs/adapter-static`.

## Commands

- **Dev server:** `npm run dev` (port 5174)
- **Build:** `npm run build` (static output to `build/`)
- **Preview:** `npm run preview`
- **Type check:** `npm run check`
- **Docker build & run:** `make docker-build && make docker-run` (serves on port 8080)

No test suite or linter is configured.

## Architecture

- **SvelteKit static site** - all routes are prerendered (`prerender = true`, `ssr = true` in `+layout.server.ts`)
- **`@keenmate/svelte-docs`** provides the documentation shell: `ConfigProvider`, navigation, search, breadcrumbs, ToC, theming, and analytics. Site config (navigation tree, features, company info) lives in `src/routes/+layout.server.ts`
- **`@keenmate/web-daterangepicker`** is the library being documented. Its version is extracted at build time from its `package.json` and injected via Vite's `define` as `__DATERANGEPICKER_VERSION__`
- **Routes** are organized by documentation section: `src/routes/features/*` for feature pages, `src/routes/api/*` for API reference, `src/routes/getting-started/` for setup guide
- **Styling** uses Bootstrap 5 + SASS (`src/app.scss`), with theme set via `data-theme="docs"` attribute
- **`src/lib/`** is effectively empty; all shared logic comes from the two `@keenmate` packages

## Local Library Development

The Makefile has targets for linking a local copy of `@keenmate/web-daterangepicker` from the sibling `../web-daterangepicker` directory (the path is parameterised as `LIB_DIR` at the top of the Makefile):
- `make link-lib` — npm-link from the local library copy
- `make rebuild-lib` — rebuild the library and relink
- `make install-published` — drop the link and reinstall the published `@latest`

## Deployment

Static build is deployed via Docker (nginx) or CI workflows in `.github/workflows/` for dev, UAT, and production environments. Docker image registry: `registry.km8.es/web-daterangepicker-showcase`.
