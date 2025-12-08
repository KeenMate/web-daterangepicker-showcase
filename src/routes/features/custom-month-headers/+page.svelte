<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let isComponentLoaded = false;

	// Helper to format date as YYYY-MM-DD (local timezone, no UTC shift)
	function formatDateKey(date: Date): string {
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, '0');
		const d = String(date.getDate()).padStart(2, '0');
		return `${y}-${m}-${d}`;
	}

	// Generate special days dynamically relative to current date
	function generateSpecialDays(): Set<string> {
		const specialDays = new Set<string>();
		const today = new Date();
		const currentYear = today.getFullYear();
		const currentMonth = today.getMonth();

		// For current month and surrounding months (±3 to +6), add some "holidays"
		for (let offset = -3; offset <= 6; offset++) {
			const targetDate = new Date(currentYear, currentMonth + offset, 1);
			const year = targetDate.getFullYear();
			const month = targetDate.getMonth();

			// Add 15th of each month as a "company day off"
			specialDays.add(formatDateKey(new Date(year, month, 15)));

			// Add last Friday of each month as "monthly review day"
			const lastDay = new Date(year, month + 1, 0);
			while (lastDay.getDay() !== 5) lastDay.setDate(lastDay.getDate() - 1);
			specialDays.add(formatDateKey(lastDay));

			// Add first Monday of each month as "planning day"
			const firstDay = new Date(year, month, 1);
			while (firstDay.getDay() !== 1) firstDay.setDate(firstDay.getDate() + 1);
			specialDays.add(formatDateKey(firstDay));
		}
		return specialDays;
	}

	const specialDays = generateSpecialDays();

	// Calculate working days for a month
	function getWorkingDays(year: number, month: number): number {
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		let workingDays = 0;

		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month, day);
			const dayOfWeek = date.getDay();
			const dateStr = formatDateKey(date);

			// Mon-Fri (1-5) and not a special day
			if (dayOfWeek >= 1 && dayOfWeek <= 5 && !specialDays.has(dateStr)) {
				workingDays++;
			}
		}
		return workingDays;
	}

	onMount(async () => {
		await import('@keenmate/web-daterangepicker');
		isComponentLoaded = true;

		await new Promise(resolve => setTimeout(resolve, 100));

		initializeWorkingDaysDemo();
		initializeAsyncHeadersDemo();
	});

	function initializeWorkingDaysDemo() {
		const picker = document.getElementById('working-days-demo') as any;
		if (!picker) return;

		// Custom styles for working day and special day highlighting
		picker.customStylesCallback = () => `
			.drp-date-picker__day.working-day {
				background-color: rgba(34, 197, 94, 0.15);
			}
			.drp-date-picker__day.special-day {
				background-color: rgba(251, 191, 36, 0.25);
			}
		`;

		picker.getMonthHeaderCallback = ({ month, monthName, year }: any) => {
			const monthNum = month.getMonth();
			const workingDays = getWorkingDays(year, monthNum);
			const monthStr = String(monthNum + 1).padStart(2, '0');
			return `${monthStr}/${year} ${workingDays}WD`;
		};

		// Mark working days and special days with colors
		picker.beforeMonthChangedCallback = ({ firstVisibleDate, lastVisibleDate }: any) => {
			const metadata = new Map();
			const current = new Date(firstVisibleDate);
			const endDate = new Date(lastVisibleDate);

			while (current <= endDate) {
				const dateStr = formatDateKey(current);
				const dayOfWeek = current.getDay();
				const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
				const isSpecialDay = specialDays.has(dateStr);

				if (isWeekday && !isSpecialDay) {
					metadata.set(dateStr, { dayClass: 'working-day' });
				} else if (isSpecialDay) {
					metadata.set(dateStr, {
						dayClass: 'special-day',
						dayTooltip: 'Non-working day'
					});
				}
				current.setDate(current.getDate() + 1);
			}

			return { action: 'accept', metadata };
		};
	}

	function initializeAsyncHeadersDemo() {
		const picker = document.getElementById('async-headers-demo') as any;
		if (!picker) return;

		// Custom styles for room availability badges
		picker.customStylesCallback = () => `
			.drp-date-picker__badge-cell.rooms-high {
				background-color: rgba(34, 197, 94, 0.3);
				color: #166534;
			}
			.drp-date-picker__badge-cell.rooms-low {
				background-color: rgba(251, 191, 36, 0.3);
				color: #92400e;
			}
			.drp-date-picker__badge-cell.rooms-none {
				background-color: rgba(239, 68, 68, 0.2);
				color: #991b1b;
			}
		`;

		picker.beforeMonthChangedCallback = async ({ year, month, firstVisibleDate, lastVisibleDate }: any) => {
			const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 400));

			// Generate metadata and aggregate rooms per month
			const metadata = new Map();
			const monthHeaders = new Map();
			const roomsPerMonth: Record<string, number> = {};

			const current = new Date(firstVisibleDate);
			const endDate = new Date(lastVisibleDate);

			while (current <= endDate) {
				const dateStr = formatDateKey(current);
				const rooms = Math.floor(Math.random() * 20);
				const monthKey = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;

				// Aggregate rooms per month
				roomsPerMonth[monthKey] = (roomsPerMonth[monthKey] || 0) + rooms;

				metadata.set(dateStr, {
					badgeText: rooms > 0 ? `${rooms}` : '✕',
					badgeClass: rooms >= 10 ? 'rooms-high' : rooms > 0 ? 'rooms-low' : 'rooms-none',
					dayTooltip: `${rooms} rooms available`
				});

				current.setDate(current.getDate() + 1);
			}

			// Build month headers with aggregated data
			Object.entries(roomsPerMonth).forEach(([key, totalRooms]) => {
				const [y, m] = key.split('-');
				const monthName = monthNames[parseInt(m) - 1];
				monthHeaders.set(key, `${monthName} ${y} (${totalRooms} rooms)`);
			});

			return { action: 'accept', metadata, monthHeaders };
		};
	}
