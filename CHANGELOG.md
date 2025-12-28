# Changelog

All notable changes to the web-daterangepicker-showcase documentation site will be documented in this file.

## 2025-12-28

### Changed
- Updated `@keenmate/web-daterangepicker` to v1.9.0

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
