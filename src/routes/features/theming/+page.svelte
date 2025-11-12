<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<style>
	/* Dark Theme */
	:global(date-range-picker.theme-dark) {
		--drp-card-bg: #1e293b;
		--drp-text-primary: #f1f5f9;
		--drp-text-secondary: #cbd5e1;
		--drp-border-color: #334155;
		--drp-accent-color: #3b82f6;
		--drp-accent-color-hover: #2563eb;
		--drp-primary-bg: #334155;
		--drp-primary-bg-hover: #475569;
		--drp-accent-text-color: #ffffff;
		--drp-button-text-color: #ffffff;
	}

	/* Pastel Theme */
	:global(date-range-picker.theme-pastel) {
		--drp-card-bg: #fef3c7;
		--drp-text-primary: #78350f;
		--drp-text-secondary: #92400e;
		--drp-border-color: #fbbf24;
		--drp-accent-color: #f59e0b;
		--drp-accent-color-hover: #d97706;
		--drp-primary-bg: #fed7aa;
		--drp-primary-bg-hover: #fdba74;
		--drp-accent-text-color: #ffffff;
		--drp-button-text-color: #ffffff;
	}

	/* Green Theme */
	:global(date-range-picker.theme-green) {
		--drp-accent-color: #10b981;
		--drp-accent-color-hover: #059669;
	}

	/* Purple Theme */
	:global(date-range-picker.theme-purple) {
		--drp-accent-color: #8b5cf6;
		--drp-accent-color-hover: #7c3aed;
	}

	/* Dark mode container styling */
	.dark-theme-container {
		background-color: #0f172a;
		padding: 2rem;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
	}

	.dark-theme-container label {
		color: #f1f5f9;
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}

	/* Pastel container styling */
	.pastel-theme-container {
		background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
		padding: 2rem;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
	}

	.pastel-theme-container label {
		color: #78350f;
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}
</style>