</script>

<DocLayout
	titleText="Custom Month Headers"
	descriptionText="Customize individual month header text with callbacks or async data"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				Customize individual month headers to display additional information like working day counts,
				room availability, or any other aggregated data. Use <code>getMonthHeaderCallback</code> for
				synchronous customization or return <code>monthHeaders</code> from <code>beforeMonthChangedCallback</code>
				for async data.
			</p>

			<div class="alert alert-info mt-3">
				<strong>Priority Order:</strong> When both are provided, <code>monthHeaders</code> from
				<code>beforeMonthChangedCallback</code> takes precedence over <code>getMonthHeaderCallback</code>.
				If neither provides a header for a month, the default format (<code>monthName year</code>) is used.
			</div>
		</section>

		<!-- Working Days Example -->
		<ShowcaseSection
			titleText="CMH01 Working Days Counter"
			subtitleText="Show working day count in month headers"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="working-days-demo"
					selection-mode="range"
					visible-months-count="2"
					month-layout="horizontal"
					positioning-mode="inline"
					placeholder="Select dates"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Headers show "MM/YYYY ##WD" format. Green = working days, amber = special non-working days.
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Helper to format date as YYYY-MM-DD
function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return \`\${y}-\${m}-\${d}\`;
}

// Generate special days (holidays, company days off)
function generateSpecialDays() {
  const specialDays = new Set();
  const today = new Date();

  for (let offset = -3; offset <= 6; offset++) {
    const targetDate = new Date(
      today.getFullYear(),
      today.getMonth() + offset,
      1
    );
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();

    // 15th of each month - company day off
    specialDays.add(formatDateKey(new Date(year, month, 15)));

    // Last Friday - monthly review
    const lastDay = new Date(year, month + 1, 0);
    while (lastDay.getDay() !== 5)
      lastDay.setDate(lastDay.getDate() - 1);
    specialDays.add(formatDateKey(lastDay));

    // First Monday - planning day
    const firstDay = new Date(year, month, 1);
    while (firstDay.getDay() !== 1)
      firstDay.setDate(firstDay.getDate() + 1);
    specialDays.add(formatDateKey(firstDay));
  }
  return specialDays;
}

const specialDays = generateSpecialDays();

// Calculate working days for a month
function getWorkingDays(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let workingDays = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const dateStr = formatDateKey(date);

    if (dayOfWeek >= 1 && dayOfWeek <= 5 &&
        !specialDays.has(dateStr)) {
      workingDays++;
    }
  }
  return workingDays;
}

// Set up the picker
const picker = document.getElementById('my-picker');

picker.getMonthHeaderCallback = ({ month, year }) => {
  const monthNum = month.getMonth();
  const workingDays = getWorkingDays(year, monthNum);
  const monthStr = String(monthNum + 1).padStart(2, '0');
  return \`\${monthStr}/\${year} \${workingDays}WD\`;
};`}
					languageType="javascript"
					titleText="getMonthHeaderCallback"
				/>

				<CodeBlock
					codeContent={`// Add visual highlighting for working/special days
picker.customStylesCallback = () => \`
  .drp-date-picker__day.working-day {
    background-color: rgba(34, 197, 94, 0.15);
  }
  .drp-date-picker__day.special-day {
    background-color: rgba(251, 191, 36, 0.25);
  }
\`;

picker.beforeMonthChangedCallback = ({ firstVisibleDate, lastVisibleDate }) => {
  const metadata = new Map();
  const current = new Date(firstVisibleDate);
  const endDate = new Date(lastVisibleDate);

  while (current <= endDate) {
    const dateStr = formatDateKey(current);
    const dayOfWeek = current.getDay();
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
    const isSpecialDay = specialDays.has(dateStr);

    if (isWeekday && !isSpecialDay) {
      metadata.set(dateStr, { dayClass: 'working-day' });
    } else if (isSpecialDay) {
      metadata.set(dateStr, {
        dayClass: 'special-day',
        dayTooltip: 'Non-working day'
      });
    }
    current.setDate(current.getDate() + 1);
  }

  return { action: 'accept', metadata };
};`}
					languageType="javascript"
					titleText="Visual Day Highlighting"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Callback Signature</h5>
					<CodeBlock
						codeContent={`getMonthHeaderCallback: (data: {
  month: Date;       // Date object for the month
  monthIndex: number; // Column index (0-based)
  monthName: string;  // Localized month name
  year: number;       // Year
}) => string;`}
						languageType="typescript"
						titleText=""
					/>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Working days</strong> - Show business days count</li>
						<li><strong>Payroll</strong> - Display pay periods</li>
						<li><strong>Project planning</strong> - Available work days</li>
						<li><strong>Holiday calendar</strong> - Days off count</li>
					</ul>

					<h5>Key Features</h5>
					<ul>
						<li>Called for each visible month column</li>
						<li>Receives full Date object and localized month name</li>
						<li>Return any string for the header</li>
						<li>Combine with <code>beforeMonthChangedCallback</code> for visual indicators</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Async Headers Example -->
		<ShowcaseSection
			titleText="CMH02 Headers from Async Data"
			subtitleText="Return monthHeaders from beforeMonthChangedCallback"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="async-headers-demo"
					selection-mode="range"
					visible-months-count="2"
					month-layout="horizontal"
					positioning-mode="inline"
					placeholder="Select dates"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Headers show total room availability per month, loaded with the metadata.
					Navigate between months to see the loading overlay.
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`const picker = document.getElementById('my-picker');

// Custom styles for room availability badges
picker.customStylesCallback = () => \`
  .drp-date-picker__badge-cell.rooms-high {
    background-color: rgba(34, 197, 94, 0.3);
    color: #166534;
  }
  .drp-date-picker__badge-cell.rooms-low {
    background-color: rgba(251, 191, 36, 0.3);
    color: #92400e;
  }
  .drp-date-picker__badge-cell.rooms-none {
    background-color: rgba(239, 68, 68, 0.2);
    color: #991b1b;
  }
\`;

picker.beforeMonthChangedCallback = async ({
  year, month, firstVisibleDate, lastVisibleDate
}) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Fetch data from your API
  const response = await fetch('/api/availability', {
    method: 'POST',
    body: JSON.stringify({
      start: firstVisibleDate.toISOString(),
      end: lastVisibleDate.toISOString()
    })
  });
  const data = await response.json();

  // Build metadata and aggregate per month
  const metadata = new Map();
  const monthHeaders = new Map();
  const roomsPerMonth = {};

  data.forEach(item => {
    const date = new Date(item.date);
    const monthKey = \`\${date.getFullYear()}-\${
      String(date.getMonth() + 1).padStart(2, '0')
    }\`;

    // Aggregate rooms per month
    roomsPerMonth[monthKey] =
      (roomsPerMonth[monthKey] || 0) + item.rooms;

    metadata.set(item.date, {
      badgeText: item.rooms > 0 ? \`\${item.rooms}\` : '✕',
      badgeClass: item.rooms >= 10 ? 'rooms-high' :
                  item.rooms > 0 ? 'rooms-low' : 'rooms-none',
      dayTooltip: \`\${item.rooms} rooms available\`
    });
  });

  // Build month headers from aggregated data
  Object.entries(roomsPerMonth).forEach(([key, totalRooms]) => {
    const [y, m] = key.split('-');
    const monthName = monthNames[parseInt(m) - 1];
    monthHeaders.set(key, \`\${monthName} \${y} (\${totalRooms} rooms)\`);
  });

  // Return both metadata and monthHeaders
  return { action: 'accept', metadata, monthHeaders };
};`}
					languageType="javascript"
					titleText="beforeMonthChangedCallback with monthHeaders"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>monthHeaders Map</h5>
					<p>The <code>monthHeaders</code> property in the return object is a <code>Map&lt;string, string&gt;</code>:</p>
					<ul>
						<li><strong>Key:</strong> <code>"YYYY-MM"</code> format (e.g., "2025-12")</li>
						<li><strong>Value:</strong> Header text to display</li>
					</ul>

					<h5>When to Use</h5>
					<p>Use <code>monthHeaders</code> from <code>beforeMonthChangedCallback</code> when:</p>
					<ul>
						<li>Header data comes from async API calls</li>
						<li>Headers depend on the same data as day metadata</li>
						<li>You want to aggregate day-level data for headers</li>
					</ul>

					<h5>Priority</h5>
					<div class="alert alert-warning">
						<code>monthHeaders</code> takes priority over <code>getMonthHeaderCallback</code>.
						If a month key exists in monthHeaders, the callback is not called for that month.
					</div>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Hotel booking</strong> - Total rooms available per month</li>
						<li><strong>Event calendars</strong> - Event count per month</li>
						<li><strong>Inventory</strong> - Stock levels summary</li>
						<li><strong>Analytics</strong> - Aggregated metrics</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- API Reference -->
		<section class="mb-5">
			<h2 class="mb-4">API Reference</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>getMonthHeaderCallback</code></td>
							<td><code>(data) => string</code></td>
							<td>Synchronous callback to customize month header text. Called for each visible month.</td>
						</tr>
						<tr>
							<td><code>monthHeaders</code><br><small>(in return value)</small></td>
							<td><code>Map&lt;string, string&gt;</code></td>
							<td>Optional map of month headers returned from <code>beforeMonthChangedCallback</code>. Key format: "YYYY-MM".</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h4 class="mt-4">getMonthHeaderCallback Data Object</h4>
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>month</code></td>
							<td><code>Date</code></td>
							<td>Date object set to the first day of the month</td>
						</tr>
						<tr>
							<td><code>monthIndex</code></td>
							<td><code>number</code></td>
							<td>0-based index of the month column (for multi-month display)</td>
						</tr>
						<tr>
							<td><code>monthName</code></td>
							<td><code>string</code></td>
							<td>Localized month name (e.g., "December")</td>
						</tr>
						<tr>
							<td><code>year</code></td>
							<td><code>number</code></td>
							<td>Full year (e.g., 2025)</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</DocLayout>

<style>
	.prose ul {
		padding-left: 1.5rem;
	}

	.prose h5 {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		font-size: 1.1rem;
		font-weight: 600;
	}
</style>
