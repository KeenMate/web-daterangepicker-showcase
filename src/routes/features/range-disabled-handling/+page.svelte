<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Range Disabled Handling"
	descriptionText="Control date availability with min/max dates and custom disabled date rules"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				Restrict selectable dates using minimum/maximum dates or custom disabled date functions.
				Perfect for booking systems, deadline management, and business rule enforcement.
			</p>
		</section>

		<!-- Min/Max Dates -->
		<ShowcaseSection
			titleText="Minimum and Maximum Dates"
			subtitleText="Set selectable date range boundaries"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<date-range-picker
					selection-mode="single"
					min-date="2024-11-01"
					max-date="2024-12-31"
					placeholder="Select a date">
				</date-range-picker>
				<p class="mt-3 small text-muted">Only dates from Nov 1 to Dec 31, 2024 are selectable</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="single"
  min-date="2024-11-01"
  max-date="2024-12-31"
  placeholder="Select a date">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  minDate: new Date('2024-11-01'),
  maxDate: new Date('2024-12-31'),
  onSelect: (date) => {
    console.log('Selected:', date);
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Age verification</strong> - Max date 18 years ago</li>
						<li><strong>Booking windows</strong> - Only allow future dates</li>
						<li><strong>Historical data</strong> - Limit to past dates only</li>
						<li><strong>Event registration</strong> - Deadline enforcement</li>
					</ul>

					<h5>Behavior</h5>
					<p>Dates outside the min/max range are visually disabled and cannot be selected.</p>

					<h5>Key Options</h5>
					<ul>
						<li><code>min-date</code> - Earliest selectable date (ISO format or Date object)</li>
						<li><code>max-date</code> - Latest selectable date (ISO format or Date object)</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Future Dates Only -->
		<ShowcaseSection
			titleText="Future Dates Only"
			subtitleText="Disable all past dates"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<date-range-picker
					selection-mode="range"
					min-date="today"
					visible-months-count="2"
					placeholder="Select future date range">
				</date-range-picker>
				<p class="mt-3 small text-muted">Only today and future dates are selectable</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="range"
  min-date="today"
  placeholder="Select future date range">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  selectionMode: 'range',
  minDate: new Date(), // Today
  onSelect: (startDate, endDate) => {
    console.log('Future range:', startDate, 'to', endDate);
  }
});

// Or with offset
const picker2 = new PureDatePicker(input2, {
  minDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Reservations</strong> - Book future dates only</li>
						<li><strong>Appointments</strong> - Schedule upcoming meetings</li>
						<li><strong>Shipping dates</strong> - Select delivery dates</li>
					</ul>

					<h5>Special Value</h5>
					<ul>
						<li><code>min-date="today"</code> - Automatically sets to current date</li>
					</ul>

					<h5>Dynamic Updates</h5>
					<p>The "today" value updates automatically each day, ensuring past dates remain disabled.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Custom Disabled Dates -->
		<ShowcaseSection
			titleText="Custom Disabled Dates"
			subtitleText="Disable specific dates using custom logic"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<CodeBlock
					codeContent={`// Disable weekends
const picker = document.querySelector('date-range-picker');
picker.disabledDates = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

// Disable specific dates
const blackoutDates = [
  new Date('2024-12-25'),
  new Date('2024-12-26'),
  new Date('2025-01-01')
];
picker.disabledDates = (date) => {
  return blackoutDates.some(d => 
    d.toDateString() === date.toDateString()
  );
};`}
					languageType="javascript"
					titleText="Web Component Setup"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

// Disable weekends
const picker1 = new PureDatePicker(input1, {
  disabledDates: (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  }
});

// Disable specific dates
const picker2 = new PureDatePicker(input2, {
  disabledDates: (date) => {
    const holidays = ['2024-12-25', '2025-01-01'];
    const dateStr = date.toISOString().split('T')[0];
    return holidays.includes(dateStr);
  }
});

// Disable every 3rd day
const picker3 = new PureDatePicker(input3, {
  disabledDates: (date) => date.getDate() % 3 === 0
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Function Signature</h5>
					<p><code>disabledDates: (date: Date) => boolean</code></p>
					<p>Return <code>true</code> to disable the date, <code>false</code> to enable it.</p>

					<h5>Common Patterns</h5>
					<ul>
						<li><strong>Weekends</strong> - <code>day === 0 || day === 6</code></li>
						<li><strong>Weekdays</strong> - <code>day &gt;= 1 &amp;&amp; day &lt;= 5</code></li>
						<li><strong>Specific dates</strong> - Array lookup</li>
						<li><strong>Date ranges</strong> - Combine with min/max logic</li>
					</ul>

					<h5>Performance</h5>
					<p>The function is called for each visible date cell. Keep logic efficient for best performance.</p>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
