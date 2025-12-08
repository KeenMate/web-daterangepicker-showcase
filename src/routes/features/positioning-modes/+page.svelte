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
				Choose between floating and inline positioning modes to fit your UI requirements.
				Floating mode (default) shows a popup calendar, while inline mode embeds it directly in the page.
			</p>
		</section>

		<ShowcaseSection
			titleText="PM01 Floating Mode (Default)"
			subtitleText="Calendar appears as a popup below the input"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					positioning-mode="floating"
					placeholder="Click to open calendar">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Click the input to open the floating calendar popup</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="single"
  positioning-mode="floating"
  placeholder="Click to open calendar">
</web-daterangepicker>

<!-- positioning-mode="floating" is the default, so you can omit it -->
<web-daterangepicker
  selection-mode="single"
  placeholder="Click to open calendar">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
  positioningMode: 'floating' // Default value
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

					<h5>Key Features</h5>
					<ul>
						<li><code>positioning-mode="floating"</code> - Default mode (can be omitted)</li>
						<li>Uses Floating UI for smart positioning</li>
						<li>Automatically flips if not enough space</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="PM02 Calendar Placement"
			subtitleText="Control where the floating calendar appears"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					calendar-placement="top-start"
					placeholder="Calendar opens above input">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Click to see calendar open above the input</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="single"
  calendar-placement="bottom-start"
  placeholder="Default placement">
</web-daterangepicker>

<!-- Top placement -->
<web-daterangepicker
  selection-mode="single"
  calendar-placement="top-start"
  placeholder="Opens above">
</web-daterangepicker>

<!-- Right placement -->
<web-daterangepicker
  selection-mode="single"
  calendar-placement="right"
  placeholder="Opens to the right">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
  calendarPlacement: 'top-start'  // Opens above
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Available Placements</h5>
					<ul>
						<li><code>bottom</code> - Below, centered</li>
						<li><code>bottom-start</code> - Below, left-aligned (default)</li>
						<li><code>bottom-end</code> - Below, right-aligned</li>
						<li><code>top</code> - Above, centered</li>
						<li><code>top-start</code> - Above, left-aligned</li>
						<li><code>top-end</code> - Above, right-aligned</li>
						<li><code>left</code> - To the left</li>
						<li><code>right</code> - To the right</li>
					</ul>

					<h5>Smart Positioning</h5>
					<p>Uses Floating UI for automatic flipping and shifting when there's not enough space in the viewport.</p>

					<h5>Key Options</h5>
					<ul>
						<li><code>calendar-placement</code> - Preferred placement (will flip if needed)</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="PM03 Inline Mode"
			subtitleText="Calendar always visible in the page flow"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					positioning-mode="inline"
					visible-months-count="2">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Calendar is always visible</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="single"
  positioning-mode="inline"
  visible-months-count="2">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
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
	</div>
</DocLayout>
