<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<style>
	/* Scale classes for the component */
	:global(web-daterangepicker.scale-xs) { --drp-rem: 6px; }
	:global(web-daterangepicker.scale-sm) { --drp-rem: 8px; }
	:global(web-daterangepicker.scale-md) { --drp-rem: 10px; }
	:global(web-daterangepicker.scale-lg) { --drp-rem: 15px; }
	:global(web-daterangepicker.scale-xl) { --drp-rem: 20px; }
</style>

<DocLayout
	titleText="Custom Styling & Sizing"
	descriptionText="Scale calendars with --drp-rem CSS variable, customize input sizes, and theme with CSS custom properties"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				The date picker provides flexible sizing via CSS variables and complete theming control via CSS custom properties.
			</p>
			<p>
				<strong>Sizing Systems:</strong>
			</p>
			<ul>
				<li><code>input-size</code> attribute - Controls input field size (floating mode only)</li>
				<li><code>--drp-rem</code> CSS variable - Scales the entire calendar proportionally</li>
				<li>Individual CSS variables - Fine-grained control over spacing, fonts, etc.</li>
			</ul>
			<div class="alert alert-warning">
				<strong>v1.7.0 Breaking Change:</strong> The <code>spacing</code>, <code>font-size</code>, and <code>cell-size</code> attributes have been removed.
				Use the <code>--drp-rem</code> CSS variable instead for global scaling, or override individual CSS variables for fine-grained control.
			</div>
		</section>

		<!-- Input Size (Still works) -->
		<ShowcaseSection
			titleText="CS01 Input Size"
			subtitleText="Control input field size with the input-size attribute"
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
					<small class="text-muted">Very compact input - 31px height</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Small Input (sm)</label>
					<web-daterangepicker
						input-size="sm"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Compact input - 33px height</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Medium Input (md - default)</label>
					<web-daterangepicker
						input-size="md"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Normal input - 35px height</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Large Input (lg)</label>
					<web-daterangepicker
						input-size="lg"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Spacious input - 38px height</small>
				</div>

				<div>
					<label class="form-label fw-bold">Extra Large Input (xl)</label>
					<web-daterangepicker
						input-size="xl"
						selection-mode="single"
						placeholder="YYYY-MM-DD"></web-daterangepicker>
					<small class="text-muted">Touch-friendly input - 41px height</small>
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
  style="--drp-rem: 15px;">
</web-daterangepicker>

