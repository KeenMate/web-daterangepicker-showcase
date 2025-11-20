<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Custom Styling & Theming"
	descriptionText="Customize appearance with CSS custom properties and built-in size options"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				The date picker is fully themeable using CSS custom properties (CSS variables).
				Customize colors, spacing, typography, and more to match your brand.
			</p>
		</section>

		<!-- Size Variants -->
		<ShowcaseSection
			titleText="Size Variants"
			subtitleText="Pre-built size options for different use cases"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<div class="mb-3">
					<label class="form-label fw-bold">Small</label>
					<web-daterangepicker
						selection-mode="single"
						spacing="sm"
						font-size="sm"
						placeholder="Small picker">
					</web-daterangepicker>
				</div>

				<div class="mb-3">
					<label class="form-label fw-bold">Medium (Default)</label>
					<web-daterangepicker
						selection-mode="single"
						placeholder="Default picker">
					</web-daterangepicker>
				</div>

				<div>
					<label class="form-label fw-bold">Large</label>
					<web-daterangepicker
						selection-mode="single"
						spacing="lg"
						font-size="lg"
						placeholder="Large picker">
					</web-daterangepicker>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Small -->
<web-daterangepicker
  spacing="sm"
  font-size="sm"
  placeholder="Small picker">
</web-daterangepicker>

<!-- Medium (default) -->
<web-daterangepicker placeholder="Default picker"></web-daterangepicker>

<!-- Large -->
<web-daterangepicker
  spacing="lg"
  font-size="lg"
  placeholder="Large picker">
</web-daterangepicker>

<!-- Extra Large -->
<web-daterangepicker
  spacing="xl"
  font-size="xl"
  placeholder="Extra large picker">
</web-daterangepicker>

<!-- Independent control: Large text, compact spacing -->
<web-daterangepicker
  spacing="sm"
  font-size="lg">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = document.querySelector('web-daterangepicker');

// Set via properties
picker.spacing = 'lg';
picker.fontSize = 'xl';

// Or via attributes
picker.setAttribute('spacing', 'sm');
picker.setAttribute('font-size', 'lg');`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>How It Works</h5>
					<p>Use <code>spacing</code> and <code>font-size</code> attributes to control calendar size:</p>
					<ul>
						<li><code>spacing</code> - Controls gaps, padding, and calendar width</li>
						<li><code>font-size</code> - Controls all text sizing</li>
					</ul>

					<h5>Available Sizes</h5>
					<ul>
						<li><code>xs</code> - Extra small (compact views, 0.7× scale)</li>
						<li><code>sm</code> - Small (mobile-friendly, 0.85× scale)</li>
						<li><code>md</code> - Medium (default, 1.0× scale)</li>
						<li><code>lg</code> - Large (desktop applications, 1.2× scale)</li>
						<li><code>xl</code> - Extra large (presentations, 1.4× scale)</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Mobile</strong> - <code>spacing="sm" font-size="sm"</code></li>
						<li><strong>Desktop</strong> - <code>spacing="lg" font-size="lg"</code></li>
						<li><strong>Presentations</strong> - <code>spacing="xl" font-size="xl"</code></li>
						<li><strong>Compact tables</strong> - <code>spacing="xs" font-size="xs"</code></li>
					</ul>

					<h5>Independent Control</h5>
					<p>Control font and spacing independently for fine-tuned layouts:</p>
					<ul>
						<li><code>spacing="sm" font-size="lg"</code> - Large readable text, compact layout</li>
						<li><code>spacing="lg" font-size="sm"</code> - Small text, generous spacing</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- CSS Custom Properties -->
		<ShowcaseSection
			titleText="CSS Custom Properties"
			subtitleText="Theme customization using CSS variables"
			demoColumnTitle="Available Variables"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<div class="prose">
					<h6>Color Variables</h6>
					<ul class="small">
						<li><code>--drp-card-bg</code> - Background color</li>
						<li><code>--drp-accent-color</code> - Primary accent color</li>
						<li><code>--drp-text-primary</code> - Primary text color</li>
						<li><code>--drp-border-color</code> - Border color</li>
					</ul>

					<h6>Spacing Variables</h6>
					<ul class="small">
						<li><code>--drp-spacing-sm</code> - Small spacing</li>
						<li><code>--drp-spacing-md</code> - Medium spacing</li>
						<li><code>--drp-spacing-lg</code> - Large spacing</li>
					</ul>

					<h6>Typography Variables</h6>
					<ul class="small">
						<li><code>--drp-font-size-base</code> - Base font size</li>
						<li><code>--drp-font-weight-medium</code> - Medium weight</li>
						<li><code>--drp-font-weight-semibold</code> - Semibold weight</li>
					</ul>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`/* Custom theme in your CSS */
