<script lang="ts">
	import { DocLayout, FeatureCard, CodeBlock } from '@keenmate/svelte-docs';
</script>

<DocLayout
	titleText="Web Date Range Picker"
	descriptionText="A feature-rich, customizable date range picker for modern web applications"
>
	<div class="py-1">
		<!-- Hero Section -->
		<section class="mb-5 text-center">
			<h1 class="display-4 mb-3">Web Date Range Picker</h1>
			<p class="lead mb-4">
				A powerful and flexible date picker component with single and range selection modes,
				internationalization support, and comprehensive customization options.
			</p>
			<div class="d-flex gap-3 justify-content-center">
				<a href="/getting-started" class="btn btn-primary btn-lg">
					Get Started
				</a>
				<a
					href="https://github.com/keenmate/web-daterangepicker"
					target="_blank"
					class="btn btn-outline-secondary btn-lg"
				>
					View on GitHub
				</a>
			</div>
		</section>

		<!-- Features Grid -->
		<section class="mb-5">
			<h2 class="mb-4">Key Features</h2>
			<div class="row g-4">
				<div class="col-md-6 col-lg-4">
					<FeatureCard
						titleText="Single & Range Selection"
						descriptionText="Support for both single date and date range selection with intuitive click and drag interactions"
						icon="📅"
					/>
				</div>
				<div class="col-md-6 col-lg-4">
					<FeatureCard
						titleText="Input Masking"
						descriptionText="Automatic date formatting as you type with support for multiple date formats"
						icon="⌨️"
					/>
				</div>
				<div class="col-md-6 col-lg-4">
					<FeatureCard
						titleText="Multi-Month Display"
						descriptionText="Display multiple months side by side in horizontal or grid layouts"
						icon="📊"
					/>
				</div>
				<div class="col-md-6 col-lg-4">
					<FeatureCard
						titleText="Internationalization"
						descriptionText="Built-in support for multiple languages with auto-detection and custom strings"
						icon="🌍"
					/>
				</div>
				<div class="col-md-6 col-lg-4">
					<FeatureCard
						titleText="Date Restrictions"
						descriptionText="Min/max dates, disabled weekdays, custom disable logic, and more"
						icon="🚫"
					/>
				</div>
				<div class="col-md-6 col-lg-4">
					<FeatureCard
						titleText="Keyboard Navigation"
						descriptionText="Full keyboard support with arrow keys, home/end, page up/down, and shortcuts"
						icon="⌨️"
					/>
				</div>
				<div class="col-md-6 col-lg-4">
					<FeatureCard
						titleText="Custom Styling"
						descriptionText="Fully themeable with CSS custom properties and extensive style options"
						icon="🎨"
					/>
				</div>
				<div class="col-md-6 col-lg-4">
					<FeatureCard
						titleText="Web Component"
						descriptionText="Use as a standard web component or via JavaScript API"
						icon="✨"
					/>
				</div>
				<div class="col-md-6 col-lg-4">
					<FeatureCard
						titleText="TypeScript Support"
						descriptionText="Full TypeScript definitions included for better development experience"
						icon="📘"
					/>
				</div>
			</div>
		</section>

		<!-- Quick Start -->
		<section class="mb-5">
			<h2 class="mb-4">Quick Start</h2>
			<p class="lead mb-3">Install via npm:</p>
			<CodeBlock
				codeContent="npm install @keenmate/web-daterangepicker"
				languageType="bash"
				titleText="Installation"
			/>

			<p class="lead mt-4 mb-3">Use as a Web Component:</p>
			<CodeBlock
				codeContent={`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@keenmate/web-daterangepicker/dist/style.css">
  <script type="module" src="node_modules/@keenmate/web-daterangepicker/dist/date-range-picker.js"></script>
</head>
<body>
  <date-range-picker
    selection-mode="range"
    placeholder="Select dates">
  </date-range-picker>
</body>
</html>`}
				languageType="html"
				titleText="Web Component"
			/>

			<p class="lead mt-4 mb-3">Or use the JavaScript API:</p>
			<CodeBlock
				codeContent={`import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  selectionMode: 'range',
  visibleMonthsCount: 2,
  onSelect: (dateRange) => {
    console.log('Selected:', dateRange);
  }
});`}
				languageType="javascript"
				titleText="JavaScript API"
			/>
		</section>

		<!-- Next Steps -->
		<section class="mb-5">
			<h2 class="mb-4">Next Steps</h2>
			<div class="d-flex gap-3">
				<a href="/getting-started" class="btn btn-primary">
					Getting Started Guide
				</a>
				<a href="/features/selection-modes" class="btn btn-outline-primary">
					Explore Features
				</a>
				<a href="/api" class="btn btn-outline-secondary">
					API Reference
				</a>
			</div>
		</section>
	</div>
</DocLayout>
