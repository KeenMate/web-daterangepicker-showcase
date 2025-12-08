<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let customSummaryOutput = $state('(Select a date range to see custom summary)');
	let pricingSummaryOutput = $state('(Select a date range to see pricing)');

	// Calculate current month dates for hotel booking example
	const today = new Date();
	const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
	const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	const minDate = firstDay.toISOString().split('T')[0];
	const maxDate = lastDay.toISOString().split('T')[0];

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

		// Example 2: Hotel pricing with multi-tier pricing and badges
		const input2 = document.querySelector('#pricing-summary-input') as any;
		if (input2) {
			// Price tiers based on day of week and special dates
			const PRICES = {
				budget: 99,    // Mon-Tue
				standard: 149, // Wed-Thu
				premium: 199,  // Fri
				deluxe: 249,   // Sat
				luxury: 299    // Special dates (7th, 14th, 21st, 28th)
			};

			// Helper function to get price tier for a date
			const getPriceTier = (date: Date) => {
				const dayOfWeek = date.getDay();
				const dateNum = date.getDate();

				// Special event dates (7th, 14th, 21st, 28th)
				if ([7, 14, 21, 28].includes(dateNum)) {
					return { tier: 'luxury', price: PRICES.luxury, label: 'Luxury (Special Event)' };
				}

				// Weekend premium pricing
				if (dayOfWeek === 6) { // Saturday
					return { tier: 'deluxe', price: PRICES.deluxe, label: 'Deluxe (Sat)' };
				}
				if (dayOfWeek === 5) { // Friday
					return { tier: 'premium', price: PRICES.premium, label: 'Premium (Fri)' };
				}

				// Weekday pricing
				if (dayOfWeek === 3 || dayOfWeek === 4) { // Wed-Thu
					return { tier: 'standard', price: PRICES.standard, label: 'Standard (Wed-Thu)' };
				}

				// Budget pricing (Mon-Tue, Sun)
				return { tier: 'budget', price: PRICES.budget, label: 'Budget (Mon-Tue, Sun)' };
			};

			// Custom styles for price badges
			input2.customStylesCallback = () => {
				return `
					.price-budget {
						background-color: #d1fae5 !important;
						color: #065f46 !important;
						border: 1px solid #34d399 !important;
						font-weight: 600;
					}

					.price-standard {
						background-color: #dbeafe !important;
						color: #1e40af !important;
						border: 1px solid #60a5fa !important;
						font-weight: 600;
					}

					.price-premium {
						background-color: #e9d5ff !important;
						color: #6b21a8 !important;
						border: 1px solid #a855f7 !important;
						font-weight: 600;
					}

					.price-deluxe {
						background-color: #fed7aa !important;
						color: #92400e !important;
						border: 1px solid #fb923c !important;
						font-weight: 600;
					}

					.price-luxury {
						background-color: #fee2e2 !important;
						color: #991b1b !important;
						border: 1px solid #f87171 !important;
						font-weight: 600;
					}
				`;
			};

			// Dynamic price badges on each date
			input2.getDateMetadataCallback = (date: Date) => {
				const { tier, price, label } = getPriceTier(date);

				return {
					badgeText: `$${price}`,
					badgeClass: `badge-number price-${tier}`,
					badgeTooltip: `${label}: $${price}/night`
				};
			};

			// Enhanced summary with per-tier breakdown
			input2.formatSummaryCallback = (data: any) => {
				if (!data.startDate || !data.endDate) return '';

				// Count nights in each price tier
				const tierCounts = {
					budget: 0,
					standard: 0,
					premium: 0,
					deluxe: 0,
					luxury: 0
				};

				const current = new Date(data.startDate);
				const end = new Date(data.endDate);

				while (current < end) {
					const { tier } = getPriceTier(current);
					tierCounts[tier as keyof typeof tierCounts]++;
					current.setDate(current.getDate() + 1);
				}

				// Calculate totals for each tier
				const tierTotals = {
					budget: tierCounts.budget * PRICES.budget,
					standard: tierCounts.standard * PRICES.standard,
					premium: tierCounts.premium * PRICES.premium,
					deluxe: tierCounts.deluxe * PRICES.deluxe,
					luxury: tierCounts.luxury * PRICES.luxury
				};

				const grandTotal = Object.values(tierTotals).reduce((sum, val) => sum + val, 0);

				// Build output summary for display
				const tierLabels: Record<string, string> = {
					budget: 'budget',
					standard: 'standard',
					premium: 'premium',
					deluxe: 'deluxe',
					luxury: 'luxury'
				};

				const summaryParts: string[] = [];
				Object.entries(tierCounts).forEach(([tier, count]) => {
					if (count > 0) {
						const price = PRICES[tier as keyof typeof PRICES];
						summaryParts.push(`${count} ${tierLabels[tier]} × $${price}`);
					}
				});

				pricingSummaryOutput = `${summaryParts.join(' + ')} = $${grandTotal}`;

				// Build HTML for calendar summary
				const prefix = data.isPreview
					? `<span style="opacity: 0.7;">${data.localeStrings.preview}: </span>`
					: '';

				let breakdownHtml = '';
				Object.entries(tierCounts).forEach(([tier, count]) => {
					if (count > 0) {
						const total = tierTotals[tier as keyof typeof tierTotals];
						const price = PRICES[tier as keyof typeof PRICES];
						const nightWord = count === 1 ? 'night' : 'nights';
						breakdownHtml += `
							<div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.9em;">
								<span>${count} ${tierLabels[tier]} ${nightWord} × $${price}</span>
								<span>$${total}</span>
							</div>
						`;
					}
				});

				return `
					${prefix}
					<div style="font-size: 0.95em;">
						${breakdownHtml}
						<div style="display: flex; justify-content: space-between; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #e5e7eb;">
							<span style="font-weight: bold;">Total</span>
							<span style="font-weight: bold; color: #10b981;">$${grandTotal}</span>
						</div>
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
			titleText="CSU01 Custom Range Summary"
			subtitleText="Customize the summary text below the calendar"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

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
			titleText="CSU02 Hotel Booking with Multi-Tier Pricing"
			subtitleText="Dynamic price badges and itemized summary breakdown"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<div class="mb-3">
					<label class="form-label fw-bold">Hotel Booking (Multi-Tier Pricing)</label>
					<web-daterangepicker
						id="pricing-summary-input"
						selection-mode="range"
						min-date={minDate}
						max-date={maxDate}
						placeholder="Select check-in and check-out dates">
					</web-daterangepicker>
				</div>
				<div class="alert alert-secondary">
					<strong>Pricing Calculation:</strong> {pricingSummaryOutput}
				</div>
				<p class="small text-muted">
					Prices vary by day: Budget ($99), Standard ($149), Premium ($199), Deluxe ($249), Luxury ($299).
					Each date shows its price as a colored badge. Select a range to see the itemized breakdown.
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Multi-tier pricing with dynamic badges
const PRICES = {
  budget: 99,    // Mon-Tue, Sun
  standard: 149, // Wed-Thu
  premium: 199,  // Fri
  deluxe: 249,   // Sat
  luxury: 299    // Special dates (7th, 14th, 21st, 28th)
};

const getPriceTier = (date) => {
  const dayOfWeek = date.getDay();
  const dateNum = date.getDate();

  // Special event dates
  if ([7, 14, 21, 28].includes(dateNum)) {
    return { tier: 'luxury', price: PRICES.luxury };
  }
  // Weekend pricing
  if (dayOfWeek === 6) return { tier: 'deluxe', price: PRICES.deluxe };
  if (dayOfWeek === 5) return { tier: 'premium', price: PRICES.premium };
  // Weekday pricing
  if (dayOfWeek === 3 || dayOfWeek === 4) {
    return { tier: 'standard', price: PRICES.standard };
  }
  return { tier: 'budget', price: PRICES.budget };
};

// Add custom styles for price badges
picker.customStylesCallback = () => {
  return \`
    .price-budget { background: #d1fae5; color: #065f46; }
    .price-standard { background: #dbeafe; color: #1e40af; }
    .price-premium { background: #e9d5ff; color: #6b21a8; }
    .price-deluxe { background: #fed7aa; color: #92400e; }
    .price-luxury { background: #fee2e2; color: #991b1b; }
  \`;
};

// Show price badges on each date
picker.getDateMetadataCallback = (date) => {
  const { tier, price } = getPriceTier(date);
  return {
    badgeText: \`$\${price}\`,
    badgeClass: \`badge-number price-\${tier}\`,
    badgeTooltip: \`$\${price}/night\`
  };
};

// Enhanced summary with per-tier breakdown
picker.formatSummaryCallback = (data) => {
  if (!data.startDate || !data.endDate) return '';

  // Count nights by tier
  const tierCounts = { budget: 0, standard: 0, premium: 0, deluxe: 0, luxury: 0 };
  const current = new Date(data.startDate);
  while (current < data.endDate) {
    tierCounts[getPriceTier(current).tier]++;
    current.setDate(current.getDate() + 1);
  }

  // Calculate totals
  let html = '';
  let grandTotal = 0;
  Object.entries(tierCounts).forEach(([tier, count]) => {
    if (count > 0) {
      const total = count * PRICES[tier];
      grandTotal += total;
      html += \`<div>\${count} \${tier} × $\${PRICES[tier]} = $\${total}</div>\`;
    }
  });

  return html + \`<div style="font-weight: bold;">Total: $\${grandTotal}</div>\`;
};`}
					languageType="javascript"
					titleText="JavaScript - Multi-Tier Pricing"
				/>

				<CodeBlock
					codeContent={`<!-- HTML with current month dates -->
<web-daterangepicker
  id="hotel-booking"
  selection-mode="range"
  min-date="2025-01-01"
  max-date="2025-01-31"
  placeholder="Select check-in and check-out"
></web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Key Features</h5>
					<ul>
						<li><strong>Dynamic price badges</strong> - Each date shows its nightly rate as a colored badge</li>
						<li><strong>5-tier pricing model</strong> - Budget, Standard, Premium, Deluxe, Luxury</li>
						<li><strong>Custom badge styling</strong> - Color-coded badges (green → blue → purple → orange → red)</li>
						<li><strong>Itemized breakdown</strong> - Summary shows per-tier calculations and grand total</li>
						<li><strong>Current month</strong> - Auto-displays current month (no scrolling needed)</li>
						<li><strong>Hover tooltips</strong> - Badge tooltips show tier name and price</li>
					</ul>

					<h5>Pricing Tiers</h5>
					<ul>
						<li><strong style="color: #065f46;">Budget ($99)</strong> - Mon, Tue, Sun</li>
						<li><strong style="color: #1e40af;">Standard ($149)</strong> - Wed, Thu</li>
						<li><strong style="color: #6b21a8;">Premium ($199)</strong> - Fri</li>
						<li><strong style="color: #92400e;">Deluxe ($249)</strong> - Sat</li>
						<li><strong style="color: #991b1b;">Luxury ($299)</strong> - Special dates (7th, 14th, 21st, 28th)</li>
					</ul>

					<h5>Callbacks Used</h5>
					<ul>
						<li><code>customStylesCallback</code> - Inject CSS for badge color schemes</li>
						<li><code>getDateMetadataCallback</code> - Return badge data for each date</li>
						<li><code>formatSummaryCallback</code> - Build itemized pricing summary</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Hotels/Vacation Rentals</strong> - Show variable pricing on calendar</li>
						<li><strong>Event Ticketing</strong> - Different prices for different dates</li>
						<li><strong>Dynamic Pricing</strong> - Demand-based or seasonal rates</li>
						<li><strong>Multi-tier Services</strong> - Visual price comparison</li>
					</ul>
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
