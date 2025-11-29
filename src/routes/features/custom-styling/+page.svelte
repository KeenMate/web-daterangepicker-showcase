<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Custom Styling & Sizing"
	descriptionText="Four independent sizing systems for input, font, spacing, and cell dimensions, plus complete theming control via CSS custom properties"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				The date picker provides four independent sizing systems that can be controlled via attributes,
				plus complete theming via CSS custom properties.
			</p>
			<p>
				<strong>Four Independent Systems:</strong>
			</p>
			<ul>
				<li><code>input-size</code> attribute - Controls input field size (floating mode only) <span class="badge bg-success">New in v1.4.0</span></li>
				<li><code>font-size</code> attribute - Controls calendar text size only</li>
				<li><code>spacing</code> attribute - Controls calendar gaps, padding, margins only</li>
				<li><code>cell-size</code> attribute - Controls day cell dimensions and structural sizes only</li>
			</ul>
			<p>
				All four systems use the same 5-level scale: <code>xs</code>, <code>sm</code>, <code>md</code> (default), <code>lg</code>, <code>xl</code>
			</p>
		</section>

		<!-- Input Size (New in v1.4.0) -->
		<ShowcaseSection
			titleText="Input Size (New in v1.4.0)"
			subtitleText="Control input field size independently from calendar size"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<div class="mb-4">
					<label class="form-label fw-bold">Extra Small Input (xs)</label>
					<web-daterangepicker
						input-size="xs"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Very compact input - 3.1rem (31px) height</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Small Input (sm)</label>
					<web-daterangepicker
						input-size="sm"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Compact input - 3.3rem (33px) height</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Medium Input (md - default)</label>
					<web-daterangepicker
						input-size="md"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Normal input - 3.5rem (35px) height</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Large Input (lg)</label>
					<web-daterangepicker
						input-size="lg"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Spacious input - 3.8rem (38px) height</small>
				</div>

				<div>
					<label class="form-label fw-bold">Extra Large Input (xl)</label>
					<web-daterangepicker
						input-size="xl"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Touch-friendly input - 4.1rem (41px) height</small>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Input size variants -->
<web-daterangepicker input-size="xs"></web-daterangepicker>
<web-daterangepicker input-size="sm"></web-daterangepicker>
<web-daterangepicker input-size="md"></web-daterangepicker>
<web-daterangepicker input-size="lg"></web-daterangepicker>
<web-daterangepicker input-size="xl"></web-daterangepicker>

<!-- Coordinated input + calendar sizing -->
<web-daterangepicker
  input-size="lg"
  spacing="lg"
  font-size="lg"
  cell-size="lg">
</web-daterangepicker>