web-daterangepicker {
  --drp-accent-color: #10b981;
  --drp-accent-color-hover: #059669;
  --drp-border-color: #d1d5db;
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
  --drp-accent-text-color: #ffffff;
  --drp-button-text-color: #ffffff;
}

/* Brand colors */
web-daterangepicker.branded {
  --drp-accent-color: #ff6b6b;
  --drp-accent-color-hover: #ee5a52;
}`}
					languageType="css"
					titleText="CSS"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Theming Approach</h5>
					<p>Override CSS custom properties to customize the appearance without modifying component code.</p>

					<h5>Benefits</h5>
					<ul>
						<li><strong>Scoped</strong> - Apply themes to specific pickers</li>
						<li><strong>Dynamic</strong> - Change themes at runtime with JavaScript</li>
						<li><strong>Maintainable</strong> - No need to fork or modify source code</li>
					</ul>

					<h5>Complete List</h5>
					<p>See the full list of CSS custom properties in the source code or documentation.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Custom Classes -->
		<ShowcaseSection
			titleText="Custom CSS Classes"
			subtitleText="Apply custom classes for advanced styling"
			demoColumnTitle="Example"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					class="custom-picker-theme"
					placeholder="Custom styled picker">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Picker with custom CSS class applied</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Add custom class -->
<web-daterangepicker
  class="custom-picker-theme"
  selection-mode="single">
</web-daterangepicker>

<style>
  /* Target the custom class */
  web-daterangepicker.custom-picker-theme {
    --drp-accent-color: #8b5cf6;
    --drp-border-radius: 1rem;
  }

  /* Or use more specific selectors */
  web-daterangepicker.custom-picker-theme::part(calendar) {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }
</style>`}
					languageType="html"
					titleText="HTML + CSS"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new PureDatePicker(inputElement, {
  className: 'custom-picker-theme'
});

// Or add class after initialization
inputElement.classList.add('custom-picker-theme');`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Styling Strategies</h5>
					<ul>
						<li><strong>CSS Variables</strong> - Recommended for color/spacing</li>
						<li><strong>Custom Classes</strong> - For unique component styling</li>
						<li><strong>Shadow Parts</strong> - For deep customization (if supported)</li>
					</ul>

					<h5>Best Practices</h5>
					<ul>
						<li>Use semantic class names</li>
						<li>Keep specificity low for maintainability</li>
						<li>Test in different browsers</li>
						<li>Document your custom themes</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Input Field Styling Limitation -->
		<section class="mb-5">
			<div class="alert alert-warning">
				<h4 class="alert-heading">⚠️ Input Field Styling Limitation</h4>
				<p>
					<strong>The component cannot style the <code>&lt;input&gt;</code> element directly</strong> due to Shadow DOM encapsulation.
				</p>

				<hr />

				<h6>Why This Happens</h6>
				<p>
					The date picker uses Shadow DOM for style isolation. The <code>&lt;input&gt;</code> element lives in the light DOM (your page),
					while the calendar lives in the shadow DOM (component internals). Styles inside shadow DOM cannot reach out to style light DOM elements.
				</p>

				<h6>What You Must Do</h6>
				<p class="mb-2">Style the input element using your own CSS:</p>

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
}`}
					languageType="css"
					titleText="Input Styling (Your CSS)"
				/>

				<h6 class="mt-3">Alternative: Provide Your Own Input</h6>
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
	</div>
</DocLayout>
