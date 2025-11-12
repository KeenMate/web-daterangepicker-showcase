<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Multi-Month Display"
	descriptionText="Display multiple calendar months side-by-side for better range selection and navigation"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				The date picker can display multiple months simultaneously in horizontal or grid layouts,
				making it easier to select date ranges and see more context at once.
			</p>
		</section>

		<!-- Horizontal Layout -->
		<ShowcaseSection
			titleText="Horizontal Layout"
			subtitleText="Display months side-by-side"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<date-range-picker
					selection-mode="range"
					visible-months-count="2"
					month-layout="horizontal"
					placeholder="Select date range"
				>
				</date-range-picker>
				<p class="mt-3 small text-muted">
					Two months displayed horizontally for easy range selection
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="range"
  visible-months-count="2"
  month-layout="horizontal"
  placeholder="Select date range">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  selectionMode: 'range',
  visibleMonthsCount: 2,
  monthLayout: 'horizontal',
  onSelect: (dateRange) => {
    console.log('Range:', dateRange);
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Date ranges</strong> - Easier to select ranges spanning multiple weeks</li>
						<li><strong>Hotel bookings</strong> - See check-in and check-out months together</li>
						<li><strong>Trip planning</strong> - Compare dates across two months</li>
					</ul>

					<h5>Behavior</h5>
					<p>
						Months are displayed side-by-side horizontally. Use Tab/Shift+Tab to switch focus
						between month columns for keyboard navigation.
					</p>

					<h5>Key Options</h5>
					<ul>
						<li><code>visible-months-count="2"</code> - Number of months to show (1-12+)</li>
						<li><code>month-layout="horizontal"</code> - Horizontal arrangement (default)</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Grid Layout -->
		<ShowcaseSection
			titleText="Grid Layout"
			subtitleText="Display months in a grid pattern"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<date-range-picker
					selection-mode="single"
					visible-months-count="6"
					month-layout="grid"
					grid-rows="2"
					grid-columns="3"
					positioning-mode="inline"
					placeholder="Select a date"
				>
				</date-range-picker>
				<p class="mt-3 small text-muted">6 months in a 2×3 grid for broader overview</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="single"
  visible-months-count="6"
  month-layout="grid"
  grid-rows="2"
  grid-columns="3"
  positioning-mode="inline"
  placeholder="Select a date">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new PureDatePicker(inputElement, {
  selectionMode: 'single',
  visibleMonthsCount: 6,
  monthLayout: 'grid',
  gridRows: 2,
  gridColumns: 3,
  positioningMode: 'inline',
  onSelect: (date) => {
    console.log('Selected:', date);
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Quarter planning</strong> - See 3-6 months at once</li>
						<li><strong>Event calendars</strong> - Browse multiple months for available dates</li>
						<li><strong>Seasonal booking</strong> - View entire seasons in one view</li>
					</ul>

					<h5>Configuration</h5>
					<p>Grid layout requires specifying both rows and columns:</p>
					<ul>
						<li><code>grid-rows</code> - Number of rows (e.g., 2)</li>
						<li><code>grid-columns</code> - Number of columns (e.g., 3)</li>
						<li><code>visible-months-count</code> - Should equal rows × columns</li>
					</ul>

					<h5>Best Practices</h5>
					<ul>
						<li>Use inline mode for grid layouts to keep them always visible</li>
						<li>Common grids: 2×2 (4 months), 2×3 (6 months), 3×4 (12 months)</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Three Months -->
		<ShowcaseSection
			titleText="Three Month View"
			subtitleText="Perfect for quarterly planning"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<date-range-picker
					selection-mode="range"
					visible-months-count="3"
					month-layout="horizontal"
					placeholder="Select date range"
				>
				</date-range-picker>
				<p class="mt-3 small text-muted">Three consecutive months for extended planning</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="range"
  visible-months-count="3"
  month-layout="horizontal"
  placeholder="Select date range">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new PureDatePicker(inputElement, {
  selectionMode: 'range',
  visibleMonthsCount: 3,
  monthLayout: 'horizontal',
  onSelect: (dateRange) => {
    const start = dateRange.start.toLocaleDateString();
    const end = dateRange.end.toLocaleDateString();
    console.log(\`Selected: \${start} - \${end}\`);
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Quarterly reports</strong> - Select date ranges within a quarter</li>
						<li><strong>Extended trips</strong> - Plan vacations spanning multiple months</li>
						<li><strong>Project timelines</strong> - View project duration across months</li>
					</ul>

					<h5>Flexibility</h5>
					<p>You can show any number of months from 1 to 12 or more:</p>
					<ul>
						<li><code>visible-months-count="1"</code> - Single month (default for single mode)</li>
						<li><code>visible-months-count="2"</code> - Two months (default for range mode)</li>
						<li><code>visible-months-count="3"</code> - Three months</li>
						<li><code>visible-months-count="12"</code> - Full year view</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
