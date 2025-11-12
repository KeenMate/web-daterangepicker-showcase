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
			titleText="Single Date Selection"
			subtitleText="Select one date at a time"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<date-range-picker
					selection-mode="single"
					placeholder="Select a date">
				</date-range-picker>
				<p class="mt-3 small text-muted">Click on any date to select it</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="single"
  placeholder="Select a date">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
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

					<h5>Event</h5>
					<p>Emits <code>date-select</code> event with <code>event.detail.date</code></p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Range Selection -->
		<ShowcaseSection
			titleText="Range Selection"
			subtitleText="Select a date range with start and end dates"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<date-range-picker
					selection-mode="range"
					visible-months-count="2"
					placeholder="Select date range">
				</date-range-picker>
				<p class="mt-3 small text-muted">Click-click or drag to select a range</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="range"
  visible-months-count="2"
  placeholder="Select date range">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
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

					<h5>Event</h5>
					<p>Emits <code>range-select</code> event with <code>event.detail.startDate</code> and <code>event.detail.endDate</code></p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Event Handling -->
		<ShowcaseSection
			titleText="Event Handling"
			subtitleText="Listen to selection events"
			demoColumnTitle="Single Mode Events"
			controlsColumnTitle="Range Mode Events"
			descriptionColumnTitle="Event Details">

			{#snippet demoContent()}
				<CodeBlock
					codeContent={`const picker = document.querySelector('date-range-picker');

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
					codeContent={`const picker = document.querySelector('date-range-picker');

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
						<li><code>date-select</code> - Single mode event</li>
						<li><code>range-select</code> - Range mode event</li>
					</ul>

					<h5>Event Data</h5>
					<p><strong>Single mode:</strong></p>
					<ul>
						<li><code>event.detail.date</code> - JavaScript Date object</li>
					</ul>

					<p><strong>Range mode:</strong></p>
					<ul>
						<li><code>event.detail.startDate</code> - Start Date object</li>
						<li><code>event.detail.endDate</code> - End Date object</li>
					</ul>

					<h5>Date Object</h5>
					<p>All dates are native JavaScript Date objects, giving you access to all standard Date methods and formatting options.</p>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
