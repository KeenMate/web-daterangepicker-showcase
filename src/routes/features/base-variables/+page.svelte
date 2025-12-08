<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	// Variable mappings
	const variableMap: Record<string, string> = {
		fontFamily: '--base-font-family',
		fontSize2xs: '--base-font-size-2xs',
		fontSizeXs: '--base-font-size-xs',
		fontSizeSm: '--base-font-size-sm',
		fontSizeBase: '--base-font-size-base',
		fontSizeLg: '--base-font-size-lg',
		fontSizeXl: '--base-font-size-xl',
		fontSize2xl: '--base-font-size-2xl',
		fontWeightNormal: '--base-font-weight-normal',
		fontWeightMedium: '--base-font-weight-medium',
		fontWeightSemibold: '--base-font-weight-semibold',
		lineHeightTight: '--base-line-height-tight',
		lineHeightNormal: '--base-line-height-normal',
		lineHeightRelaxed: '--base-line-height-relaxed'
	};

	// Default values
	const defaults: Record<string, string> = {
		fontSize2xs: '1',
		fontSizeXs: '1.2',
		fontSizeSm: '1.4',
		fontSizeBase: '1.6',
		fontSizeLg: '1.8',
		fontSizeXl: '2',
		fontSize2xl: '2.4',
		fontWeightNormal: '400',
		fontWeightMedium: '500',
		fontWeightSemibold: '600',
		lineHeightTight: '1.25',
		lineHeightNormal: '1.5',
		lineHeightRelaxed: '1.75'
	};

	// Current values for display
	let currentValues: Record<string, string> = {};
	let cssOutput = `:root {\n  /* No overrides set - using component defaults */\n}`;

	// Input bindings
	let fontLink = '';
	let fontFamily = '';
	let fontSize2xs = defaults.fontSize2xs;
	let fontSizeXs = defaults.fontSizeXs;
	let fontSizeSm = defaults.fontSizeSm;
	let fontSizeBase = defaults.fontSizeBase;
	let fontSizeLg = defaults.fontSizeLg;
	let fontSizeXl = defaults.fontSizeXl;
	let fontSize2xl = defaults.fontSize2xl;
	let fontWeightNormal = defaults.fontWeightNormal;
	let fontWeightMedium = defaults.fontWeightMedium;
	let fontWeightSemibold = defaults.fontWeightSemibold;
	let lineHeightTight = defaults.lineHeightTight;
	let lineHeightNormal = defaults.lineHeightNormal;
	let lineHeightRelaxed = defaults.lineHeightRelaxed;

	function updateVariable(inputId: string, value: string) {
		const varName = variableMap[inputId];
		if (!varName) return;

		// Guard against SSR - document is only available in browser
		if (typeof document === 'undefined') return;

		if (value === '' || value === null || value === undefined) {
			document.documentElement.style.removeProperty(varName);
			delete currentValues[varName];
		} else {
			document.documentElement.style.setProperty(varName, value);
			currentValues[varName] = value;
		}

		updateDisplay();
	}

	function updateDisplay() {
		const keys = Object.keys(currentValues);
		if (keys.length === 0) {
			cssOutput = `:root {\n  /* No overrides set - using component defaults */\n}`;
		} else {
			const lines = keys.map(k => `  ${k}: ${currentValues[k]};`).join('\n');
			cssOutput = `:root {\n${lines}\n}`;
		}
	}

	function resetAll() {
		// Reset input values
		fontLink = '';
		fontFamily = '';
		fontSize2xs = defaults.fontSize2xs;
		fontSizeXs = defaults.fontSizeXs;
		fontSizeSm = defaults.fontSizeSm;
		fontSizeBase = defaults.fontSizeBase;
		fontSizeLg = defaults.fontSizeLg;
		fontSizeXl = defaults.fontSizeXl;
		fontSize2xl = defaults.fontSize2xl;
		fontWeightNormal = defaults.fontWeightNormal;
		fontWeightMedium = defaults.fontWeightMedium;
		fontWeightSemibold = defaults.fontWeightSemibold;
		lineHeightTight = defaults.lineHeightTight;
		lineHeightNormal = defaults.lineHeightNormal;
		lineHeightRelaxed = defaults.lineHeightRelaxed;

		// Guard against SSR
		if (typeof document === 'undefined') return;

		// Clear CSS variables
		Object.values(variableMap).forEach(varName => {
			document.documentElement.style.removeProperty(varName);
		});

		// Remove custom font link
		const existingLink = document.getElementById('customFontLink');
		if (existingLink) existingLink.remove();

		currentValues = {};
		updateDisplay();
	}

	function loadFont() {
		let value = fontLink.trim();
		if (!value) return;

		// Guard against SSR
		if (typeof document === 'undefined') return;

		// Extract URL if it's a full <link> tag
		const hrefMatch = value.match(/href=["']([^"']+)["']/);
		if (hrefMatch) {
			value = hrefMatch[1];
		}

		// Remove existing font link if present
		const existingLink = document.getElementById('customFontLink');
		if (existingLink) existingLink.remove();

		// Create and add new link
		const link = document.createElement('link');
		link.id = 'customFontLink';
		link.rel = 'stylesheet';
		link.href = value;
		document.head.appendChild(link);

		// Try to extract font family name from URL
		const familyMatch = value.match(/family=([^:&]+)/);
		if (familyMatch) {
			const fontName = decodeURIComponent(familyMatch[1].replace(/\+/g, ' '));
			fontFamily = `'${fontName}', sans-serif`;
			updateVariable('fontFamily', fontFamily);
		}
	}

	// Reactive updates
	$: updateVariable('fontFamily', fontFamily);
	$: updateVariable('fontSize2xs', fontSize2xs);
	$: updateVariable('fontSizeXs', fontSizeXs);
	$: updateVariable('fontSizeSm', fontSizeSm);
	$: updateVariable('fontSizeBase', fontSizeBase);
	$: updateVariable('fontSizeLg', fontSizeLg);
	$: updateVariable('fontSizeXl', fontSizeXl);
	$: updateVariable('fontSize2xl', fontSize2xl);
	$: updateVariable('fontWeightNormal', fontWeightNormal);
	$: updateVariable('fontWeightMedium', fontWeightMedium);
	$: updateVariable('fontWeightSemibold', fontWeightSemibold);
	$: updateVariable('lineHeightTight', lineHeightTight);
	$: updateVariable('lineHeightNormal', lineHeightNormal);
	$: updateVariable('lineHeightRelaxed', lineHeightRelaxed);

	onMount(() => {
		import('@keenmate/web-daterangepicker');

		// Apply initial values
		Object.keys(defaults).forEach(key => {
			updateVariable(key, defaults[key as keyof typeof defaults]);
		});
	});
