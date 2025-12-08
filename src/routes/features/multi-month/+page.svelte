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
			titleText="MM01 Horizontal Layout"
			subtitleText="Display months side-by-side"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					visible-months-count="2"
					month-layout="horizontal"
					placeholder="Select date range"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Two months displayed horizontally for easy range selection
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="range"
  visible-months-count="2"
  month-layout="horizontal"
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
			titleText="MM02 Grid Layout"
			subtitleText="Display months in a grid pattern"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					visible-months-count="6"
					month-layout="grid"
					grid-rows="2"
					grid-columns="3"
					positioning-mode="inline"
					placeholder="Select a date"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">6 months in a 2×3 grid for broader overview</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="single"
  visible-months-count="6"
  month-layout="grid"
  grid-rows="2"
  grid-columns="3"
  positioning-mode="inline"
  placeholder="Select a date">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new DateRangePicker(inputElement, {
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
						<li><code>visible-months-count</code> - <strong>Must equal grid-rows × grid-columns</strong></li>
					</ul>

					<div class="alert alert-warning mt-3">
						<strong>Important:</strong> The <code>visible-months-count</code> must equal <code>grid-rows × grid-columns</code>.
						For example, a 2×3 grid requires <code>visible-months-count="6"</code> (2 rows × 3 columns = 6 months).
					</div>

					<h5>Common Grid Configurations</h5>
					<ul>
						<li><strong>2×2 grid:</strong> <code>grid-rows="2" grid-columns="2" visible-months-count="4"</code></li>
						<li><strong>2×3 grid:</strong> <code>grid-rows="2" grid-columns="3" visible-months-count="6"</code></li>
						<li><strong>3×4 grid:</strong> <code>grid-rows="3" grid-columns="4" visible-months-count="12"</code></li>
					</ul>

					<h5>Best Practices</h5>
					<ul>
						<li>Use inline mode for grid layouts to keep them always visible</li>
						<li>Ensure visible-months-count matches the grid dimensions</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Three Months -->
		<ShowcaseSection
			titleText="MM03 Three Month View"
			subtitleText="Perfect for quarterly planning"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					visible-months-count="3"
					month-layout="horizontal"
					placeholder="Select date range"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Three consecutive months for extended planning</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="range"
  visible-months-count="3"
  month-layout="horizontal"
  placeholder="Select date range">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new DateRangePicker(inputElement, {
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
