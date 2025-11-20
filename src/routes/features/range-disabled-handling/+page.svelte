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
				<web-daterangepicker
					selection-mode="single"
					min-date="2024-11-01"
					max-date="2024-12-31"
					placeholder="Select a date">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Only dates from Nov 1 to Dec 31, 2024 are selectable</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="single"
  min-date="2024-11-01"
  max-date="2024-12-31"
  placeholder="Select a date">
</web-daterangepicker>`}
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
				<web-daterangepicker
					id="future-dates-picker"
					selection-mode="range"
					visible-months-count="2"
					placeholder="Select future date range">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Only today and future dates are selectable</p>
				<script>
					if (typeof window !== 'undefined') {
						setTimeout(() => {
							const picker = document.getElementById('future-dates-picker');
							if (picker) {
								// Set min-date to today dynamically
								const today = new Date();
								const todayStr = today.toISOString().split('T')[0];
								picker.setAttribute('min-date', todayStr);
							}
						}, 100);
					}
				</script>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component - Set dynamically -->
<web-daterangepicker
  id="future-picker"
  selection-mode="range"
  placeholder="Select future date range">
</web-daterangepicker>

<script>
  const picker = document.getElementById('future-picker');
  const today = new Date().toISOString().split('T')[0];
  picker.setAttribute('min-date', today);
</script>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

// Set minDate to today
const picker = new PureDatePicker(inputElement, {
  selectionMode: 'range',
  minDate: new Date(), // Today
  onSelect: (dateRange) => {
    console.log('Future range:', dateRange.start, 'to', dateRange.end);
  }
});

// Or with offset (7 days from now)
const picker2 = new PureDatePicker(input2, {
  minDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
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

					<h5>Implementation</h5>
					<p>Set <code>min-date</code> dynamically to today's date:</p>
					<ul>
						<li><strong>Web Component</strong>: Use JavaScript to set attribute with today's ISO date</li>
						<li><strong>JavaScript API</strong>: Pass <code>new Date()</code> to minDate option</li>
					</ul>

					<h5>Note</h5>
					<p>The component doesn't support a special "today" string value. Use dynamic JavaScript to set today's date when initializing the picker.</p>
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
const picker = document.querySelector('web-daterangepicker');
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
