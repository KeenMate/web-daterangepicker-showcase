# Changelog

All notable changes to the web-daterangepicker-showcase documentation site will be documented in this file.

## 2026-05-23 (later that day) — demo/code-snippet sync pass

Cross-checked every live `<web-daterangepicker>` demo against the `CodeBlock` shown next to it across all feature pages, plus the API/security pages. Found ~10 places where the code shown to readers referenced events, methods, callbacks, or CSS classes that don't exist in v1.13.0 — copy-pasting any of them would silently fail. Also found 6 sections wiring DOM listeners via inline `<script>` tags inside `{#snippet ...}`, which work on direct page load but don't re-execute on SvelteKit's client-side route transitions.

### Fixed (wrong API surface — code shown was misleading or broken)
- **`features/selection-modes` SM03** — replaced phantom `range-select` event with the actual `date-select` event, fixed `e.detail` shape (`e.detail.dateRange.start/.end`, not `e.detail.startDate/.endDate`)
- **`features/selection-modes` SM02** — `onSelect` callback signature corrected from two-arg `(startDate, endDate)` to single-arg `(dateRange)` with `.start`/`.end` access
- **`features/bulk-metadata-loading` BML01** — dropped a non-firing `addEventListener('monthchanged', …)` from the per-day demo (no such event exists); added comment explaining why per-day pickers have no separate event hook (the call counter inside `getDateMetadataCallback` is the only signal)
- **`features/date-restrictions` DR05** — `.drp-date-picker__day-cell.{class}` selectors corrected to `.drp-date-picker__day.{class}` in both the live demo's `customStylesCallback` and the code shown to readers (the badge selector `__badge-cell` was already correct)
- **`features/date-restrictions`** — removed ghost `getDateMetadata` callback name from the DR05 comparison table and the page-bottom Quick Reference (only `getDateMetadataCallback` exists); rewrote the surrounding strategy bullet to mention the real callback covers the combined disable + styling case
- **`api/security`** — removed ghost `onChange` callback row from the Safe Callbacks table; replaced with a real `date-select` / `change` events row and clarified that `onSelect` is JS-API-only (constructor option, not a web component property)

### Fixed (inline-script SPA-navigation fix)
- **`features/unified-navigation` UN03** — moved the `getUnifiedHeaderCallback` wiring from an inline `<script>` inside the snippet into the page's `onMount` (with `customElements.whenDefined` gate)
- **`features/input-masking` IM03** — moved the "typed vs displayed" output-pane listener into `onMount`, properly typed for TypeScript
- **`features/range-disabled-handling` RDH02–RDH06** — extracted five inline `<script>` blocks into a single `onMount` block with a `wireOutputPane(demoId, outputId, render)` helper. Also introduced a `toLocalISO()` helper to replace `date.toISOString().split('T')[0]` calls, which were carrying the same UTC-shift bug v1.11 had cleaned out of the library examples.

### Changed (cosmetic / clarity)
- **`features/positioning-modes`** — renumbered duplicate `PM03`: Modal Mode is now `PM04`, Auto-Engage on Small Viewports is now `PM05`
- **`features/auto-close` AC05** — preset-button example rewritten to use the public `el.selectedRanges = [{ start, end }]` setter instead of reaching into internals (`picker.selectedStartDate`, `focusedDayIndex = null`, manual `renderCalendar()` + `updateSummary()`). Added a "when to reach for internals" note for the bypass-validation edge case.
- **`features/bulk-metadata-loading` BML02** — added comment in the HTML CodeBlock pointing back at the JavaScript block readers also need to wire up
- **`features/special-dates` SD05** — replaced hardcoded `2025-04-XX` example dates with `dayOffset(N)` helpers so the example stays meaningful across years; the dynamic-availability code block also gained `toLocalISO()` instead of `toISOString().split('T')[0]`

## 2026-05-23

