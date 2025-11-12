<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Positioning Modes"
	descriptionText="Control how and where the calendar popup appears"
>
	<div class="py-1">
		<section class="mb-5">
			<p class="lead">
				Choose between dropdown, inline, and modal positioning modes to fit your UI requirements.
				Each mode offers different user interaction patterns and space usage.
			</p>
		</section>

		<ShowcaseSection
			titleText="Dropdown Mode (Default)"
			subtitleText="Calendar appears as a popup below the input"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<date-range-picker
					selection-mode="single"
					positioning-mode="dropdown"
					placeholder="Click to open calendar">
				</date-range-picker>
				<p class="mt-3 small text-muted">Click the input to open the dropdown calendar</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="single"
  positioning-mode="dropdown"
  placeholder="Click to open calendar">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  positioningMode: 'dropdown',
  dropdownPlacement: 'bottom'
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Forms</strong> - Standard date input in forms</li>
						<li><strong>Filters</strong> - Date range filters in toolbars</li>
						<li><strong>Space-efficient</strong> - Calendar only visible when needed</li>
					</ul>

					<h5>Key Options</h5>
					<ul>
						<li><code>positioning-mode="dropdown"</code> - Default mode</li>
						<li><code>dropdown-placement</code> - top, bottom, or auto</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="Inline Mode"
			subtitleText="Calendar always visible in the page flow"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<date-range-picker
					selection-mode="single"
					positioning-mode="inline"
					visible-months-count="2">
				</date-range-picker>
				<p class="mt-3 small text-muted">Calendar is always visible</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="single"
  positioning-mode="inline"
  visible-months-count="2">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  positioningMode: 'inline',
  visibleMonthsCount: 2
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Dashboards</strong> - Persistent calendar widget</li>
						<li><strong>Booking interfaces</strong> - Always-visible availability calendar</li>
						<li><strong>Date browsing</strong> - When calendar is primary UI element</li>
					</ul>

					<h5>Key Option</h5>
					<ul>
						<li><code>positioning-mode="inline"</code> - Embeds calendar in page</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="Modal Mode"
			subtitleText="Calendar appears in a centered modal overlay"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<date-range-picker
					selection-mode="range"
					positioning-mode="modal"
					visible-months-count="2"
					placeholder="Click to open modal">
				</date-range-picker>
				<p class="mt-3 small text-muted">Calendar opens in a modal dialog</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="range"
  positioning-mode="modal"
  visible-months-count="2"
  placeholder="Click to open modal">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  positioningMode: 'modal',
  visibleMonthsCount: 2,
  modalCloseOnBackdropClick: true
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Mobile interfaces</strong> - Full-screen date selection</li>
						<li><strong>Complex ranges</strong> - Focus user on date selection task</li>
						<li><strong>Multi-month views</strong> - Provides space for large calendars</li>
					</ul>

					<h5>Key Options</h5>
					<ul>
						<li><code>positioning-mode="modal"</code> - Opens in modal</li>
						<li><code>modal-close-on-backdrop-click</code> - Allow closing by clicking outside</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
