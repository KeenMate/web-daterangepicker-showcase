<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	// Local-midnight ISO key — avoids the toISOString() UTC-shift trap that
	// can flip dates by ±1 day in non-UTC timezones (see README's Working
	// with Dates section).
	const toLocalISO = (d: Date) =>
		`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

	function wireOutputPane(
		demoId: string,
		outputId: string,
		render: (detail: any) => string
	) {
		const picker = document.getElementById(demoId) as any;
		const output = document.getElementById(outputId);
		if (!picker || !output) return;
		const code = output.querySelector('code');
		picker.addEventListener('date-select', (e: any) => {
			if (!code) return;
			output.style.display = 'block';
			code.textContent = render(e.detail);
		});
	}

	onMount(async () => {
		await import('@keenmate/web-daterangepicker');
		await customElements.whenDefined('web-daterangepicker');

		// RDH02–RDH06 — event-detail output panes for each disabled-handling
		// mode. Wired here (not via inline <script> in the snippets) so they
		// survive SvelteKit's client-side route transitions; inline scripts
		// in injected HTML only execute on direct page load.

		wireOutputPane('allow-demo', 'allow-output', ({ dateRange, disabledDates, getTotalDays, getEnabledDateCount }) =>
			JSON.stringify({
				dateRange: { start: toLocalISO(dateRange.start), end: toLocalISO(dateRange.end) },
				totalDays: getTotalDays(),
				enabledCount: getEnabledDateCount(),
				disabledCount: disabledDates.length
			}, null, 2)
		);

		// 'prevent' mode: date-select fires only on valid selections. When a
		// blocked attempt happens no event fires, so we just hide the pane on
		// any successful selection (replacing whatever was last shown).
		const preventPicker = document.getElementById('prevent-demo');
		const preventOutput = document.getElementById('prevent-output');
		if (preventPicker && preventOutput) {
			preventPicker.addEventListener('date-select', () => {
				preventOutput.style.display = 'none';
			});
		}

		wireOutputPane('block-demo', 'block-output', ({ dateRange }) =>
			JSON.stringify({
				dateRange: { start: toLocalISO(dateRange.start), end: toLocalISO(dateRange.end) },
				note: 'End date automatically adjusted to last enabled date'
			}, null, 2)
		);

		wireOutputPane('split-demo', 'split-output', ({ dateRanges, dates }) =>
			JSON.stringify({
				rangeCount: dateRanges.length,
				ranges: dateRanges.map((r: any) => ({ start: toLocalISO(r.start), end: toLocalISO(r.end) })),
				totalDates: dates.length
			}, null, 2)
		);

		wireOutputPane('individual-demo', 'individual-output', ({ dates, formattedValue }) =>
			JSON.stringify({
				dateCount: dates.length,
				dates: dates.slice(0, 3).map((d: Date) => toLocalISO(d)),
				moreCount: Math.max(0, dates.length - 3),
				formattedValue: formattedValue.length > 100 ? formattedValue.substring(0, 100) + '...' : formattedValue
			}, null, 2)
		);
	});
</script>

<DocLayout
	titleText="Range Disabled Handling"
	descriptionText="Control how the date picker handles disabled dates within selected ranges - essential for business logic in booking and scheduling systems"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				When selecting date ranges, disabled dates (weekends, holidays, blackout dates) may fall
				within the range. The `disabled-dates-handling` attribute controls how the picker
				behaves in these situations.
			</p>
			<p>
				This feature is crucial for hotel bookings, equipment rentals, appointment scheduling, and
				any system where you need precise control over how disabled dates affect range selections.
			</p>
		</section>

		<!-- Mode Overview -->
		<ShowcaseSection
			titleText="RDH01 The Five Handling Modes"
			subtitleText="Choose the right behavior for your use case"
			col1Title="Mode Comparison"
			col2Title="When to Use"
			col3Title="Behavior">

			{#snippet demoContent()}
				<div class="table-responsive">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>Mode</th>
								<th>Visual Behavior</th>
								<th>Event Data</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>'allow'</code></td>
								<td>Range spans over disabled dates</td>
								<td><code>dateRange</code>, <code>enabledDates[]</code>, <code>disabledDates[]</code></td>
							</tr>
							<tr>
								<td><code>'prevent'</code></td>
								<td>Cannot complete selection across disabled dates</td>
								<td>Selection blocked - no event</td>
							</tr>
							<tr>
								<td><code>'block'</code></td>
								<td>Range snaps to last enabled date before gap</td>
								<td><code>dateRange</code> (adjusted end date)</td>
							</tr>
							<tr>
								<td><code>'split'</code></td>
								<td>Range spans disabled dates</td>
								<td><code>dateRanges[]</code> (multiple ranges), <code>dates[]</code></td>
							</tr>
							<tr>
								<td><code>'individual'</code></td>
								<td>Range spans disabled dates</td>
								<td><code>dates[]</code> (flat array of enabled dates)</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose">
					<h5>'allow' - Hotel Booking</h5>
					<p>Guest can select any range, system calculates billable nights excluding closed days.</p>

					<h5>'prevent' - Strict Scheduling</h5>
					<p>Cannot create appointments that cross blackout dates. Forces selection of valid period.</p>

					<h5>'block' - Equipment Rental</h5>
					<p>Rental must end before weekend. Selection automatically snaps to Friday.</p>

					<h5>'split' - Recurring Bookings</h5>
					<p>Book same room for multiple separate periods (e.g., weekdays only over two weeks).</p>

					<h5>'individual' - Cherry-Pick Dates</h5>
					<p>Select range, get individual valid dates for batch processing.</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Attribute</h5>
					<p><code>disabled-dates-handling="mode"</code></p>

					<h5>JavaScript Option</h5>
					<p><code>disabledDatesHandling: 'allow' | 'prevent' | 'block' | 'split' | 'individual'</code></p>

					<h5>Default</h5>
					<p><code>'allow'</code></p>

					<h5>Applies To</h5>
					<p>Range mode only. Single mode ignores this setting.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- 'allow' Mode -->
		<ShowcaseSection
			titleText="RDH02 Mode: 'allow' (Default)"
			subtitleText="Allow ranges over disabled dates with breakdown"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					id="allow-demo"
					selection-mode="range"
					visible-months-count="2"
					disabled-weekdays="0,6"
					disabled-dates-handling="allow"
					placeholder="Select range (weekends disabled)">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Try selecting Mon Jan 6 to Fri Jan 17 (includes 2 weekends)</p>
				<div id="allow-output" class="mt-3 p-3 bg-light rounded" style="display:none;">
					<h6>Event Detail:</h6>
					<pre class="mb-0"><code></code></pre>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="range"
  disabled-weekdays="0,6"
  disabled-dates-handling="allow">
</web-daterangepicker>

<script>
picker.addEventListener('date-select', (e) => {
  const { dateRange, enabledDates, disabledDates } = e.detail;

  console.log('Full range:', dateRange.start, 'to', dateRange.end);
  console.log('Enabled dates:', enabledDates.length);
  console.log('Disabled dates:', disabledDates.length);
  console.log('Total days:', e.detail.getTotalDays());
  console.log('Enabled count:', e.detail.getEnabledDateCount());

  // Bill only for enabled dates
  const rate = 100;
  const total = enabledDates.length * rate;
  console.log('Total: $' + total);
});
</script>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  disabledWeekdays: [0, 6], // Weekends
  disabledDatesHandling: 'allow',
  onSelect: (dateRange) => {
    const enabled = picker.getEnabledDatesInRange(
      dateRange.start,
      dateRange.end
    );
    const disabled = picker.getDisabledDatesInRange(
      dateRange.start,
      dateRange.end
    );

    console.log(\`\${enabled.length} enabled, \${disabled.length} disabled\`);
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Behavior</h5>
					<ul>
						<li>Range selection spans over disabled dates normally</li>
						<li>Disabled dates within range are visually highlighted (grayed out)</li>
						<li>Event includes both <code>enabledDates[]</code> and <code>disabledDates[]</code> arrays</li>
						<li>Helper methods: <code>getTotalDays()</code>, <code>getEnabledDateCount()</code></li>
					</ul>

					<h5>Event Detail Properties</h5>
					<ul>
						<li><code>dateRange</code> - Full range with start and end</li>
						<li><code>enabledDates</code> - Array of enabled Date objects</li>
						<li><code>disabledDates</code> - Array of disabled Date objects</li>
						<li><code>getTotalDays()</code> - Function returning total days in range</li>
						<li><code>getEnabledDateCount()</code> - Function returning count of enabled dates</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li>Hotel bookings with closed days</li>
						<li>Pricing based on actual available dates</li>
						<li>Visual clarity: show full period with exceptions</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- 'prevent' Mode -->
		<ShowcaseSection
			titleText="RDH03 Mode: 'prevent'"
			subtitleText="REJECTS selections that cross disabled dates - no event fires"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					id="prevent-demo"
					selection-mode="range"
					visible-months-count="2"
					disabled-weekdays="0,6"
					disabled-dates-handling="prevent"
					placeholder="Select range (weekends prevent selection)">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Try selecting Mon Jan 6 to Mon Jan 13 - selection will be blocked at weekend</p>
				<div id="prevent-output" class="mt-3 p-3 bg-light rounded" style="display:none;">
					<p class="text-danger mb-0"><strong>Selection prevented:</strong> Range crosses disabled dates</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="range"
  disabled-weekdays="0,6"
  disabled-dates-handling="prevent"
  show-debug-info>
</web-daterangepicker>

<!-- With prevent mode, date-select event is NOT fired -->
<!-- if range would cross disabled dates -->

<script>
picker.addEventListener('date-select', (e) => {
  // Only fires if selection is valid
  console.log('Valid range:', e.detail.dateRange);
});
</script>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  disabledWeekdays: [0, 6],
  disabledDatesHandling: 'prevent',
  onSelect: (dateRange) => {
    // Only called for valid ranges
    console.log('Allowed range:', dateRange);
  }
});

// Selection attempts that cross disabled dates
// are silently blocked - no event fires`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Behavior: "No, you can't"</h5>
					<ul>
						<li><strong>Selection is REJECTED</strong> if it would cross disabled dates</li>
						<li><code>date-select</code> event is <strong>NOT fired</strong> - selection fails silently</li>
						<li>User must try again with a valid range</li>
						<li>Most restrictive mode - no compromise</li>
					</ul>

					<h5>Event Detail</h5>
					<ul>
						<li><strong>No event fires</strong> when selection blocked</li>
						<li>Only fires for valid, contiguous enabled ranges</li>
					</ul>

					<div class="alert alert-warning mt-3">
						<strong>Key Point:</strong> This mode <strong>rejects</strong> the selection entirely. If you want the selection to succeed but be auto-corrected, use 'block' mode instead.
					</div>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Strict rules</strong>: Cannot book across closed periods (no exceptions)</li>
						<li><strong>Compliance</strong>: Must enforce contiguous dates</li>
						<li><strong>Critical resources</strong>: Equipment must be available entire period</li>
					</ul>

					<h5>User Experience</h5>
					<p>Selection attempt fails. User must manually select a different range that doesn't cross disabled dates. Enable <code>show-debug-info</code> to see console messages.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- 'block' Mode -->
		<ShowcaseSection
			titleText="RDH04 Mode: 'block'"
			subtitleText="ACCEPTS selection but AUTO-SHORTENS to last enabled date - event fires"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					id="block-demo"
					selection-mode="range"
					visible-months-count="2"
					disabled-weekdays="0,6"
					disabled-dates-handling="block"
					placeholder="Select range (snaps to Friday)">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Try selecting Mon Jan 6 to Mon Jan 13 - end date will snap to Fri Jan 10</p>
				<div id="block-output" class="mt-3 p-3 bg-light rounded" style="display:none;">
					<h6>Event Detail:</h6>
					<pre class="mb-0"><code></code></pre>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="range"
  disabled-weekdays="0,6"
  disabled-dates-handling="block">