<!-- Mixed: large input with compact calendar -->
<web-daterangepicker
  input-size="xl"
  spacing="sm"
  font-size="sm"
  cell-size="sm">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>New in v1.4.0</h5>
					<p>The <code>input-size</code> attribute controls the input field dimensions independently from calendar sizing.</p>

					<h5>Available Sizes</h5>
					<ul>
						<li><code>xs</code> - 3.1rem / 31px (very compact)</li>
						<li><code>sm</code> - 3.3rem / 33px (compact)</li>
						<li><code>md</code> - 3.5rem / 35px (default)</li>
						<li><code>lg</code> - 3.8rem / 38px (spacious)</li>
						<li><code>xl</code> - 4.1rem / 41px (touch-friendly)</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Floating mode only</strong> - This attribute applies to the input field in floating/popup mode</li>
						<li><strong>Coordinated sizing</strong> - Use same size for input and calendar for consistent UI</li>
						<li><strong>Mixed sizing</strong> - Large touch-friendly input with compact popup calendar</li>
					</ul>

					<h5>CSS Variables</h5>
					<p>Each size has corresponding CSS variables:</p>
					<ul class="small">
						<li><code>--drp-input-size-{'{size}'}-font</code></li>
						<li><code>--drp-input-size-{'{size}'}-padding-v</code></li>
						<li><code>--drp-input-size-{'{size}'}-padding-h</code></li>
						<li><code>--drp-input-size-{'{size}'}-height</code></li>
						<li><code>--drp-input-size-{'{size}'}-icon-size</code></li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Coordinated Input + Calendar Sizing -->
		<ShowcaseSection
			titleText="Coordinated Input + Calendar Sizing"
			subtitleText="Combine input-size with calendar sizing for consistent UI"
			col1Title="Live Demo"
			col2Title="Code"
			col3Title="Details">

			{#snippet demoContent()}
				<div class="mb-4">
					<label class="form-label fw-bold">All Small (sm)</label>
					<web-daterangepicker
						input-size="sm"
						spacing="sm"
						font-size="sm"
						cell-size="sm"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Compact input with compact calendar</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">All Large (lg)</label>
					<web-daterangepicker
						input-size="lg"
						spacing="lg"
						font-size="lg"
						cell-size="lg"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Large input with large calendar</small>
				</div>

				<div>
					<label class="form-label fw-bold">Mixed: XL Input + SM Calendar</label>
					<web-daterangepicker
						input-size="xl"
						spacing="sm"
						font-size="sm"
						cell-size="sm"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Large touch target, compact popup</small>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- All Small -->
<web-daterangepicker
  input-size="sm"
  spacing="sm"
  font-size="sm"
  cell-size="sm">
</web-daterangepicker>

<!-- All Large -->
<web-daterangepicker
  input-size="lg"
  spacing="lg"
  font-size="lg"
  cell-size="lg">
</web-daterangepicker>

<!-- Mixed sizing -->
<web-daterangepicker
  input-size="xl"
  spacing="sm"
  font-size="sm"
  cell-size="sm">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Consistent UI</h5>
					<p>For consistent visual design, use the same size value across all four attributes.</p>

					<h5>Mixed Sizing Strategy</h5>
					<p>Sometimes you want different sizes for input and calendar:</p>
					<ul>
						<li><strong>Large input + compact calendar</strong> - Touch-friendly input that opens a space-efficient popup</li>
						<li><strong>Small input + large calendar</strong> - Compact form field with spacious date selection</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Three Independent Sizing Systems (Calendar) -->
		<ShowcaseSection
			titleText="Calendar Sizing Systems"
			subtitleText="Control font, spacing, and cell dimensions independently"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="How It Works">

			{#snippet demoContent()}
				<div class="mb-4">
					<label class="form-label fw-bold">Large Font + Compact Spacing + Medium Cells</label>
					<web-daterangepicker
						font-size="lg"
						spacing="xs"
						cell-size="md"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Readable text in a tight layout with normal cells</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Small Font + Spacious Layout + Small Cells</label>
					<web-daterangepicker
						font-size="sm"
						spacing="lg"
						cell-size="sm"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Compact text with generous spacing and small cells</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">XL Font + XL Spacing + XL Cells</label>
					<web-daterangepicker
						font-size="xl"
						spacing="xl"
						cell-size="xl"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Maximum size for everything - very touch-friendly</small>
				</div>

				<div>
					<label class="form-label fw-bold">XL Font + XS Spacing + SM Cells</label>
					<web-daterangepicker
						font-size="xl"
						spacing="xs"
						cell-size="sm"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Large readable text in ultra-compact layout</small>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Independent control examples -->
<web-daterangepicker
  font-size="lg"
  spacing="xs"
  cell-size="md">
</web-daterangepicker>

<web-daterangepicker
  font-size="sm"
  spacing="lg"
  cell-size="sm">
</web-daterangepicker>

<web-daterangepicker
  font-size="xl"
  spacing="xl"
  cell-size="xl">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML - Independent Attributes"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Independence</h5>
					<p>Each system works independently - combine them any way you like!</p>
					<ul>
						<li><strong>Font Size:</strong> <code>font-size="xs|sm|md|lg|xl"</code> - Text size only</li>
						<li><strong>Spacing:</strong> <code>spacing="xs|sm|md|lg|xl"</code> - Gaps, padding, margins only</li>
						<li><strong>Cell Size:</strong> <code>cell-size="xs|sm|md|lg|xl"</code> - Day cell dimensions only</li>
					</ul>

					<h5>Scale Values</h5>
					<ul>
						<li><code>xs</code> - 0.6× scale (60% of normal size)</li>
						<li><code>sm</code> - 0.8× scale (80% of normal size)</li>
						<li><code>md</code> - 1.0× scale (baseline, default)</li>
						<li><code>lg</code> - 1.5× scale (150% of normal size)</li>
						<li><code>xl</code> - 2.0× scale (200% of normal size)</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Uniform Sizing Examples -->
		<ShowcaseSection
			titleText="Uniform Sizing"
			subtitleText="All three systems scaled together uniformly"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Use Cases">

			{#snippet demoContent()}
				<div class="mb-4">
					<label class="form-label fw-bold">Extra Small (Very Compact) - 0.6× scale</label>
					<web-daterangepicker
						font-size="xs"
						spacing="xs"
						cell-size="xs"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Small (Compact) - 0.8× scale</label>
					<web-daterangepicker
						font-size="sm"
						spacing="sm"
						cell-size="sm"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Medium (Default) - 1.0× scale</label>
					<web-daterangepicker
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">No attributes needed for default size</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Large (Spacious) - 1.5× scale</label>
					<web-daterangepicker
						font-size="lg"
						spacing="lg"
						cell-size="lg"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
				</div>

				<div>
					<label class="form-label fw-bold">Extra Large (Very Large) - 2.0× scale</label>
					<web-daterangepicker
						font-size="xl"
						spacing="xl"
						cell-size="xl"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Extra Small - Very compact (60%) -->
<web-daterangepicker
  font-size="xs"
  spacing="xs"
  cell-size="xs">
</web-daterangepicker>

<!-- Small - Compact (80%) -->
<web-daterangepicker
  font-size="sm"
  spacing="sm"
  cell-size="sm">
</web-daterangepicker>

<!-- Medium - Default (100%, no attributes needed) -->
<web-daterangepicker></web-daterangepicker>

<!-- Large - Spacious (150%) -->
<web-daterangepicker
  font-size="lg"
  spacing="lg"
  cell-size="lg">
</web-daterangepicker>

<!-- Extra Large - Very Large (200%) -->
<web-daterangepicker
  font-size="xl"
  spacing="xl"
  cell-size="xl">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>When to Use Uniform Sizing</h5>
					<ul>
						<li><strong>xs</strong> - Dense dashboards, data tables, compact layouts</li>
						<li><strong>sm</strong> - Mobile apps, modals, forms</li>
						<li><strong>md</strong> - Default size, general use</li>
						<li><strong>lg</strong> - Desktop applications, spacious layouts</li>
						<li><strong>xl</strong> - Touch interfaces, accessibility, presentations</li>
					</ul>

					<h5>Balanced Proportions</h5>
					<p>Using the same size for all three systems creates balanced, proportional calendars.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Compact Grid Layout -->
		<ShowcaseSection
			titleText="Compact Grid Layout"
			subtitleText="Dense dashboard calendar at 60% scale"
			col1Title="Live Demo"
			col2Title="Code Example"
			col3Title="Details">

			{#snippet demoContent()}
				<div>
					<label class="form-label fw-bold">Compact 2×3 Grid (Extra Small - 60%)</label>
					<web-daterangepicker
						font-size="xs"
						spacing="xs"
						cell-size="xs"
						selection-mode="single"
						positioning-mode="inline"
						visible-months-count="6"
						month-layout="grid"
						grid-rows="2"
						grid-columns="3"></web-daterangepicker>
					<small class="text-muted">Dense dashboard calendar</small>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Compact grid for dashboards -->
<web-daterangepicker
  font-size="xs"
  spacing="xs"
  cell-size="xs"
  positioning-mode="inline"
  visible-months-count="6"
  month-layout="grid"
  grid-rows="2"
  grid-columns="3">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Case</h5>
					<p><strong>Extra Small (xs)</strong> - Perfect for dense dashboards with limited space</p>

					<h5>Grid Layout Requirements</h5>
					<p><code>visible-months-count</code> must equal <code>grid-rows × grid-columns</code></p>
					<p>Example: 2 rows × 3 columns = 6 months</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Touch-Friendly Grid Layout -->
		<section class="mb-5">
			<div class="card">
				<div class="card-body">
					<h3 class="card-title">Touch-Friendly 2×3 Grid (Large - 150%)</h3>
					<p class="card-text text-muted mb-4">
						Large calendar with generous touch targets - ideal for touch interfaces and accessibility
					</p>

					<web-daterangepicker
						font-size="lg"
						spacing="lg"
						cell-size="lg"
						selection-mode="single"
						positioning-mode="inline"
						visible-months-count="6"
						month-layout="grid"
						grid-rows="2"
						grid-columns="3"></web-daterangepicker>

					<div class="mt-4">
						<h5>Code</h5>
						<CodeBlock
							codeContent={`<!-- Touch-friendly large grid -->
<web-daterangepicker
  font-size="lg"
  spacing="lg"
  cell-size="lg"
  positioning-mode="inline"
  visible-months-count="6"
  month-layout="grid"
  grid-rows="2"
  grid-columns="3">
</web-daterangepicker>`}
							languageType="html"
							titleText="HTML"
						/>
					</div>

					<div class="alert alert-info mt-4">
						<strong>Perfect for:</strong> Touch interfaces, accessibility requirements, kiosks, and presentation mode where users need large, easy-to-tap targets.
					</div>
				</div>
			</div>
		</section>

		<!-- CSS Custom Properties -->
		<ShowcaseSection
			titleText="CSS Custom Properties (Theming)"
			subtitleText="Customize colors, borders, and more with CSS variables"
			col1Title="Available Variables"
			col2Title="Code Examples"
			col3Title="How to Use">

			{#snippet demoContent()}
				<div class="prose">
					<div class="alert alert-info mb-4">
						<h6 class="alert-heading">🆕 New in v1.3.0: Semantic Component Variables</h6>
						<p class="mb-2">
							Version 1.3.0 adds 60+ semantic CSS variables for component-specific customization.
							Each component (input, buttons, days, headers) now has dedicated variables for complete styling independence.
						</p>
						<p class="mb-0">
							<strong>Total available:</strong> 90+ CSS custom properties
						</p>
					</div>

					<h6>Base Color Variables</h6>
					<ul class="small">
						<li><code>--drp-card-bg</code> - Calendar background (#ffffff)</li>
						<li><code>--drp-accent-color</code> - Primary accent (#3b82f6)</li>
						<li><code>--drp-accent-color-hover</code> - Accent hover (#2563eb)</li>
						<li><code>--drp-text-primary</code> - Primary text (#111827)</li>
						<li><code>--drp-text-secondary</code> - Secondary text (#6b7280)</li>
						<li><code>--drp-border-color</code> - Border color (#e5e7eb)</li>
						<li><code>--drp-primary-bg</code> - Primary background (#f3f4f6)</li>
						<li><code>--drp-primary-bg-hover</code> - Primary hover (#e5e7eb)</li>
					</ul>

					<h6>Component-Specific Variables (New in v1.3.0)</h6>
					<ul class="small">
						<li><strong>Input:</strong> <code>--drp-input-background</code>, <code>--drp-input-color</code>, <code>--drp-input-border-color</code>, and 9 more</li>
						<li><strong>Buttons:</strong> <code>--drp-button-today-color</code>, <code>--drp-button-apply-bg</code>, and 8 more</li>
						<li><strong>Day Cells:</strong> <code>--drp-day-text-color</code>, <code>--drp-day-selected-bg</code>, and 10 more</li>
						<li><strong>Header/Nav:</strong> <code>--drp-header-text-color</code>, <code>--drp-nav-bg-hover</code>, and 14 more</li>
						<li><strong>Badges:</strong> <code>--drp-badge-number-bg</code>, <code>--drp-badge-count-bg</code>, and 4 more</li>
					</ul>

					<h6>Spacing Variables</h6>
					<ul class="small">
						<li><code>--drp-spacing-xs</code> - Extra small (0.25rem)</li>
						<li><code>--drp-spacing-sm</code> - Small (0.5rem)</li>
						<li><code>--drp-spacing-md</code> - Medium (1rem)</li>
						<li><code>--drp-spacing-lg</code> - Large (1.5rem)</li>
						<li><code>--drp-spacing-xl</code> - Extra large (2rem)</li>
					</ul>

					<h6>Typography Variables</h6>
					<ul class="small">
						<li><code>--drp-font-size-base</code> - Base font size (1rem)</li>
						<li><code>--drp-font-size-sm</code> - Small (0.875rem)</li>
						<li><code>--drp-font-size-lg</code> - Large (1.125rem)</li>
						<li><code>--drp-font-weight-medium</code> - Medium weight (500)</li>
						<li><code>--drp-font-weight-semibold</code> - Semibold (600)</li>
					</ul>

					<h6>Other Variables</h6>
					<ul class="small">
						<li><code>--drp-border-radius</code> - Border radius (0.375rem)</li>
						<li><code>--drp-shadow-xl</code> - Extra large shadow</li>
						<li><code>--drp-transition-fast</code> - Fast transition (150ms)</li>
					</ul>

					<p class="mt-3">
						<strong>Complete list:</strong> See
						<a href="https://github.com/keenmate/web-daterangepicker/blob/main/API.md#css-custom-properties" target="_blank">API Reference - CSS Custom Properties</a>
						for all 90+ variables.
					</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`/* Custom green theme */
web-daterangepicker {
  --drp-accent-color: #10b981;
  --drp-accent-color-hover: #059669;
  --drp-border-radius: 0.5rem;
}

/* Dark theme */
web-daterangepicker.dark-theme {
  --drp-card-bg: #1e293b;
  --drp-text-primary: #f1f5f9;
  --drp-text-secondary: #cbd5e1;
  --drp-border-color: #334155;
  --drp-accent-color: #3b82f6;
  --drp-accent-color-hover: #2563eb;
  --drp-primary-bg: #334155;
  --drp-primary-bg-hover: #475569;
}

/* Purple brand colors */
web-daterangepicker.brand-purple {
  --drp-accent-color: #8b5cf6;
  --drp-accent-color-hover: #7c3aed;
}

/* Blue theme */
web-daterangepicker.theme-blue {
  --drp-accent-color: #3b82f6;
  --drp-accent-color-hover: #2563eb;
}

/* Red theme */
web-daterangepicker.theme-red {
  --drp-accent-color: #ef4444;
  --drp-accent-color-hover: #dc2626;
}`}
					languageType="css"
					titleText="CSS"
				/>

				<CodeBlock
					codeContent={`<!-- Apply theme via class -->
<web-daterangepicker class="dark-theme"></web-daterangepicker>

<!-- Or inline styles (not recommended) -->
<web-daterangepicker
  style="--drp-accent-color: #10b981;">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// Dynamic theme switching
const picker = document.querySelector('web-daterangepicker');

// Apply dark theme
picker.classList.add('dark-theme');

// Switch themes
picker.classList.remove('theme-blue');
picker.classList.add('theme-red');

// Or set CSS variable directly
picker.style.setProperty('--drp-accent-color', '#10b981');`}
					languageType="javascript"
					titleText="JavaScript"
				/>

				<CodeBlock
					codeContent={`/* Component-Specific Customization (v1.3.0+) */

/* Customize just the input */
web-daterangepicker {
  --drp-input-background: #f0f0f0;
  --drp-input-border-color: #999;
  --drp-input-border-color-focus: #10b981;
}

/* Customize buttons independently */
web-daterangepicker {
  --drp-button-today-color: green;
  --drp-button-apply-bg: purple;
  --drp-button-clear-color: red;
}

/* Customize day cells without affecting buttons */
web-daterangepicker {
  --drp-day-selected-bg: #f59e0b;
  --drp-day-selected-color: white;
  --drp-day-bg-hover: #fef3c7;
}`}
					languageType="css"
					titleText="Component-Specific Variables (v1.3.0)"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>How CSS Variables Work</h5>
					<p>The component defines all variables with <code>:host</code> inside its Shadow DOM. You can override them from outside:</p>
					<ul>
						<li><strong>Global</strong> - Target <code>web-daterangepicker</code> selector</li>
						<li><strong>Scoped</strong> - Add a class and target <code>web-daterangepicker.your-class</code></li>
						<li><strong>Instance</strong> - Use inline styles (not recommended)</li>
					</ul>

					<h5>Benefits</h5>
					<ul>
						<li><strong>Scoped</strong> - Theme individual pickers differently</li>
						<li><strong>Dynamic</strong> - Change themes at runtime with JavaScript</li>
						<li><strong>Maintainable</strong> - No need to modify component source</li>
						<li><strong>Performant</strong> - Browser-native CSS variable support</li>
					</ul>

					<h5>v1.3.0: Component Independence</h5>
					<p>The decoupled architecture means:</p>
					<ul>
						<li><strong>Independent styling</strong> - Customize inputs without affecting calendar</li>
						<li><strong>Component isolation</strong> - Change button colors without affecting day cells</li>
						<li><strong>Flexible theming</strong> - Override base OR semantic variables</li>
						<li><strong>Backwards compatible</strong> - All existing themes still work</li>
					</ul>

					<h5>Complete Documentation</h5>
					<p>See <a href="https://github.com/keenmate/web-daterangepicker/blob/main/API.md#css-custom-properties" target="_blank">API.md - CSS Custom Properties</a> for:</p>
					<ul>
						<li>Full list of all 90+ variables</li>
						<li>Default values for each variable</li>
						<li>Dark theme example</li>
						<li>Multiple theme switching</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Input Field Styling -->
		<section class="mb-5">
			<div class="alert alert-info">
				<h4 class="alert-heading">ℹ️ Input Field Styling (Updated in v1.3.0)</h4>
				<p>
					<strong>v1.3.0 adds comprehensive input styling</strong> with the <code>.drp-input</code> class and 12 new CSS custom properties.
				</p>

				<hr />

				<h6>New Input Variables (v1.3.0)</h6>
				<ul class="small">
					<li><code>--drp-input-background</code> - Input background color</li>
					<li><code>--drp-input-color</code> - Input text color</li>
					<li><code>--drp-input-border-color</code> - Border color</li>
					<li><code>--drp-input-border-color-hover</code> - Border on hover</li>
					<li><code>--drp-input-border-color-focus</code> - Border when focused</li>
					<li><code>--drp-input-placeholder-color</code> - Placeholder text</li>
					<li><code>--drp-input-focus-shadow-color</code> - Focus ring color</li>
				</ul>

				<h6>Size Variants</h6>
				<p>Three size variants available: <code>.drp-input--sm</code>, default (md), and <code>.drp-input--lg</code></p>

				<hr />

				<h6>Shadow DOM Limitation</h6>
				<p>
					The date picker uses Shadow DOM for style isolation. The <code>&lt;input&gt;</code> element lives in the light DOM (your page),
					while the calendar lives in the shadow DOM (component internals). Styles inside shadow DOM cannot reach out to style light DOM elements.
				</p>

				<h6>Styling Options</h6>
				<p class="mb-2">You have two options for styling the input:</p>

				<p class="mb-2"><strong>Option 1: Override CSS variables (v1.3.0+)</strong></p>

				<CodeBlock
					codeContent={`/* Customize input using CSS variables */
web-daterangepicker {
  --drp-input-background: #f9fafb;
  --drp-input-border-color: #d1d5db;
  --drp-input-border-color-hover: #10b981;
  --drp-input-border-color-focus: #10b981;
  --drp-input-focus-shadow-color: rgba(16, 185, 129, 0.1);
}`}
					languageType="css"
					titleText="CSS Variables (Recommended)"
				/>

				<p class="mb-2"><strong>Option 2: Direct CSS styling</strong></p>

				<CodeBlock
					codeContent={`/* Your global CSS */
web-daterangepicker input {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
  width: 100%;
}

web-daterangepicker input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

web-daterangepicker input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.6;
}`}
					languageType="css"
					titleText="Direct CSS"
				/>

				<h6 class="mt-3">Option 3: Provide Your Own Input</h6>
				<p class="mb-2">You can provide a pre-styled input element:</p>

				<CodeBlock
					codeContent={`<web-daterangepicker>
  <input
    type="text"
    class="form-control"
    placeholder="Select date"
  />
</web-daterangepicker>`}
					languageType="html"
					titleText="Custom Input"
				/>

				<h6 class="mt-3">Framework Examples</h6>
				<div class="row">
					<div class="col-md-6">
						<strong>Tailwind CSS:</strong>
						<CodeBlock
							codeContent={`<web-daterangepicker>
  <input class="px-4 py-2 border rounded-lg" />
</web-daterangepicker>`}
							languageType="html"
							titleText="Tailwind"
						/>
					</div>
					<div class="col-md-6">
						<strong>Bootstrap:</strong>
						<CodeBlock
							codeContent={`<web-daterangepicker>
  <input class="form-control" />
</web-daterangepicker>`}
							languageType="html"
							titleText="Bootstrap"
						/>
					</div>
				</div>

				<div class="mt-3">
					<p class="mb-0">
						<strong>📚 Complete documentation:</strong> See the
						<a href="https://github.com/keenmate/web-daterangepicker/blob/main/API.md#known-limitations" class="alert-link" target="_blank">Known Limitations</a>
						section in the API reference for detailed examples and workarounds.
					</p>
				</div>
			</div>
		</section>

		<!-- Quick Reference -->
		<section class="mt-5">
			<h2>Quick Reference</h2>
			<div class="row">
				<div class="col-md-6">
					<h5>Sizing Attributes</h5>
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Attribute</th>
								<th>Values</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>input-size</code> <span class="badge bg-success">v1.4.0</span></td>
								<td>xs, sm, md, lg, xl</td>
								<td>md</td>
							</tr>
							<tr>
								<td><code>font-size</code></td>
								<td>xs, sm, md, lg, xl</td>
								<td>md</td>
							</tr>
							<tr>
								<td><code>spacing</code></td>
								<td>xs, sm, md, lg, xl</td>
								<td>md</td>
							</tr>
							<tr>
								<td><code>cell-size</code></td>
								<td>xs, sm, md, lg, xl</td>
								<td>md</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="col-md-6">
					<h5>Scale Values</h5>
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Size</th>
								<th>Scale</th>
								<th>Percentage</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>xs</td>
								<td>0.6×</td>
								<td>60%</td>
							</tr>
							<tr>
								<td>sm</td>
								<td>0.8×</td>
								<td>80%</td>
							</tr>
							<tr>
								<td>md</td>
								<td>1.0×</td>
								<td>100%</td>
							</tr>
							<tr>
								<td>lg</td>
								<td>1.5×</td>
								<td>150%</td>
							</tr>
							<tr>
								<td>xl</td>
								<td>2.0×</td>
								<td>200%</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	</div>
</DocLayout>
