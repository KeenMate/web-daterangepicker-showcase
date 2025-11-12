<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Special Dates"
	descriptionText="Highlight holidays, events, and special dates with custom labels, styling, and tooltips"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				Add visual indicators, labels, and tooltips to specific dates to highlight holidays, events,
				peak pricing, or any special information users need to see.
			</p>
		</section>

		<!-- Basic Special Dates -->
		<ShowcaseSection
			titleText="Special Dates with Labels"
			subtitleText="Add emoji or text labels to dates"
			demoColumnTitle="Concept"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<CodeBlock
					codeContent={`// Mark holidays with emoji labels
picker.specialDates = [
  {
    date: '2025-12-25',
    class: 'holiday',
    label: '🎄',
    tooltip: 'Christmas Day'
  },
  {
    date: '2025-07-04',
    class: 'holiday',
    label: '🎆',
    tooltip: 'Independence Day'
  }
];`}
					languageType="javascript"
					titleText="Holiday Examples"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API
const picker = new PureDatePicker(inputElement, {
  selectionMode: 'single',
  specialDates: [
    {
      date: '2025-12-25',
      class: 'holiday',
      label: '🎄',
      tooltip: 'Christmas Day'
    }
  ]
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>

				<CodeBlock
					codeContent={`// Via web component
const picker = document.querySelector('date-range-picker');

picker.specialDates = [
  {
    date: new Date(2025, 11, 25),
    class: 'holiday',
    label: '🎄',
    tooltip: 'Christmas'
  }
];`}
					languageType="javascript"
					titleText="Web Component"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Properties</h5>
					<ul>
						<li><code>date</code> - Date string (YYYY-MM-DD) or Date object (required)</li>
						<li><code>class</code> - CSS class for styling (optional)</li>
						<li><code>label</code> - Text or emoji displayed on date (optional)</li>
						<li><code>tooltip</code> - Hover tooltip text (optional)</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Holidays</strong> - Mark public holidays</li>
						<li><strong>Events</strong> - Highlight important dates</li>
						<li><strong>Pricing</strong> - Indicate special rates</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Custom Styling -->
		<ShowcaseSection
			titleText="Custom Styling"
			subtitleText="Style special dates with CSS"
			demoColumnTitle="CSS Examples"
			controlsColumnTitle="Usage Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<CodeBlock
					codeContent={`/* Holiday styling (predefined) */
date-range-picker::part(calendar) .drp-date-picker__day.holiday {
  background-color: rgba(239, 68, 68, 0.1);
}

/* Event styling (predefined) */
date-range-picker::part(calendar) .drp-date-picker__day.event {
  background-color: rgba(16, 185, 129, 0.1);
}

/* Custom class */
date-range-picker::part(calendar) .drp-date-picker__day.peak-season {
  background-color: rgba(251, 191, 36, 0.15);
  font-weight: 600;
}`}
					languageType="css"
					titleText="CSS"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Using predefined classes
picker.specialDates = [
  {
    date: '2025-12-25',
    class: 'holiday',
    label: '🎄'
  },
  {
    date: '2025-06-15',
    class: 'event',
    label: '🎉'
  }
];

// Using custom classes
picker.specialDates = [
  {
    date: '2025-07-01',
    class: 'peak-season',
    label: '$$$'
  }
];`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Predefined Classes</h5>
					<ul>
						<li><code>holiday</code> - Red-tinted background</li>
						<li><code>event</code> - Green-tinted background</li>
					</ul>

					<h5>Custom Classes</h5>
					<p>Add any class name and style with CSS using Shadow DOM parts.</p>

					<h5>Labels</h5>
					<ul>
						<li>Emoji work great for visual impact</li>
						<li>Keep text labels short (1-3 chars)</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Dynamic -->
		<ShowcaseSection
			titleText="Dynamic Date Information"
			subtitleText="Use getDateMetadata for complex logic"
			demoColumnTitle="Concept"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<CodeBlock
					codeContent={`// Dynamic pricing
const pricing = {
  '2025-07-01': 250,
  '2025-12-25': 350
};

picker.getDateMetadata = (date) => {
  const key = date.toISOString().split('T')[0];
  const price = pricing[key];
  
  if (price >= 300) {
    return {
      class: 'peak-pricing',
      label: '$$$',
      tooltip: price + '/night'
    };
  }
  return null;
};`}
					languageType="javascript"
					titleText="Example"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Availability tracking
const availability = {
  '2025-08-18': 0,
  '2025-08-15': 2
};

picker.getDateMetadata = (date) => {
  const key = date.toISOString().split('T')[0];
  const avail = availability[key];
  
  if (avail === 0) {
    return {
      disabled: true,
      label: '✕',
      tooltip: 'Sold out'
    };
  }
  return null;
};`}
					languageType="javascript"
					titleText="Availability"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>getDateMetadata</h5>
					<p>More powerful than static array:</p>
					<ul>
						<li>Called for each visible date</li>
						<li>Receives Date object parameter</li>
						<li>Returns DateInfo or null</li>
						<li>Can override disabled state</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li>Dynamic pricing</li>
						<li>Availability tracking</li>
						<li>API integration</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
