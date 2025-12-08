<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Unified Navigation"
	descriptionText="Control multiple months with a single unified navigation header"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				When displaying multiple months, unified navigation provides a single header that controls
				all visible months simultaneously, creating a cleaner and more intuitive interface.
			</p>
		</section>

		<!-- Basic Unified Navigation -->
		<ShowcaseSection
			titleText="UN01 Basic Unified Navigation"
			subtitleText="Single header controls all months"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					visible-months-count="6"
					month-layout="grid"
					grid-rows="2"
					grid-columns="3"
					unified-navigation
					positioning-mode="inline"
					placeholder="Select date range"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					6 months with unified navigation header showing range "January 2025 - June 2025"
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="range"
  visible-months-count="6"
  month-layout="grid"
  grid-rows="2"
  grid-columns="3"
  unified-navigation
  positioning-mode="inline"
  placeholder="Select date range">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
  selectionMode: 'range',
  visibleMonthsCount: 6,
  monthLayout: 'grid',
  gridRows: 2,
  gridColumns: 3,
  unifiedNavigation: true,
  positioningMode: 'inline'
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>What is Unified Navigation?</h5>
					<p>
						Instead of showing individual navigation headers for each month, unified navigation
						displays a single header at the top showing the range of visible months (e.g.,
						"January 2025 - June 2025").
					</p>

					<h5>Benefits</h5>
					<ul>
						<li><strong>Cleaner interface</strong> - Less visual clutter with one header</li>
						<li>
							<strong>Synchronized navigation</strong> - All months navigate together as a unit
						</li>
						<li><strong>Better UX</strong> - Clear indication of what months are visible</li>
						<li><strong>Space efficient</strong> - Saves vertical space in grid layouts</li>
					</ul>

					<h5>Key Option</h5>
					<ul>
						<li><code>unified-navigation</code> - Enable unified navigation header</li>
					</ul>

					<div class="alert alert-info mt-3">
						<strong>Note:</strong> Unified navigation works with both horizontal and grid layouts,
						and is especially useful for grid layouts with 4+ months.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Interactive Unified Header -->
		<ShowcaseSection
			titleText="UN02 Interactive Unified Header"
			subtitleText="Click header to open month/year selector"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					visible-months-count="6"
					month-layout="grid"
					grid-rows="2"
					grid-columns="3"
					unified-navigation
					unified-header-interactive
					positioning-mode="inline"
					placeholder="Select date range"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Click the unified header to open the month/year rolling selector
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="range"
  visible-months-count="6"
  month-layout="grid"
  grid-rows="2"
  grid-columns="3"
  unified-navigation
  unified-header-interactive
  positioning-mode="inline"
  placeholder="Select date range">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new DateRangePicker(inputElement, {
  selectionMode: 'range',
  visibleMonthsCount: 6,
  monthLayout: 'grid',
  gridRows: 2,
  gridColumns: 3,
  unifiedNavigation: true,
  unifiedHeaderInteractive: true,
  positioningMode: 'inline'
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Interactive Header</h5>
					<p>
						When <code>unified-header-interactive</code> is enabled, clicking the unified header
						range display opens the month/year rolling selector, allowing quick navigation to any
						month/year.
					</p>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Quick jumps</strong> - Jump to specific months without clicking arrows</li>
						<li><strong>Year changes</strong> - Easily navigate between years</li>
						<li><strong>Better UX</strong> - More intuitive than clicking arrows repeatedly</li>
					</ul>

					<h5>Key Options</h5>
					<ul>
						<li><code>unified-navigation</code> - Enable unified navigation (required)</li>
						<li>
							<code>unified-header-interactive</code> - Make header clickable to open selector
						</li>
					</ul>

					<div class="alert alert-info mt-3">
						<strong>Try it:</strong> Click on "January 2025 - June 2025" in the demo above to open
						the rolling selector and quickly navigate to different months/years.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Custom Header Text -->
		<ShowcaseSection
			titleText="UN03 Custom Header Text"
			subtitleText="Customize the unified header display"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="custom-header-demo"
					selection-mode="single"
					visible-months-count="9"
					month-layout="grid"
					grid-rows="3"
					grid-columns="3"
					unified-navigation
					unified-navigation-anchor-index="4"
					positioning-mode="inline"
					placeholder="Select a date"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Custom header shows only the center anchor month instead of full range
				</p>

				<script>
					// Wait for component to load
					setTimeout(() => {
						const picker = document.getElementById('custom-header-demo');
						if (picker) {
							picker.getUnifiedHeaderCallback = ({ anchorMonth, monthNames }) => {
								return `${monthNames[anchorMonth.getMonth()]} ${anchorMonth.getFullYear()}`;
							};
						}
					}, 100);
				</script>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component with Script -->
<web-daterangepicker
  id="custom-header-demo"
  selection-mode="single"
  visible-months-count="9"
  month-layout="grid"
  grid-rows="3"
  grid-columns="3"
  unified-navigation
  unified-navigation-anchor-index="4"
  positioning-mode="inline">
</web-daterangepicker>

<script>
  const picker = document.getElementById('custom-header-demo');
  picker.getUnifiedHeaderCallback = ({ anchorMonth, monthNames }) => {
    // Display only the anchor (center) month
    return \`\${monthNames[anchorMonth.getMonth()]} \${anchorMonth.getFullYear()}\`;
  };
</script>`}
					languageType="html"
					titleText="HTML + JavaScript"
				/>

				<CodeBlock
					codeContent={`// JavaScript API - Display anchor month only
const picker = new DateRangePicker(inputElement, {
  selectionMode: 'single',
  visibleMonthsCount: 9,
  monthLayout: 'grid',
  gridRows: 3,
  gridColumns: 3,
  unifiedNavigation: true,
  unifiedNavigationAnchorIndex: 4, // Center month (0-indexed)
  getUnifiedHeaderCallback: ({ anchorMonth, monthNames }) => {
    // Display only center month: "May 2025"
    return \`\${monthNames[anchorMonth.getMonth()]} \${anchorMonth.getFullYear()}\`;
  }
});

// Or custom range format
getUnifiedHeaderCallback: ({ firstMonth, lastMonth, monthNames }) => {
  // Display: "Jan - Sep 2025"
  return \`\${monthNames[firstMonth.getMonth()]} - \${monthNames[lastMonth.getMonth()]} \${lastMonth.getFullYear()}\`;
}`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Custom Header Callback</h5>
					<p>
						The <code>getUnifiedHeaderCallback</code> allows you to customize the text displayed in
						the unified header. This is useful for showing only the anchor month, custom date
						formats, or localized text.
					</p>

					<h5>Callback Parameters</h5>
					<p>The callback receives an object with:</p>
					<ul>
						<li><code>firstMonth</code> - Date object for first visible month</li>
						<li><code>lastMonth</code> - Date object for last visible month</li>
						<li><code>anchorMonth</code> - Date object for the anchor month</li>
						<li>
							<code>monthNames</code> - Array of localized month names (e.g., ["January", ...])
						</li>
					</ul>

					<h5>Common Patterns</h5>
					<ul>
						<li><strong>Anchor only:</strong> Display center month in 3×3 grids</li>
						<li><strong>Short format:</strong> "Jan - Sep 2025" instead of full names</li>
						<li><strong>Localized:</strong> Custom format based on user locale</li>
					</ul>

					<div class="alert alert-warning mt-3">
						<strong>Note:</strong> This callback is only available as a JavaScript property, not as
						an HTML attribute. Set it via JavaScript after component initialization.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Anchor Index -->
		<ShowcaseSection
			titleText="UN04 Navigation Anchor"
			subtitleText="Control which month drives navigation"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					visible-months-count="6"
					month-layout="grid"
					grid-rows="2"
					grid-columns="3"
					unified-navigation
					unified-navigation-anchor-index="2"
					positioning-mode="inline"
					placeholder="Select date range"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Anchor set to middle of top row (index 2) for balanced navigation
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="range"
  visible-months-count="6"
  month-layout="grid"
  grid-rows="2"
  grid-columns="3"
  unified-navigation
  unified-navigation-anchor-index="2"
  positioning-mode="inline">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new DateRangePicker(inputElement, {
  visibleMonthsCount: 6,
  monthLayout: 'grid',
  gridRows: 2,
  gridColumns: 3,
  unifiedNavigation: true,
  unifiedNavigationAnchorIndex: 2, // Middle of top row (0-indexed)

  // For 3×3 grid (9 months), use center:
  // unifiedNavigationAnchorIndex: 4
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>What is the Anchor Index?</h5>
					<p>
						The anchor index determines which month is considered the "center" for navigation
						purposes. When you click previous/next, the calendar navigates relative to this anchor
						month.
					</p>

					<h5>Common Anchor Positions</h5>
					<ul>
						<li><strong>2×3 grid (6 months):</strong> Index 2 (middle of top row)</li>
						<li><strong>3×3 grid (9 months):</strong> Index 4 (center month)</li>
						<li><strong>2×2 grid (4 months):</strong> Index 1 or 2 (middle months)</li>
						<li><strong>Default:</strong> Index 0 (first month) if not specified</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li>
							<strong>Balanced navigation:</strong> Navigate forward/back relative to center
						</li>
						<li><strong>Custom header:</strong> Display anchor month as the "current" month</li>
						<li>
							<strong>Smooth scrolling:</strong> More intuitive navigation for large grids
						</li>
					</ul>

					<div class="alert alert-info mt-3">
						<strong>Tip:</strong> For symmetric grids (3×3, 2×2), use the center month as anchor
						for the most balanced navigation experience.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