<DocLayout
	titleText="Theme Examples"
	descriptionText="Complete theme examples demonstrating the power of CSS custom properties"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				The date picker supports complete theming through CSS custom properties. Create dark modes,
				light themes, or completely custom color schemes by overriding CSS variables.
			</p>
		</section>

		<!-- Dark Theme -->
		<ShowcaseSection
			titleText="Dark Theme"
			subtitleText="Complete dark mode with light text and proper contrast"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Implementation"
			descriptionColumnTitle="Details">
			{#snippet demoContent()}
				<div class="dark-theme-container">
					<div class="mb-3">
						<label>Single Date Selection</label>
						<date-range-picker
							class="theme-dark"
							selection-mode="single"
							placeholder="Select a date">
						</date-range-picker>
					</div>

					<div class="mb-3">
						<label>Range Selection</label>
						<date-range-picker
							class="theme-dark"
							selection-mode="range"
							visible-months-count="2"
							placeholder="Select date range">
						</date-range-picker>
					</div>

					<div>
						<label>Calendar Only Mode</label>
						<date-range-picker
							class="theme-dark"
							selection-mode="single"
							positioning-mode="inline">
						</date-range-picker>
					</div>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`/* CSS */
date-range-picker.theme-dark {
  /* Dark backgrounds */
  --drp-card-bg: #1e293b;
  --drp-primary-bg: #334155;
  --drp-primary-bg-hover: #475569;

  /* Light text for dark backgrounds */
  --drp-text-primary: #f1f5f9;
  --drp-text-secondary: #cbd5e1;

  /* Borders */
  --drp-border-color: #334155;

  /* Accent colors (blue works well in dark mode) */
  --drp-accent-color: #3b82f6;
  --drp-accent-color-hover: #2563eb;

  /* Text on accent backgrounds */
  --drp-accent-text-color: #ffffff;
  --drp-button-text-color: #ffffff;
}`}
					languageType="css"
					titleText="Dark Theme CSS"
				/>

				<CodeBlock
					codeContent={`<!-- HTML -->
<date-range-picker
  class="theme-dark"
  selection-mode="range"
  visible-months-count="2">
</date-range-picker>`}
					languageType="html"
					titleText="Usage"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Key Design Principles</h5>
					<ul>
						<li><strong>Contrast</strong> - Light text (#f1f5f9) on dark backgrounds (#1e293b)</li>
						<li>
							<strong>Hierarchy</strong> - Multiple shades for hover states and backgrounds
						</li>
						<li><strong>Accessibility</strong> - Blue accent color maintains readability</li>
						<li><strong>Consistency</strong> - All text colors use themeable variables</li>
					</ul>

					<h5>New in v1.0.0-rc03</h5>
					<p>
						This release fixed the theming system to properly support dark mode. All text colors
						now use CSS variables instead of hardcoded values.
					</p>

					<h5>Required Variables</h5>
					<ul>
						<li><code>--drp-text-primary</code> - Main text color for month titles and day numbers</li>
						<li>
							<code>--drp-accent-text-color</code> - Text color on selected dates and accent backgrounds
						</li>
						<li><code>--drp-button-text-color</code> - Text color for buttons</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Pastel Theme -->
		<ShowcaseSection
			titleText="Pastel Theme"
			subtitleText="Warm, inviting color scheme with amber/yellow tones"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Implementation"
			descriptionColumnTitle="Details">
			{#snippet demoContent()}
				<div class="pastel-theme-container">
					<div class="mb-3">
						<label>Single Date Selection</label>
						<date-range-picker
							class="theme-pastel"
							selection-mode="single"
							placeholder="Select a date">
						</date-range-picker>
					</div>

					<div class="mb-3">
						<label>Range Selection</label>
						<date-range-picker
							class="theme-pastel"
							selection-mode="range"
							visible-months-count="2"
							placeholder="Select date range">
						</date-range-picker>
					</div>

					<div>
						<label>Calendar Only Mode</label>
						<date-range-picker
							class="theme-pastel"
							selection-mode="single"
							positioning-mode="inline">
						</date-range-picker>
					</div>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`/* CSS */
date-range-picker.theme-pastel {
  /* Warm pastel backgrounds */
  --drp-card-bg: #fef3c7;        /* Amber-50 */
  --drp-primary-bg: #fed7aa;     /* Amber-200 */
  --drp-primary-bg-hover: #fdba74; /* Amber-300 */

  /* Dark text for light backgrounds */
  --drp-text-primary: #78350f;   /* Amber-900 */
  --drp-text-secondary: #92400e; /* Amber-800 */

  /* Warm borders */
  --drp-border-color: #fbbf24;   /* Amber-400 */

  /* Amber accent colors */
  --drp-accent-color: #f59e0b;   /* Amber-500 */
  --drp-accent-color-hover: #d97706; /* Amber-600 */

  /* White text on amber accent */
  --drp-accent-text-color: #ffffff;
  --drp-button-text-color: #ffffff;
}`}
					languageType="css"
					titleText="Pastel Theme CSS"
				/>

				<CodeBlock
					codeContent={`<!-- HTML -->
<date-range-picker
  class="theme-pastel"
  selection-mode="single">
</date-range-picker>`}
					languageType="html"
					titleText="Usage"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Design Approach</h5>
					<ul>
						<li>
							<strong>Warm palette</strong> - Uses amber/yellow tones for a friendly, inviting feel
						</li>
						<li><strong>High contrast</strong> - Dark brown text on light yellow backgrounds</li>
						<li>
							<strong>Cohesive</strong> - All colors from the same color family (Tailwind amber)
						</li>
						<li>
							<strong>Consistent intensity</strong> - Uses appropriate shades for each element
						</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li>Event booking sites</li>
						<li>Hotel reservation systems</li>
						<li>Creative or artistic applications</li>
						<li>Apps targeting warm, welcoming aesthetic</li>
					</ul>

					<h5>Customization Tips</h5>
					<p>
						You can create pastel themes in any color family by following the same pattern: light
						backgrounds (50-200 shades), dark text (800-900 shades), and medium accent colors
						(400-600 shades).
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Color-Only Themes -->
		<ShowcaseSection
			titleText="Accent Color Themes"
			subtitleText="Quick theming by changing only the accent color"
			demoColumnTitle="Live Examples"
			controlsColumnTitle="Implementation"
			descriptionColumnTitle="Details">
			{#snippet demoContent()}
				<div class="row g-3">
					<div class="col-md-6">
						<label class="form-label fw-bold">Green Theme</label>
						<date-range-picker
							class="theme-green"
							selection-mode="single"
							placeholder="Green accent">
						</date-range-picker>
					</div>

					<div class="col-md-6">
						<label class="form-label fw-bold">Purple Theme</label>
						<date-range-picker
							class="theme-purple"
							selection-mode="single"
							placeholder="Purple accent">
						</date-range-picker>
					</div>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`/* CSS - Just override accent colors */
date-range-picker.theme-green {
  --drp-accent-color: #10b981;
  --drp-accent-color-hover: #059669;
}

date-range-picker.theme-purple {
  --drp-accent-color: #8b5cf6;
  --drp-accent-color-hover: #7c3aed;
}

date-range-picker.theme-red {
  --drp-accent-color: #ef4444;
  --drp-accent-color-hover: #dc2626;
}`}
					languageType="css"
					titleText="Simple Color Overrides"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Quick Customization</h5>
					<p>
						For simple branding, you only need to override the accent color variables. All other
						colors will remain at their defaults.
					</p>

					<h5>When to Use</h5>
					<ul>
						<li>Quick brand color matching</li>
						<li>Multiple pickers with different accent colors on same page</li>
						<li>Testing different color schemes</li>
						<li>Minimal customization needs</li>
					</ul>

					<h5>Best Practices</h5>
					<ul>
						<li>Always set both base and hover colors</li>
						<li>Ensure sufficient contrast with white text</li>
						<li>Test selected dates for readability</li>
						<li>Consider using theme generator tools for color harmony</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Implementation Guide -->
		<section class="mb-5">
			<div class="alert alert-info">
				<h4 class="alert-heading">💡 Implementation Guide</h4>

				<h6 class="mt-3">Step 1: Define Your Theme</h6>
				<p>Choose your color palette. Consider:</p>
				<ul>
					<li>Background colors (light or dark)</li>
					<li>Text colors (ensure proper contrast)</li>
					<li>Accent colors (for selections and hover states)</li>
					<li>Border colors (subtle or prominent)</li>
				</ul>

				<h6 class="mt-3">Step 2: Create CSS Class</h6>
				<CodeBlock
					codeContent={`/* Your theme CSS */
date-range-picker.my-custom-theme {
  --drp-card-bg: /* your background */;
  --drp-text-primary: /* your text color */;
  --drp-accent-color: /* your accent color */;
  /* ... other variables as needed */
}`}
					languageType="css"
					titleText="Theme Template"
				/>

				<h6 class="mt-3">Step 3: Apply Theme Class</h6>
				<CodeBlock
					codeContent={`<date-range-picker class="my-custom-theme">
</date-range-picker>`}
					languageType="html"
					titleText="HTML Usage"
				/>

				<h6 class="mt-3">Available CSS Variables</h6>
				<p>See the <a href="/features/custom-styling">Custom Styling</a> page for the complete list of CSS variables you can override.</p>

				<h6 class="mt-3">New in v1.0.0-rc03</h6>
				<p class="mb-0">
					<strong>Fixed theming system:</strong> Added proper color variable support for month titles
					and day numbers. All text colors are now fully themeable using CSS custom properties.
				</p>
			</div>
		</section>
	</div>
</DocLayout>
