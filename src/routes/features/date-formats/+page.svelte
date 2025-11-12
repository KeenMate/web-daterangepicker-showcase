<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Date Formats"
	descriptionText="Configure how dates are displayed and parsed with flexible format options"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				Customize date display formats to match regional conventions or application requirements.
				The picker supports common format patterns and locale-specific formatting.
			</p>
		</section>

		<!-- Standard Formats -->
		<ShowcaseSection
			titleText="Standard Date Formats"
			subtitleText="Common date format patterns"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<date-range-picker
					selection-mode="single"
					date-format="MM/DD/YYYY"
					placeholder="MM/DD/YYYY">
				</date-range-picker>
				<p class="mt-3 small text-muted">US format: Month/Day/Year</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component - US Format -->
<date-range-picker
  selection-mode="single"
  date-format="MM/DD/YYYY"
  placeholder="MM/DD/YYYY">
</date-range-picker>

<!-- European Format -->
<date-range-picker
  selection-mode="single"
  date-format="DD/MM/YYYY"
  placeholder="DD/MM/YYYY">
</date-range-picker>

<!-- ISO Format -->
<date-range-picker
  selection-mode="single"
  date-format="YYYY-MM-DD"
  placeholder="YYYY-MM-DD">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

// US format
const picker1 = new PureDatePicker(input1, {
  dateFormat: 'MM/DD/YYYY'
});

// European format
const picker2 = new PureDatePicker(input2, {
  dateFormat: 'DD/MM/YYYY'
});

// ISO format
const picker3 = new PureDatePicker(input3, {
  dateFormat: 'YYYY-MM-DD'
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Common Formats</h5>
					<ul>
						<li><code>MM/DD/YYYY</code> - US format (12/31/2024)</li>
						<li><code>DD/MM/YYYY</code> - European format (31/12/2024)</li>
						<li><code>YYYY-MM-DD</code> - ISO format (2024-12-31)</li>
						<li><code>DD.MM.YYYY</code> - German format (31.12.2024)</li>
					</ul>

					<h5>Format Tokens</h5>
					<ul>
						<li><code>YYYY</code> - 4-digit year (2024)</li>
						<li><code>YY</code> - 2-digit year (24)</li>
						<li><code>MM</code> - 2-digit month (01-12)</li>
						<li><code>DD</code> - 2-digit day (01-31)</li>
					</ul>

					<h5>Separators</h5>
					<p>Use any separator: <code>/</code>, <code>-</code>, <code>.</code>, or space</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Range Formats -->
		<ShowcaseSection
			titleText="Range Format Separator"
			subtitleText="Customize how date ranges are displayed"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<date-range-picker
					selection-mode="range"
					date-format="MM/DD/YYYY"
					range-separator=" to "
					visible-months-count="2"
					placeholder="Select date range">
				</date-range-picker>
				<p class="mt-3 small text-muted">Custom separator: "to" instead of default "-"</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="range"
  date-format="MM/DD/YYYY"
  range-separator=" to "
  placeholder="Select date range">
</date-range-picker>

<!-- Arrow separator -->
<date-range-picker
  selection-mode="range"
  date-format="DD/MM/YYYY"
  range-separator=" → "
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
  dateFormat: 'MM/DD/YYYY',
  rangeSeparator: ' to ',
  onSelect: (startDate, endDate) => {
    // Display: "12/01/2024 to 12/15/2024"
    console.log('Range selected');
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Separator Options</h5>
					<ul>
						<li><code>" - "</code> - Dash (default)</li>
						<li><code>" to "</code> - Text separator</li>
						<li><code>" → "</code> - Arrow symbol</li>
						<li><code>" / "</code> - Slash separator</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Reports</strong> - "January 1 to January 31"</li>
						<li><strong>Bookings</strong> - "Check-in → Check-out"</li>
						<li><strong>Analytics</strong> - "Start - End"</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Long Date Formats -->
		<ShowcaseSection
			titleText="Long Date Formats"
			subtitleText="Verbose date formatting with month names"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<date-range-picker
					selection-mode="single"
					date-format="MMMM DD, YYYY"
					placeholder="Select a date">
				</date-range-picker>
				<p class="mt-3 small text-muted">Long format: December 31, 2024</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="single"
  date-format="MMMM DD, YYYY"
  placeholder="Select a date">
</date-range-picker>

<!-- Short month name -->
<date-range-picker
  selection-mode="single"
  date-format="MMM DD, YYYY"
  placeholder="Select a date">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

// Long format
const picker1 = new PureDatePicker(input1, {
  dateFormat: 'MMMM DD, YYYY'
  // Output: "December 31, 2024"
});

// Short month format
const picker2 = new PureDatePicker(input2, {
  dateFormat: 'MMM DD, YYYY'
  // Output: "Dec 31, 2024"
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Month Name Tokens</h5>
					<ul>
						<li><code>MMMM</code> - Full month name (December)</li>
						<li><code>MMM</code> - Short month name (Dec)</li>
						<li><code>MM</code> - Numeric month (12)</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Formal documents</strong> - Full month names for clarity</li>
						<li><strong>User-facing displays</strong> - More readable than numeric dates</li>
						<li><strong>International audiences</strong> - Avoid date format confusion</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