</script>

<style>
	.controls-panel {
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.control-section {
		margin-bottom: 1.5rem;
	}

	.control-section:last-child {
		margin-bottom: 0;
	}

	.control-section h4 {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #64748b;
		margin: 0 0 0.75rem 0;
		border-bottom: 1px solid #e2e8f0;
		padding-bottom: 0.5rem;
	}

	.section-desc {
		font-size: 0.75rem;
		color: #64748b;
		margin: 0 0 0.75rem 0;
		line-height: 1.4;
	}

	.control-row {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: flex-end;
	}

	.control-group {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.control-group label {
		font-size: 0.75rem;
		color: #374151;
		font-weight: 500;
	}

	.control-group input {
		padding: 0.5rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		font-size: 0.875rem;
	}

	.control-group input[type="text"] {
		width: 250px;
	}

	.control-group input[type="number"] {
		width: 80px;
	}

	.font-link-input {
		width: 400px !important;
	}

	.inline-picker-wrapper {
		border: 1px solid #e5e7eb;
		border-radius: 0.375rem;
		padding: 1rem;
		background: #f9fafb;
	}

	.css-output {
		background: #1e293b;
		color: #a5d6a7;
		border-radius: 0.5rem;
		padding: 1rem;
		font-family: 'Courier New', Consolas, Monaco, monospace;
		font-size: 0.75rem;
		line-height: 1.6;
		white-space: pre-wrap;
		max-height: 200px;
		overflow-y: auto;
	}

	.css-output-header {
		color: #93c5fd;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}
</style>

<DocLayout
	titleText="Base Typography Variables"
	descriptionText="Configure typography using --base-* CSS variables for theme-designer integration"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				The date picker supports <code>--base-*</code> CSS variables for typography, enabling seamless
				integration with the KeenMate theme-designer. Adjust font family, sizes, weights, and line heights
				in real-time.
			</p>
		</section>

		<!-- Interactive Controls -->
		<ShowcaseSection
			titleText="BV01 Typography Controls"
			subtitleText="Adjust --base-* variables in real-time"
			col1Title="Controls"
			col2Title="Live Demo"
			col3Title="Details">
			{#snippet demoContent()}
				<div class="controls-panel">
					<div class="d-flex justify-content-between align-items-center mb-3">
						<h5 class="m-0">Typography Controls</h5>
						<button class="btn btn-sm btn-outline-danger" on:click={resetAll}>Reset All</button>
					</div>

					<!-- Font Link -->
					<div class="control-section">
						<h4>Font Link (Google Fonts, etc.)</h4>
						<div class="control-row">
							<div class="control-group">
								<label for="fontLink">Paste &lt;link&gt; tag or URL</label>
								<input type="text" id="fontLink" class="font-link-input" bind:value={fontLink}
									placeholder="e.g., https://fonts.googleapis.com/css2?family=Lexend...">
							</div>
							<button class="btn btn-outline-secondary btn-sm" on:click={loadFont}>Load Font</button>
						</div>
					</div>

					<!-- Font Family -->
					<div class="control-section">
						<h4>Font Family</h4>
						<div class="control-row">
							<div class="control-group">
								<label for="fontFamily">--base-font-family</label>
								<input type="text" id="fontFamily" bind:value={fontFamily}
									placeholder="e.g., 'Lexend', sans-serif">
							</div>
						</div>
					</div>

					<!-- Font Sizes -->
					<div class="control-section">
						<h4>Font Sizes (multipliers)</h4>
						<p class="section-desc">
							<strong>2xs:</strong> badges &bull;
							<strong>xs:</strong> weekday headers, tooltips &bull;
							<strong>sm:</strong> day numbers &bull;
							<strong>base:</strong> month/year labels &bull;
							<strong>lg:</strong> navigation arrows
						</p>
						<div class="control-row">
							<div class="control-group">
								<label for="fontSize2xs">2xs</label>
								<input type="number" id="fontSize2xs" bind:value={fontSize2xs} step="0.1">
							</div>
							<div class="control-group">
								<label for="fontSizeXs">xs</label>
								<input type="number" id="fontSizeXs" bind:value={fontSizeXs} step="0.1">
							</div>
							<div class="control-group">
								<label for="fontSizeSm">sm</label>
								<input type="number" id="fontSizeSm" bind:value={fontSizeSm} step="0.1">
							</div>
							<div class="control-group">
								<label for="fontSizeBase">base</label>
								<input type="number" id="fontSizeBase" bind:value={fontSizeBase} step="0.1">
							</div>
							<div class="control-group">
								<label for="fontSizeLg">lg</label>
								<input type="number" id="fontSizeLg" bind:value={fontSizeLg} step="0.1">
							</div>
							<div class="control-group">
								<label for="fontSizeXl">xl</label>
								<input type="number" id="fontSizeXl" bind:value={fontSizeXl} step="0.1">
							</div>
							<div class="control-group">
								<label for="fontSize2xl">2xl</label>
								<input type="number" id="fontSize2xl" bind:value={fontSize2xl} step="0.1">
							</div>
						</div>
					</div>

					<!-- Font Weights -->
					<div class="control-section">
						<h4>Font Weights</h4>
						<div class="control-row">
							<div class="control-group">
								<label for="fontWeightNormal">normal</label>
								<input type="number" id="fontWeightNormal" bind:value={fontWeightNormal} step="100" min="100" max="900">
							</div>
							<div class="control-group">
								<label for="fontWeightMedium">medium</label>
								<input type="number" id="fontWeightMedium" bind:value={fontWeightMedium} step="100" min="100" max="900">
							</div>
							<div class="control-group">
								<label for="fontWeightSemibold">semibold</label>
								<input type="number" id="fontWeightSemibold" bind:value={fontWeightSemibold} step="100" min="100" max="900">
							</div>
						</div>
					</div>

					<!-- Line Heights -->
					<div class="control-section">
						<h4>Line Heights</h4>
						<div class="control-row">
							<div class="control-group">
								<label for="lineHeightTight">tight</label>
								<input type="number" id="lineHeightTight" bind:value={lineHeightTight} step="0.05" min="1" max="3">
							</div>
							<div class="control-group">
								<label for="lineHeightNormal">normal</label>
								<input type="number" id="lineHeightNormal" bind:value={lineHeightNormal} step="0.05" min="1" max="3">
							</div>
							<div class="control-group">
								<label for="lineHeightRelaxed">relaxed</label>
								<input type="number" id="lineHeightRelaxed" bind:value={lineHeightRelaxed} step="0.05" min="1" max="3">
							</div>
						</div>
					</div>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="mb-4">
					<h6>Floating Mode (Range)</h6>
					<p class="small text-muted mb-2">Tests input styling + calendar typography</p>
					<web-daterangepicker
						selection-mode="range"
						placeholder="Select date range..."
						date-format-mask="YYYY-MM-DD">
					</web-daterangepicker>
				</div>

				<div class="mb-4">
					<h6>Inline Calendar Mode</h6>
					<p class="small text-muted mb-2">Standalone calendar</p>
					<div class="inline-picker-wrapper">
						<web-daterangepicker
							selection-mode="range"
							positioning-mode="inline"
							date-format-mask="YYYY-MM-DD">
						</web-daterangepicker>
					</div>
				</div>

				<div>
					<h6>Current CSS Output</h6>
					<div class="css-output">
						<div class="css-output-header">/* Current --base-* CSS Variables */</div>
						{cssOutput}
					</div>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Variable Reference</h5>
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Used For</th>
							</tr>
						</thead>
						<tbody>
							<tr><td><code>--base-font-family</code></td><td>All text in component</td></tr>
							<tr><td><code>--base-font-size-2xs</code></td><td>Badges</td></tr>
							<tr><td><code>--base-font-size-xs</code></td><td>Weekday headers, tooltips</td></tr>
							<tr><td><code>--base-font-size-sm</code></td><td>Day numbers, summary</td></tr>
							<tr><td><code>--base-font-size-base</code></td><td>Month/year labels, input</td></tr>
							<tr><td><code>--base-font-size-lg</code></td><td>Navigation arrows</td></tr>
						</tbody>
					</table>

					<h5>Theme Designer Integration</h5>
					<p>
						These variables are designed to work with the KeenMate theme-designer tool.
						The designer exports <code>--base-*</code> variables that can be directly
						applied to customize typography across all compatible components.
					</p>

					<h5>Font Size Multipliers</h5>
					<p>
						Font sizes are unitless multipliers (e.g., <code>1.4</code>). The component
						computes the final size as: <code>calc(multiplier * var(--drp-rem))</code>
						where <code>--drp-rem</code> defaults to <code>10px</code>.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Code Examples -->
		<ShowcaseSection
			titleText="BV02 Implementation Examples"
			subtitleText="How to use --base-* variables in your project"
			col1Title="CSS Examples"
			col2Title="Google Fonts Example"
			col3Title="Details">
			{#snippet demoContent()}
				<CodeBlock
					codeContent={`:root {
  /* Font Family */
  --base-font-family: 'Inter', sans-serif;

  /* Font Sizes (unitless multipliers) */
  --base-font-size-2xs: 1;
  --base-font-size-xs: 1.2;
  --base-font-size-sm: 1.4;
  --base-font-size-base: 1.6;
  --base-font-size-lg: 1.8;
  --base-font-size-xl: 2;
  --base-font-size-2xl: 2.4;

  /* Font Weights */
  --base-font-weight-normal: 400;
  --base-font-weight-medium: 500;
  --base-font-weight-semibold: 600;

  /* Line Heights */
  --base-line-height-tight: 1.25;
  --base-line-height-normal: 1.5;
  --base-line-height-relaxed: 1.75;
}`}
					languageType="css"
					titleText="Full Variable Set"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Load Google Font -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600&display=swap" rel="stylesheet">

<style>
  :root {
    --base-font-family: 'Lexend', sans-serif;
  }
</style>`}
					languageType="html"
					titleText="Google Fonts Setup"
				/>

				<CodeBlock
					codeContent={`/* Compact typography for dense UIs */
:root {
  --base-font-size-2xs: 0.9;
  --base-font-size-xs: 1.0;
  --base-font-size-sm: 1.2;
  --base-font-size-base: 1.4;
  --base-font-size-lg: 1.6;
  --base-line-height-tight: 1.1;
  --base-line-height-normal: 1.3;
}`}
					languageType="css"
					titleText="Compact Theme Example"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>How It Works</h5>
					<ol>
						<li>Set <code>--base-*</code> variables on <code>:root</code> or a parent element</li>
						<li>The date picker reads these variables and applies them internally</li>
						<li>Typography updates instantly without any JavaScript</li>
					</ol>

					<h5>Fallback Behavior</h5>
					<p>
						If a <code>--base-*</code> variable is not set, the component uses
						built-in defaults. This means partial customization is fully supported.
					</p>

					<h5>Popular Google Fonts</h5>
					<ul>
						<li><strong>Inter</strong> - Clean, modern UI font</li>
						<li><strong>Lexend</strong> - Optimized for readability</li>
						<li><strong>Poppins</strong> - Geometric, friendly feel</li>
						<li><strong>Source Sans Pro</strong> - Adobe's UI typeface</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
