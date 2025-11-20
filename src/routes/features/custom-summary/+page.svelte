<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let customSummaryOutput = $state('(Select a date range to see custom summary)');
	let pricingSummaryOutput = $state('(Select a date range to see pricing)');

	onMount(async () => {
		await import('@keenmate/web-daterangepicker');

		// Example 1: Custom date formatting
		const input1 = document.querySelector('#custom-summary-input') as any;
		if (input1) {
			input1.formatSummaryCallback = (data: any) => {
				if (!data.startDate || !data.endDate) return '';

				const start = data.startDate.toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric'
				});
				const end = data.endDate.toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric'
				});

				const summary = `${start} - ${end} (${data.days} ${data.days === 1 ? 'day' : 'days'})`;
				customSummaryOutput = summary;
				return summary;
			};

			input1.addEventListener('date-select', () => {
				// Summary is already updated via callback
			});
		}

		// Example 2: Hotel pricing
		const input2 = document.querySelector('#pricing-summary-input') as any;
		if (input2) {
			input2.formatSummaryCallback = (data: any) => {
				if (!data.startDate || !data.endDate) return '';

				const pricePerNight = 150;
				const total = data.nights * pricePerNight;
				const prefix = data.isPreview
					? `<span style="opacity: 0.7;">${data.localeStrings.preview}: </span>`
					: '';

				const summary = `${data.nights} ${data.nights === 1 ? data.localeStrings.night : data.localeStrings.nights} × $${pricePerNight} = $${total}`;
				pricingSummaryOutput = summary;

				return `
					${prefix}
					<div style="display: flex; justify-content: space-between; width: 100%; gap: 1rem;">
						<span>${data.nights} ${data.nights === 1 ? data.localeStrings.night : data.localeStrings.nights}</span>
						<span style="font-weight: bold; color: #10b981;">$${total}</span>
					</div>
				`;
			};

			input2.addEventListener('date-select', () => {
				// Summary is already updated via callback
			});
		}
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
			<div class="alert alert-warning">
				<strong>JavaScript API Only:</strong> The <code>formatSummaryCallback</code> option is <strong>only available when using the JavaScript API</strong>
				(<code>new DateRangePicker(...)</code>). It is <strong>not exposed as a web component attribute or property</strong>.
			</div>
		</section>

		<ShowcaseSection
			titleText="Custom Range Summary"
			subtitleText="Customize the summary text below the calendar"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<div class="mb-3">
					<label class="form-label fw-bold">Custom Date Format Summary</label>
					<web-daterangepicker
						id="custom-summary-input"
						selection-mode="range"
						placeholder="Select date range">
					</web-daterangepicker>
				</div>
				<div class="alert alert-secondary">
					<strong>Summary Output:</strong> {customSummaryOutput}
				</div>
				<p class="small text-muted">
					The summary appears both inside the calendar (below the grid) and is shown above.
					Try selecting a date range to see the custom format.
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
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

				<CodeBlock
					codeContent={`<!-- HTML -->
<input
  id="date-range"
  type="text"
  placeholder="Select date range"
/>`}
					languageType="html"
					titleText="HTML"
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
						<li><code>data.isPreview</code> - True when dragging to adjust dates</li>
					</ul>

					<h5>Important Note</h5>
					<p>This does <strong>not</strong> change the input field value. The input field uses <code>date-format-mask</code> for formatting.</p>
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
				<div class="mb-3">
					<label class="form-label fw-bold">Hotel Booking ($150/night)</label>
					<web-daterangepicker
						id="pricing-summary-input"
						selection-mode="range"
						placeholder="Select check-in and check-out dates">
					</web-daterangepicker>
				</div>
				<div class="alert alert-secondary">
					<strong>Pricing Calculation:</strong> {pricingSummaryOutput}
				</div>
				<p class="small text-muted">
					Select a date range to see the total price calculation. The calendar also shows this
					in the summary area below the grid.
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
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

				<CodeBlock
					codeContent={`<!-- HTML -->
<input
  id="hotel-booking"
  type="text"
  placeholder="Select check-in and check-out"
/>`}
					languageType="html"
					titleText="HTML"
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

		<!-- Additional Examples -->
		<section class="mt-5">
			<h2>Additional Examples</h2>

			<div class="card mb-4">
				<div class="card-header">
					<h5 class="mb-0">Variable Pricing (Weekday vs Weekend)</h5>
				</div>
				<div class="card-body">
					<CodeBlock
						codeContent={`const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  formatSummaryCallback: (data) => {
    if (!data.startDate || !data.endDate) return '';

    // Calculate weekday and weekend nights
    let weekdayNights = 0;
    let weekendNights = 0;

    const current = new Date(data.startDate);
    const end = new Date(data.endDate);

    while (current < end) {
      const day = current.getDay();
      if (day === 5 || day === 6) { // Friday or Saturday
        weekendNights++;
      } else {
        weekdayNights++;
      }
      current.setDate(current.getDate() + 1);
    }

    const weekdayPrice = weekdayNights * 120;
    const weekendPrice = weekendNights * 200;
    const total = weekdayPrice + weekendPrice;

    return \`
      <div style="font-size: 0.9em;">
        <div>\${weekdayNights} weekday nights × $120 = $\${weekdayPrice}</div>
        <div>\${weekendNights} weekend nights × $200 = $\${weekendPrice}</div>
        <div style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #e5e7eb;">
          <strong>Total: $\${total}</strong>
        </div>
      </div>
    \`;
  }
});`}
						languageType="javascript"
						titleText="Variable Pricing Example"
					/>
				</div>
			</div>

			<div class="card mb-4">
				<div class="card-header">
					<h5 class="mb-0">Multi-Language Support</h5>
				</div>
				<div class="card-body">
					<CodeBlock
						codeContent={`const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  locale: 'de-DE',
  formatSummaryCallback: (data) => {
    if (!data.startDate || !data.endDate) return '';

    const start = data.startDate.toLocaleDateString('de-DE');
    const end = data.endDate.toLocaleDateString('de-DE');

    // data.localeStrings automatically adapts to locale
    return \`\${start} - \${end} (\${data.nights} \${data.localeStrings.nights})\`;
  }
});`}
						languageType="javascript"
						titleText="Localized Summary"
					/>
				</div>
			</div>

			<div class="card">
				<div class="card-header">
					<h5 class="mb-0">Minimum Stay Validation</h5>
				</div>
				<div class="card-body">
					<CodeBlock
						codeContent={`const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  formatSummaryCallback: (data) => {
    if (!data.startDate || !data.endDate) return '';

    const minNights = 2;
    const meetsMinimum = data.nights >= minNights;

    if (!meetsMinimum) {
      return \`
        <span style="color: #ef4444;">
          ⚠️ Minimum \${minNights} nights required (selected: \${data.nights})
        </span>
      \`;
    }

    return \`
      <span style="color: #10b981;">
        ✓ \${data.nights} nights selected
      </span>
    \`;
  }
});`}
						languageType="javascript"
						titleText="Validation in Summary"
					/>
				</div>
			</div>
		</section>
	</div>
</DocLayout>
