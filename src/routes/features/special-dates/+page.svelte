<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(async () => {
		const { DateRangePicker } = await import('@keenmate/web-daterangepicker');

		// Demo 1: DateInfo Properties Reference
		const demo1 = document.getElementById('demo-dateinfo-properties') as any;
		if (demo1) {
			demo1.specialDates = [
				{
					date: '2025-01-15',
					badgeText: '🎉',
					badgeClass: 'event',
					badgeTooltip: 'Badge tooltip: Special Event'
				},
				{
					date: '2025-01-20',
					dayClass: 'highlighted-day',
					dayTooltip: 'Day tooltip: Important Date'
				},
				{
					date: '2025-01-25',
					badgeText: '💰',
					badgeClass: 'peak',
					badgeTooltip: 'Badge: Peak Season',
					dayClass: 'peak-day',
					dayTooltip: 'Day: $350/night'
				}
			];
		}

		// Demo 2: Complete example with holidays, events, and custom styling
		const input2 = document.getElementById('demo-input-complete') as HTMLInputElement;
		if (input2) {
			const picker2 = new DateRangePicker(input2, {
				selectionMode: 'single',
				specialDates: [
					// Holidays with predefined 'holiday' class
					{
						date: '2025-12-25',
						badgeClass: 'holiday',
						badgeText: '🎄',
						badgeTooltip: 'Christmas Day - Office Closed'
					},
					{
						date: '2025-12-24',
						badgeClass: 'holiday',
						badgeText: '🎁',
						badgeTooltip: 'Christmas Eve'
					},
					{
						date: '2025-01-01',
						badgeClass: 'holiday',
						badgeText: '🎉',
						badgeTooltip: "New Year's Day"
					},
					{
						date: '2025-07-04',
						badgeClass: 'holiday',
						badgeText: '🎆',
						badgeTooltip: 'Independence Day'
					},
					// Events with predefined 'event' class
					{
						date: '2025-06-15',
						badgeClass: 'event',
						badgeText: '🎵',
						badgeTooltip: 'Company Summer Party'
					},
					// Custom classes with styling via customStylesCallback
					{
						date: '2025-07-01',
						badgeClass: 'peak-season',
						badgeText: '$$$',
						badgeTooltip: 'Peak Season - $350/night',
						dayClass: 'peak-pricing'
					},
					{
						date: '2025-07-15',
						badgeClass: 'peak-season',
						badgeText: '$$$',
						badgeTooltip: 'Peak Season - $350/night',
						dayClass: 'peak-pricing'
					},
					// Combined: badge + day styling
					{
						date: '2025-03-17',
						badgeText: '☘️',
						badgeClass: 'special-event',
						badgeTooltip: "St. Patrick's Day",
						dayClass: 'irish-day',
						dayTooltip: 'Wear green!'
					}
				],
				// Inject custom styles into Shadow DOM
				customStylesCallback: () => `
					/* Peak season pricing */
					.drp-date-picker__badge.peak-season {
						background-color: rgba(251, 191, 36, 0.3);
						color: #92400e;
						font-weight: 700;
						font-size: 0.7em;
					}

					.drp-date-picker__day.peak-pricing {
						background-color: rgba(251, 191, 36, 0.15);
						border-left: 3px solid rgb(251, 191, 36);
						font-weight: 600;
					}

					/* Special events */
					.drp-date-picker__badge.special-event {
						background-color: rgba(168, 85, 247, 0.3);
						font-size: 1.2em;
					}

					.drp-date-picker__day.irish-day {
						background-color: rgba(34, 197, 94, 0.15);
						border: 2px solid rgba(34, 197, 94, 0.5);
						font-weight: 700;
					}

					/* Highlighted day from first demo */
					.drp-date-picker__day.highlighted-day {
						background-color: rgba(59, 130, 246, 0.15);
						border: 2px solid rgb(59, 130, 246);
					}

					.drp-date-picker__day.peak-day {
						background-color: rgba(251, 191, 36, 0.2);
						font-weight: 700;
					}
				`
			});
		}

		// Demo 3: Dynamic metadata
		const demo3 = document.getElementById('demo-special-dates-dynamic') as any;
		if (demo3) {
			const pricing: Record<string, number> = {
				'2025-07-01': 250,
				'2025-07-04': 350,
				'2025-07-15': 280,
				'2025-12-25': 400,
				'2025-12-31': 450
			};

			demo3.getDateMetadata = (date: Date) => {
				const key = date.toISOString().split('T')[0];
				const price = pricing[key];

				if (price) {
					if (price >= 350) {
						return {
							badgeClass: 'peak-pricing',
							badgeText: '$$$',
							badgeTooltip: `$${price}/night - Peak Season`
						};
					} else if (price >= 250) {
						return {
							badgeClass: 'high-pricing',
							badgeText: '$$',
							badgeTooltip: `$${price}/night - High Season`
						};
					}
				}
				return null;
			};
		}

		// Demo 4: Member mapping
		const demo4 = document.getElementById('demo-member-mapping') as any;
		if (demo4) {
			// Simulate API response with custom property names
			const apiData = [
				{
					event_date: '2025-03-15',
					event_name: '🎸',
					event_type: 'concert',
					badge_tip: 'Rock Concert',
					cell_class: 'event-day',
					cell_tip: 'Sold out'
				},
				{
					event_date: '2025-03-20',
					event_name: '🎭',
					event_type: 'theater',
					badge_tip: 'Theater Show',
					cell_class: 'theater-day',
					cell_tip: 'Tickets available'
				}
			];

			demo4.specialDates = apiData;
			demo4.dateMember = 'event_date';
			demo4.badgeTextMember = 'event_name';
			demo4.badgeClassMember = 'event_type';
			demo4.badgeTooltipMember = 'badge_tip';
			demo4.dayClassMember = 'cell_class';
			demo4.dayTooltipMember = 'cell_tip';
		}

		// Demo 5: Disabling dates
		const demo5 = document.getElementById('demo-disabling-dates') as any;
		if (demo5) {
			demo5.specialDates = [
				{
					date: '2025-04-10',
					badgeText: '✓',
					badgeClass: 'available',
					badgeTooltip: '5 rooms available'
				},
				{
					date: '2025-04-15',
					badgeText: '✕',
					badgeClass: 'unavailable',
					badgeTooltip: 'Fully booked',
					isDisabled: true
				},
				{
					date: '2025-04-20',
					badgeText: '!',
					badgeClass: 'limited',
					badgeTooltip: '2 rooms left'
				}
			];
		}

		// Demo 6: HTML tooltips (via callbacks)
		const demo6 = document.getElementById('demo-html-tooltips') as any;
		if (demo6) {
			demo6.specialDates = [
				{
					date: '2025-05-10',
					badgeText: '🏨',
					badgeClass: 'hotel'
				},
				{
					date: '2025-05-15',
					badgeText: '✈️',
					badgeClass: 'flight'
				}
			];

			demo6.badgeTooltipCallback = (data: any) => {
				const dateStr = data.dateString;
				if (dateStr === '2025-05-10') {
					return '<strong>Hotel Deal</strong><br>$199/night<br><em>Breakfast included</em>';
				}
				if (dateStr === '2025-05-15') {
					return '<strong>Flight Special</strong><br>$450 round-trip<br><em>Non-stop</em>';
				}
				return null;
			};
		}
	});
