<script lang="ts">
	import { DocLayout, ShowcaseSection } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<style>
	:global(.api-table thead) {
		background-color: #000000;
	}

	:global(.api-table thead th) {
		font-weight: 600;
		color: white;
		background: black;
	}

	:global(.table > :not(caption) > * > *) {
		padding: 0.5rem 0.5rem;
		color: var(--bs-table-color-state, var(--bs-table-color-type, var(--bs-table-color)));
		border-bottom-width: var(--bs-border-width);
		box-shadow: inset 0 0 0 9999px var(--bs-table-bg-state, var(--bs-table-bg-type, var(--bs-table-accent-bg)));
	}

	:global(th) {
		font-weight: 600;
	}

	:global(.showcase-section .controls-container) {
		/* padding: 0.5rem; */
	}

	:global(.showcase-section .description-container) {
		/* padding: 0.5rem; */
	}
</style>

<DocLayout
	titleText="API Reference"
	descriptionText="Complete DatePicker public interface and CSS custom properties"
>
	<div class="py-1">
		<!-- DatePicker Public Interface -->
		<section class="mb-5">
			<h2 class="mb-4">DatePicker Public Interface</h2>
			<p class="lead mb-4">
				All attributes, methods, events, and callbacks available on the
				<code>&lt;web-daterangepicker&gt;</code> element.
			</p>
		</section>

		<!-- Attributes | Methods | Events & Callbacks -->
		<ShowcaseSection
			titleText="Public API"
			subtitleText="Attributes, methods, events, and callbacks"
			col1Title="Attributes"
			col2Title="Methods"
			col3Title="Events & Callbacks"
			columnCount={3}
		>
			{#snippet demoContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Attribute</th>
								<th>Type</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>auto-close</code></td>
								<td>never | selection | apply</td>
								<td>selection</td>
							</tr>
							<tr>
								<td><code>calendar-open-trigger</code></td>
								<td>focus | typing | manual</td>
								<td>focus</td>
							</tr>
							<tr>
								<td><code>calendar-placement</code></td>
								<td>string (Floating UI)</td>
								<td>bottom-start</td>
							</tr>
							<tr>
								<td><code>cell-size</code></td>
								<td>xs | sm | md | lg | xl</td>
								<td>md</td>
							</tr>
							<tr>
								<td><code>date-format-mask</code></td>
								<td>string</td>
								<td>YYYY-MM-DD</td>
							</tr>
							<tr>
								<td><code>disabled</code></td>
								<td>boolean</td>
								<td>false</td>
							</tr>
							<tr>
								<td><code>disabled-dates-handling</code></td>
								<td>allow | prevent | block | split | individual</td>
								<td>allow</td>
							</tr>
							<tr>
								<td><code>disabled-weekdays</code></td>
								<td>string (comma-sep)</td>
								<td>-</td>
							</tr>
							<tr>
								<td><code>display-format-mask</code></td>
								<td>string</td>
								<td>-</td>
							</tr>
							<tr>
								<td><code>font-size</code></td>
								<td>xs | sm | md | lg | xl</td>
								<td>md</td>
							</tr>
							<tr>
								<td><code>grid-columns</code></td>
								<td>number</td>
								<td>-</td>
							</tr>
							<tr>
								<td><code>grid-rows</code></td>
								<td>number</td>
								<td>-</td>
							</tr>
							<tr>
								<td><code>highlight-disabled-in-range</code></td>
								<td>boolean</td>
								<td>true</td>
							</tr>
							<tr>
								<td><code>initial-date</code></td>
								<td>string (YYYY-MM-DD)</td>
								<td>today</td>
							</tr>
							<tr>
								<td><code>locale</code></td>
								<td>string | auto</td>
								<td>auto</td>
							</tr>
							<tr>
								<td><code>max-date</code></td>
								<td>string (YYYY-MM-DD)</td>
								<td>-</td>
							</tr>
							<tr>
								<td><code>min-date</code></td>
								<td>string (YYYY-MM-DD)</td>
								<td>-</td>
							</tr>
							<tr>
								<td><code>month-layout</code></td>
								<td>horizontal | grid</td>
								<td>horizontal</td>
							</tr>
							<tr>
								<td><code>placeholder</code></td>
								<td>string</td>
								<td>-</td>
							</tr>
							<tr>
								<td><code>positioning-mode</code></td>
								<td>floating | inline</td>
								<td>floating</td>
							</tr>
							<tr>
								<td><code>rolling-month-range</code></td>
								<td>string (MM-MM)</td>
								<td>01-12</td>
							</tr>
							<tr>
								<td><code>rolling-year-range</code></td>
								<td>string (YYYY or YYYY-YYYY)</td>
								<td>±1 year</td>
							</tr>
							<tr>
								<td><code>selection-mode</code></td>
								<td>single | range | multiple</td>
								<td>single</td>
							</tr>
							<tr>
								<td><code>show-apply-button</code></td>
								<td>boolean</td>
								<td>auto</td>
							</tr>
							<tr>
								<td><code>show-clear-button</code></td>
								<td>boolean</td>
								<td>true</td>
							</tr>
							<tr>
								<td><code>show-today-button</code></td>
								<td>boolean</td>
								<td>true</td>
							</tr>
							<tr>
								<td><code>spacing</code></td>
								<td>xs | sm | md | lg | xl</td>
								<td>md</td>
							</tr>
							<tr>
								<td><code>unified-header-interactive</code></td>
								<td>boolean</td>
								<td>false</td>
							</tr>
							<tr>
								<td><code>unified-navigation</code></td>
								<td>boolean</td>
								<td>false</td>
							</tr>
							<tr>
								<td><code>unified-navigation-anchor-index</code></td>
								<td>number</td>
								<td>0</td>
							</tr>
							<tr>
								<td><code>value</code></td>
								<td>string</td>
								<td>-</td>
							</tr>
							<tr>
								<td><code>visible-months-count</code></td>
								<td>number</td>
								<td>1</td>
							</tr>
							<tr>
								<td><code>week-start-day</code></td>
								<td>auto | 0-6</td>
								<td>auto</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Method</th>
								<th>Returns</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>clearSelection()</code></td>
								<td>void</td>
								<td>Clear current selection</td>
							</tr>
							<tr>
								<td><code>destroy()</code></td>
								<td>void</td>
								<td>Destroy picker instance</td>
							</tr>
							<tr>
								<td><code>getInputValue()</code></td>
								<td>string</td>
								<td>Get input value as string</td>
							</tr>
							<tr>
								<td><code>getSelectedDate()</code></td>
								<td>Date | null</td>
								<td>Get selected date (single mode)</td>
							</tr>
							<tr>
								<td><code>getSelectedRange()</code></td>
								<td>DateRange | null</td>
								<td>Get selected range (range mode)</td>
							</tr>
							<tr>
								<td><code>hide()</code></td>
								<td>void</td>
								<td>Hide the calendar popup</td>
							</tr>
							<tr>
								<td><code>setInputValue(value)</code></td>
								<td>void</td>
								<td>Set input value</td>
							</tr>
							<tr>
								<td><code>show()</code></td>
								<td>void</td>
								<td>Show the calendar popup</td>
							</tr>
							<tr>
								<td><code>toggle()</code></td>
								<td>void</td>
								<td>Toggle calendar visibility</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Event/Callback</th>
								<th>Type</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td colspan="3" class="table-secondary fw-bold">DOM Events</td>
							</tr>
							<tr>
								<td><code>calendar-hide</code></td>
								<td>CustomEvent</td>
								<td>Fired when calendar closes</td>
							</tr>
							<tr>
								<td><code>calendar-show</code></td>
								<td>CustomEvent</td>
								<td>Fired when calendar opens</td>
							</tr>
							<tr>
								<td><code>date-change</code></td>
								<td>CustomEvent</td>
								<td>Fired when selection changes</td>
							</tr>
							<tr>
								<td><code>date-select</code></td>
								<td>CustomEvent</td>
								<td>Fired when date(s) selected</td>
							</tr>
							<tr>
								<td colspan="3" class="table-secondary fw-bold">Callback Properties</td>
							</tr>
							<tr>
								<td><code>badgeTooltipCallback</code></td>
								<td>Function</td>
								<td>Custom badge tooltip HTML</td>
							</tr>
							<tr>
								<td><code>beforeDateSelectCallback</code></td>
								<td>Function</td>
								<td>Validate/adjust before selection</td>
							</tr>
							<tr>
								<td><code>beforeMonthChangedCallback</code></td>
								<td>Function</td>
								<td>Bulk load metadata before render</td>
							</tr>
							<tr>
								<td><code>customStylesCallback</code></td>
								<td>Function</td>
								<td>Inject CSS into Shadow DOM</td>
							</tr>
							<tr>
								<td><code>dayTooltipCallback</code></td>
								<td>Function</td>
								<td>Custom day tooltip HTML</td>
							</tr>
							<tr>
								<td><code>formatSummaryCallback</code></td>
								<td>Function</td>
								<td>Custom summary formatting</td>
							</tr>
							<tr>
								<td><code>getDateMetadataCallback</code></td>
								<td>Function</td>
								<td>Return DateInfo for custom styling</td>
							</tr>
							<tr>
								<td><code>getUnifiedHeaderCallback</code></td>
								<td>Function</td>
								<td>Custom unified header text</td>
							</tr>
							<tr>
								<td><code>onSelect</code></td>
								<td>Function</td>
								<td>Called on date selection</td>
							</tr>
							<tr>
								<td><code>renderDayCallback</code></td>
								<td>Function</td>
								<td>Full custom day cell rendering</td>
							</tr>
							<tr>
								<td><code>renderDayContentCallback</code></td>
								<td>Function</td>
								<td>Augment default day rendering</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- CSS Custom Properties -->
		<section class="mt-5 mb-5">
			<h2 class="mb-4">CSS Custom Properties</h2>
			<p class="lead mb-4">
				Version 1.3.0 includes 90+ CSS custom properties for complete theming control. Variables are
				organized into base variables (foundation) and semantic component-specific variables.
			</p>
		</section>

		<!-- Base Variables: Colors & Typography | Spacing & Other -->
		<ShowcaseSection
			titleText="Base Variables"
			subtitleText="Foundation colors, typography, spacing, and layout properties"
			col1Title="Colors & Typography"
			col2Title="Spacing & Other"
			columnCount={2}
		>
			{#snippet demoContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td colspan="2" class="table-secondary fw-bold">Colors</td>
							</tr>
							<tr>
								<td><code>--drp-accent-color</code></td>
								<td>#3b82f6</td>
							</tr>
							<tr>
								<td><code>--drp-accent-color-hover</code></td>
								<td>#2563eb</td>
							</tr>
							<tr>
								<td><code>--drp-accent-text-color</code></td>
								<td>#ffffff</td>
							</tr>
							<tr>
								<td><code>--drp-border-color</code></td>
								<td>#e5e7eb</td>
							</tr>
							<tr>
								<td><code>--drp-card-bg</code></td>
								<td>#ffffff</td>
							</tr>
							<tr>
								<td><code>--drp-primary-bg</code></td>
								<td>#f3f4f6</td>
							</tr>
							<tr>
								<td><code>--drp-primary-bg-hover</code></td>
								<td>#e5e7eb</td>
							</tr>
							<tr>
								<td><code>--drp-text-primary</code></td>
								<td>#111827</td>
							</tr>
							<tr>
								<td><code>--drp-text-secondary</code></td>
								<td>#6b7280</td>
							</tr>
							<tr>
								<td colspan="2" class="table-secondary fw-bold">Typography</td>
							</tr>
							<tr>
								<td><code>--drp-font-size-base</code></td>
								<td>1rem</td>
							</tr>
							<tr>
								<td><code>--drp-font-size-lg</code></td>
								<td>1.125rem</td>
							</tr>
							<tr>
								<td><code>--drp-font-size-sm</code></td>
								<td>0.875rem</td>
							</tr>
							<tr>
								<td><code>--drp-font-size-xs</code></td>
								<td>0.75rem</td>
							</tr>
							<tr>
								<td><code>--drp-font-weight-medium</code></td>
								<td>500</td>
							</tr>
							<tr>
								<td><code>--drp-font-weight-normal</code></td>
								<td>400</td>
							</tr>
							<tr>
								<td><code>--drp-font-weight-semibold</code></td>
								<td>600</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td colspan="2" class="table-secondary fw-bold">Spacing</td>
							</tr>
							<tr>
								<td><code>--drp-spacing-lg</code></td>
								<td>1.5rem</td>
							</tr>
							<tr>
								<td><code>--drp-spacing-md</code></td>
								<td>1rem</td>
							</tr>
							<tr>
								<td><code>--drp-spacing-sm</code></td>
								<td>0.5rem</td>
							</tr>
							<tr>
								<td><code>--drp-spacing-xl</code></td>
								<td>2rem</td>
							</tr>
							<tr>
								<td><code>--drp-spacing-xs</code></td>
								<td>0.25rem</td>
							</tr>
							<tr>
								<td colspan="2" class="table-secondary fw-bold">Layout</td>
							</tr>
							<tr>
								<td><code>--drp-border-radius</code></td>
								<td>0.375rem</td>
							</tr>
							<tr>
								<td><code>--drp-border-width-base</code></td>
								<td>1px</td>
							</tr>
							<tr>
								<td><code>--drp-shadow-xl</code></td>
								<td>0 20px 25px...</td>
							</tr>
							<tr>
								<td colspan="2" class="table-secondary fw-bold">Transitions</td>
							</tr>
							<tr>
								<td><code>--drp-easing-snappy</code></td>
								<td>cubic-bezier(...)</td>
							</tr>
							<tr>
								<td><code>--drp-transition-base</code></td>
								<td>200ms</td>
							</tr>
							<tr>
								<td><code>--drp-transition-fast</code></td>
								<td>150ms</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Input Variables (v1.3.0) -->
		<ShowcaseSection
			titleText="Input Variables"
			subtitleText="New in v1.3.0 - Complete input element styling control"
			col1Title="Input Colors"
			col2Title="Input Sizes"
			col3Title="Input States"
			columnCount={3}
		>
			{#snippet demoContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-input-background</code></td>
								<td>--drp-card-bg</td>
							</tr>
							<tr>
								<td><code>--drp-input-color</code></td>
								<td>--drp-text-primary</td>
							</tr>
							<tr>
								<td><code>--drp-input-border-color</code></td>
								<td>--drp-border-color</td>
							</tr>
							<tr>
								<td><code>--drp-input-border-color-hover</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-input-border-color-focus</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-input-placeholder-color</code></td>
								<td>--drp-text-secondary</td>
							</tr>
							<tr>
								<td><code>--drp-input-disabled-background</code></td>
								<td>--drp-primary-bg</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-input-size-xs-height</code></td>
								<td>3.1rem (31px)</td>
							</tr>
							<tr>
								<td><code>--drp-input-size-sm-height</code></td>
								<td>3.3rem (33px)</td>
							</tr>
							<tr>
								<td><code>--drp-input-size-md-height</code></td>
								<td>3.5rem (35px)</td>
							</tr>
							<tr>
								<td><code>--drp-input-size-lg-height</code></td>
								<td>3.8rem (38px)</td>
							</tr>
							<tr>
								<td><code>--drp-input-size-xl-height</code></td>
								<td>4.1rem (41px)</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-input-focus-shadow-color</code></td>
								<td>rgba(59, 130, 246, 0.1)</td>
							</tr>
							<tr>
								<td><code>--drp-input-focus-shadow-size</code></td>
								<td>3px</td>
							</tr>
							<tr>
								<td><code>--drp-input-icon-opacity</code></td>
								<td>0.5</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Day Cell Variables -->
		<ShowcaseSection
			titleText="Day Cell Variables"
			subtitleText="New in v1.3.0 - Day cell colors, states, and interactions"
			col1Title="Basic States"
			col2Title="Selection States"
			col3Title="Range States"
			columnCount={3}
		>
			{#snippet demoContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-day-bg-hover</code></td>
								<td>--drp-primary-bg</td>
							</tr>
							<tr>
								<td><code>--drp-day-border-hover</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-day-disabled-color</code></td>
								<td>--drp-text-secondary</td>
							</tr>
							<tr>
								<td><code>--drp-day-other-month-color</code></td>
								<td>--drp-text-secondary</td>
							</tr>
							<tr>
								<td><code>--drp-day-text-color</code></td>
								<td>--drp-text-primary</td>
							</tr>
							<tr>
								<td><code>--drp-day-today-border</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-weekday-color</code></td>
								<td>--drp-text-secondary</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-day-focused-outline</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-day-selected-bg</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-day-selected-bg-hover</code></td>
								<td>--drp-accent-color-hover</td>
							</tr>
							<tr>
								<td><code>--drp-day-selected-color</code></td>
								<td>--drp-accent-text-color</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-day-range-bg</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-day-range-color</code></td>
								<td>--drp-accent-text-color</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Header & Navigation Variables -->
		<ShowcaseSection
			titleText="Header & Navigation Variables"
			subtitleText="New in v1.3.0 - Header, navigation buttons, and rolling selector"
			col1Title="Header"
			col2Title="Navigation Buttons"
			col3Title="Rolling Selector"
			columnCount={3}
		>
			{#snippet demoContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-header-bg-active</code></td>
								<td>--drp-primary-bg-hover</td>
							</tr>
							<tr>
								<td><code>--drp-header-bg-hover</code></td>
								<td>--drp-primary-bg</td>
							</tr>
							<tr>
								<td><code>--drp-header-text-color</code></td>
								<td>--drp-text-primary</td>
							</tr>
							<tr>
								<td><code>--drp-unified-month-color</code></td>
								<td>--drp-text-secondary</td>
							</tr>
							<tr>
								<td><code>--drp-unified-range-bg-hover</code></td>
								<td>--drp-primary-bg</td>
							</tr>
							<tr>
								<td><code>--drp-unified-range-text-color</code></td>
								<td>--drp-text-primary</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-nav-bg-active</code></td>
								<td>--drp-primary-bg-hover</td>
							</tr>
							<tr>
								<td><code>--drp-nav-bg-hover</code></td>
								<td>--drp-primary-bg</td>
							</tr>
							<tr>
								<td><code>--drp-nav-border-color</code></td>
								<td>--drp-border-color</td>
							</tr>
							<tr>
								<td><code>--drp-nav-border-hover</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-nav-text-color</code></td>
								<td>--drp-text-primary</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-rolling-bg</code></td>
								<td>--drp-primary-bg</td>
							</tr>
							<tr>
								<td><code>--drp-rolling-border-color</code></td>
								<td>--drp-border-color</td>
							</tr>
							<tr>
								<td><code>--drp-rolling-item-bg-hover</code></td>
								<td>--drp-primary-bg</td>
							</tr>
							<tr>
								<td><code>--drp-rolling-item-bg-selected</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-rolling-item-color-selected</code></td>
								<td>--drp-accent-text-color</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Button & Summary Variables -->
		<ShowcaseSection
			titleText="Button & Summary Variables"
			subtitleText="New in v1.3.0 - Action buttons and summary section"
			col1Title="Button States"
			col2Title="Button Types"
			col3Title="Summary"
			columnCount={3}
		>
			{#snippet demoContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-button-bg-hover</code></td>
								<td>--drp-primary-bg</td>
							</tr>
							<tr>
								<td><code>--drp-button-border-color</code></td>
								<td>--drp-border-color</td>
							</tr>
							<tr>
								<td><code>--drp-button-border-hover</code></td>
								<td>--drp-accent-color</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-button-apply-bg</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-button-apply-bg-hover</code></td>
								<td>--drp-accent-color-hover</td>
							</tr>
							<tr>
								<td><code>--drp-button-apply-color</code></td>
								<td>white</td>
							</tr>
							<tr>
								<td><code>--drp-button-cancel-color</code></td>
								<td>--drp-text-secondary</td>
							</tr>
							<tr>
								<td><code>--drp-button-clear-color</code></td>
								<td>--drp-text-secondary</td>
							</tr>
							<tr>
								<td><code>--drp-button-today-color</code></td>
								<td>--drp-accent-color</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Variable</th>
								<th>Default</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-summary-border-color</code></td>
								<td>--drp-border-color</td>
							</tr>
							<tr>
								<td><code>--drp-summary-count-color</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-summary-text-color</code></td>
								<td>--drp-text-secondary</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Badge Variables -->
		<ShowcaseSection
			titleText="Badge Variables"
			subtitleText="New in v1.3.0 - Badge styling for special dates"
			col1Title="Badge Types"
			columnCount={1}
		>
			{#snippet demoContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th style="width: 40%">Variable</th>
								<th style="width: 30%">Default</th>
								<th style="width: 30%">Description</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-badge-number-bg</code></td>
								<td>--drp-accent-color</td>
								<td>Number badge background</td>
							</tr>
							<tr>
								<td><code>--drp-badge-number-color</code></td>
								<td>--drp-accent-text-color</td>
								<td>Number badge text</td>
							</tr>
							<tr>
								<td><code>--drp-badge-count-bg</code></td>
								<td>#ef4444</td>
								<td>Count badge background</td>
							</tr>
							<tr>
								<td><code>--drp-badge-count-color</code></td>
								<td>#ffffff</td>
								<td>Count badge text</td>
							</tr>
							<tr>
								<td><code>--drp-badge-text-bg</code></td>
								<td>--drp-text-secondary</td>
								<td>Text badge background</td>
							</tr>
							<tr>
								<td><code>--drp-badge-text-color</code></td>
								<td>#ffffff</td>
								<td>Text badge text</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
