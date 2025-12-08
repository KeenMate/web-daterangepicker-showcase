<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Selection Modes"
	descriptionText="Choose between single date selection or date range selection modes"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				The date picker supports two selection modes: <strong>single</strong> for selecting individual dates
				and <strong>range</strong> for selecting date ranges with start and end dates.
			</p>
		</section>

		<!-- Single Date Selection -->
		<ShowcaseSection
			titleText="SM01 Single Date Selection"
			subtitleText="Select one date at a time"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					placeholder="Select a date">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Click on any date to select it</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="single"
  placeholder="Select a date">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
  selectionMode: 'single',
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
						<li><strong>Birth dates</strong> - User profile information</li>
						<li><strong>Appointment dates</strong> - Booking single events</li>
						<li><strong>Deadlines</strong> - Task due dates</li>
						<li><strong>Single events</strong> - Any single-point-in-time selection</li>
					</ul>

					<h5>Behavior</h5>
					<p>Click on any date to select it. The selected date will be highlighted and appear in the input field.</p>

					<h5>Key Option</h5>
					<ul>
						<li><code>selection-mode="single"</code> - Enables single date selection</li>
					</ul>

					<h5>Events</h5>
					<p>Emits <code>date-select</code> (or <code>change</code>) event with <code>event.detail.date</code> and <code>event.detail.formattedValue</code></p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Range Selection -->
		<ShowcaseSection
			titleText="SM02 Range Selection"
			subtitleText="Select a date range with start and end dates"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					visible-months-count="2"
					placeholder="Select date range">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Click-click or drag to select a range</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="range"
  visible-months-count="2"
  placeholder="Select date range">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
  selectionMode: 'range',
  visibleMonthsCount: 2,
  onSelect: (startDate, endDate) => {
    console.log('Range:', startDate, 'to', endDate);
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
						<li><strong>Hotel bookings</strong> - Check-in to check-out</li>
						<li><strong>Report periods</strong> - Start and end dates for analytics</li>
						<li><strong>Vacation planning</strong> - Trip duration</li>
						<li><strong>Time tracking</strong> - Project duration</li>
					</ul>

					<h5>Selection Methods</h5>
					<ul>
						<li><strong>Click-click:</strong> Click start date, then end date</li>
						<li><strong>Drag:</strong> Click and drag from start to end</li>
					</ul>

					<h5>Key Options</h5>
					<ul>
						<li><code>selection-mode="range"</code> - Enables range selection</li>
						<li><code>visible-months-count="2"</code> - Shows 2 months (optional, improves UX for ranges)</li>
					</ul>

					<h5>Events</h5>
					<p>Emits <code>date-select</code> (or <code>change</code>) event with <code>event.detail.dateRange</code> (containing <code>start</code> and <code>end</code> dates) and <code>event.detail.formattedValue</code></p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Event Handling -->
		<ShowcaseSection
			titleText="SM03 Event Handling"
			subtitleText="Listen to selection events"
			col1Title="Single Mode Events"
			col2Title="Range Mode Events"
			col3Title="Event Details">

			{#snippet demoContent()}
				<CodeBlock
					codeContent={`const picker = document.querySelector('web-daterangepicker');

picker.addEventListener('date-select', (e) => {
  console.log('Selected date:', e.detail.date);
  
  // Date object methods
  console.log('Day:', e.detail.date.getDate());
  console.log('Month:', e.detail.date.getMonth() + 1);
  console.log('Year:', e.detail.date.getFullYear());
  
  // Formatted output
  console.log('ISO:', e.detail.date.toISOString());
  console.log('Locale:', e.detail.date.toLocaleDateString());
});`}
					languageType="javascript"
					titleText="Single Mode"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`const picker = document.querySelector('web-daterangepicker');

picker.addEventListener('range-select', (e) => {
  console.log('Start date:', e.detail.startDate);
  console.log('End date:', e.detail.endDate);
  
  // Calculate duration
  const diffTime = e.detail.endDate - e.detail.startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log('Duration:', diffDays, 'days');
  
  // Format range
  const start = e.detail.startDate.toLocaleDateString();
  const end = e.detail.endDate.toLocaleDateString();
  console.log('Range:', start, '-', end);
});`}
					languageType="javascript"
					titleText="Range Mode"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Event Types</h5>
					<ul>
						<li><code>date-select</code> - Fired when date(s) selected (both modes)</li>
						<li><code>change</code> - Alias of <code>date-select</code> (for compatibility)</li>
					</ul>

					<p class="small text-muted">
						<strong>Note:</strong> Both <code>date-select</code> and <code>change</code> events fire with identical data.
						Use whichever fits your naming convention.
					</p>

					<h5>Event Data</h5>
					<p><strong>Single mode:</strong></p>
					<ul>
						<li><code>event.detail.date</code> - JavaScript Date object</li>
						<li><code>event.detail.formattedValue</code> - Formatted date string</li>
					</ul>

					<p><strong>Range mode:</strong></p>
					<ul>
						<li><code>event.detail.dateRange</code> - Object with <code>start</code> and <code>end</code> Date objects</li>
						<li><code>event.detail.formattedValue</code> - Formatted date range string</li>
					</ul>

					<p class="small text-muted">
						In range mode with <code>disabled-dates-handling</code> modes like 'allow' or 'split',
						the event detail may also include <code>enabledDates</code>, <code>disabledDates</code>, or additional arrays.
					</p>

					<h5>Date Object</h5>
					<p>All dates are native JavaScript Date objects, giving you access to all standard Date methods and formatting options.</p>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