</script>

<style>
	/* Styles for demos that use web component (not JS API) */
	:global(web-daterangepicker#demo-dateinfo-properties .drp-date-picker__day.highlighted-day) {
		background-color: rgba(59, 130, 246, 0.15);
		border: 2px solid rgb(59, 130, 246);
	}
	:global(web-daterangepicker#demo-dateinfo-properties .drp-date-picker__day.peak-day) {
		background-color: rgba(251, 191, 36, 0.2);
		font-weight: 700;
	}

	/* Demo 3: Dynamic */
	:global(web-daterangepicker#demo-special-dates-dynamic .drp-date-picker__day.peak-pricing) {
		background-color: rgba(239, 68, 68, 0.15);
		font-weight: 700;
	}
	:global(web-daterangepicker#demo-special-dates-dynamic .drp-date-picker__day.high-pricing) {
		background-color: rgba(251, 191, 36, 0.15);
		font-weight: 600;
	}

	/* Demo 4: Member mapping */
	:global(web-daterangepicker#demo-member-mapping .drp-date-picker__day.event-day) {
		background-color: rgba(16, 185, 129, 0.15);
	}
	:global(web-daterangepicker#demo-member-mapping .drp-date-picker__day.theater-day) {
		background-color: rgba(168, 85, 247, 0.15);
	}

	/* Demo 5: Disabling */
	:global(web-daterangepicker#demo-disabling-dates .drp-date-picker__day.unavailable) {
		opacity: 0.4;
	}
	:global(web-daterangepicker#demo-disabling-dates .drp-date-picker__day.limited) {
		background-color: rgba(251, 191, 36, 0.15);
	}
