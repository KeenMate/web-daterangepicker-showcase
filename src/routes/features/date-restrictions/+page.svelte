<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Date Restrictions"
	descriptionText="Control which dates can be selected using min/max dates, disabled weekdays, and custom logic"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				Restrict date selection using min/max dates, disable specific weekdays, blacklist specific
				dates, or use custom logic for complex business rules.
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
const picker = new PureDatePicker(inputElement, {
  selectionMode: 'single',
  minDate: '2025-01-01',  // Or new Date(2025, 0, 1)
  maxDate: '2025-12-31',  // Or new Date(2025, 11, 31)
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
						<li><strong>Future only</strong> - Bookings that can't be in the past</li>
						<li><strong>Date range limits</strong> - Restrict to specific year or quarter</li>
						<li><strong>Business constraints</strong> - Only allow dates within fiscal year</li>
					</ul>

					<h5>Format</h5>
					<p>Dates can be specified as:</p>
					<ul>
						<li>String: <code>"YYYY-MM-DD"</code> format</li>
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
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API (array of numbers)
const picker = new PureDatePicker(inputElement, {
  selectionMode: 'single',
  disabledWeekdays: [0, 6],  // 0=Sunday, 6=Saturday
  onSelect: (date) => {
    console.log('Weekday selected:', date);
  }
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
						<li><code>0,6</code> - Weekends only</li>
						<li><code>1,2,3,4,5</code> - Weekends disabled (weekdays only)</li>
						<li><code>0</code> - Sundays disabled</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Custom Disable Logic -->
		<ShowcaseSection
			titleText="Custom Disable Logic"
			subtitleText="Use custom functions for complex rules"
			demoColumnTitle="Concept"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<CodeBlock
					codeContent={`// Example: Disable booked dates
const bookedDates = [
  new Date(2025, 11, 24),
  new Date(2025, 11, 25),
  new Date(2025, 11, 26)
];

picker.isDateDisabled = (date) => {
  return bookedDates.some(booked =>
    date.toDateString() === booked.toDateString()
  );
};`}
					languageType="javascript"
					titleText="Disable Specific Dates"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Example: Cottage booking with blackout periods
const bookings = [
  { start: new Date(2025, 5, 10), end: new Date(2025, 5, 20) },
  { start: new Date(2025, 6, 1), end: new Date(2025, 6, 10) }
];

picker.isDateDisabled = (date) => {
  return bookings.some(booking =>
    date >= booking.start && date <= booking.end
  );
};`}
					languageType="javascript"
					titleText="Disable Date Ranges"
				/>

				<CodeBlock
					codeContent={`// Example: Disable past dates and weekends
picker.isDateDisabled = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const isPast = date < today;
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  
  return isPast || isWeekend;
};`}
					languageType="javascript"
					titleText="Combined Logic"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Custom Function</h5>
					<p>Set the <code>isDateDisabled</code> property to a custom function:</p>
					<ul>
						<li>Receives a Date object as parameter</li>
						<li>Returns <code>true</code> to disable the date</li>
						<li>Returns <code>false</code> to allow the date</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Booking systems</strong> - Disable already booked dates</li>
						<li><strong>Business rules</strong> - Complex availability logic</li>
						<li><strong>API integration</strong> - Disable based on server data</li>
						<li><strong>Dynamic restrictions</strong> - Rules that change over time</li>
					</ul>

					<h5>Performance</h5>
					<p>
						The function is called once per visible date cell. Keep logic efficient for smooth
						performance.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
