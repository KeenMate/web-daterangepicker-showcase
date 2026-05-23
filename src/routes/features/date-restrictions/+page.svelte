<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker').then(() => {
			setTimeout(() => {
				// DR03: Set up disabled dates demo
				const disabledDatesDemo = document.getElementById('disabled-dates-demo') as any;
				if (disabledDatesDemo) {
					// Disable specific dates relative to current month
					const today = new Date();
					const thisYear = today.getFullYear();
					const thisMonth = today.getMonth();
					disabledDatesDemo.disabledDates = [
						new Date(thisYear, thisMonth, 5),   // 5th of this month
						new Date(thisYear, thisMonth, 15),  // 15th of this month
						new Date(thisYear, thisMonth, 25)   // 25th of this month
					];
				}

				// DR04: Set up callback demo
				const callbackDemo = document.getElementById('callback-demo') as any;
				if (callbackDemo) {
					callbackDemo.getDateMetadataCallback = (date: Date) => {
						const isWeekend = date.getDay() === 0 || date.getDay() === 6;
						const isThirdDay = date.getDate() % 3 === 0;
						return { isDisabled: isWeekend || isThirdDay };
					};
				}

				// DR05: Set up metadata demo (hotel availability simulation)
				const metadataDemo = document.getElementById('metadata-demo') as any;
				if (metadataDemo) {
					metadataDemo.getDateMetadataCallback = (date: Date) => {
						const dayOfMonth = date.getDate();

						// Simulate availability:
						// - Days divisible by 7 (7, 14, 21, 28) = fully booked
						// - Days divisible by 5 (5, 10, 15, 20, 25, 30) = limited (except if also div by 7)
						// - Others = available
						if (dayOfMonth % 7 === 0) {
							return {
								isDisabled: true,
								dayClass: 'fully-booked',
								dayTooltip: 'Fully booked'
							};
						}

						if (dayOfMonth % 5 === 0) {
							const roomsLeft = (dayOfMonth % 3) + 1; // 1-3 rooms
							return {
								dayClass: 'limited-availability',
								dayTooltip: `${roomsLeft} rooms left`,
								badgeText: roomsLeft.toString(),
								badgeClass: 'warning-badge'
							};
						}

						return {};
					};

					// Add custom styles for the demo
					metadataDemo.customStylesCallback = () => `
						.drp-date-picker__day-cell.fully-booked {
							background: #f8d7da !important;
							color: #721c24 !important;
						}
						.drp-date-picker__day-cell.limited-availability {
							background: #fff3cd !important;
							color: #856404 !important;
						}
						.drp-date-picker__badge-cell.warning-badge {
							background: #ffc107 !important;
							color: #000 !important;
							font-weight: bold;
						}
					`;
				}

				// DR06: Set up combined restrictions demo
				const combinedDemo = document.getElementById('combined-demo') as any;
				if (combinedDemo) {
					// Get current date info for relative dates
					const today = new Date();
					const thisYear = today.getFullYear();
					const thisMonth = today.getMonth();

					// Disable specific dates (1st, 11th, 21st of current month)
					combinedDemo.disabledDates = [
						new Date(thisYear, thisMonth, 1),
						new Date(thisYear, thisMonth, 11),
						new Date(thisYear, thisMonth, 21)
					];

					// Additional callback: disable every 9th day
					combinedDemo.getDateMetadataCallback = (date: Date) => {
						if (date.getDate() % 9 === 0) {
							return { isDisabled: true };
						}
						return {};
					};
				}
			}, 100);
		});
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
			titleText="DR01 Min and Max Dates"
			subtitleText="Set date range boundaries"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
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
			titleText="DR02 Disabled Weekdays"
			subtitleText="Disable specific days of the week"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
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
			titleText="DR03 Disabled Dates (Specific Dates)"
			subtitleText="Disable a list of specific dates"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="disabled-dates-demo"
					selection-mode="single"
					placeholder="Specific dates disabled"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">5th, 15th, and 25th of current month are disabled</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- v1.13+: declarative HTML attribute (comma-separated ISO dates) -->
<web-daterangepicker
  selection-mode="single"
  disabled-dates="2026-12-25, 2026-12-26, 2027-01-01"
  placeholder="Holidays disabled">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML attribute (v1.13+)"
				/>

				<CodeBlock
					codeContent={`<!-- Property setter — needed for Date objects or dynamic lists -->
<web-daterangepicker id="picker"></web-daterangepicker>

<script>
  const picker = document.getElementById('picker');
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();

  picker.disabledDates = [
    new Date(thisYear, thisMonth, 5),
    new Date(thisYear, thisMonth, 15),
    new Date(thisYear, thisMonth, 25)
  ];
</script>`}
					languageType="html"
					titleText="JS property (for Date[] or dynamic data)"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
  disabledDates: ['2026-12-25', '2026-12-26', '2027-01-01']
});