</style>

<DocLayout
	titleText="Special Dates & Badges"
	descriptionText="Highlight holidays, events, and special dates with badges, custom styling, and tooltips"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				Add visual indicators, badges, and tooltips to specific dates to highlight holidays,
				events, peak pricing, availability, or any special information.
			</p>

			<div class="alert alert-info">
				<strong>Key Concept:</strong> Special dates use a two-row system:
				<br />
				<strong>1. Badge Row</strong> - Appears ABOVE the day number (emojis, icons, text)
				<br />
				<strong>2. Day Cell</strong> - The day number itself (can have separate styling and tooltip)
			</div>

			<h4 class="mt-4">Use Cases</h4>
			<ul>
				<li><strong>Holidays</strong> - Mark public holidays with icons and styling</li>
				<li><strong>Events</strong> - Highlight concerts, conferences, or important dates</li>
				<li>
					<strong>Pricing</strong> - Show dynamic pricing or peak/off-peak seasons
				</li>
				<li><strong>Availability</strong> - Display room availability, booking status</li>
				<li><strong>Deadlines</strong> - Mark project milestones or due dates</li>
			</ul>
		</section>

		<!-- DateInfo Properties Reference -->
		<ShowcaseSection
			titleText="DateInfo Properties Reference"
			subtitleText="Complete property reference with examples"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Property Table"
			descriptionColumnTitle="Visual Explanation"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="demo-dateinfo-properties"
					selection-mode="single"
					placeholder="Select a date"
					initial-date="2025-01-15">
				</web-daterangepicker>
				<div class="mt-3 small">
					<p class="mb-1"><strong>Examples:</strong></p>
					<p class="mb-1">
						• Jan 15: Badge only (🎉 event badge with badge tooltip)
					</p>
					<p class="mb-1">
						• Jan 20: Day only (highlighted day cell with day tooltip)
					</p>
					<p class="mb-1">
						• Jan 25: Both (💰 badge + styled day + separate tooltips for each)
					</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered">
						<thead>
							<tr>
								<th>Property</th>
								<th>Type</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>badgeText</code></td>
								<td>string</td>
								<td>Text/emoji in badge row ABOVE day</td>
							</tr>
							<tr>
								<td><code>badgeClass</code></td>
								<td>string</td>
								<td>CSS class for badge cell</td>
							</tr>
							<tr>
								<td><code>badgeTooltip</code></td>
								<td>string</td>
								<td>Tooltip on badge hover</td>
							</tr>
							<tr>
								<td><code>dayClass</code></td>
								<td>string</td>
								<td>CSS class for day cell</td>
							</tr>
							<tr>
								<td><code>dayTooltip</code></td>
								<td>string</td>
								<td>Tooltip on day cell hover</td>
							</tr>
							<tr>
								<td><code>isDisabled</code></td>
								<td>boolean</td>
								<td>Override disabled state</td>
							</tr>
						</tbody>
					</table>
				</div>

				<CodeBlock
					codeContent={`picker.specialDates = [
  // Badge only
  {
    date: '2025-01-15',
    badgeText: '🎉',
    badgeClass: 'event',
    badgeTooltip: 'Special Event'
  },
  // Day only
  {
    date: '2025-01-20',
    dayClass: 'highlighted',
    dayTooltip: 'Important Date'
  },
  // Both badge and day
  {
    date: '2025-01-25',
    badgeText: '💰',
    badgeClass: 'peak',
    badgeTooltip: 'Badge tooltip',
    dayClass: 'peak-day',
    dayTooltip: 'Day tooltip'
  }
];`}
					languageType="javascript"
					titleText="All Properties Example"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Two-Row System</h5>
					<p>Each date cell has TWO rows:</p>
					<ol>
						<li>
							<strong>Badge Row</strong> (top) - Displays <code>badgeText</code>, styled with
							<code>badgeClass</code>, shows <code>badgeTooltip</code> on hover
						</li>
						<li>
							<strong>Day Row</strong> (bottom) - The day number, styled with <code>dayClass</code>,
							shows <code>dayTooltip</code> on hover
						</li>
					</ol>

					<h5>When to Use Which</h5>
					<ul>
						<li>
							<strong>Badge properties</strong> - Visual indicators (emojis, icons, short text)
						</li>
						<li>
							<strong>Day properties</strong> - Highlight the entire day cell, add context tooltips
						</li>
						<li><strong>Both together</strong> - Rich information with multiple layers</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Complete Example: Holidays, Events, and Custom Styling -->
		<ShowcaseSection
			titleText="Complete Example: Holidays, Events & Custom Styling"
			subtitleText="All features combined with customStylesCallback for Shadow DOM"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Complete Code"
			descriptionColumnTitle="Key Concepts"
		>
			{#snippet demoContent()}
				<input
					id="demo-input-complete"
					type="text"
					class="form-control"
					placeholder="Select a date"
				/>
				<div class="mt-3 small">
					<p class="mb-1"><strong>Try these dates:</strong></p>
					<p class="mb-1">• <strong>Holidays</strong> (red): 🎉 Jan 1, 🎆 Jul 4, 🎁 Dec 24, 🎄 Dec 25</p>
					<p class="mb-1">• <strong>Events</strong> (green): 🎵 Jun 15, ☘️ Mar 17</p>
					<p class="mb-1">• <strong>Peak Pricing</strong> (gold): $$$ Jul 1, Jul 15</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`import { DateRangePicker } from '@keenmate/web-daterangepicker';

const input = document.getElementById('my-input');
const picker = new DateRangePicker(input, {
  selectionMode: 'single',

  // Static list of special dates
  specialDates: [
    // Holidays - uses predefined 'holiday' class (red tint)
    {
      date: '2025-12-25',
      badgeClass: 'holiday',
      badgeText: '🎄',
      badgeTooltip: 'Christmas Day - Office Closed'
    },
    {
      date: '2025-01-01',
      badgeClass: 'holiday',
      badgeText: '🎉',
      badgeTooltip: "New Year's Day"
    },

    // Events - uses predefined 'event' class (green tint)
    {
      date: '2025-06-15',
      badgeClass: 'event',
      badgeText: '🎵',
      badgeTooltip: 'Company Summer Party'
    },

    // Custom classes - styled via customStylesCallback
    {
      date: '2025-07-01',
      badgeClass: 'peak-season',
      badgeText: '$$$',
      badgeTooltip: 'Peak Season - $350/night',
      dayClass: 'peak-pricing'
    },

    // Both badge + day styling
    {
      date: '2025-03-17',
      badgeText: '☘️',
      badgeClass: 'special-event',
      badgeTooltip: "St. Patrick's Day",
      dayClass: 'irish-day',
      dayTooltip: 'Wear green!'
    }
  ],

  // IMPORTANT: Inject custom CSS into Shadow DOM
  customStylesCallback: () => \`
    /* Peak season pricing */
    .drp-date-picker__badge.peak-season {
      background-color: rgba(251, 191, 36, 0.3);
      color: #92400e;
      font-weight: 700;
      font-size: 0.7em;
    }

    .drp-date-picker__day.peak-pricing {
      background-color: rgba(251, 191, 36, 0.15);
      border-left: 3px solid rgb(251, 191, 36);
      font-weight: 600;
    }

    /* Special events */
    .drp-date-picker__badge.special-event {
      background-color: rgba(168, 85, 247, 0.3);
      font-size: 1.2em;
    }

    .drp-date-picker__day.irish-day {
      background-color: rgba(34, 197, 94, 0.15);
      border: 2px solid rgba(34, 197, 94, 0.5);
      font-weight: 700;
    }
  \`
});`}
					languageType="javascript"
					titleText="JavaScript API - Complete Example"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Predefined Classes</h5>
					<p>Two classes work out-of-the-box:</p>
					<ul>
						<li><code>.holiday</code> - Red tinted background</li>
						<li><code>.event</code> - Green tinted background</li>
					</ul>

					<h5>Custom Classes & Shadow DOM</h5>
					<p><strong>CRITICAL:</strong> The component uses Shadow DOM. Custom CSS must be injected via:</p>
					<ul>
						<li><code>customStylesCallback</code> - For JavaScript API (shown above)</li>
						<li>Global CSS with full selector - For web component usage</li>
					</ul>

					<div class="alert alert-warning mt-3">
						<strong>❌ Won't Work:</strong><br>
						Regular CSS or <code>&lt;style&gt;</code> tags won't reach inside Shadow DOM
						<br><br>
						<strong>✅ Use Instead:</strong><br>
						<code>customStylesCallback</code> injects CSS directly into Shadow DOM
					</div>

					<h5>Styling Approaches</h5>
					<p><strong>JavaScript API:</strong></p>
					<pre class="bg-light p-2">customStylesCallback: () => `...css...`</pre>

					<p><strong>Web Component:</strong></p>
					<pre class="bg-light p-2">web-daterangepicker .drp-date-picker__day.my-class {`{ }`}</pre>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Dynamic Metadata -->
		<ShowcaseSection
			titleText="Dynamic Metadata (getDateMetadata)"
			subtitleText="Complex logic and API integration"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="demo-special-dates-dynamic"
					selection-mode="single"
					placeholder="Select a date">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					<strong>Pricing:</strong> $$ Jul 1 ($250), Jul 15 ($280) | $$$ Jul 4 ($350), Dec 25 ($400),
					Dec 31 ($450)
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Dynamic pricing
const pricing = {
  '2025-07-01': 250,
  '2025-07-04': 350,
  '2025-12-25': 400
};

