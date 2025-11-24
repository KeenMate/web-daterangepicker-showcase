<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
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
			titleText="Before Date Select Callback"
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

				<script>
					setTimeout(() => {
						const picker = document.getElementById('before-select-demo');
						const messageDiv = document.getElementById('before-select-message');

						if (picker && messageDiv) {
							picker.beforeDateSelectCallback = async (selection) => {
								// Validate range length: must be 3-7 nights
								if (selection.type === 'range' && selection.endDate) {
									const nights =
										(selection.endDate - selection.startDate) / (1000 * 60 * 60 * 24);

									if (nights < 3) {
										messageDiv.textContent = '❌ Minimum stay is 3 nights';
										messageDiv.className = 'mt-3 alert alert-danger';
										messageDiv.style.display = 'block';
										return {
											action: 'block',
											message: 'Minimum stay is 3 nights'
										};
									}

									if (nights > 7) {
										messageDiv.textContent = '❌ Maximum stay is 7 nights';
										messageDiv.className = 'mt-3 alert alert-danger';
										messageDiv.style.display = 'block';
										return {
											action: 'block',
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
					}, 100);
				</script>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Validate range length
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  beforeDateSelectCallback: async (selection) => {
    // Validate: must be 3-7 nights
    if (selection.type === 'range' && selection.endDate) {
      const nights = (selection.endDate - selection.startDate) / (1000 * 60 * 60 * 24);

      if (nights < 3) {
        return {
          action: 'block',
          message: 'Minimum stay is 3 nights'
        };
      }

      if (nights > 7) {
        return {
          action: 'block',
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
    // Validation logic here...
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
					<p>The callback receives a selection object:</p>
					<ul>
						<li><code>type</code> - 'single' or 'range'</li>
						<li><code>startDate</code> - Selected/start date (Date object)</li>
						<li><code>endDate</code> - End date for ranges (Date object or null)</li>
						<li><code>picker</code> - The picker instance</li>
					</ul>

					<h5>Return Values</h5>
					<ul>
						<li>
							<code>{'{ action: \'accept\' }'}</code> - Allow selection
						</li>
						<li>
							<code>{'{ action: \'block\', message?: string }'}</code> - Block with optional message
						</li>
						<li>
							<code>{'{ action: \'adjust\', startDate, endDate? }'}</code> - Modify selection
						</li>
					</ul>

					<div class="alert alert-warning mt-3">
						<strong>Breaking Change in v1.2.0:</strong> This callback was renamed from
						<code>beforeDateSelect</code> to <code>beforeDateSelectCallback</code> for consistency.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Adjusting Selection -->
		<ShowcaseSection
			titleText="Adjusting Selections"
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

				<script>
					setTimeout(() => {
						const picker = document.getElementById('adjust-demo');
						const messageDiv = document.getElementById('adjust-message');

						if (picker && messageDiv) {
							picker.beforeDateSelectCallback = async (selection) => {
								// Auto-adjust to full weeks (Sunday to Saturday)
								if (selection.type === 'range' && selection.endDate) {
									const start = new Date(selection.startDate);
									const end = new Date(selection.endDate);

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
										start.getTime() !== selection.startDate.getTime() ||
										end.getTime() !== selection.endDate.getTime();

									if (wasAdjusted) {
										messageDiv.textContent = '✨ Adjusted to full week (Sunday - Saturday)';
										messageDiv.className = 'mt-3 alert alert-info';
										messageDiv.style.display = 'block';

										return {
											action: 'adjust',
											startDate: start,
											endDate: end
										};
									}

									messageDiv.textContent = '✅ Already a full week';
									messageDiv.className = 'mt-3 alert alert-success';
									messageDiv.style.display = 'block';
								}

								return { action: 'accept' };
							};
						}
					}, 100);
				</script>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Auto-adjust to full weeks
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  beforeDateSelectCallback: async (selection) => {
    if (selection.type === 'range' && selection.endDate) {
      const start = new Date(selection.startDate);
      const end = new Date(selection.endDate);

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
        startDate: start,
        endDate: end
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
  startDate: new Date(...), // Adjusted start
  endDate: new Date(...)    // Adjusted end (for ranges)
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
			titleText="Async Validation"
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

				<script>
					setTimeout(() => {
						const picker = document.getElementById('async-demo');
						const messageDiv = document.getElementById('async-message');

						if (picker && messageDiv) {
							picker.beforeDateSelectCallback = async (selection) => {
								if (selection.type === 'range' && selection.endDate) {
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
											action: 'block',
											message: 'Selected dates are not available'
										};
									}

									messageDiv.textContent = '✅ Dates are available!';
									messageDiv.className = 'mt-3 alert alert-success';
								}

								return { action: 'accept' };
							};
						}
					}, 100);
				</script>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Check availability via API
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  beforeDateSelectCallback: async (selection) => {
    if (selection.type === 'range' && selection.endDate) {
      // Make API call to check availability
      const response = await fetch('/api/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn: selection.startDate.toISOString(),
          checkOut: selection.endDate.toISOString()
        })
      });

      const result = await response.json();

      if (!result.available) {
        return {
          action: 'block',
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
			titleText="onSelect Event"
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

				<script>
					setTimeout(() => {
						const picker = document.getElementById('onselect-demo');
						const outputDiv = document.getElementById('onselect-output');
						const dataDiv = document.getElementById('onselect-data');

						if (picker && outputDiv && dataDiv) {
							picker.onSelect = (selection) => {
								outputDiv.style.display = 'block';
								dataDiv.textContent = JSON.stringify(
									{
										type: selection.type,
										startDate: selection.startDate?.toLocaleDateString(),
										endDate: selection.endDate?.toLocaleDateString(),
										nights:
											selection.endDate
												? Math.round(
														(selection.endDate - selection.startDate) / (1000 * 60 * 60 * 24)
													)
												: null
									},
									null,
									2
								);
							};
						}
					}, 100);
				</script>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// React to selection changes
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  onSelect: (selection) => {
    // Called AFTER selection is finalized
    console.log('Selected:', {
      type: selection.type,
      startDate: selection.startDate,
      endDate: selection.endDate
    });

    // Update UI, send to analytics, etc.
    if (selection.type === 'range' && selection.endDate) {
      const nights = (selection.endDate - selection.startDate) / (1000 * 60 * 60 * 24);
      console.log(\`Booking for \${nights} nights\`);
    }
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
  placeholder="Select dates">
</web-daterangepicker>

<script>
  const picker = document.getElementById('picker');
  picker.onSelect = (selection) => {
    console.log('Selected:', selection);
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
						The <code>onSelect</code> callback is called AFTER a selection is finalized and
						accepted (after <code>beforeDateSelectCallback</code> validation passes).
					</p>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Update UI:</strong> Show selection summary, pricing, etc.</li>
						<li><strong>Form integration:</strong> Populate hidden form fields</li>
						<li><strong>Analytics:</strong> Track user selections</li>
						<li><strong>Navigation:</strong> Auto-advance to next step</li>
					</ul>

					<h5>Callback vs Validation</h5>
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Callback</th>
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
								<td><code>onSelect</code></td>
								<td>AFTER</td>
								<td>React, update UI</td>
							</tr>
						</tbody>
					</table>

					<div class="alert alert-info mt-3">
						<strong>Note:</strong> <code>onSelect</code> is called for both single and range mode.
						Check <code>selection.type</code> to determine the mode.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
