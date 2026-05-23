<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let isComponentLoaded = false;

	// Price tiers for hotel demo
	const PRICES = {
		budget: 99,    // Mon-Tue, Sun
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

	let hotelPricingSummaryOutput = $state('(Select a date range to see pricing)');

	onMount(async () => {
		// Import the web component
		await import('@keenmate/web-daterangepicker');
		isComponentLoaded = true;

		// Wait for next tick to ensure DOM is ready
		await new Promise(resolve => setTimeout(resolve, 100));

		// Initialize all demos
		initializePerformanceDemo();
		initializeHotelDemo();
		initializeLoadingDemo();
		initializeBlockingDemo();
	});

	function initializePerformanceDemo() {
		const mockPrices: Record<number, number> = {};
		for (let i = 1; i <= 31; i++) {
			mockPrices[i] = Math.floor(Math.random() * 200) + 100;
		}

		const perDayLoader = document.getElementById('per-day-loader');
		const perDayStatus = document.getElementById('per-day-status');
		const bulkLoader = document.getElementById('bulk-loader');

		// Old way: Per-day callback (slow) - simulates many API calls
		const perDayPicker = document.getElementById('per-day-demo') as any;
		if (perDayPicker) {
			let callCount = 0;
			let loadingTimeout: any = null;

			// Show loader before rendering starts
			const showPerDayLoader = () => {
				callCount = 0;
				if (perDayLoader) {
					perDayLoader.style.display = 'block';
					if (perDayStatus) perDayStatus.textContent = 'Loading prices... (simulating 42 API calls)';
				}
			};

			// Show loader on first open (when input receives focus). On subsequent
			// month navigation the call counter inside getDateMetadataCallback drives
			// the visible status text — there is no separate "month changed" event
			// for per-day-callback pickers; that's the price of the per-day approach.
			const input = perDayPicker.querySelector('input');
			if (input) {
				input.addEventListener('focus', showPerDayLoader, { once: true });
			}

			perDayPicker.getDateMetadataCallback = (date: Date) => {
				callCount++;

				// Update counter (this happens synchronously during render)
				if (perDayStatus) {
					perDayStatus.textContent = 'Loading prices... (' + callCount + '/~42 API calls)';
				}

				const dayPrice = mockPrices[date.getDate()] || 150;

				// Hide loader after all calls complete (with small delay to show final count)
				if (callCount >= 35) {
					clearTimeout(loadingTimeout);
					loadingTimeout = setTimeout(() => {
						if (perDayLoader) {
							perDayLoader.style.display = 'none';
						}
					}, 500);
				}

				return {
					badgeText: `$${dayPrice}`,
					badgeClass: dayPrice > 200 ? 'high' : 'normal'
				};
			};

			perDayPicker.customStylesCallback = () => `
				.drp-date-picker__badge-cell.high { background: #dc3545 !important; color: white !important; }
				.drp-date-picker__badge-cell.normal { background: #28a745 !important; color: white !important; }
			`;
		}

		// New way: Bulk loading (fast) - single API call
		const bulkPicker = document.getElementById('bulk-demo') as any;
		if (bulkPicker) {
			bulkPicker.beforeMonthChangedCallback = async ({ firstVisibleDate, lastVisibleDate }: any) => {
				// Show loader
				if (bulkLoader) bulkLoader.style.display = 'block';

				// Single API call - simulated 200ms delay
				await new Promise((resolve) => setTimeout(resolve, 200));

				const metadata = new Map();
				const current = new Date(firstVisibleDate);

				while (current <= lastVisibleDate) {
					const dateKey = current.toISOString().split('T')[0];
					const dayPrice = mockPrices[current.getDate()] || 150;

					metadata.set(dateKey, {
						badgeText: `$${dayPrice}`,
						badgeClass: dayPrice > 200 ? 'high' : 'normal'
					});

					current.setDate(current.getDate() + 1);
				}

				// Hide loader
				if (bulkLoader) bulkLoader.style.display = 'none';

				return { action: 'accept', metadata };
			};

			bulkPicker.customStylesCallback = () => `
				.drp-date-picker__badge-cell.high { background: #dc3545 !important; color: white !important; }
				.drp-date-picker__badge-cell.normal { background: #28a745 !important; color: white !important; }
			`;
		}
	}

	function initializeHotelDemo() {
		const hotelPicker = document.getElementById('hotel-demo') as any;
		if (hotelPicker) {
			hotelPicker.beforeMonthChangedCallback = async ({ firstVisibleDate, lastVisibleDate }: any) => {
				// Simulate API call delay
				await new Promise((resolve) => setTimeout(resolve, 300));

				// Simulate API response with multi-tier pricing
				const metadata = new Map();
				const current = new Date(firstVisibleDate);

				while (current <= lastVisibleDate) {
					const dateKey = current.toISOString().split('T')[0];
					const { tier, price, label } = getPriceTier(current);

					metadata.set(dateKey, {
						badgeText: `$${price}`,
						badgeClass: `badge-number price-${tier}`,
						badgeTooltip: `${label}: $${price}/night`
					});

					current.setDate(current.getDate() + 1);
				}

				return { action: 'accept', metadata };
			};

			// Custom styles for price badges
			hotelPicker.customStylesCallback = () => `
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

			// Enhanced summary with per-tier breakdown
			hotelPicker.formatSummaryCallback = (data: any) => {
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

				hotelPricingSummaryOutput = `${summaryParts.join(' + ')} = $${grandTotal}`;

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

			hotelPicker.addEventListener('date-select', () => {
				// Summary is already updated via callback
			});
		}
	}

	function initializeLoadingDemo() {
		const loadingPicker = document.getElementById('loading-demo') as any;
		if (loadingPicker) {
			loadingPicker.beforeMonthChangedCallback = async ({ firstVisibleDate, lastVisibleDate }: any) => {
				// Simulate slow API (1 second delay)
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const metadata = new Map();
				const current = new Date(firstVisibleDate);

				while (current <= lastVisibleDate) {
					const dateKey = current.toISOString().split('T')[0];
					const price = Math.floor(Math.random() * 200) + 100;

					metadata.set(dateKey, {
						badgeText: `$${price}`,
						badgeClass: 'price-tag'
					});

					current.setDate(current.getDate() + 1);
				}

				return { action: 'accept', metadata };
			};

			loadingPicker.customStylesCallback = () => `
				.drp-date-picker__badge-cell.price-tag {
					background: #007bff !important; color: white !important;
				}
			`;
		}
	}

	function initializeBlockingDemo() {
		const blockingPicker = document.getElementById('blocking-demo') as any;
		if (blockingPicker) {
			const today = new Date();
			const maxMonth = new Date(today.getFullYear(), today.getMonth() + 3, 1);

			blockingPicker.beforeMonthChangedCallback = async ({ year, month, firstVisibleDate }: any) => {
				const targetDate = new Date(year, month - 1, 1);

				// Block navigation beyond 3 months from today
				if (targetDate > maxMonth) {
					return {
						action: 'block',
						message: 'Availability data only available for next 3 months'
					};
				}

				// Allow navigation - load metadata
				const metadata = new Map();
				const current = new Date(firstVisibleDate);
				const endDate = new Date(current);
				endDate.setMonth(endDate.getMonth() + 2);

				while (current <= endDate) {
					const dateKey = current.toISOString().split('T')[0];
					metadata.set(dateKey, {
						badgeText: '✓',
						badgeClass: 'available'
					});
					current.setDate(current.getDate() + 1);
				}

				return { action: 'accept', metadata };
			};

			blockingPicker.customStylesCallback = () => `
				.drp-date-picker__badge-cell.available {
					background: #28a745 !important; color: white !important;
				}
			`;
		}
	}
</script>

<DocLayout
	titleText="Bulk Metadata Loading"
	descriptionText="Optimize performance by loading date metadata in bulk instead of per-day callbacks"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				The <code>beforeMonthChangedCallback</code> enables efficient bulk loading of date metadata
				(prices, availability, badges) with a single API call per month navigation instead of 35-42
				individual callbacks per day.
			</p>
		</section>

		<!-- Performance Comparison -->
		<ShowcaseSection
			titleText="BML01 Performance Comparison"
			subtitleText="1 API call vs 35-42 per month"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<div class="row g-3">
					<div class="col-md-6">
						<h6 class="mb-2">❌ Old Way: Per-Day Callbacks</h6>
						<web-daterangepicker
							id="per-day-demo"
							selection-mode="range"
							visible-months-count="2"
							month-layout="horizontal"
							placeholder="Select dates"
						>
						</web-daterangepicker>
						<p class="mt-2 small text-muted">
							Uses <code>getDateMetadataCallback</code><br />
							Called 35-42 times per month
						</p>
						<div id="per-day-loader" class="mt-2" style="display: none;">
							<div class="alert alert-warning mb-0 d-flex align-items-center">
								<div class="spinner-border spinner-border-sm me-2" role="status">
									<span class="visually-hidden">Loading...</span>
								</div>
								<span id="per-day-status">Loading prices...</span>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<h6 class="mb-2">✅ New Way: Bulk Loading</h6>
						<web-daterangepicker
							id="bulk-demo"
							selection-mode="range"
							visible-months-count="2"
							month-layout="horizontal"
							placeholder="Select dates"
						>
						</web-daterangepicker>
						<p class="mt-2 small text-muted">
							Uses <code>beforeMonthChangedCallback</code><br />
							Called 1 time per month navigation
						</p>
						<div id="bulk-loader" class="mt-2" style="display: none;">
							<div class="alert alert-success mb-0 d-flex align-items-center">
								<div class="spinner-border spinner-border-sm me-2" role="status">
									<span class="visually-hidden">Loading...</span>
								</div>
								<span>Loading prices... (1 API call)</span>
							</div>
						</div>
					</div>
				</div>

				<div class="alert alert-info mt-3">
					<strong>Performance:</strong> Bulk loading is 35-42× more efficient than per-day callbacks.
					<strong>Try it:</strong> Navigate between months to see the loading difference!
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Old Way: Per-Day Callback (35-42 API calls)
const picker = new DateRangePicker(input, {
  getDateMetadataCallback: (date) => {
    // Called for EVERY visible day (35-42 times per month!)
    const price = await fetchPrice(date); // 35-42 API calls
    return {
      badgeText: \`$\${price}\`,
      badgeClass: price > 200 ? 'high' : 'normal'
    };
  }
});

// New Way: Bulk Loading (1 API call)
const picker = new DateRangePicker(input, {
  beforeMonthChangedCallback: async ({ firstVisibleDate, lastVisibleDate }) => {
    // Called ONCE before month changes
    const response = await fetch('/api/prices', {
      method: 'POST',
      body: JSON.stringify({
        start: firstVisibleDate.toISOString(),
        end: lastVisibleDate.toISOString()
      })
    });
    const prices = await response.json();

    // Build metadata map for all dates at once
    const metadata = new Map();
    prices.forEach(item => {
      metadata.set(item.date, {
        badgeText: \`$\${item.price}\`,
        badgeClass: item.price > 200 ? 'high' : 'normal'
      });
    });

    return { action: 'accept', metadata };
  }
});`}
					languageType="javascript"
					titleText="Performance Comparison"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Performance Impact</h5>
					<p>The difference is dramatic:</p>
					<ul>
						<li><strong>Old way:</strong> 35-42 API calls per month = slow, expensive</li>
						<li><strong>New way:</strong> 1 API call per month = fast, efficient</li>
						<li><strong>Result:</strong> 35-42× reduction in API calls</li>
					</ul>

					<h5>When to Use</h5>
					<p>Use bulk loading when:</p>
					<ul>
						<li>Loading prices/availability from an API</li>
						<li>Displaying dynamic badges or tooltips</li>
						<li>Working with hotel bookings, event calendars, etc.</li>
						<li>Performance matters (mobile, slow connections)</li>
					</ul>

					<div class="alert alert-success mt-3">
						<strong>Best Practice:</strong> Always use <code>beforeMonthChangedCallback</code> for
						dynamic data. Reserve <code>getDateMetadataCallback</code> for static/computed
						metadata.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Hotel Booking Example -->
		<ShowcaseSection
			titleText="BML02 Hotel Booking with Multi-Tier Pricing"
			subtitleText="Dynamic price badges and itemized summary breakdown"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="hotel-demo"
					selection-mode="range"
					visible-months-count="2"
					month-layout="horizontal"
					placeholder="Select check-in and check-out dates"
				>
				</web-daterangepicker>
				<div class="alert alert-secondary mt-3">
					<strong>Pricing Calculation:</strong> {hotelPricingSummaryOutput}
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

// Bulk load prices via beforeMonthChangedCallback
picker.beforeMonthChangedCallback = async ({ firstVisibleDate, lastVisibleDate }) => {
  const metadata = new Map();
  const current = new Date(firstVisibleDate);

  while (current <= lastVisibleDate) {
    const { tier, price } = getPriceTier(current);
    metadata.set(current.toISOString().split('T')[0], {
      badgeText: \`$\${price}\`,
      badgeClass: \`badge-number price-\${tier}\`,
      badgeTooltip: \`$\${price}/night\`
    });
    current.setDate(current.getDate() + 1);
  }

  return { action: 'accept', metadata };
};

// Add custom styles for price badges
picker.customStylesCallback = () => \`
  .price-budget { background: #d1fae5; color: #065f46; }
  .price-standard { background: #dbeafe; color: #1e40af; }
  .price-premium { background: #e9d5ff; color: #6b21a8; }
  .price-deluxe { background: #fed7aa; color: #92400e; }
  .price-luxury { background: #fee2e2; color: #991b1b; }
\`;

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
					codeContent={`<!-- HTML markup — needs the JavaScript block above wired in onMount /
     after customElements.whenDefined to attach the callbacks. The plain
     markup alone renders a standard range picker with no pricing. -->
<web-daterangepicker
  id="hotel-booking"
  selection-mode="range"
  visible-months-count="2"
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
						<li><code>beforeMonthChangedCallback</code> - Bulk load prices for visible months</li>
						<li><code>customStylesCallback</code> - Inject CSS for badge color schemes</li>
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

		<!-- Loading States -->
		<ShowcaseSection
			titleText="BML03 Loading States"
			subtitleText="Automatic loading overlay during API calls"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="loading-demo"
					selection-mode="range"
					visible-months-count="2"
					month-layout="horizontal"
					positioning-mode="inline"
					placeholder="Select dates"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Click navigation arrows to see loading overlay (simulated 1 second delay)
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Loading overlay is automatic
const picker = new DateRangePicker(input, {
  beforeMonthChangedCallback: async ({ firstVisibleDate, lastVisibleDate }) => {
    // Loading overlay shows automatically during async operations
    const data = await fetch('/api/prices', {
      method: 'POST',
      body: JSON.stringify({
        start: firstVisibleDate,
        end: lastVisibleDate
      })
    }).then(res => res.json());

    // Build metadata...
    const metadata = new Map();
    data.forEach(item => {
      metadata.set(item.date, { badgeText: \`$\${item.price}\` });
    });

    // Loading overlay hides when callback completes
    return { action: 'accept', metadata };
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Automatic Loading States</h5>
					<p>
						The date picker automatically shows a loading overlay during async operations in
						<code>beforeMonthChangedCallback</code>:
					</p>
					<ul>
						<li><strong>Shows:</strong> When callback is called (before navigation starts)</li>
						<li><strong>Hides:</strong> When callback resolves (after metadata loaded)</li>
						<li><strong>Blocks interaction:</strong> Users can't click during loading</li>
					</ul>

					<h5>No Extra Code Needed</h5>
					<p>
						You don't need to implement loading states yourself. Just return a Promise from your
						callback, and the component handles the rest.
					</p>

					<div class="alert alert-warning mt-3">
						<strong>Best Practice:</strong> Keep API calls fast (&lt;500ms). If your API is slow,
						consider caching or pre-loading data for better UX.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Blocking Navigation -->
		<ShowcaseSection
			titleText="BML04 Blocking Navigation"
			subtitleText="Prevent navigation to unavailable months"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="blocking-demo"
					selection-mode="range"
					visible-months-count="2"
					month-layout="horizontal"
					positioning-mode="inline"
					placeholder="Select dates"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Try navigating forward 3+ months - navigation will be blocked with a message
				</p>

			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Block navigation to unavailable months
const picker = new DateRangePicker(input, {
  beforeMonthChangedCallback: async ({ year, month }) => {
    const targetDate = new Date(year, month - 1, 1);
    const maxDate = new Date(2025, 11, 31); // Dec 31, 2025

    // Check if month is beyond available range
    if (targetDate > maxDate) {
      return {
        action: 'block',
        message: 'Bookings not available beyond December 2025'
      };
    }

    // Otherwise, load metadata and allow navigation
    const metadata = await loadMetadata(targetDate);
    return { action: 'accept', metadata };
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Navigation Blocking</h5>
					<p>
						You can prevent navigation to specific months by returning <code>action: 'block'</code>
						from the callback:
					</p>
					<ul>
						<li><strong>Blocks navigation:</strong> Calendar stays on current month</li>
						<li>
							<strong>Shows message:</strong> Optional user-friendly message explaining why
						</li>
						<li>
							<strong>Use cases:</strong> Data not available, bookings closed, restricted dates
						</li>
					</ul>

					<h5>Return Values</h5>
					<p>The callback must return an object with:</p>
					<ul>
						<li>
							<code>action: 'accept'</code> - Allow navigation, provide metadata (optional)
						</li>
						<li><code>action: 'block'</code> - Block navigation, show message (optional)</li>
					</ul>

					<h5>Common Blocking Scenarios</h5>
					<ul>
						<li><strong>Data availability:</strong> Block months without pricing data</li>
						<li><strong>Business rules:</strong> Block booking beyond 6 months</li>
						<li><strong>Seasonal closures:</strong> Block off-season months</li>
					</ul>

					<div class="alert alert-info mt-3">
						<strong>Note:</strong> Blocking is checked BEFORE navigation occurs, so users never see
						empty/loading months that will be blocked.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