<!-- Large input with compact calendar -->
<web-daterangepicker
  input-size="xl"
  style="--drp-rem: 8px;">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>input-size Attribute</h5>
					<p>The <code>input-size</code> attribute controls the input field dimensions independently from calendar sizing.</p>

					<h5>Available Sizes</h5>
					<ul>
						<li><code>xs</code> - 31px (very compact)</li>
						<li><code>sm</code> - 33px (compact)</li>
						<li><code>md</code> - 35px (default)</li>
						<li><code>lg</code> - 38px (spacious)</li>
						<li><code>xl</code> - 41px (touch-friendly)</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Floating mode only</strong> - This attribute applies to the input field in floating/popup mode</li>
						<li><strong>Coordinated sizing</strong> - Combine with <code>--drp-rem</code> for consistent UI</li>
						<li><strong>Mixed sizing</strong> - Large touch-friendly input with compact popup calendar</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Calendar Scaling with --drp-rem -->
		<ShowcaseSection
			titleText="CS02 Calendar Scaling with --drp-rem"
			subtitleText="Scale the entire calendar by setting the --drp-rem CSS variable"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="How It Works">

			{#snippet demoContent()}
				<div class="mb-4">
					<label class="form-label fw-bold">Extra Small (60%) - --drp-rem: 6px</label>
					<web-daterangepicker
						class="scale-xs"
						selection-mode="single"
						positioning-mode="inline"></web-daterangepicker>
					<small class="text-muted">Perfect for dense dashboards</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Small (80%) - --drp-rem: 8px</label>
					<web-daterangepicker
						class="scale-sm"
						selection-mode="single"
						positioning-mode="inline"></web-daterangepicker>
					<small class="text-muted">Good for compact layouts</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Medium (100%) - --drp-rem: 10px (default)</label>
					<web-daterangepicker
						class="scale-md"
						selection-mode="single"
						positioning-mode="inline"></web-daterangepicker>
					<small class="text-muted">Standard size</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Large (150%) - --drp-rem: 15px</label>
					<web-daterangepicker
						class="scale-lg"
						selection-mode="single"
						positioning-mode="inline"></web-daterangepicker>
					<small class="text-muted">Spacious desktop layouts</small>
				</div>

				<div>
					<label class="form-label fw-bold">Extra Large (200%) - --drp-rem: 20px</label>
					<web-daterangepicker
						class="scale-xl"
						selection-mode="single"
						positioning-mode="inline"></web-daterangepicker>
					<small class="text-muted">Touch-friendly, accessibility, kiosks</small>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`/* Define scale classes in CSS */
web-daterangepicker.scale-xs { --drp-rem: 6px; }
web-daterangepicker.scale-sm { --drp-rem: 8px; }
web-daterangepicker.scale-md { --drp-rem: 10px; }
web-daterangepicker.scale-lg { --drp-rem: 15px; }
web-daterangepicker.scale-xl { --drp-rem: 20px; }`}
					languageType="css"
					titleText="CSS Classes"
				/>

				<CodeBlock
					codeContent={`<!-- Use scale classes -->
<web-daterangepicker class="scale-xs"></web-daterangepicker>
<web-daterangepicker class="scale-sm"></web-daterangepicker>
<web-daterangepicker class="scale-lg"></web-daterangepicker>
<web-daterangepicker class="scale-xl"></web-daterangepicker>

<!-- Or use inline style -->
<web-daterangepicker style="--drp-rem: 15px;"></web-daterangepicker>

<!-- Custom scale (e.g., 120%) -->
<web-daterangepicker style="--drp-rem: 12px;"></web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>How --drp-rem Works</h5>
					<p>The <code>--drp-rem</code> CSS variable is the base unit (default: 10px) used throughout the component. All spacing, fonts, and sizes are calculated relative to this value.</p>

					<h5>Scale Values</h5>
					<ul>
						<li><code>6px</code> - 60% scale (extra small)</li>
						<li><code>8px</code> - 80% scale (small)</li>
						<li><code>10px</code> - 100% scale (default)</li>
						<li><code>15px</code> - 150% scale (large)</li>
						<li><code>20px</code> - 200% scale (extra large)</li>
					</ul>

					<h5>Important: Shadow DOM</h5>
					<p>CSS variables must be set directly on the <code>&lt;web-daterangepicker&gt;</code> element (via class or inline style), not on a wrapper div. This is due to Shadow DOM encapsulation.</p>

					<h5>Benefits</h5>
					<ul>
						<li><strong>Proportional scaling</strong> - Everything scales together</li>
						<li><strong>Any value</strong> - Not limited to preset sizes</li>
						<li><strong>Responsive</strong> - Use media queries to scale based on viewport</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Fine-Grained Control -->
		<ShowcaseSection
			titleText="CS03 Fine-Grained Control"
			subtitleText="Override individual CSS variables for precise control"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Available Variables">

			{#snippet demoContent()}
				<div class="mb-4">
					<label class="form-label fw-bold">Large Scale + Compact Spacing</label>
					<web-daterangepicker
						style="--drp-rem: 15px; --drp-spacing-xs: 2px; --drp-spacing-sm: 4px;"
						selection-mode="single"
						positioning-mode="inline"></web-daterangepicker>
					<small class="text-muted">Big cells with tight gaps</small>
				</div>

				<div class="mb-4">
					<label class="form-label fw-bold">Normal Scale + Large Fonts</label>
					<web-daterangepicker
						style="--drp-rem: 10px; --drp-font-size-base: 18px; --drp-font-size-sm: 16px;"
						selection-mode="single"
						positioning-mode="inline"></web-daterangepicker>
					<small class="text-muted">Normal layout with larger text</small>
				</div>

				<div>
					<label class="form-label fw-bold">Small Scale + Spacious Gaps</label>
					<web-daterangepicker
						style="--drp-rem: 8px; --drp-spacing-xs: 6px; --drp-spacing-sm: 10px;"
						selection-mode="single"
						positioning-mode="inline"></web-daterangepicker>
					<small class="text-muted">Compact cells with generous spacing</small>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Large scale + compact spacing -->
<web-daterangepicker style="
  --drp-rem: 15px;
  --drp-spacing-xs: 2px;
  --drp-spacing-sm: 4px;
"></web-daterangepicker>

<!-- Normal scale + large fonts -->
<web-daterangepicker style="
  --drp-rem: 10px;
  --drp-font-size-base: 18px;
  --drp-font-size-sm: 16px;
"></web-daterangepicker>

<!-- Small scale + spacious gaps -->
<web-daterangepicker style="
  --drp-rem: 8px;
  --drp-spacing-xs: 6px;
  --drp-spacing-sm: 10px;
"></web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`/* Or define in CSS */
web-daterangepicker.custom-dense {
  --drp-rem: 15px;
  --drp-spacing-xs: 2px;
  --drp-spacing-sm: 4px;
}

web-daterangepicker.custom-readable {
  --drp-font-size-base: 18px;
  --drp-font-size-sm: 16px;
  --drp-font-size-xs: 14px;
}`}
					languageType="css"
					titleText="CSS"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Spacing Variables</h5>
					<ul class="small">
						<li><code>--drp-spacing-xs</code> - Gap between days (4px)</li>
						<li><code>--drp-spacing-sm</code> - Small padding (8px)</li>
						<li><code>--drp-spacing-md</code> - Medium padding (16px)</li>
						<li><code>--drp-spacing-lg</code> - Large gaps (24px)</li>
						<li><code>--drp-spacing-xl</code> - Extra large (32px)</li>
					</ul>

					<h5>Font Size Variables</h5>
					<ul class="small">
						<li><code>--drp-font-size-2xs</code> - Badge text</li>
						<li><code>--drp-font-size-xs</code> - Small labels</li>
						<li><code>--drp-font-size-sm</code> - Day numbers</li>
						<li><code>--drp-font-size-base</code> - Headers</li>
						<li><code>--drp-font-size-lg</code> - Large text</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Accessibility</strong> - Larger fonts without changing layout</li>
						<li><strong>Dense dashboards</strong> - Compact spacing with readable text</li>
						<li><strong>Touch interfaces</strong> - Large cells with normal fonts</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Compact Grid Layout -->
		<ShowcaseSection
			titleText="CS04 Compact Grid Layout"
			subtitleText="Dense dashboard calendar at 60% scale"
			col1Title="Live Demo"
			col2Title="Code Example"
			col3Title="Details">

			{#snippet demoContent()}
				<div>
					<label class="form-label fw-bold">Compact 2×3 Grid (60% scale)</label>
					<web-daterangepicker
						class="scale-xs"
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
					codeContent={`/* CSS */
web-daterangepicker.scale-xs {
  --drp-rem: 6px;
}

<!-- HTML -->
<web-daterangepicker
  class="scale-xs"
  positioning-mode="inline"
  visible-months-count="6"
  month-layout="grid"
  grid-rows="2"
  grid-columns="3">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML + CSS"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Case</h5>
					<p><strong>Extra Small (6px)</strong> - Perfect for dense dashboards with limited space</p>

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
					<h3 class="card-title">Touch-Friendly 2×3 Grid (150% scale)</h3>
					<p class="card-text text-muted mb-4">
						Large calendar with generous touch targets - ideal for touch interfaces and accessibility
					</p>

					<web-daterangepicker
						class="scale-lg"
						selection-mode="single"
						positioning-mode="inline"
						visible-months-count="6"
						month-layout="grid"
						grid-rows="2"
						grid-columns="3"></web-daterangepicker>

					<div class="mt-4">
						<h5>Code</h5>
						<CodeBlock
							codeContent={`/* CSS */
web-daterangepicker.scale-lg {
  --drp-rem: 15px;
}

<!-- HTML -->
<web-daterangepicker
  class="scale-lg"
  positioning-mode="inline"
  visible-months-count="6"
  month-layout="grid"
  grid-rows="2"
  grid-columns="3">
</web-daterangepicker>`}
							languageType="html"
							titleText="HTML + CSS"
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
			titleText="CS05 CSS Custom Properties (Theming)"
			subtitleText="Customize colors, borders, and more with CSS variables"
			col1Title="Available Variables"
			col2Title="Code Examples"
			col3Title="How to Use">

			{#snippet demoContent()}
				<div class="prose">
					<h6>Base Color Variables</h6>
					<ul class="small">
						<li><code>--drp-dropdown-background</code> - Calendar background (#ffffff)</li>
						<li><code>--drp-accent-color</code> - Primary accent (#3b82f6)</li>
						<li><code>--drp-accent-color-hover</code> - Accent hover (#2563eb)</li>
						<li><code>--drp-text-primary</code> - Primary text (#111827)</li>
						<li><code>--drp-text-secondary</code> - Secondary text (#6b7280)</li>
						<li><code>--drp-border-color</code> - Border color (#e5e7eb)</li>
						<li><code>--drp-primary-bg</code> - Primary background (#f3f4f6)</li>
						<li><code>--drp-primary-bg-hover</code> - Primary hover (#e5e7eb)</li>
					</ul>

					<h6>Component-Specific Variables</h6>
					<ul class="small">
						<li><strong>Input:</strong> <code>--drp-input-background</code>, <code>--drp-input-color</code>, <code>--drp-input-border-color</code>, and 9 more</li>
						<li><strong>Buttons:</strong> <code>--drp-button-today-color</code>, <code>--drp-button-apply-bg</code>, and 8 more</li>
						<li><strong>Day Cells:</strong> <code>--drp-day-text-color</code>, <code>--drp-day-selected-bg</code>, and 10 more</li>
						<li><strong>Header/Nav:</strong> <code>--drp-header-text-color</code>, <code>--drp-nav-bg-hover</code>, and 14 more</li>
						<li><strong>Badges:</strong> <code>--drp-badge-number-bg</code>, <code>--drp-badge-count-bg</code>, and 4 more</li>
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
  --drp-dropdown-background: #1e293b;
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
}`}
					languageType="css"
					titleText="CSS"
				/>

				<CodeBlock
					codeContent={`<!-- Apply theme via class -->
<web-daterangepicker class="dark-theme"></web-daterangepicker>

<!-- Or inline styles -->
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
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>How CSS Variables Work</h5>
					<p>The component defines all variables with <code>:host</code> inside its Shadow DOM. You can override them from outside:</p>
					<ul>
						<li><strong>Global</strong> - Target <code>web-daterangepicker</code> selector</li>
						<li><strong>Scoped</strong> - Add a class and target <code>web-daterangepicker.your-class</code></li>
						<li><strong>Instance</strong> - Use inline styles</li>
					</ul>

					<h5>Benefits</h5>
					<ul>
						<li><strong>Scoped</strong> - Theme individual pickers differently</li>
						<li><strong>Dynamic</strong> - Change themes at runtime with JavaScript</li>
						<li><strong>Maintainable</strong> - No need to modify component source</li>
						<li><strong>Performant</strong> - Browser-native CSS variable support</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Input Field Styling -->
		<section class="mb-5">
			<div class="alert alert-info">
				<h4 class="alert-heading">Input Field Styling</h4>
				<p>
					<strong>Comprehensive input styling</strong> with the <code>.drp-input</code> class and CSS custom properties.
				</p>

				<hr />

				<h6>Input Variables</h6>
				<ul class="small">
					<li><code>--drp-input-background</code> - Input background color</li>
					<li><code>--drp-input-color</code> - Input text color</li>
					<li><code>--drp-input-border-color</code> - Border color</li>
					<li><code>--drp-input-border-color-hover</code> - Border on hover</li>
					<li><code>--drp-input-border-color-focus</code> - Border when focused</li>
					<li><code>--drp-input-placeholder-color</code> - Placeholder text</li>
					<li><code>--drp-input-focus-shadow-color</code> - Focus ring color</li>
				</ul>

				<hr />

				<h6>Shadow DOM Note</h6>
				<p>
					The date picker uses Shadow DOM for style isolation. The <code>&lt;input&gt;</code> element lives in the light DOM (your page),
					while the calendar lives in the shadow DOM (component internals).
				</p>

				<h6>Styling Options</h6>
				<p class="mb-2"><strong>Option 1: Override CSS variables</strong></p>

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

				<p class="mb-2"><strong>Option 2: Provide Your Own Input</strong></p>

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
			</div>
		</section>

		<!-- Quick Reference -->
		<section class="mt-5">
			<h2>Quick Reference</h2>
			<div class="row">
				<div class="col-md-6">
					<h5>Sizing Approach</h5>
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Method</th>
								<th>Usage</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>input-size</code> attribute</td>
								<td>Input field size (xs, sm, md, lg, xl)</td>
							</tr>
							<tr>
								<td><code>--drp-rem</code> CSS variable</td>
								<td>Scale entire calendar (default: 10px)</td>
							</tr>
							<tr>
								<td><code>--drp-spacing-*</code> variables</td>
								<td>Fine-tune spacing (xs, sm, md, lg, xl)</td>
							</tr>
							<tr>
								<td><code>--drp-font-size-*</code> variables</td>
								<td>Fine-tune font sizes</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="col-md-6">
					<h5>--drp-rem Scale Values</h5>
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Value</th>
								<th>Scale</th>
								<th>Use Case</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>6px</td>
								<td>60%</td>
								<td>Dense dashboards</td>
							</tr>
							<tr>
								<td>8px</td>
								<td>80%</td>
								<td>Compact layouts</td>
							</tr>
							<tr>
								<td>10px</td>
								<td>100%</td>
								<td>Default</td>
							</tr>
							<tr>
								<td>15px</td>
								<td>150%</td>
								<td>Spacious desktops</td>
							</tr>
							<tr>
								<td>20px</td>
								<td>200%</td>
								<td>Touch/accessibility</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	</div>
</DocLayout>
