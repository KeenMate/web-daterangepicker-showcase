<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let isComponentLoaded = false;

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

			// Track when calendar opens/navigates
			perDayPicker.addEventListener('monthchanged', showPerDayLoader);

			// Also show on first open
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.attributeName === 'class') {
						const classList = perDayPicker.classList;
						if (classList.contains('drp-date-picker--open')) {
							showPerDayLoader();
						}
					}
				});
			});
			observer.observe(perDayPicker, { attributes: true });

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

				// Simulate API response with room data
				const metadata = new Map();
				const current = new Date(firstVisibleDate);

				while (current <= lastVisibleDate) {
					const dateKey = current.toISOString().split('T')[0];
					const dayOfWeek = current.getDay();
					const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

					// Simulate pricing and availability
					const basePrice = 120;
					const weekendSurcharge = isWeekend ? 50 : 0;
					const price = basePrice + weekendSurcharge + Math.floor(Math.random() * 80);

					const availableRooms = Math.floor(Math.random() * 10);
					const isFullyBooked = availableRooms === 0;

					metadata.set(dateKey, {
						badgeText: `$${price}`,
						badgeClass: isFullyBooked
							? 'sold-out'
							: availableRooms < 3
								? 'low-availability'
								: 'available',
						dayTooltip: isFullyBooked
							? 'Sold out'
							: `${availableRooms} rooms available`,
						isDisabled: isFullyBooked
					});

					current.setDate(current.getDate() + 1);
				}

				return { action: 'accept', metadata };
			};

			hotelPicker.customStylesCallback = () => `
				.drp-date-picker__badge-cell.sold-out {
					background: #6c757d !important; color: white !important;
				}
				.drp-date-picker__badge-cell.low-availability {
					background: #ffc107 !important; color: #000 !important;
				}
				.drp-date-picker__badge-cell.available {
					background: #28a745 !important; color: white !important;
				}
			`;
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
			titleText="Performance Comparison"
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
			titleText="Hotel Booking Example"
			subtitleText="Load room availability and pricing"
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
					placeholder="Check-in - Check-out"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Simulated hotel API: prices, availability, and disabled dates
				</p>

			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Hotel Booking with Availability
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  beforeMonthChangedCallback: async ({ firstVisibleDate, lastVisibleDate }) => {
    // Single API call for entire date range
    const response = await fetch('/api/hotel/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hotelId: 'hotel-123',
        checkIn: firstVisibleDate.toISOString(),
        checkOut: lastVisibleDate.toISOString()
      })
    });

    const availability = await response.json();

    // Build metadata map
    const metadata = new Map();
    availability.forEach(day => {
      metadata.set(day.date, {
        badgeText: \`$\${day.price}\`,
        badgeClass: day.available === 0
          ? 'sold-out'
          : day.available < 3
            ? 'low-availability'
            : 'available',
        dayTooltip: day.available === 0
          ? 'Sold out'
          : \`\${day.available} rooms available\`,
        isDisabled: day.available === 0 // Disable sold-out dates
      });
    });

    return { action: 'accept', metadata };
  },

  // Style the badge classes
  customStylesCallback: () => \`
    .drp-date-picker__badge-cell.sold-out {
      background: #6c757d !important;
      color: white !important;
    }
    .drp-date-picker__badge-cell.low-availability {
      background: #ffc107 !important;
      color: #000 !important;
    }
    .drp-date-picker__badge-cell.available {
      background: #28a745 !important;
      color: white !important;
    }
  \`
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Real-World Use Case</h5>
					<p>This example demonstrates a realistic hotel booking scenario:</p>
					<ul>
						<li><strong>Dynamic pricing:</strong> Prices vary by day (weekends more expensive)</li>
						<li>
							<strong>Availability badges:</strong> Green (available), Yellow (low), Gray (sold
							out)
						</li>
						<li><strong>Tooltips:</strong> Show room count on hover</li>
						<li><strong>Disabled dates:</strong> Sold-out dates are unselectable</li>
					</ul>

					<h5>API Response Format</h5>
					<p>Your API should return an array of date objects:</p>
					<pre><code>{`[
  { "date": "2025-01-15", "price": 150, "available": 5 },
  { "date": "2025-01-16", "price": 180, "available": 2 },
  { "date": "2025-01-17", "price": 200, "available": 0 }
]`}</code></pre>

					<div class="alert alert-info mt-3">
						<strong>Tip:</strong> The callback receives both start and end dates, allowing you to
						load data for all visible months in multi-month displays (e.g., 2-6 months at once).
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Loading States -->
		<ShowcaseSection
			titleText="Loading States"
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
			titleText="Blocking Navigation"
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