// Dynamic loading from API
fetch('/api/holidays')
  .then(res => res.json())
  .then(holidays => {
    picker.disabledDates = holidays;
  });`}
					languageType="javascript"
					titleText="JavaScript API"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>When to Use</h5>
					<p>Use <code>disabledDates</code> when you have a <strong>fixed list</strong> of specific dates to disable:</p>
					<ul>
						<li>Company holidays</li>
						<li>Maintenance dates</li>
						<li>Already booked dates</li>
						<li>Blackout dates</li>
					</ul>

					<h5>Two Paths (v1.13+)</h5>
					<ul>
						<li>
							<strong>HTML attribute</strong> —
							<code>disabled-dates="2026-12-25, 2026-12-26"</code>. Comma-separated
							ISO strings; whitespace tolerated; invalid entries silently dropped.
							Best for static, known-in-advance lists.
						</li>
						<li>
							<strong>JS property</strong> — <code>el.disabledDates = […]</code>.
							Required when you have <code>Date</code> objects or load the list
							dynamically. <strong>Property wins</strong> over the attribute when
							both are set.
						</li>
					</ul>

					<h5>Format</h5>
					<ul>
						<li>Array of ISO date strings: <code>['2026-01-01', '2026-12-25']</code></li>
						<li>Array of Date objects: <code>[new Date(2026, 0, 1), ...]</code></li>
					</ul>

					<h5>Performance</h5>
					<p>Efficient for moderate lists (100s of dates). For larger datasets or complex logic, use <code>getDateMetadataCallback</code> callback instead.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Custom Disable Logic (Callback) -->
		<ShowcaseSection
			titleText="DR04 Custom Disable Logic (Callback)"
			subtitleText="Use functions for complex or dynamic rules"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="callback-demo"
					selection-mode="single"
					placeholder="Weekdays only (via callback)"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Weekends + every 3rd day of month disabled via callback</p>

				<div class="mt-4 prose">
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

// Example 1: Disable booked date ranges (relative to current month)
const today = new Date();
const thisMonth = today.getMonth();
const thisYear = today.getFullYear();

const bookings = [
  // 10th-20th of current month
  { start: new Date(thisYear, thisMonth, 10), end: new Date(thisYear, thisMonth, 20) },
  // 1st-10th of next month
  { start: new Date(thisYear, thisMonth + 1, 1), end: new Date(thisYear, thisMonth + 1, 10) }
];

const picker = new DateRangePicker(inputElement, {
  getDateMetadataCallback: (date) => {
    const isBooked = bookings.some(booking =>
      date >= booking.start && date <= booking.end
    );
    return { isDisabled: isBooked };
  }
});

// Example 2: Disable past dates + weekends
const picker2 = new DateRangePicker(input2, {
  getDateMetadataCallback: (date) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const isPast = date < now;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    return { isDisabled: isPast || isWeekend };
  }
});

// Example 3: Complex business logic
const picker3 = new DateRangePicker(input3, {
  getDateMetadataCallback: (date) => {
    // Disable every 3rd day
    if (date.getDate() % 3 === 0) return { isDisabled: true };

    // Disable last week of each month
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysUntilMonthEnd = lastDay.getDate() - date.getDate();
    if (daysUntilMonthEnd < 7) return { isDisabled: true };

    return { isDisabled: false };
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
    return { isDisabled: isWeekend };
  };
</script>`}
					languageType="html"
					titleText="Web Component"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Function Signature</h5>
					<p><code>getDateMetadataCallback: (date: Date) => DateInfo | null</code></p>
					<ul>
						<li>Receives: Date object for the cell being rendered</li>
						<li>Returns: Object with <code>isDisabled: true</code> to disable, or <code>{'{}'}</code> / <code>null</code> to enable</li>
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
			titleText="DR05 Advanced: Date Metadata Callback"
			subtitleText="Disable dates AND provide styling via single callback"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="metadata-demo"
					selection-mode="single"
					placeholder="Hotel availability demo"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					<span class="badge bg-danger text-white me-1">7, 14, 21, 28</span> Fully booked (disabled)
					<br>
					<span class="badge bg-warning text-dark me-1">5, 10, 15...</span> Limited availability (with badge)
				</p>

				<div class="mt-4 prose">
					<h5>Why Use getDateMetadataCallback?</h5>
					<p>When you need to BOTH disable dates AND apply custom styling/tooltips in one callback.</p>

					<h5>Single Source of Truth</h5>
					<p>One callback provides all date metadata:</p>
					<ul>
						<li>Disabled state</li>
						<li>Custom CSS classes</li>
						<li>Tooltips</li>
						<li>Badges</li>
					</ul>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API - Hotel availability with dynamic logic
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
  getDateMetadataCallback: (date) => {
    const dayOfMonth = date.getDate();

    // Simulate availability based on day patterns:
    // Days divisible by 7 (7, 14, 21, 28) = fully booked
    if (dayOfMonth % 7 === 0) {
      return {
        isDisabled: true,
        dayClass: 'fully-booked',
        dayTooltip: 'Fully booked'
      };
    }

    // Days divisible by 5 (5, 10, 15, 20, 25, 30) = limited
    if (dayOfMonth % 5 === 0) {
      const roomsLeft = (dayOfMonth % 3) + 1;
      return {
        dayClass: 'limited-availability',
        dayTooltip: \`\${roomsLeft} rooms left\`,
        badgeText: roomsLeft.toString(),
        badgeClass: 'warning-badge'
      };
    }

    // All other dates = available (default)
    return {};
  }
});

// Add custom styles for availability states
picker.customStylesCallback = () => \`
  .drp-date-picker__day-cell.fully-booked {
    background: #f8d7da !important;
    color: #721c24 !important;
  }
  .drp-date-picker__day-cell.limited-availability {
    background: #fff3cd !important;
    color: #856404 !important;
  }
  .drp-date-picker__badge-cell.warning-badge {
    background: #ffc107 !important;
    color: #000 !important;
  }
\`;`}
					languageType="javascript"
					titleText="Hotel Availability Example"
				/>

				<CodeBlock
					codeContent={`// Dynamic booking states based on day patterns
const picker = new DateRangePicker(inputElement, {
  getDateMetadataCallback: (date) => {
    const day = date.getDate();

    // Simulate different booking states
    if (day % 10 === 0) {
      // Days 10, 20, 30 = booked
      return {
        isDisabled: true,
        badgeText: '✓',
        badgeClass: 'booked',
        dayTooltip: 'Already booked'
      };
    }

    if (day % 8 === 0) {
      // Days 8, 16, 24 = pending
      return {
        isDisabled: true,
        badgeText: '?',
        badgeClass: 'pending',
        dayTooltip: 'Pending confirmation'
      };
    }

    // Show price for available dates
    const price = 100 + (day * 3);
    return {
      badgeText: '$',
      badgeClass: 'price',
      dayTooltip: \`$\${price}/night\`
    };
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
			titleText="DR06 Combining Multiple Restrictions"
			subtitleText="How different restriction methods interact"
			col1Title="Live Demo"
			col2Title="Example"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="combined-demo"
					selection-mode="single"
					min-date={new Date().toISOString().split('T')[0]}
					disabled-weekdays="0,6"
					placeholder="Multiple restrictions combined"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					<strong>Combined restrictions:</strong><br>
					• <code>minDate</code>: Today onwards<br>
					• <code>disabledWeekdays</code>: Sat/Sun<br>
					• <code>disabledDates</code>: 1st, 11th, 21st<br>
					• <code>callback</code>: Every 9th day (9, 18, 27)
				</p>

				<div class="mt-4 prose">
					<h5>Restriction Evaluation</h5>
					<p>A date is <strong>disabled</strong> if ANY restriction applies:</p>
					<ol>
						<li>Date is before <code>minDate</code></li>
						<li>Date is after <code>maxDate</code></li>
						<li>Day of week is in <code>disabledWeekdays</code></li>
						<li>Date is in <code>disabledDates</code> array</li>
						<li><code>getDateMetadataCallback(date).isDisabled</code> is true</li>
					</ol>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API - Combining restrictions
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();

const picker = new DateRangePicker(inputElement, {
  // 1. Only future dates
  minDate: new Date(),

  // 2. Weekends disabled
  disabledWeekdays: [0, 6],

  // 3. Specific dates disabled (relative to current month)
  disabledDates: [
    new Date(thisYear, thisMonth, 1),
    new Date(thisYear, thisMonth, 11),
    new Date(thisYear, thisMonth, 21)
  ],

  // 4. Custom logic: disable every 9th day
  getDateMetadataCallback: (date) => {
    if (date.getDate() % 9 === 0) {
      return { isDisabled: true };
    }
    return {};
  }
});

// Result: A date is enabled ONLY if ALL conditions pass:
// - It's today or in the future (minDate)
// - It's a weekday (not Sat/Sun)
// - It's not the 1st, 11th, or 21st
// - It's not the 9th, 18th, or 27th`}
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
