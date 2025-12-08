<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(async () => {
		await import('@keenmate/web-daterangepicker');

		// Wait for components to be ready
		await new Promise(resolve => setTimeout(resolve, 100));

		// EC01: Before Date Select Callback - Validation
		initializeBeforeSelectDemo();

		// EC02: Adjusting Selections
		initializeAdjustDemo();

		// EC03: Async Validation
		initializeAsyncDemo();

		// EC04: onSelect Event
		initializeOnSelectDemo();
	});

	function initializeBeforeSelectDemo() {
		const picker = document.getElementById('before-select-demo') as any;
		const messageDiv = document.getElementById('before-select-message');

		if (picker && messageDiv) {
			picker.beforeDateSelectCallback = async (selection: any) => {
				// Check if it's a range (has start and end properties)
				if ('start' in selection && selection.end) {
					const nights = Math.round(
						(selection.end.getTime() - selection.start.getTime()) / (1000 * 60 * 60 * 24)
					);

					if (nights < 3) {
						messageDiv.textContent = '❌ Minimum stay is 3 nights';
						messageDiv.className = 'mt-3 alert alert-danger';
						messageDiv.style.display = 'block';
						return {
							action: 'restore',
							message: 'Minimum stay is 3 nights'
						};
					}

					if (nights > 7) {
						messageDiv.textContent = '❌ Maximum stay is 7 nights';
						messageDiv.className = 'mt-3 alert alert-danger';
						messageDiv.style.display = 'block';
						return {
							action: 'restore',
							message: 'Maximum stay is 7 nights'
						};
					}

					messageDiv.textContent = `✅ Valid selection: ${nights} nights`;
					messageDiv.className = 'mt-3 alert alert-success';
					messageDiv.style.display = 'block';
				}

				return { action: 'accept' };
			};
		}
	}

	function initializeAdjustDemo() {
		const picker = document.getElementById('adjust-demo') as any;
		const messageDiv = document.getElementById('adjust-message');

		if (picker && messageDiv) {
			picker.beforeDateSelectCallback = async (selection: any) => {
				// Auto-adjust to full weeks (Sunday to Saturday)
				if ('start' in selection && selection.end) {
					const start = new Date(selection.start);
					const end = new Date(selection.end);

					// Adjust start to previous Sunday
					const startDay = start.getDay();
					if (startDay !== 0) {
						start.setDate(start.getDate() - startDay);
					}

					// Adjust end to next Saturday
					const endDay = end.getDay();
					if (endDay !== 6) {
						end.setDate(end.getDate() + (6 - endDay));
					}

					// Check if adjustment was needed
					const wasAdjusted =
						start.getTime() !== selection.start.getTime() ||
						end.getTime() !== selection.end.getTime();

					if (wasAdjusted) {
						messageDiv.textContent = '✨ Adjusted to full week (Sunday - Saturday)';
						messageDiv.className = 'mt-3 alert alert-info';
						messageDiv.style.display = 'block';

						return {
							action: 'adjust',
							adjustedStartDate: start,
							adjustedEndDate: end
						};
					}

					messageDiv.textContent = '✅ Already a full week';
					messageDiv.className = 'mt-3 alert alert-success';
					messageDiv.style.display = 'block';
				}

				return { action: 'accept' };
			};
		}
	}

	function initializeAsyncDemo() {
		const picker = document.getElementById('async-demo') as any;
		const messageDiv = document.getElementById('async-message');

		if (picker && messageDiv) {
			picker.beforeDateSelectCallback = async (selection: any) => {
				if ('start' in selection && selection.end) {
					// Show loading state
					messageDiv.textContent = '⏳ Checking availability...';
					messageDiv.className = 'mt-3 alert alert-info';
					messageDiv.style.display = 'block';

					// Simulate API call (1 second delay)
					await new Promise((resolve) => setTimeout(resolve, 1000));

					// Simulate random availability
					const isAvailable = Math.random() > 0.3;

					if (!isAvailable) {
						messageDiv.textContent = '❌ Not available for selected dates';
						messageDiv.className = 'mt-3 alert alert-danger';
						return {
							action: 'restore',
							message: 'Selected dates are not available'
						};
					}

					messageDiv.textContent = '✅ Dates are available!';
					messageDiv.className = 'mt-3 alert alert-success';
				}

				return { action: 'accept' };
			};
		}
	}

	function initializeOnSelectDemo() {
		const picker = document.getElementById('onselect-demo') as any;
		const outputDiv = document.getElementById('onselect-output');
		const dataDiv = document.getElementById('onselect-data');

		if (picker && outputDiv && dataDiv) {
			// Web component uses 'date-select' event instead of onSelect property
			picker.addEventListener('date-select', (e: CustomEvent) => {
				outputDiv.style.display = 'block';

				const detail = e.detail;

				// Handle range mode (dateRange) vs single mode (date)
				if (detail.dateRange) {
					const nights = Math.round(
						(detail.dateRange.end.getTime() - detail.dateRange.start.getTime()) / (1000 * 60 * 60 * 24)
					);
					dataDiv.textContent = JSON.stringify(
						{
							type: 'range',
							start: detail.dateRange.start?.toLocaleDateString(),
							end: detail.dateRange.end?.toLocaleDateString(),
							nights: nights,
							formattedValue: detail.formattedValue
						},
						null,
						2
					);
				} else if (detail.date) {
					// Single date
					dataDiv.textContent = JSON.stringify(
						{
							type: 'single',
							date: detail.date?.toLocaleDateString(),
							formattedValue: detail.formattedValue
						},
						null,
						2
					);
				}
			});
		}
	}