</web-daterangepicker>

<script>
picker.addEventListener('date-select', (e) => {
  const { dateRange } = e.detail;

  // dateRange.end is automatically adjusted to
  // the last enabled date before the disabled gap
  console.log('Start:', dateRange.start);
  console.log('End (adjusted):', dateRange.end);

  // No disabled dates in this range!
  // Range is guaranteed to be contiguous enabled dates
});
</script>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  disabledWeekdays: [0, 6], // Sat-Sun
  disabledDatesHandling: 'block',
  onSelect: (dateRange) => {
    // User tried to select Mon-to-Mon (crossing weekend)
    // dateRange.end is automatically adjusted to Friday

    const nights = Math.floor(
      (dateRange.end - dateRange.start) / (1000*60*60*24)
    );
    console.log('Rental period:', nights, 'nights');
    // Guaranteed: no disabled dates in range
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Behavior: "Yes, but shorter"</h5>
					<ul>
						<li><strong>Selection is ACCEPTED but MODIFIED</strong></li>
						<li>End date automatically snaps to last enabled date before disabled gap</li>
						<li><code>date-select</code> event <strong>DOES fire</strong> with adjusted range</li>
						<li>User gets a valid result (shorter than attempted)</li>
					</ul>

					<h5>Event Detail Properties</h5>
					<ul>
						<li><code>dateRange</code> - Range with <strong>adjusted/shortened</strong> end date</li>
						<li>All dates in returned range are enabled (no gaps)</li>
						<li>No <code>disabledDates</code> array (none in range)</li>
					</ul>

					<div class="alert alert-info mt-3">
						<strong>Key Difference from 'prevent':</strong> This mode <strong>accepts and adjusts</strong> the selection instead of rejecting it. Better UX when you want to help the user rather than block them.
					</div>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Helpful UX</strong>: Auto-correct instead of rejecting</li>
						<li><strong>Equipment rental</strong>: Must return before weekend (auto-shorten)</li>
						<li><strong>Office booking</strong>: Ends on last work day</li>
						<li><strong>Cutoff dates</strong>: Availability ends at specific date</li>
					</ul>

					<h5>User Experience</h5>
					<p>User sees range visually snap back to last enabled date. Selection succeeds with clear feedback that it was adjusted.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- 'split' Mode -->
		<ShowcaseSection
			titleText="RDH05 Mode: 'split'"
			subtitleText="Return multiple ranges split by disabled dates"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					id="split-demo"
					selection-mode="range"
					visible-months-count="2"
					disabled-weekdays="0,6"
					disabled-dates-handling="split"
					placeholder="Select range (splits at weekends)">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Try selecting Mon Jan 6 to Fri Jan 17 - splits into 2 week ranges</p>
				<div id="split-output" class="mt-3 p-3 bg-light rounded" style="display:none;">
					<h6>Event Detail:</h6>
					<pre class="mb-0"><code></code></pre>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="range"
  disabled-weekdays="0,6"
  disabled-dates-handling="split">
</web-daterangepicker>

<script>
picker.addEventListener('date-select', (e) => {
  const { dateRanges, dates, formattedValue } = e.detail;

  console.log('Split into', dateRanges.length, 'ranges');

  dateRanges.forEach((range, i) => {
    console.log(\`Range \${i+1}:\`, range.start, 'to', range.end);

    const nights = Math.floor(
      (range.end - range.start) / (1000*60*60*24)
    );
    console.log(\`  \${nights} nights\`);
  });

  console.log('Total enabled dates:', dates.length);
  console.log('Formatted:', formattedValue);
  // e.g., "2025-01-06 - 2025-01-10, 2025-01-13 - 2025-01-17"
});
</script>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  disabledWeekdays: [0, 6],
  disabledDatesHandling: 'split',
  onSelect: (dateRange) => {
    // dateRange is still provided, but use splitRangeByDisabled
    const ranges = picker.splitRangeByDisabled(
      dateRange.start,
      dateRange.end
    );

    // Process each sub-range separately
    ranges.forEach(r => {
      bookRecurringAppointment(r.start, r.end);
    });
  }
});

// Or access event detail arrays
picker.input.addEventListener('date-select', (e) => {
  const { dateRanges, dates } = e.detail;
  // dateRanges: array of DateRange objects
  // dates: flat array of all enabled dates
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Behavior</h5>
					<ul>
						<li>Range selection spans over disabled dates visually</li>
						<li>On select, range is split into multiple contiguous ranges</li>
						<li>Each sub-range contains only enabled dates</li>
						<li>Event includes <code>dateRanges[]</code> array and <code>dates[]</code> array</li>
					</ul>

					<h5>Event Detail Properties</h5>
					<ul>
						<li><code>dateRange</code> - Original full range (start to end)</li>
						<li><code>dateRanges</code> - Array of sub-ranges (each with start and end)</li>
						<li><code>dates</code> - Flat array of all enabled Date objects</li>
						<li><code>formattedValue</code> - Multiple ranges formatted (comma-separated)</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li>Recurring bookings: same resource for weekdays over multiple weeks</li>
						<li>Multi-period contracts: separate billing for each period</li>
						<li>Batch processing: process each contiguous period separately</li>
					</ul>

					<h5>Example Scenario</h5>
					<p>User selects Mon Jan 6 to Fri Jan 17 with weekends disabled:</p>
					<ul>
						<li>Range 1: Mon Jan 6 - Fri Jan 10 (5 days)</li>
						<li>Range 2: Mon Jan 13 - Fri Jan 17 (5 days)</li>
						<li>Total: 2 ranges, 10 enabled dates</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- 'individual' Mode -->
		<ShowcaseSection
			titleText="RDH06 Mode: 'individual'"
			subtitleText="Return flat array of individual enabled dates"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					id="individual-demo"
					selection-mode="range"
					visible-months-count="2"
					disabled-weekdays="0,6"
					disabled-dates-handling="individual"
					placeholder="Select range (returns individual dates)">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Try selecting Mon Jan 6 to Fri Jan 17 - returns 10 individual dates</p>
				<div id="individual-output" class="mt-3 p-3 bg-light rounded" style="display:none;">
					<h6>Event Detail:</h6>
					<pre class="mb-0"><code></code></pre>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="range"
  disabled-weekdays="0,6"
  disabled-dates-handling="individual">
</web-daterangepicker>

<script>
picker.addEventListener('date-select', (e) => {
  const { dates, formattedValue } = e.detail;

  console.log('Selected', dates.length, 'individual dates');

  // Process each date separately
  dates.forEach(date => {
    console.log(date.toISOString().split('T')[0]);
    scheduleTask(date);
  });

  // Formatted value is comma-separated list
  console.log('Formatted:', formattedValue);
  // e.g., "2025-01-06, 2025-01-07, 2025-01-08, ..."
});
</script>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  disabledWeekdays: [0, 6],
  disabledDatesHandling: 'individual',
  onSelect: (dateRange) => {
    // Get individual enabled dates
    const dates = picker.getEnabledDatesInRange(
      dateRange.start,
      dateRange.end
    );

    // Batch process
    dates.forEach(date => {
      sendNotification(date);
    });
  }
});

// Or via event detail
picker.input.addEventListener('date-select', (e) => {
  const { dates } = e.detail;
  // dates: flat array of Date objects (enabled only)
  // dateRange: null (no range object)
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Behavior</h5>
					<ul>
						<li>Range selection spans over disabled dates visually</li>
						<li>On select, only enabled dates are returned</li>
						<li>No range object or sub-ranges - just flat array</li>
						<li>Event includes <code>dates[]</code> array only</li>
					</ul>

					<h5>Event Detail Properties</h5>
					<ul>
						<li><code>dates</code> - Flat array of enabled Date objects</li>
						<li><code>formattedValue</code> - Comma-separated list of dates</li>
						<li><code>dateRange</code> - null (not provided)</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li>Batch operations: process each date independently</li>
						<li>Email scheduling: send on specific enabled dates</li>
						<li>Report generation: one report per enabled date</li>
						<li>Task assignment: assign task to each enabled day</li>
					</ul>

					<h5>Difference from 'split'</h5>
					<p><strong>'split'</strong> returns ranges: <code>[{'start: Mon, end: Fri'}, {'start: Mon, end: Fri'}]</code></p>
					<p><strong>'individual'</strong> returns dates: <code>[Mon, Tue, Wed, Thu, Fri, Mon, Tue, ...]</code></p>
					<p>Use 'individual' when you don't care about contiguity, just want the list of dates.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Visual Highlighting -->
		<ShowcaseSection
			titleText="RDH07 Visual Highlighting"
			subtitleText="Control disabled date highlighting in ranges"
			col1Title="highlight-disabled-in-range"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<div class="row">
					<div class="col-md-6">
						<h6>With Highlighting (default)</h6>
						<web-daterangepicker
							selection-mode="range"
							disabled-weekdays="0,6"
							disabled-dates-handling="allow"
							highlight-disabled-in-range="true"
							placeholder="Disabled dates highlighted">
						</web-daterangepicker>
					</div>
					<div class="col-md-6">
						<h6>Without Highlighting</h6>
						<web-daterangepicker
							selection-mode="range"
							disabled-weekdays="0,6"
							disabled-dates-handling="allow"
							highlight-disabled-in-range="false"
							placeholder="Disabled dates not highlighted">
						</web-daterangepicker>
					</div>
				</div>
				<p class="mt-3 small text-muted">Select same range in both - notice disabled dates within range</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- With highlighting (default) -->
<web-daterangepicker
  selection-mode="range"
  disabled-weekdays="0,6"
  highlight-disabled-in-range="true">
</web-daterangepicker>

<!-- Without highlighting -->
<web-daterangepicker
  selection-mode="range"
  disabled-weekdays="0,6"
  highlight-disabled-in-range="false">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

// With highlighting
const picker1 = new DateRangePicker(input1, {
  selectionMode: 'range',
  disabledWeekdays: [0, 6],
  highlightDisabledInRange: true // default
});

// Without highlighting
const picker2 = new DateRangePicker(input2, {
  selectionMode: 'range',
  disabledWeekdays: [0, 6],
  highlightDisabledInRange: false
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Attribute</h5>
					<p><code>highlight-disabled-in-range="true|false"</code></p>

					<h5>JavaScript Option</h5>
					<p><code>highlightDisabledInRange: boolean</code></p>

					<h5>Default</h5>
					<p><code>true</code></p>

					<h5>Behavior</h5>
					<ul>
						<li><strong>true</strong>: Disabled dates within range get special styling (grayed out)</li>
						<li><strong>false</strong>: Only enabled dates within range are visually highlighted</li>
					</ul>

					<h5>Works With</h5>
					<p>All disabled handling modes. Most useful with <code>'allow'</code> mode to show which dates are excluded from billing.</p>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>true</strong>: Hotel booking - clearly show non-billable closed days</li>
						<li><strong>false</strong>: Simplified view - only highlight valid dates</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Live Hover Preview (v1.13) -->
		<ShowcaseSection
			titleText="RDH08 Live Hover Preview (v1.13)"
			subtitleText="After the first click in range mode, hovering paints the would-be range — mode-aware"
			col1Title="Try it"
			col2Title="Per-mode behavior"
			col3Title="Theming"
		>

			{#snippet demoContent()}
				<div class="row g-3">
					<div class="col-md-6">
						<h6>allow</h6>
						<web-daterangepicker
							selection-mode="range"
							disabled-weekdays="0,6"
							disabled-dates-handling="allow"
							placeholder="Click a start, hover">
						</web-daterangepicker>
					</div>
					<div class="col-md-6">
						<h6>prevent</h6>
						<web-daterangepicker
							selection-mode="range"
							disabled-weekdays="0,6"
							disabled-dates-handling="prevent"
							placeholder="Hover across a weekend">
						</web-daterangepicker>
					</div>
					<div class="col-md-6">
						<h6>block</h6>
						<web-daterangepicker
							selection-mode="range"
							disabled-weekdays="0,6"
							disabled-dates-handling="block"
							placeholder="Watch the preview snap">
						</web-daterangepicker>
					</div>
					<div class="col-md-6">
						<h6>split</h6>
						<web-daterangepicker
							selection-mode="range"
							disabled-weekdays="0,6"
							disabled-dates-handling="split"
							placeholder="Disabled days stay bare">
						</web-daterangepicker>
					</div>
				</div>
				<p class="mt-3 small text-muted">
					Click any weekday to set a start date, then move your mouse to see the
					live preview. Move past the weekend to see how each mode treats
					Saturday/Sunday.
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose small">
					<dl>
						<dt><code>allow</code></dt>
						<dd>
							Full range painted from start to hovered day, including disabled
							cells. Disabled days keep their disabled overlay on top of the
							preview tint.
						</dd>

						<dt><code>prevent</code></dt>
						<dd>
							If hovering across a disabled cell would cause the click to be
							rejected, the entire preview is painted with the
							<em>invalid</em> variant (red tint). If the hover stays within a
							contiguous enabled span, the normal preview is used. Acts as a
							"this click will fail" signal.
						</dd>

						<dt><code>block</code></dt>
						<dd>
							Preview snaps backward to the last enabled day before the first
							disabled cell in the path. Days past the gap are not painted.
						</dd>

						<dt><code>split</code></dt>
						<dd>
							Enabled days in the range get painted; disabled days stay bare
							to visually show the gaps.
						</dd>

						<dt><code>individual</code></dt>
						<dd>
							Same paint policy as <code>allow</code> (preview is informational
							— commit produces a flat array of enabled dates).
						</dd>
					</dl>
					<p class="mb-0">
						The preview also <strong>auto-swaps direction</strong>: hovering
						<em>before</em> the committed start paints from the hovered day to
						the start, so you can grow the range either way.
					</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>CSS Hooks</h5>
					<ul>
						<li><code>--drp-day-hover-preview-bg-opacity</code> — default <code>0.18</code></li>
						<li><code>--drp-day-hover-preview-invalid-bg-opacity</code> — default <code>0.18</code></li>
					</ul>
					<p>
						Background colour is derived from
						<code>--drp-day-range-bg</code> (preview) and
						<code>--drp-day-invalid-range-bg</code> (invalid preview).
					</p>

					<h5>When the Preview Clears</h5>
					<ul>
						<li>You commit the range (second click)</li>
						<li>You move the mouse outside the calendar</li>
						<li>The calendar hides or is destroyed</li>
						<li>A drag-to-adjust gesture starts</li>
					</ul>

					<h5>Committed start day stays solid</h5>
					<p>
						The committed start day keeps its <code>--range-start</code> solid
						background and on-accent text — the preview class is explicitly
						<em>not</em> applied to it so the text stays legible (this was a
						v1.13 bugfix for low-contrast themes).
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Decision Guide -->
		<ShowcaseSection
			titleText="RDH09 Decision Guide"
			subtitleText="Choose the right mode for your use case"
			col1Title="Use Case"
			col2Title="Recommended Mode"
			col3Title="Why">

			{#snippet demoContent()}
				<div class="table-responsive">
					<table class="table">
						<thead>
							<tr>
								<th>Scenario</th>
								<th>Mode</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Hotel booking - bill for enabled nights only</td>
								<td><code>'allow'</code></td>
							</tr>
							<tr>
								<td>Equipment rental - must return before weekend</td>
								<td><code>'block'</code></td>
							</tr>
							<tr>
								<td>Appointment scheduling - cannot cross blackout dates</td>
								<td><code>'prevent'</code></td>
							</tr>
							<tr>
								<td>Recurring meeting - weekdays only for 2 weeks</td>
								<td><code>'split'</code></td>
							</tr>
							<tr>
								<td>Email blast - send on each enabled date</td>
								<td><code>'individual'</code></td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose">
					<h5>Question Flow</h5>
					<ol>
						<li><strong>Can user select across disabled dates?</strong>
							<ul>
								<li>No → <code>'prevent'</code> or <code>'block'</code></li>
								<li>Yes → Continue</li>
							</ul>
						</li>
						<li><strong>Do you need to know what was disabled?</strong>
							<ul>
								<li>Yes → <code>'allow'</code></li>
								<li>No → Continue</li>
							</ul>
						</li>
						<li><strong>Are disabled dates gaps or just filters?</strong>
							<ul>
								<li>Gaps creating separate periods → <code>'split'</code></li>
								<li>Just filtering to valid dates → <code>'individual'</code></li>
							</ul>
						</li>
					</ol>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Quick Reference</h5>
					<ul>
						<li><strong>'allow'</strong> - Need breakdown of enabled vs disabled</li>
						<li><strong>'prevent'</strong> - Strict: no crossing disabled dates</li>
						<li><strong>'block'</strong> - Auto-snap to valid range</li>
						<li><strong>'split'</strong> - Multiple separate valid periods</li>
						<li><strong>'individual'</strong> - Flat list of valid dates</li>
					</ul>

					<h5>Performance Note</h5>
					<p>All modes have similar performance. Choose based on business logic, not performance.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Troubleshooting -->
		<section class="mt-5">
			<h2>Troubleshooting</h2>
			<div class="accordion" id="troubleshooting">
				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#trouble1">
							Event doesn't fire when I select a range
						</button>
					</h2>
					<div id="trouble1" class="accordion-collapse collapse" data-bs-parent="#troubleshooting">
						<div class="accordion-body">
							<p>Check if you're using <code>disabled-dates-handling="prevent"</code>. This mode blocks event firing if the range crosses disabled dates.</p>
							<p>Enable <code>show-debug-info</code> to see console messages about prevented selections.</p>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#trouble2">
							How do I get the count of enabled dates in 'allow' mode?
						</button>
					</h2>
					<div id="trouble2" class="accordion-collapse collapse" data-bs-parent="#troubleshooting">
						<div class="accordion-body">
							<p>Use the helper functions in event detail:</p>
							<CodeBlock
								codeContent={`picker.addEventListener('date-select', (e) => {
  const count = e.detail.getEnabledDateCount();
  // or
  const count2 = e.detail.enabledDates.length;
});`}
								languageType="javascript"
							/>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#trouble3">
							What's the difference between 'split' and 'individual'?
						</button>
					</h2>
					<div id="trouble3" class="accordion-collapse collapse" data-bs-parent="#troubleshooting">
						<div class="accordion-body">
							<p><strong>'split'</strong> preserves range structure: <code>dateRanges: [{'start, end'}, {'start, end'}]</code></p>
							<p><strong>'individual'</strong> flattens to dates: <code>dates: [Date, Date, Date, ...]</code></p>
							<p>Use 'split' when periods matter (e.g., separate invoices). Use 'individual' for batch operations where order doesn't matter.</p>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#trouble4">
							Can I change the mode dynamically?
						</button>
					</h2>
					<div id="trouble4" class="accordion-collapse collapse" data-bs-parent="#troubleshooting">
						<div class="accordion-body">
							<p>Yes, update the attribute:</p>
							<pre><code>picker.setAttribute('disabled-dates-handling', 'block');</code></pre>
							<p>The picker will re-initialize automatically.</p>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#trouble5">
							Does this work in single mode?
						</button>
					</h2>
					<div id="trouble5" class="accordion-collapse collapse" data-bs-parent="#troubleshooting">
						<div class="accordion-body">
							<p>No, <code>disabled-dates-handling</code> only applies to range mode. In single mode, users simply cannot select disabled dates.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</DocLayout>