### Security
- **`npm audit` now reports `found 0 vulnerabilities`** (was 18: 1 low, 10 moderate, 7 high). Applied the upgrade set recommended in `@keenmate/svelte-docs`'s README:
  - Bumped `@keenmate/svelte-docs` from `^1.0.0-rc09` to `^1.0.0-rc11` (rc11 brought security fixes for `cookie` and `uuid` advisories via `@sveltejs/kit` / `mermaid` transitives)
  - Bumped `@sveltejs/kit` from `^2.47.1` to `^2.58.0` (direct-dep advisory — overrides can't fix this one)
  - Bumped `svelte` from `^5.41.0` to `^5.55.5` (direct-dep XSS advisories: SSR `<option>`, `bind:innerText`/`bind:textContent`, spread attributes, DOM clobbering)
  - Bumped `vite` from `^7.1.10` to `^7.3.2` (direct-dep path-traversal advisories in optimized deps `.map` handling, `server.fs.deny` bypass, dev-server WebSocket arbitrary file read)
  - Added the `overrides` block from svelte-docs README — pins transitives `cookie`, `uuid`, `picomatch`, `devalue`, `dompurify`, `immutable`, `lodash-es`, `postcss`, `rollup` to patched versions

### Changed
- **Makefile rewritten** — replaced all `svelte-treeview` leftovers (forked project name from the original treeview showcase) with `web-daterangepicker` equivalents. `LIB_DIR` and `LIB_PACKAGE` parameterised at the top; Docker image name, container name, status output, header comments, and `link-lib` / `rebuild-lib` / `build-lib` targets all point at the right library now. `docs-check` rewritten to list real daterangepicker showcase pages instead of the old treeview examples.
- `CLAUDE.md` — Local Library Development and Deployment sections updated to match the cleaned-up Makefile.

### Removed
- `nul` stray file in repo root (Windows shell artifact from a prior session).

## 2026-05-22

### Changed
- Updated `@keenmate/web-daterangepicker` to **v1.13.0**
- **API Reference: removed non-existent surface** (these were never dispatched/exposed by the library; documenting them was actively misleading):
  - DOM events: `calendar-show`, `calendar-hide`, `date-change`
  - Methods: `destroy()`, `getSelectedDate()`, `getSelectedRange()`
  - Callback property: `onSelect`
- **API Reference: added missing HTML attributes** to the attributes table:
  - `input-size` (was present since v1.4.0 but never listed)
  - `disabled-dates` (new in v1.13)
  - `date-member`, `badge-text-member`, `badge-class-member`, `badge-tooltip-member`, `day-class-member`, `day-tooltip-member`, `is-disabled-member` (all new in v1.13 — full attribute parity with the `*Member` JS properties)

### Added (showcase docs for v1.13.0)
- **API Reference: new "Properties (Complex Data & State)" section** documenting:
  - Complex-data property setters: `specialDates`, `disabledDates`, `actionButtons`, `customStrings`, `monthNames`, the seven `*Member` mappings
  - Reactive selection state: `selectedDate`, `selectedDates`, `selectedRanges`, `isOpen`, `value`
  - **Property-wins precedence rule** when both an attribute and a property are set
  - Note about v1.11 non-destructive `updateOptions()` routing
- **API Reference: ~50 missing CSS custom properties** added, including:
  - `--drp-rem` — the global scale knob (most important theming hook)
  - v1.13 hover-preview opacities (`--drp-day-hover-preview-bg-opacity`, `--drp-day-hover-preview-invalid-bg-opacity`)
  - v1.12 modal mode (`--drp-modal-gap`, `--drp-modal-backdrop-bg`, `--drp-modal-transition`, `--drp-modal-width-xs/sm/md/lg`)
  - Message colors (4 types × bg/color/border = 12 variables)
  - Z-index layers, opacity tokens, calendar dimensions
  - Day cell modifiers: range hover, drag preview, drag invalid, focused outline width/offset, selected hover color, disabled bg/pattern opacity
  - Typography scale completion: `--drp-font-size-2xs/xl/2xl`, three line-height tokens
  - Tooltip line-height + arrow-size
- **API Reference: "Weekend & Weekday Hooks (v1.13)" section** documenting the new `.drp-date-picker__day--weekend` modifier and per-day `[data-weekday]` attribute (pure theming surface; no defaults shipped)
- **Range Disabled Handling page**: new RDH08 section documenting **live hover preview** — the v1.13 flagship feature. Shows per-mode behavior (`allow` / `prevent` / `block` / `split`), CSS theming hooks, cleanup triggers, and the start-day legibility fix
- **Internationalization page (INT04)** rewritten: `customStrings` and `monthNames` are now property setters on the web component (no longer "JavaScript API only" — v1.13 lifted that limitation). Added pre-upgrade assignment guidance.
- **Date Restrictions page (DR03)** updated: documents the new declarative `disabled-dates="…"` HTML attribute (v1.13) alongside the existing JS-property path. Property-wins precedence noted.
- **Special Dates page (SD04)** updated: documents the seven new `*-member` HTML attributes (v1.13) — full declarative parity with the JS `*Member` setters
- **Input Masking page (IM06)** added: documents the v1.13 separator change (`" to "` → `" - "`) and the new accepted compact form (`2026-06-10-2026-06-15`). Includes migration note for tests/scripts.
- **Auto-Close page (AC04)** updated: documents the v1.12 `show-summary` attribute for hiding the days/nights line in range mode.

### Removed
- `CHANGES_NEEDED.md` (root) — the multi-tier hotel pricing TODO it described was already applied to `/features/bulk-metadata-loading` in a prior pass.

## 2025-12-31

### Changed
- **Version Badge Implementation** - Switched to compile-time constant via Vite's `define` option (matching svelte-treeview-showcase pattern)
  - Version now read from `package-lock.json` at build time
  - Handles both normal npm installs and `file:` links for local development
  - Removed runtime package.json import from `+layout.server.ts`
  - Simpler, more reliable implementation

- **API Reference Page Updated to v1.9.3** - Comprehensive update to reflect current API:
  - Removed outdated "Version 1.3.0" reference and "New in v1.3.0" labels from all sections
  - Added missing callback: `getMonthHeaderCallback` (custom individual month header text)
  - Added missing attributes: `enable-transitions`, `show-debug-info`
  - Added missing methods: `setMonthNames()`, `setRollingItemAlignment()`
  - Added new "Loading & Tooltip Variables" section with CSS variables:
    - Loading: `--drp-loading-overlay-bg`, `--drp-loading-spinner-color`, `--drp-loading-spinner-accent`, `--drp-loading-spinner-size`, `--drp-loading-spinner-border-width`
    - Tooltip: `--drp-tooltip-bg`, `--drp-tooltip-text-color`, `--drp-tooltip-max-width`
  - Added missing CSS variables: `--drp-badge-row-height`, `--drp-border`

## 2025-12-29

### Changed
- Updated `@keenmate/web-daterangepicker` to v1.9.3

### Fixed (web-daterangepicker v1.9.3 documentation)
- **BREAKING: Variable Naming Consistency** - Updated all documentation to reflect v1.9.3 renames:

  **background → bg:**
  | Old | New |
  |-----|-----|
  | `--drp-dropdown-background` | `--drp-dropdown-bg` |
  | `--drp-tooltip-background` | `--drp-tooltip-bg` |
  | `--drp-loading-overlay-background` | `--drp-loading-overlay-bg` |
  | `--drp-input-background` | `--drp-input-bg` |
  | `--drp-input-background-disabled` | `--drp-input-bg-disabled` |

  **Added -color suffix:**
  | Old | New |
  |-----|-----|
  | `--drp-text-on-accent` | `--drp-text-color-on-accent` |

- Updated pages: API Reference, Custom Styling, Getting Started, Theming

## 2025-12-28

### Changed
- Updated `@keenmate/web-daterangepicker` to v1.9.2

### Added (web-daterangepicker v1.9.1/1.9.2 documentation)
- **API Reference**: Added new CSS variables:
  - `--drp-day-border`, `--drp-day-drag-border` - Day cell borders
  - `--drp-button-bg`, `--drp-button-color`, `--drp-button-border` - Button styling
  - `--drp-summary-border` - Summary section border
- **Theming page**: Added loading spinner size variables:
  - `--drp-loading-spinner-size`, `--drp-loading-spinner-border-width`
- **Theming page**: Renamed `--drp-button-text-color` → `--drp-button-accent-text-color` in all examples (v1.9.2 breaking change)

### Fixed (web-daterangepicker v1.9.0 documentation)
- **Input Border Variables Renamed** - Updated all documentation to reflect v1.9.0 breaking changes:
  - `--drp-input-border-color` → `--drp-input-border` (full border string)
  - `--drp-input-border-color-hover` → `--drp-input-border-hover`
  - `--drp-input-border-color-focus` → `--drp-input-border-focus`
- Updated pages: API Reference, Custom Styling, Getting Started, Theming
- Code examples now show full border syntax (e.g., `1px solid #color`)

## 2025-12-11

### Changed
- Updated `@keenmate/web-daterangepicker` to v1.8.0

### Added (web-daterangepicker v1.8.0 documentation)
- **Border Radius Variables** - Added `--drp-border-radius-sm/md/lg` to API page Layout section
  - sm (4px): day cells, tooltips
  - md (6px): input, buttons
  - lg (8px): calendar, selectors
- **Theme-Designer Integration** - Updated API page to show `--base-*` variable references:
  - Input border colors now reference `--base-input-border-color*`
  - Input heights now reference `--base-input-size-*-height`

### Fixed (v1.6.0 documentation cleanup)
- **Applied v1.6.0 CSS variable renames** - Fixed all remaining occurrences that were missed:
  - Theming page: `--drp-card-bg` → `--drp-dropdown-background`, `--drp-accent-text-color` → `--drp-text-on-accent`
  - API page: `--drp-accent-text-color` → `--drp-text-on-accent`, `--drp-input-disabled-background` → `--drp-input-background-disabled`
- **Added Loading Overlay Theming section** to Theming page (v1.6.0 feature)
- Custom Month Headers page was already created at `/features/custom-month-headers`
- Bulk Metadata Loading `monthHeaders` example already documented in Custom Month Headers page (CMH02)

## 2025-12-08

### Changed (web-daterangepicker v1.7.0)
- **BREAKING: Removed Sizing Attributes** - The `spacing`, `font-size`, and `cell-size` attributes have been removed
  - Use `--drp-rem` CSS variable for global scaling (e.g., `style="--drp-rem: 15px"`)
  - Use individual CSS variables (`--drp-spacing-*`, `--drp-font-size-*`) for fine-grained control
- **Complete Rewrite of Custom Styling Page** - Updated to use new CSS variable approach:
  - New "Calendar Scaling with --drp-rem" section with scale classes (scale-xs/sm/md/lg/xl)
  - New "Fine-Grained Control" section for individual variable overrides
  - Added v1.7.0 breaking change warning
  - Updated Quick Reference tables
- **Updated API Reference Page** - Removed `cell-size`, `font-size`, `spacing` from attributes table
- **Fixed Bulk Metadata Loading** - Replaced broken MutationObserver (was checking non-existent `drp-date-picker--open` class) with input focus event listener
- **Updated API Page** - Fixed outdated CSS variable name `--drp-card-bg` → `--drp-dropdown-background`
- Updated `@keenmate/web-daterangepicker` to v1.7.0

### Fixed (web-daterangepicker v1.7.0)
- **RDH04 'block' Mode**: Forward selection now works correctly - allows visual preview over disabled dates, then snaps on completion
- **RDH07 Visual Highlighting**: `highlight-disabled-in-range` option now shows visible difference - disabled dates in range show blue tint when enabled
- **KN01 Keyboard Navigation**: Ctrl+Home/End now respect `rolling-year-range`, `min-date`, and `max-date` constraints
- **monthHeaders Key Format**: Fixed key format to use 1-based months (January = "2025-01")

## 2025-12-04

### Added (web-daterangepicker v1.6.0)
- **Custom Month Headers**: New `getMonthHeaderCallback` option to customize individual month header text (e.g., "Jan 2026 (10 rooms)")
- **Month Headers from Callback**: `beforeMonthChangedCallback` can now return `monthHeaders` map to set header text when loading async data
- **Themeable Loading Overlay**: New CSS variables for loading overlay styling:
  - `--drp-loading-overlay-background`
  - `--drp-loading-spinner-color`
  - `--drp-loading-spinner-accent`

### Changed
- **BREAKING: Unified CSS Variable Names** - Several CSS variables renamed for consistency across KeenMate components:
  - `--drp-accent-text-color` → `--drp-text-on-accent`
  - `--drp-input-disabled-background` → `--drp-input-background-disabled`
  - `--drp-card-bg` → `--drp-dropdown-background`
  - `--drp-tooltip-bg` → `--drp-tooltip-background`
  - `--drp-tooltip-color` → `--drp-tooltip-text-color`

## 2025-11-28

### Changed
- Updated `@keenmate/web-daterangepicker` to v1.5.0 (10px-based sizing system)
- Updated API page input size table with new height values (3.1rem-4.1rem / 31px-41px)
- Updated Custom Styling page input size demos and documentation with new values

## 2025-11-27

### Added
- New "Input Size (New in v1.4.0)" section on `/features/custom-styling` page showcasing all 5 input size variants
- New "Coordinated Input + Calendar Sizing" section demonstrating mixed sizing strategies
- Updated Quick Reference table with `input-size` attribute

### Changed
- Updated `@keenmate/web-daterangepicker` to v1.4.0 (adds `input-size` attribute)
- Updated `@keenmate/svelte-docs` to rc09
- Migrated analytics configuration to new `analyticsScripts` format (replaces provider-specific `analytics.plausible`)
- Enhanced Hotel Booking demo on `/features/bulk-metadata-loading` with multi-tier pricing summary (matching `/features/custom-summary`)
- Updated Custom Styling page description to reflect four sizing systems (input, font, spacing, cell)

## 2025-11-24

### Added
- Plausible analytics integration (web-daterangepicker.keenmate.dev)