picker.getDateMetadata = (date) => {
  const key = date.toISOString().split('T')[0];
  const price = pricing[key];

  if (price) {
    if (price >= 350) {
      return {
        badgeClass: 'peak-pricing',
        badgeText: '$$$',
        badgeTooltip: \`$\${price}/night\`
      };
    } else if (price >= 250) {
      return {
        badgeClass: 'high-pricing',
        badgeText: '$$',
        badgeTooltip: \`$\${price}/night\`
      };
    }
  }
  return null; // No special info
};`}
					languageType="javascript"
					titleText="Dynamic Pricing"
				/>

				<CodeBlock
					codeContent={`// API integration with caching
let cachedData = null;

picker.getDateMetadata = async (date) => {
  // Load data once
  if (!cachedData) {
    const response = await fetch('/api/dates');
    cachedData = await response.json();
  }

  const key = date.toISOString().split('T')[0];
  const info = cachedData[key];

  return info ? {
    badgeText: info.icon,
    badgeClass: info.type,
    badgeTooltip: info.description,
    isDisabled: !info.available
  } : null;
};`}
					languageType="javascript"
					titleText="API Integration"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>When to Use</h5>
					<ul>
						<li>
							<strong>Complex logic</strong> - Pricing tiers, business rules
						</li>
						<li><strong>API data</strong> - Dynamic availability, bookings</li>
						<li><strong>Calculated values</strong> - Weekend vs weekday, seasons</li>
					</ul>

					<h5>How It Works</h5>
					<ul>
						<li>Called for <strong>each visible date</strong> in calendar</li>
						<li>Receives <code>Date</code> object as parameter</li>
						<li>
							Returns <code>DateInfo</code> object or <code>null</code>
						</li>
						<li>
							<strong>Overrides</strong> specialDates if both are used
						</li>
					</ul>

					<h5>Performance Tips</h5>
					<ul>
						<li>Cache API responses</li>
						<li>Keep logic simple and fast</li>
						<li>Return null quickly for non-special dates</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Member Mapping -->
		<ShowcaseSection
			titleText="Member Mapping"
			subtitleText="Map custom data structures to DateInfo properties"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="demo-member-mapping"
					selection-mode="single"
					placeholder="Select a date"
					initial-date="2025-03-15">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					<strong>Events:</strong> 🎸 Mar 15 (concert), 🎭 Mar 20 (theater). Data uses custom property
					names!
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Your API returns custom property names
const apiData = [
  {
    event_date: '2025-03-15',      // Not 'date'
    event_name: '🎸',              // Not 'badgeText'
    event_type: 'concert',         // Not 'badgeClass'
    badge_tip: 'Rock Concert',     // Not 'badgeTooltip'
    cell_class: 'event-day',       // Not 'dayClass'
    cell_tip: 'Sold out'           // Not 'dayTooltip'
  }
];

// Map your properties to DateInfo
picker.specialDates = apiData;
picker.dateMember = 'event_date';
picker.badgeTextMember = 'event_name';
picker.badgeClassMember = 'event_type';
picker.badgeTooltipMember = 'badge_tip';
picker.dayClassMember = 'cell_class';
picker.dayTooltipMember = 'cell_tip';`}
					languageType="javascript"
					titleText="API Response Mapping"
				/>

				<CodeBlock
					codeContent={`// All available member mapping properties
picker.dateMember = 'customDate';           // Default: 'date'
picker.badgeTextMember = 'customLabel';     // Default: 'badgeText'
picker.badgeClassMember = 'customClass';    // Default: 'badgeClass'
picker.badgeTooltipMember = 'customTip';    // Default: 'badgeTooltip'
picker.dayClassMember = 'cellClass';        // Default: 'dayClass'
picker.dayTooltipMember = 'cellTip';        // Default: 'dayTooltip'
picker.isDisabledMember = 'unavailable';    // Default: 'isDisabled'`}
					languageType="javascript"
					titleText="All Member Properties"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>What is Member Mapping?</h5>
					<p>
						Instead of transforming your API data to match DateInfo property names, you can tell
						the component which properties to use.
					</p>

					<h5>When to Use</h5>
					<ul>
						<li><strong>API integration</strong> - Backend uses different property names</li>
						<li><strong>Legacy data</strong> - Existing data structure you can't change</li>
						<li>
							<strong>Multiple sources</strong> - Different APIs with different naming
						</li>
					</ul>

					<h5>Default Property Names</h5>
					<p>If you don't set member options, the component expects:</p>
					<ul>
						<li><code>date</code>, <code>badgeText</code>, <code>badgeClass</code></li>
						<li><code>badgeTooltip</code>, <code>dayClass</code>, <code>dayTooltip</code></li>
						<li><code>isDisabled</code></li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Advanced: Disabling Dates -->
		<ShowcaseSection
			titleText="Advanced: Disabling Dates"
			subtitleText="Override disabled state with isDisabled"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="demo-disabling-dates"
					selection-mode="single"
					placeholder="Select a date"
					initial-date="2025-04-10">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					<strong>Availability:</strong> ✓ Apr 10 (available), ✕ Apr 15 (fully booked - disabled),
					! Apr 20 (limited)
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Disable specific dates
picker.specialDates = [
  {
    date: '2025-04-10',
    badgeText: '✓',
    badgeClass: 'available',
    badgeTooltip: '5 rooms available',
    isDisabled: false  // Explicitly available
  },
  {
    date: '2025-04-15',
    badgeText: '✕',
    badgeClass: 'unavailable',
    badgeTooltip: 'Fully booked',
    isDisabled: true   // Cannot select
  },
  {
    date: '2025-04-20',
    badgeText: '!',
    badgeClass: 'limited',
    badgeTooltip: 'Only 2 left'
  }
];`}
					languageType="javascript"
					titleText="Static Availability"
				/>

				<CodeBlock
					codeContent={`// Dynamic availability from API
const availability = {
  '2025-04-15': 0,  // Sold out
  '2025-04-20': 2   // Limited
};

picker.getDateMetadata = (date) => {
  const key = date.toISOString().split('T')[0];
  const rooms = availability[key];

  if (rooms === 0) {
    return {
      badgeText: '✕',
      badgeClass: 'unavailable',
      badgeTooltip: 'Fully booked',
      isDisabled: true
    };
  } else if (rooms > 0 && rooms <= 5) {
    return {
      badgeText: '!',
      badgeClass: 'limited',
      badgeTooltip: \`Only \${rooms} left\`
    };
  }
  return null;
};`}
					languageType="javascript"
					titleText="Dynamic Availability"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>isDisabled Property</h5>
					<p>
						Use <code>isDisabled</code> to dynamically enable or disable specific dates based on
						availability, business rules, or any custom logic.
					</p>

					<h5>Interaction with Date Restrictions</h5>
					<ul>
						<li><code>isDisabled: true</code> - Date becomes unselectable</li>
						<li><code>isDisabled: false</code> - Can override min/max date restrictions</li>
						<li>Works alongside <code>disabledDates</code>, <code>disabledWeekdays</code></li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Booking systems</strong> - Sold out dates</li>
						<li><strong>Calendars</strong> - Past events, cancelled dates</li>
						<li><strong>Scheduling</strong> - Resource availability</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Advanced: HTML Tooltips -->
		<ShowcaseSection
			titleText="Advanced: HTML Tooltips"
			subtitleText="Rich formatted tooltips with callbacks"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="demo-html-tooltips"
					selection-mode="single"
					placeholder="Select a date"
					initial-date="2025-05-10">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					<strong>Hover over badges:</strong> 🏨 May 10 (hotel deal), ✈️ May 15 (flight special). Tooltips
					use HTML formatting!
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// HTML in badge tooltips
picker.badgeTooltipCallback = (data) => {
  const dateStr = data.dateString;

  if (dateStr === '2025-05-10') {
    return '<strong>Hotel Deal</strong><br>' +
           '$199/night<br>' +
           '<em>Breakfast included</em>';
  }
  if (dateStr === '2025-05-15') {
    return '<strong>Flight Special</strong><br>' +
           '$450 round-trip<br>' +
           '<em>Non-stop</em>';
  }
  return null; // Use badgeTooltip from specialDates
};

// HTML in day tooltips
picker.dayTooltipCallback = (data) => {
  return \`<strong>Date: \${data.dateString}</strong><br>\` +
         \`Day: \${data.dayNumber}<br>\` +
         \`<em>\${data.isWeekend ? 'Weekend' : 'Weekday'}</em>\`;
};`}
					languageType="javascript"
					titleText="HTML Tooltips"
				/>

				<CodeBlock
					codeContent={`// DayRenderData object passed to callbacks
interface DayRenderData {
  date: Date;              // JavaScript Date object
  dateString: string;      // 'YYYY-MM-DD'
  dayNumber: number;       // 1-31
  isDisabled: boolean;     // Disabled state
  isSelected: boolean;     // Selected state
  isStartDate: boolean;    // Range start
  isEndDate: boolean;      // Range end
  isInRange: boolean;      // Between start/end
  isToday: boolean;        // Is today
  isWeekend: boolean;      // Sat/Sun
  monthIndex: number;      // For multi-month
  picker: DateRangePicker; // Picker instance
  element: HTMLElement;    // Day cell element
}`}
					languageType="typescript"
					titleText="DayRenderData Interface"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Tooltip Callbacks</h5>
					<p>Two callback functions for HTML tooltips:</p>
					<ul>
						<li>
							<code>badgeTooltipCallback</code> - Rich tooltips for badges
						</li>
						<li>
							<code>dayTooltipCallback</code> - Rich tooltips for day cells
						</li>
					</ul>

					<h5>Priority Order</h5>
					<ol>
						<li><code>badgeTooltipCallback</code> / <code>dayTooltipCallback</code> (highest)</li>
						<li><code>badgeTooltip</code> / <code>dayTooltip</code> from specialDates</li>
						<li>No tooltip (default)</li>
					</ol>

					<h5>HTML Styling</h5>
					<p>You can use:</p>
					<ul>
						<li><code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>, <code>&lt;br&gt;</code></li>
						<li>Inline styles with <code>style</code> attribute</li>
						<li>Limited to safe HTML (XSS protection)</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Best Practices & Decision Guide -->
		<section class="mb-5">
			<h2>Best Practices & Decision Guide</h2>

			<h4 class="mt-4">When to Use What</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Approach</th>
							<th>Use When</th>
							<th>Pros</th>
							<th>Cons</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>specialDates</code> array</td>
							<td>Known list of dates, static data</td>
							<td>Simple, declarative, easy to maintain</td>
							<td>Not suitable for complex logic</td>
						</tr>
						<tr>
							<td><code>getDateMetadata</code></td>
							<td>Dynamic logic, API data, calculations</td>
							<td>Powerful, flexible, handles any logic</td>
							<td>Performance considerations</td>
						</tr>
						<tr>
							<td>Member mapping</td>
							<td>Custom data structures, API integration</td>
							<td>No data transformation needed</td>
							<td>Extra configuration required</td>
						</tr>
						<tr>
							<td>Both combined</td>
							<td>Base data + dynamic overrides</td>
							<td>Maximum flexibility</td>
							<td>getDateMetadata overrides specialDates</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-5">Shadow DOM Styling - Critical Information</h4>
			<div class="alert alert-warning">
				<h5 class="alert-heading">⚠️ Custom CSS Must Be Injected Into Shadow DOM</h5>
				<p>The component uses Shadow DOM, which isolates styles. You have two options:</p>

				<div class="mt-3">
					<strong>Option 1: JavaScript API - customStylesCallback</strong>
					<CodeBlock
						codeContent={`const picker = new DateRangePicker(input, {
  specialDates: [
    { date: '2025-07-01', badgeClass: 'my-custom-class' }
  ],
  customStylesCallback: () => \`
    .drp-date-picker__badge.my-custom-class {
      background-color: gold;
    }
  \`
});`}
						languageType="javascript"
					/>
				</div>

				<div class="mt-3">
					<strong>Option 2: Web Component - Global CSS with Full Selector</strong>
					<CodeBlock
						codeContent={`/* Global CSS file */
web-daterangepicker .drp-date-picker__badge.my-custom-class {
  background-color: gold;
}`}
						languageType="css"
					/>
				</div>

				<p class="mt-3 mb-0">
					<strong>❌ This won't work:</strong> Regular <code>&lt;style&gt;</code> tags or scoped CSS
					<br>
					<strong>✅ Must use:</strong> <code>customStylesCallback</code> or global CSS with full selector path
				</p>
			</div>

			<h4 class="mt-5">Performance Best Practices</h4>
			<div class="row">
				<div class="col-md-6">
					<div class="card border-success">
						<div class="card-header bg-success text-white">✓ Do This</div>
						<div class="card-body">
							<ul class="mb-0">
								<li>Cache API responses</li>
								<li>Return null quickly for non-special dates</li>
								<li>Use specialDates for known static data</li>
								<li>Keep getDateMetadata logic fast</li>
								<li>Use member mapping to avoid data transformation</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card border-danger">
						<div class="card-header bg-danger text-white">✗ Avoid This</div>
						<div class="card-body">
							<ul class="mb-0">
								<li>Making API calls in getDateMetadata without caching</li>
								<li>Complex calculations for every date</li>
								<li>Mixing both without understanding priority</li>
								<li>Long badge text (keep it 1-3 characters)</li>
								<li>Forgetting Shadow DOM styling requirements</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Summary -->
		<section class="mb-5">
			<div class="alert alert-info">
				<h5 class="alert-heading">Key Takeaways</h5>
				<ul class="mb-0">
					<li>
						<strong>Two-row system:</strong> Badge row (top) + Day cell (bottom) with separate properties
					</li>
					<li><strong>6 DateInfo properties:</strong> All documented with examples above</li>
					<li>
						<strong>Static vs Dynamic:</strong> Use specialDates for known data, getDateMetadata for logic
					</li>
					<li>
						<strong>Shadow DOM styling:</strong> Use customStylesCallback (JS API) or global CSS (web component)
					</li>
					<li>
						<strong>Member mapping:</strong> Map custom API data without transformation
					</li>
					<li><strong>HTML tooltips:</strong> Use callback functions for rich formatting</li>
				</ul>
			</div>
		</section>
	</div>
</DocLayout>