</script>

<DocLayout
	titleText="Event Callbacks"
	descriptionText="Validate, transform, and respond to date selection events"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				Event callbacks allow you to validate selections, block invalid dates, adjust selections
				automatically, and respond to user interactions with custom logic.
			</p>
		</section>

		<!-- beforeDateSelectCallback -->
		<ShowcaseSection
			titleText="EC01 Before Date Select Callback"
			subtitleText="Validate and control date selection"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="before-select-demo"
					selection-mode="range"
					visible-months-count="2"
					month-layout="horizontal"
					placeholder="Select 3-7 night stay"
				>
				</web-daterangepicker>
				<div id="before-select-message" class="mt-3 alert alert-info" style="display: none;"></div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Validate range length
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  beforeDateSelectCallback: async (selection) => {
    // Check if it's a range (has start and end)
    if ('start' in selection && selection.end) {
      const nights = Math.round(
        (selection.end - selection.start) / (1000 * 60 * 60 * 24)
      );

      if (nights < 3) {
        return {
          action: 'restore',
          message: 'Minimum stay is 3 nights'
        };
      }

      if (nights > 7) {
        return {
          action: 'restore',
          message: 'Maximum stay is 7 nights'
        };
      }
    }

    return { action: 'accept' };
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>

				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  id="picker"
  selection-mode="range"
  placeholder="Select 3-7 nights">
</web-daterangepicker>

<script>
  const picker = document.getElementById('picker');
  picker.beforeDateSelectCallback = async (selection) => {
    // selection is Date (single) or DateRange (range)
    // DateRange has: { start: Date, end: Date }
    return { action: 'accept' };
  };
</script>`}
					languageType="html"
					titleText="HTML"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>What It Does</h5>
					<p>
						The <code>beforeDateSelectCallback</code> is called BEFORE a date selection is
						finalized, allowing you to:
					</p>
					<ul>
						<li><strong>Validate:</strong> Check if selection meets business rules</li>
						<li><strong>Block:</strong> Prevent invalid selections with a message</li>
						<li><strong>Adjust:</strong> Modify the selection before applying</li>
						<li><strong>Async:</strong> Make API calls for validation</li>
					</ul>

					<h5>Callback Parameters</h5>
					<p>The callback receives:</p>
					<ul>
						<li><strong>Single mode:</strong> <code>Date</code> object</li>
						<li><strong>Range mode:</strong> <code>DateRange</code> with <code>start</code> and <code>end</code> properties</li>
					</ul>

					<h5>Return Values (BeforeSelectResult)</h5>
					<ul>
						<li>
							<code>{'{ action: \'accept\' }'}</code> - Allow selection
						</li>
						<li>
							<code>{'{ action: \'restore\', message?: string }'}</code> - Revert to previous selection
						</li>
						<li>
							<code>{'{ action: \'adjust\', adjustedStartDate, adjustedEndDate }'}</code> - Modify selection
						</li>
						<li>
							<code>{'{ action: \'clear\' }'}</code> - Clear selection entirely
						</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Adjusting Selection -->
		<ShowcaseSection
			titleText="EC02 Adjusting Selections"
			subtitleText="Automatically modify user selections"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="adjust-demo"
					selection-mode="range"
					visible-months-count="2"
					month-layout="horizontal"
					placeholder="Select dates (auto-adjusts to full weeks)"
				>
				</web-daterangepicker>
				<div id="adjust-message" class="mt-3 alert alert-info" style="display: none;"></div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Auto-adjust to full weeks
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  beforeDateSelectCallback: async (selection) => {
    if ('start' in selection && selection.end) {
      const start = new Date(selection.start);
      const end = new Date(selection.end);

      // Adjust start to previous Sunday
      const startDay = start.getDay();
      if (startDay !== 0) {
        start.setDate(start.getDate() - startDay);
      }

      // Adjust end to next Saturday
      const endDay = end.getDay();
      if (endDay !== 6) {
        end.setDate(end.getDate() + (6 - endDay));
      }

      // Return adjusted dates
      return {
        action: 'adjust',
        adjustedStartDate: start,
        adjustedEndDate: end
      };
    }

    return { action: 'accept' };
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Automatic Adjustments</h5>
					<p>
						You can automatically modify user selections to match business rules or improve user
						experience:
					</p>
					<ul>
						<li><strong>Snap to weeks:</strong> Adjust to full week boundaries</li>
						<li><strong>Minimum stays:</strong> Extend short selections to minimum length</li>
						<li><strong>Checkout dates:</strong> Ensure checkout is on specific days</li>
						<li><strong>Business rules:</strong> Any custom date adjustment logic</li>
					</ul>

					<h5>Return Format for Adjustments</h5>
					<pre><code>{`return {
  action: 'adjust',
  adjustedStartDate: new Date(...),
  adjustedEndDate: new Date(...)
};`}</code></pre>

					<h5>Common Use Cases</h5>
					<ul>
						<li><strong>Week rentals:</strong> Force Saturday-Saturday bookings</li>
						<li><strong>Minimum stays:</strong> Extend 1-night stays to 2+ nights</li>
						<li><strong>Holiday adjustments:</strong> Avoid checkout on holidays</li>
					</ul>

					<div class="alert alert-info mt-3">
						<strong>Tip:</strong> Show users a message explaining why their selection was adjusted
						to improve UX and avoid confusion.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Async Validation -->
		<ShowcaseSection
			titleText="EC03 Async Validation"
			subtitleText="Validate selections with API calls"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="async-demo"
					selection-mode="range"
					visible-months-count="2"
					month-layout="horizontal"
					placeholder="Select dates (checks availability)"
				>
				</web-daterangepicker>
				<div id="async-message" class="mt-3 alert alert-info" style="display: none;"></div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Check availability via API
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  beforeDateSelectCallback: async (selection) => {
    if ('start' in selection && selection.end) {
      // Make API call to check availability
      const response = await fetch('/api/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn: selection.start.toISOString(),
          checkOut: selection.end.toISOString()
        })
      });

      const result = await response.json();

      if (!result.available) {
        return {
          action: 'restore',
          message: 'Selected dates are not available'
        };
      }

      // Optional: Show price
      console.log('Total price:', result.price);
    }

    return { action: 'accept' };
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Async Validation</h5>
					<p>
						The callback can be async, allowing you to make API calls to validate selections before
						accepting them:
					</p>
					<ul>
						<li><strong>Check availability:</strong> Verify dates are bookable</li>
						<li><strong>Fetch pricing:</strong> Calculate total price</li>
						<li><strong>Validate rules:</strong> Check blackout dates, restrictions</li>
						<li><strong>Get inventory:</strong> Ensure sufficient stock/rooms</li>
					</ul>

					<h5>Loading States</h5>
					<p>
						The picker shows a loading overlay automatically during async operations, preventing
						users from clicking while validation is in progress.
					</p>

					<h5>Best Practices</h5>
					<ul>
						<li>Keep API calls fast (&lt;500ms) for good UX</li>
						<li>Show clear messages explaining why selections were blocked</li>
						<li>Cache results to avoid redundant API calls</li>
						<li>Use <code>beforeMonthChangedCallback</code> to pre-load availability data</li>
					</ul>

					<div class="alert alert-success mt-3">
						<strong>Pro Tip:</strong> Combine <code>beforeMonthChangedCallback</code> (bulk data
						loading) with <code>beforeDateSelectCallback</code> (final validation) for optimal
						performance.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- onSelect Event -->
		<ShowcaseSection
			titleText="EC04 onSelect Event"
			subtitleText="React to completed selections"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="onselect-demo"
					selection-mode="range"
					visible-months-count="2"
					month-layout="horizontal"
					placeholder="Select dates"
				>
				</web-daterangepicker>
				<div id="onselect-output" class="mt-3 p-3 bg-light border rounded" style="display: none;">
					<strong>Selection Details:</strong>
					<pre id="onselect-data" class="mb-0 mt-2"></pre>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// React to selection changes
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  onSelect: (selection) => {
    // Called AFTER selection is finalized
    // selection is Date (single) or DateRange (range)

    if ('start' in selection) {
      // It's a DateRange
      const nights = Math.round(
        (selection.end - selection.start) / (1000 * 60 * 60 * 24)
      );
      console.log(\`Booking for \${nights} nights\`);
      console.log('Check-in:', selection.start);
      console.log('Check-out:', selection.end);
    } else {
      // It's a single Date
      console.log('Selected date:', selection);
    }
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>

				<CodeBlock
					codeContent={`<!-- Web Component uses 'date-select' event -->
<web-daterangepicker
  id="picker"
  selection-mode="range"
  placeholder="Select dates">
</web-daterangepicker>

<script>
  const picker = document.getElementById('picker');

  // Listen for date-select event
  picker.addEventListener('date-select', (e) => {
    const { date, dateRange, formattedValue } = e.detail;

    if (dateRange) {
      // Range mode: dateRange.start and dateRange.end
      console.log('Range:', dateRange.start, '-', dateRange.end);
    } else if (date) {
      // Single mode: date is a Date object
      console.log('Date:', date);
    }

    console.log('Formatted:', formattedValue);
  });
</script>`}
					languageType="html"
					titleText="HTML (Web Component)"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>What It Does</h5>
					<p>
						Called AFTER a selection is finalized and accepted (after <code>beforeDateSelectCallback</code> validation passes).
					</p>

					<h5>Two Approaches</h5>
					<ul>
						<li><strong>JavaScript API:</strong> Use <code>onSelect</code> callback option</li>
						<li><strong>Web Component:</strong> Listen for <code>date-select</code> event</li>
					</ul>

					<h5>Event Detail (Web Component)</h5>
					<ul>
						<li><code>e.detail.date</code> - Date object (single mode)</li>
						<li><code>e.detail.dateRange</code> - <code>{'{start, end}'}</code> (range mode)</li>
						<li><code>e.detail.formattedValue</code> - Formatted input string</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Update UI:</strong> Show selection summary, pricing</li>
						<li><strong>Form integration:</strong> Populate hidden form fields</li>
						<li><strong>Analytics:</strong> Track user selections</li>
						<li><strong>Navigation:</strong> Auto-advance to next step</li>
					</ul>

					<h5>Callback vs Validation</h5>
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Method</th>
								<th>When</th>
								<th>Purpose</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>beforeDateSelectCallback</code></td>
								<td>BEFORE</td>
								<td>Validate, block, adjust</td>
							</tr>
							<tr>
								<td><code>onSelect</code> / <code>date-select</code></td>
								<td>AFTER</td>
								<td>React, update UI</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
