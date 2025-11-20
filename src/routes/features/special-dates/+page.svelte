<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(async () => {
		await import('@keenmate/web-daterangepicker');

		// Demo 1: Basic special dates with labels
		const demo1 = document.getElementById('demo-special-dates-basic') as any;
		if (demo1) {
			demo1.specialDates = [
				{
					date: '2025-12-25',
					class: 'holiday',
					label: '🎄',
					tooltip: 'Christmas Day'
				},
				{
					date: '2025-12-24',
					class: 'holiday',
					label: '🎁',
					tooltip: 'Christmas Eve'
				},
				{
					date: '2025-01-01',
					class: 'holiday',
					label: '🎉',
					tooltip: 'New Year\'s Day'
				},
				{
					date: '2025-07-04',
					class: 'holiday',
					label: '🎆',
					tooltip: 'Independence Day'
				},
				{
					date: '2025-11-27',
					class: 'holiday',
					label: '🦃',
					tooltip: 'Thanksgiving'
				}
			];
		}

		// Demo 2: Custom styling with different classes
		const demo2 = document.getElementById('demo-special-dates-styling') as any;
		if (demo2) {
			demo2.specialDates = [
				{
					date: '2025-12-25',
					class: 'holiday',
					label: '🎄',
					tooltip: 'Holiday - Closed'
				},
				{
					date: '2025-06-15',
					class: 'event',
					label: '🎉',
					tooltip: 'Special Event'
				},
				{
					date: '2025-07-01',
					class: 'peak-season',
					label: '$$$',
					tooltip: 'Peak Season Pricing'
				},
				{
					date: '2025-07-15',
					class: 'peak-season',
					label: '$$$',
					tooltip: 'Peak Season Pricing'
				}
			];
		}

		// Demo 3: Dynamic pricing with getDateMetadata
		const demo3 = document.getElementById('demo-special-dates-dynamic') as any;
		if (demo3) {
			const pricing: Record<string, number> = {
				'2025-07-01': 250,
				'2025-07-04': 350,
				'2025-07-15': 280,
				'2025-12-25': 400,
				'2025-12-31': 450
			};

			demo3.getDateMetadata = (date: Date) => {
				const key = date.toISOString().split('T')[0];
				const price = pricing[key];

				if (price) {
					if (price >= 350) {
						return {
							class: 'peak-pricing',
							label: '$$$',
							tooltip: `$${price}/night - Peak Season`
						};
					} else if (price >= 250) {
						return {
							class: 'high-pricing',
							label: '$$',
							tooltip: `$${price}/night - High Season`
						};
					}
				}
				return null;
			};
		}
	});
</script>

<style>
	:global(web-daterangepicker#demo-special-dates-styling .drp-date-picker__day.peak-season) {
		background-color: rgba(251, 191, 36, 0.15);
		font-weight: 600;
	}

	:global(web-daterangepicker#demo-special-dates-dynamic .drp-date-picker__day.peak-pricing) {
		background-color: rgba(239, 68, 68, 0.15);
		font-weight: 700;
	}

	:global(web-daterangepicker#demo-special-dates-dynamic .drp-date-picker__day.high-pricing) {
		background-color: rgba(251, 191, 36, 0.15);
		font-weight: 600;
	}
</style>

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
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="demo-special-dates-basic"
					selection-mode="single"
					placeholder="Select a date">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					<strong>Holiday dates:</strong> 🎉 Jan 1, 🎆 Jul 4, 🦃 Nov 27, 🎁 Dec 24, 🎄 Dec 25. Hover for tooltips!
				</p>
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
const picker = document.querySelector('web-daterangepicker');

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
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="demo-special-dates-styling"
					selection-mode="single"
					placeholder="Select a date">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					<strong>Demo dates:</strong> 🎄 Dec 25 (holiday), 🎉 Jun 15 (event), $$$ Jul 1 & Jul 15 (peak-season)
				</p>
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

				<CodeBlock
					codeContent={`/* Holiday styling (predefined) */
web-daterangepicker .drp-date-picker__day.holiday {
  background-color: rgba(239, 68, 68, 0.1);
}

/* Event styling (predefined) */
web-daterangepicker .drp-date-picker__day.event {
  background-color: rgba(16, 185, 129, 0.1);
}

/* Custom class */
web-daterangepicker .drp-date-picker__day.peak-season {
  background-color: rgba(251, 191, 36, 0.15);
  font-weight: 600;
}`}
					languageType="css"
					titleText="CSS Styling"
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
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="demo-special-dates-dynamic"
					selection-mode="single"
					placeholder="Select a date">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					<strong>Pricing dates:</strong> $$ Jul 1 ($250), Jul 15 ($280) | $$$ Jul 4 ($350), Dec 25 ($400), Dec 31 ($450)
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Dynamic pricing
const pricing = {
  '2025-07-01': 250,
  '2025-07-04': 350,
  '2025-12-25': 400,
  '2025-12-31': 450
};

picker.getDateMetadata = (date) => {
  const key = date.toISOString().split('T')[0];
  const price = pricing[key];

  if (price) {
    if (price >= 350) {
      return {
        class: 'peak-pricing',
        label: '$$$',
        tooltip: \`$\${price}/night - Peak Season\`
      };
    } else if (price >= 250) {
      return {
        class: 'high-pricing',
        label: '$$',
        tooltip: \`$\${price}/night - High Season\`
      };
    }
  }
  return null;
};`}
					languageType="javascript"
					titleText="Dynamic Pricing"
				/>

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
					titleText="Availability Example"
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
