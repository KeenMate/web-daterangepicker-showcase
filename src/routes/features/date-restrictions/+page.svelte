<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Date Restrictions"
	descriptionText="Control which dates can be selected using min/max dates, disabled weekdays, specific dates, or custom logic"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				Restrict date selection using min/max dates, disable specific weekdays, blacklist specific
				dates, or use custom logic for complex business rules.
			</p>
			<p>
				Multiple restriction methods can be combined. The date picker evaluates all restrictions
				together to determine if a date is selectable.
			</p>
		</section>

		<!-- Min/Max Dates -->
		<ShowcaseSection
			titleText="Min and Max Dates"
			subtitleText="Set date range boundaries"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					min-date="2025-01-01"
					max-date="2025-12-31"
					placeholder="Select date in 2025"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Only dates in 2025 are selectable</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="single"
  min-date="2025-01-01"
  max-date="2025-12-31"
  placeholder="Select date in 2025">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
  selectionMode: 'single',
  minDate: '2025-01-01',  // String or Date object
  maxDate: '2025-12-31',
  onSelect: (date) => {
    console.log('Selected:', date);
  }
});

// Or use Date objects
const picker2 = new DateRangePicker(input2, {
  minDate: new Date(2025, 0, 1),   // Jan 1, 2025
  maxDate: new Date(2025, 11, 31)  // Dec 31, 2025
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Future only</strong> - Bookings that can't be in the past</li>
						<li><strong>Date range limits</strong> - Restrict to specific year or quarter</li>
						<li><strong>Business constraints</strong> - Only allow dates within fiscal year</li>
						<li><strong>Age verification</strong> - Max date 18 years ago</li>
					</ul>

					<h5>Format</h5>
					<p>Dates can be specified as:</p>
					<ul>
						<li>String: <code>"YYYY-MM-DD"</code> ISO format</li>
						<li>Date object: <code>new Date(2025, 0, 1)</code></li>
					</ul>

					<h5>Behavior</h5>
					<p>
						Dates outside the min/max range are grayed out and cannot be selected. Navigation
						buttons are disabled when reaching boundaries.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Disabled Weekdays -->
		<ShowcaseSection
			titleText="Disabled Weekdays"
			subtitleText="Disable specific days of the week"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					disabled-weekdays="0,6"
					placeholder="Weekdays only"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Weekends (Saturday and Sunday) are disabled</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component (comma-separated string) -->
<web-daterangepicker
  selection-mode="single"
  disabled-weekdays="0,6"
  placeholder="Weekdays only">
</web-daterangepicker>

<!-- Disable Monday and Tuesday -->
<web-daterangepicker
  disabled-weekdays="1,2">
</web-daterangepicker>

<!-- Disable only Sunday -->
<web-daterangepicker
  disabled-weekdays="0">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API (array of numbers)
import { DateRangePicker } from '@keenmate/web-daterangepicker';

// Weekends disabled
const picker = new DateRangePicker(inputElement, {
  selectionMode: 'single',
  disabledWeekdays: [0, 6],  // 0=Sunday, 6=Saturday
  onSelect: (date) => {
    console.log('Weekday selected:', date);
  }
});

// Only weekends enabled (weekdays disabled)
const picker2 = new DateRangePicker(input2, {
  disabledWeekdays: [1, 2, 3, 4, 5]  // Mon-Fri disabled
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Weekday Numbers</h5>
					<ul>
						<li><code>0</code> - Sunday</li>
						<li><code>1</code> - Monday</li>
						<li><code>2</code> - Tuesday</li>
						<li><code>3</code> - Wednesday</li>
						<li><code>4</code> - Thursday</li>
						<li><code>5</code> - Friday</li>
						<li><code>6</code> - Saturday</li>
					</ul>

					<h5>Common Patterns</h5>
					<ul>
						<li><code>0,6</code> - Weekends disabled (weekdays only)</li>
						<li><code>1,2,3,4,5</code> - Weekdays disabled (weekends only)</li>
						<li><code>0</code> - Sundays disabled</li>
						<li><code>6</code> - Saturdays disabled</li>
					</ul>

					<h5>Note</h5>
					<p>Web component attribute uses comma-separated string. JavaScript API uses array of numbers.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Disabled Dates Array -->
		<ShowcaseSection
			titleText="Disabled Dates (Specific Dates)"
			subtitleText="Disable a list of specific dates"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="disabled-dates-demo"
					selection-mode="single"
					placeholder="Holidays disabled"
				>
				</web-daterangepicker>
				<script>
					if (typeof window !== 'undefined') {
						setTimeout(() => {
							const picker = document.getElementById('disabled-dates-demo');
							if (picker) {
								// Set disabled dates via JavaScript
								picker.disabledDates = [
									'2025-01-01',  // New Year
									'2025-12-25',  // Christmas
									'2025-12-26'   // Boxing Day
								];
							}
						}, 100);
					}
				</script>
				<p class="mt-3 small text-muted">New Year and Christmas holidays are disabled</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Set via JavaScript (no attribute for arrays) -->
<web-daterangepicker id="picker"></web-daterangepicker>

<script>
  const picker = document.getElementById('picker');

  // Array of ISO date strings
  picker.disabledDates = [
    '2025-01-01',  // New Year
    '2025-07-04',  // Independence Day
    '2025-12-25'   // Christmas
  ];

  // Or array of Date objects
  picker.disabledDates = [
    new Date(2025, 0, 1),   // New Year
    new Date(2025, 6, 4),   // Independence Day
    new Date(2025, 11, 25)  // Christmas
  ];
</script>`}
					languageType="html"
					titleText="HTML + JavaScript"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

// String dates
const picker = new DateRangePicker(inputElement, {
  disabledDates: [
    '2025-01-01',
    '2025-12-25',
    '2025-12-26'
  ]
});

// Or Date objects
const holidays = [
  new Date(2025, 0, 1),
  new Date(2025, 11, 25),
  new Date(2025, 11, 26)
];

const picker2 = new DateRangePicker(input2, {
  disabledDates: holidays
});

// Dynamic loading from API
fetch('/api/holidays')
  .then(res => res.json())
  .then(holidays => {
    picker.disabledDates = holidays;
  });`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>When to Use</h5>
					<p>Use <code>disabledDates</code> array when you have a <strong>fixed list</strong> of specific dates to disable:</p>
					<ul>
						<li>Company holidays</li>
						<li>Maintenance dates</li>
						<li>Already booked dates</li>
						<li>Blackout dates</li>
					</ul>

					<h5>Format</h5>
					<ul>
						<li>Array of ISO date strings: <code>['2025-01-01', '2025-12-25']</code></li>
						<li>Array of Date objects: <code>[new Date(2025, 0, 1), ...]</code></li>
					</ul>

					<h5>No Attribute Support</h5>
					<p>Due to limitations of web component attributes (can't pass arrays), you must set <code>disabledDates</code> via JavaScript property.</p>

					<h5>Performance</h5>
					<p>Efficient for moderate lists (100s of dates). For larger datasets or complex logic, use <code>getDateMetadataCallback</code> callback instead.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Custom Disable Logic (Callback) -->
		<ShowcaseSection
			titleText="Custom Disable Logic (Callback)"
			subtitleText="Use functions for complex or dynamic rules"
			demoColumnTitle="When to Use"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<div class="prose">
					<h5>Use Callback When:</h5>
					<ul>
						<li><strong>Complex logic</strong> - Multiple conditions, date ranges, calculations</li>
						<li><strong>Dynamic data</strong> - Rules change based on other selections</li>
						<li><strong>Large datasets</strong> - Thousands of disabled dates (compute on-the-fly)</li>
						<li><strong>Date ranges</strong> - Disable ranges instead of individual dates</li>
					</ul>

					<h5>Use Array When:</h5>
					<ul>
						<li><strong>Simple list</strong> - Fixed set of specific dates</li>
						<li><strong>Small dataset</strong> - Hundreds of dates or fewer</li>
						<li><strong>Static data</strong> - Holidays that don't change</li>
					</ul>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API - Pass during initialization
import { DateRangePicker } from '@keenmate/web-daterangepicker';

// Example 1: Disable booked date ranges
const bookings = [
  { start: new Date(2025, 5, 10), end: new Date(2025, 5, 20) },
  { start: new Date(2025, 6, 1), end: new Date(2025, 6, 10) }
];

const picker = new DateRangePicker(inputElement, {
  getDateMetadataCallback: (date) => {
    return bookings.some(booking =>
      date >= booking.start && date <= booking.end
    );
  }
});

// Example 2: Disable past dates + weekends
const picker2 = new DateRangePicker(input2, {
  getDateMetadataCallback: (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isPast = date < today;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    return isPast || isWeekend;
  }
});

// Example 3: Complex business logic
const picker3 = new DateRangePicker(input3, {
  getDateMetadataCallback: (date) => {
    // Disable every 3rd day
    if (date.getDate() % 3 === 0) return true;

    // Disable last week of each month
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysUntilMonthEnd = lastDay.getDate() - date.getDate();
    if (daysUntilMonthEnd < 7) return true;

    return false;
  }
});`}
					languageType="javascript"
					titleText="JavaScript API"
				/>

				<CodeBlock
					codeContent={`<!-- Web Component - Set via property -->
<web-daterangepicker id="picker"></web-daterangepicker>

<script>
  const picker = document.getElementById('picker');

  // Set getDateMetadataCallback property
  picker.getDateMetadataCallback = (date) => {
    // Your custom logic here
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    return isWeekend;
  };
</script>`}
					languageType="html"
					titleText="Web Component"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Function Signature</h5>
					<p><code>getDateMetadataCallback: (date: Date) => boolean</code></p>
					<ul>
						<li>Receives: Date object for the cell being rendered</li>
						<li>Returns: <code>true</code> to disable, <code>false</code> to enable</li>
					</ul>

					<h5>Usage Patterns</h5>
					<p><strong>JavaScript API:</strong> Pass <code>getDateMetadataCallback</code> in options during <code>new DateRangePicker()</code></p>
					<p><strong>Web Component:</strong> Can also be set as a property on the element (<code>picker.getDateMetadataCallback = ...</code>)</p>

					<h5>Performance</h5>
					<p>
						Called once per visible date cell (~35-42 times per month view). Keep logic efficient.
						Avoid heavy computations or async operations.
					</p>

					<h5>Combining with Other Restrictions</h5>
					<p>The callback is evaluated <strong>in addition to</strong> min/max dates, disabled weekdays, and disabled dates array. A date is disabled if ANY restriction applies.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- getDateMetadata -->
		<ShowcaseSection
			titleText="Advanced: Date Metadata Callback"
			subtitleText="Disable dates AND provide styling via single callback"
			demoColumnTitle="Use Case"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<div class="prose">
					<h5>Why Use getDateMetadata?</h5>
					<p>When you need to BOTH disable dates AND apply custom styling/tooltips, use <code>getDateMetadata</code> instead of separate <code>getDateMetadataCallback</code> and <code>specialDates</code>.</p>

					<h5>Single Source of Truth</h5>
					<p>One callback provides all date metadata:</p>
					<ul>
						<li>Disabled state</li>
						<li>Custom CSS classes</li>
						<li>Tooltips</li>
						<li>Badges</li>
					</ul>

					<h5>Example Scenario</h5>
					<p><strong>Hotel booking system:</strong></p>
					<ul>
						<li>Fully booked dates → Disabled + red styling + "Fully booked" tooltip</li>
						<li>Limited availability → Enabled + orange styling + "2 rooms left" tooltip</li>
						<li>Available dates → Enabled + default styling</li>
					</ul>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

// Hotel availability data
const availability = {
  '2025-06-15': { rooms: 0, status: 'full' },
  '2025-06-16': { rooms: 2, status: 'limited' },
  '2025-06-17': { rooms: 10, status: 'available' }
};

const picker = new DateRangePicker(inputElement, {
  getDateMetadata: (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const avail = availability[dateStr];

    if (!avail) {
      // No data - default available
      return {};
    }

    if (avail.status === 'full') {
      // Fully booked - disable with red styling
      return {
        isDisabled: true,
        dayClass: 'fully-booked',
        dayTooltip: 'Fully booked'
      };
    }

    if (avail.status === 'limited') {
      // Limited availability - orange styling
      return {
        dayClass: 'limited-availability',
        dayTooltip: \`\${avail.rooms} rooms left\`,
        badgeText: avail.rooms.toString(),
        badgeClass: 'warning-badge'
      };
    }

    // Available
    return {
      dayClass: 'available'
    };
  }
});`}
					languageType="javascript"
					titleText="Hotel Booking Example"
				/>

				<CodeBlock
					codeContent={`// Booking system with multiple states
const bookingData = fetchBookingData(); // From API

const picker = new DateRangePicker(inputElement, {
  getDateMetadata: (date) => {
    const booking = bookingData.find(b =>
      isSameDay(b.date, date)
    );

    if (!booking) return {}; // No booking

    // Return metadata based on booking state
    switch (booking.state) {
      case 'booked':
        return {
          isDisabled: true,
          badgeText: '✓',
          badgeClass: 'booked',
          badgeTooltip: \`Booked by \${booking.customer}\`
        };

      case 'pending':
        return {
          isDisabled: true,
          badgeText: '?',
          badgeClass: 'pending',
          badgeTooltip: 'Pending confirmation'
        };

      case 'available':
        return {
          badgeText: '$',
          badgeClass: 'price',
          badgeTooltip: \`$\${booking.price}\`
        };

      default:
        return {};
    }
  }
});`}
					languageType="javascript"
					titleText="Multi-State Booking"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Return Type: DateInfo</h5>
					<p>The callback returns a DateInfo object with these optional properties:</p>
					<ul>
						<li><code>isDisabled</code>: boolean - Disable this date</li>
						<li><code>badgeText</code>: string - Text in badge row</li>
						<li><code>badgeClass</code>: string - CSS class for badge</li>
						<li><code>badgeTooltip</code>: string - Tooltip on badge hover</li>
						<li><code>dayClass</code>: string - CSS class for day cell</li>
						<li><code>dayTooltip</code>: string - Tooltip on day hover</li>
					</ul>

					<h5>Advantages vs Separate Options</h5>
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Approach</th>
								<th>Pros</th>
								<th>Cons</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>getDateMetadataCallback</code></td>
								<td>Simple, focused</td>
								<td>Separate from styling</td>
							</tr>
							<tr>
								<td><code>specialDates</code></td>
								<td>Static data</td>
								<td>Not dynamic</td>
							</tr>
							<tr>
								<td><code>getDateMetadata</code></td>
								<td>Single source, dynamic</td>
								<td>Slightly more complex</td>
							</tr>
						</tbody>
					</table>

					<h5>Performance</h5>
					<p>Called once per visible date cell, just like <code>getDateMetadataCallback</code>. Keep logic efficient.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Combining Restrictions -->
		<ShowcaseSection
			titleText="Combining Multiple Restrictions"
			subtitleText="How different restriction methods interact"
			demoColumnTitle="Evaluation Order"
			controlsColumnTitle="Example"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<div class="prose">
					<h5>Restriction Evaluation</h5>
					<p>A date is <strong>disabled</strong> if ANY of these conditions are true:</p>
					<ol>
						<li>Date is before <code>minDate</code></li>
						<li>Date is after <code>maxDate</code></li>
						<li>Day of week is in <code>disabledWeekdays</code></li>
						<li>Date is in <code>disabledDates</code> array</li>
						<li><code>getDateMetadataCallback(date)</code> returns true</li>
						<li><code>getDateMetadata(date).isDisabled</code> is true</li>
					</ol>

					<h5>All Restrictions Are Additive</h5>
					<p>If you set multiple restrictions, they ALL apply. You cannot "override" one with another.</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API - Combining restrictions
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
  // 1. Only future dates
  minDate: new Date(),

  // 2. Weekends disabled
  disabledWeekdays: [0, 6],

  // 3. Company holidays
  disabledDates: [
    '2025-01-01',
    '2025-12-25'
  ],

  // 4. Custom logic: Already booked dates
  getDateMetadataCallback: (date) => {
    const bookedDates = fetchBookedDates(); // From API
    return bookedDates.some(booked =>
      date.toDateString() === booked.toDateString()
    );
  }
});

// Result: A date is enabled ONLY if:
// - It's today or in the future (minDate)
// - It's a weekday (not in disabledWeekdays)
// - It's not a company holiday (not in disabledDates)
// - It's not already booked (getDateMetadataCallback returns false)`}
					languageType="javascript"
					titleText="All Restrictions Combined"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Strategy</h5>
					<ul>
						<li>Use <code>minDate</code>/<code>maxDate</code> for hard boundaries</li>
						<li>Use <code>disabledWeekdays</code> for day-of-week patterns</li>
						<li>Use <code>disabledDates</code> for fixed lists (holidays, blackout dates)</li>
						<li>Use <code>getDateMetadataCallback</code> for complex or dynamic logic</li>
						<li>Use <code>getDateMetadata</code> when you need styling + disabling</li>
					</ul>

					<h5>Performance Consideration</h5>
					<p>Evaluation happens in order listed above (min/max checked first). The picker short-circuits as soon as ANY condition is true.</p>

					<h5>Debugging</h5>
					<p>Enable debug logging to see why dates are disabled:</p>
					<pre><code>window.components['web-daterangepicker'].logging.enableLogging();</code></pre>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Quick Reference -->
		<section class="mt-5">
			<h2>Quick Reference</h2>
			<div class="row">
				<div class="col-md-6">
					<h5>Restriction Methods</h5>
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Method</th>
								<th>Best For</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>minDate</code>/<code>maxDate</code></td>
								<td>Date range boundaries</td>
							</tr>
							<tr>
								<td><code>disabledWeekdays</code></td>
								<td>Weekly patterns</td>
							</tr>
							<tr>
								<td><code>disabledDates</code></td>
								<td>Fixed list of dates</td>
							</tr>
							<tr>
								<td><code>getDateMetadataCallback</code></td>
								<td>Complex logic</td>
							</tr>
							<tr>
								<td><code>getDateMetadata</code></td>
								<td>Disable + styling</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="col-md-6">
					<h5>Common Patterns</h5>
					<ul>
						<li><strong>Future only</strong> - <code>minDate: new Date()</code></li>
						<li><strong>Weekdays only</strong> - <code>disabledWeekdays: [0, 6]</code></li>
						<li><strong>This year</strong> - <code>minDate: '2025-01-01', maxDate: '2025-12-31'</code></li>
						<li><strong>Holidays</strong> - <code>disabledDates: [...]</code></li>
						<li><strong>Bookings</strong> - <code>getDateMetadataCallback: (date) => {'{...}'}</code></li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</DocLayout>
