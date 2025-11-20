<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Custom Summary"
	descriptionText="Customize the summary display shown below the calendar in range mode"
>
	<div class="py-1">
		<section class="mb-5">
			<p class="lead">
				Control how the summary area displays selection information in range mode. Perfect for showing
				pricing, night counts, or custom messaging below the calendar grid.
			</p>
			<div class="alert alert-info">
				<strong>Note:</strong> The summary area only appears in <strong>range mode</strong> when both start and end dates are selected.
				It appears below the calendar grid, not in the input field.
			</div>
		</section>

		<ShowcaseSection
			titleText="Custom Range Summary"
			subtitleText="Customize the summary text below the calendar"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					id="picker-range-with-days"
					selection-mode="range"
					visible-months-count="2"
					placeholder="Select date range">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Open calendar and select a range to see custom summary below the grid</p>
				<script>
					if (typeof window !== 'undefined') {
						setTimeout(() => {
							const picker = document.getElementById('picker-range-with-days');
							if (picker && picker.picker) {
								picker.picker.options.formatSummaryCallback = (data) => {
									if (!data.startDate || !data.endDate) return '';

									const start = data.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
									const end = data.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

									return `${start} - ${end} (${data.days} ${data.days === 1 ? 'day' : 'days'})`;
								};
							}
						}, 500);
					}
				</script>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  selectionMode: 'range',

  formatSummaryCallback: (data) => {
    if (!data.startDate || !data.endDate) return '';

    const start = data.startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    const end = data.endDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    return \`\${start} - \${end} (\${data.days} \${data.days === 1 ? 'day' : 'days'})\`;
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>What It Does</h5>
					<p>Customizes the text shown in the <strong>calendar summary area</strong> (below the calendar grid) in range mode.</p>

					<h5>Common Patterns</h5>
					<ul>
						<li><strong>With duration</strong> - "Nov 1 - Nov 7 (7 days)"</li>
						<li><strong>Day count emphasis</strong> - Large bold number + "days"</li>
						<li><strong>Nights for hotels</strong> - Use <code>data.nights</code> instead of <code>data.days</code></li>
					</ul>

					<h5>Available Data</h5>
					<ul>
						<li><code>data.startDate</code> - Range start (Date object)</li>
						<li><code>data.endDate</code> - Range end (Date object)</li>
						<li><code>data.days</code> - Total days in range</li>
						<li><code>data.nights</code> - Total nights (days - 1)</li>
						<li><code>data.localeStrings</code> - Localized text (day/days, night/nights)</li>
					</ul>

					<h5>Important Note</h5>
					<p>This does <strong>not</strong> change the input field value. The input field uses <code>dateFormatMask</code> for formatting.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="Hotel Booking with Pricing"
			subtitleText="Show price calculations in the summary"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					id="picker-hotel"
					selection-mode="range"
					visible-months-count="2"
					placeholder="Select check-in and check-out">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Select dates to see price calculation in calendar summary area</p>
				<script>
					if (typeof window !== 'undefined') {
						setTimeout(() => {
							const picker = document.getElementById('picker-hotel');
							if (picker && picker.picker) {
								picker.picker.options.formatSummaryCallback = (data) => {
									if (!data.startDate || !data.endDate) return '';

									const pricePerNight = 150;
									const total = data.nights * pricePerNight;
									const prefix = data.isPreview ?
										`<span style="opacity: 0.7;">${data.localeStrings.preview}: </span>` : '';

									return `
										${prefix}
										<div style="display: flex; justify-content: space-between; width: 100%; gap: 1rem;">
											<span>${data.nights} ${data.nights === 1 ? data.localeStrings.night : data.localeStrings.nights}</span>
											<span style="font-weight: bold; color: #10b981;">$${total}</span>
										</div>
									`;
								};
							}
						}, 500);
					}
				</script>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  selectionMode: 'range',

  formatSummaryCallback: (data) => {
    if (!data.startDate || !data.endDate) return '';

    const pricePerNight = 150;
    const total = data.nights * pricePerNight;
    const prefix = data.isPreview ?
      \`<span style="opacity: 0.7;">\${data.localeStrings.preview}: </span>\` : '';

    return \`
      \${prefix}
      <div style="display: flex; justify-content: space-between; width: 100%; gap: 1rem;">
        <span>\${data.nights} \${data.nights === 1 ? data.localeStrings.night : data.localeStrings.nights}</span>
        <span style="font-weight: bold; color: #10b981;">$\${total}</span>
      </div>
    \`;
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Key Features</h5>
					<ul>
						<li><strong>Price calculation</strong> - Multiply nights by rate</li>
						<li><strong>Flexbox layout</strong> - Left-aligned text, right-aligned price</li>
						<li><strong>Preview mode</strong> - Shows dimmed "Preview:" label when dragging</li>
						<li><strong>Green accent</strong> - Bold green price (#10b981)</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Hotels/Airbnb</strong> - Show total booking cost</li>
						<li><strong>Car rentals</strong> - Daily rate × days</li>
						<li><strong>Event venues</strong> - Per-night facility fees</li>
						<li><strong>Variable pricing</strong> - Weekday vs weekend rates</li>
					</ul>

					<h5>Available Data</h5>
					<p>The callback receives <code>SummaryCallbackData</code> with:</p>
					<ul>
						<li><code>data.nights</code> - Precalculated night count</li>
						<li><code>data.days</code> - Total days in range</li>
						<li><code>data.startDate</code>, <code>data.endDate</code> - Date objects</li>
						<li><code>data.localeStrings</code> - Localized text (night/nights, preview, etc.)</li>
						<li><code>data.isPreview</code> - True when user is dragging to adjust dates</li>
					</ul>

					<h5>Where It Appears</h5>
					<p><strong>Calendar summary area</strong> - Below the calendar grid, only visible in range mode when both dates are selected</p>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
