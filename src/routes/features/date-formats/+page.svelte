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
				<web-daterangepicker
					selection-mode="single"
					date-format-mask="MM/DD/YYYY"
					placeholder="MM/DD/YYYY">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">US format: Month/Day/Year</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component - US Format -->
<web-daterangepicker
  selection-mode="single"
  date-format-mask="MM/DD/YYYY"
  placeholder="MM/DD/YYYY">
</web-daterangepicker>

<!-- European Format -->
<web-daterangepicker
  selection-mode="single"
  date-format-mask="DD/MM/YYYY"
  placeholder="DD/MM/YYYY">
</web-daterangepicker>

<!-- ISO Format -->
<web-daterangepicker
  selection-mode="single"
  date-format-mask="YYYY-MM-DD"
  placeholder="YYYY-MM-DD">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

// US format
const picker1 = new PureDatePicker(input1, {
  dateFormatMask: 'MM/DD/YYYY'
});

// European format
const picker2 = new PureDatePicker(input2, {
  dateFormatMask: 'DD/MM/YYYY'
});

// ISO format
const picker3 = new PureDatePicker(input3, {
  dateFormatMask: 'YYYY-MM-DD'
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

		<!-- Supported Formats -->
		<ShowcaseSection
			titleText="Supported Formats"
			subtitleText="Only numeric date formats are currently supported"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					date-format-mask="MM/DD/YYYY"
					placeholder="Select a date">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Note: Month names (MMMM/MMM) are not supported. Use numeric formats (MM/DD/YYYY)</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Note: Month names (MMMM/MMM) are NOT supported -->
<!-- The component only supports numeric formats -->

<!-- Numeric month format (SUPPORTED) -->
<web-daterangepicker
  selection-mode="single"
  date-format-mask="MM/DD/YYYY"
  placeholder="MM/DD/YYYY">
</web-daterangepicker>

<!-- Alternative numeric formats -->
<web-daterangepicker
  selection-mode="single"
  date-format-mask="DD/MM/YYYY"
  placeholder="DD/MM/YYYY">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

// Note: Month names (MMMM/MMM) are NOT supported
// Only numeric formats are supported

// US numeric format (SUPPORTED)
const picker1 = new PureDatePicker(input1, {
  dateFormatMask: 'MM/DD/YYYY'
  // Output: "12/31/2024"
});

// European numeric format (SUPPORTED)
const picker2 = new PureDatePicker(input2, {
  dateFormatMask: 'DD/MM/YYYY'
  // Output: "31/12/2024"
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Current Limitations</h5>
					<p>
						<strong>Month names (MMMM/MMM) are NOT currently supported.</strong>
						The date picker only supports numeric formats at this time.
					</p>

					<h5>Supported Tokens</h5>
					<ul>
						<li><code>YYYY</code> / <code>YY</code> - 4-digit or 2-digit year</li>
						<li><code>MM</code> / <code>M</code> - 2-digit or 1-digit month (01-12 or 1-12)</li>
						<li><code>DD</code> / <code>D</code> - 2-digit or 1-digit day (01-31 or 1-31)</li>
					</ul>

					<h5>Supported Separators</h5>
					<ul>
						<li><code>/</code> - Slash (12/31/2024)</li>
						<li><code>-</code> - Hyphen (2024-12-31)</li>
						<li><code>.</code> - Period (31.12.2024)</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
