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
								<td><code>disabled-dates</code></td>
								<td>string (comma-sep ISO dates)</td>
								<td>-</td>
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
								<td><code>enable-transitions</code></td>
								<td>boolean</td>
								<td>false</td>
							</tr>
							<tr>
								<td><code>display-format-mask</code></td>
								<td>string</td>
								<td>-</td>
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
								<td><code>input-size</code></td>
								<td>xs | sm | md | lg | xl</td>
								<td>md</td>
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
								<td><code>mobile-modal-breakpoint</code></td>
								<td>CSS length</td>
								<td>-</td>
							</tr>
							<tr>
								<td><code>mobile-modal-min-height</code></td>
								<td>CSS length</td>
								<td>-</td>
							</tr>
							<tr>
								<td><code>positioning-mode</code></td>
								<td>floating | inline | modal</td>
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
								<td><code>show-debug-info</code></td>
								<td>boolean</td>
								<td>false</td>
							</tr>
							<tr>
								<td><code>show-summary</code></td>
								<td>boolean</td>
								<td>true</td>
							</tr>
							<tr>
								<td><code>show-today-button</code></td>
								<td>boolean</td>
								<td>true</td>
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
							<tr>
								<td colspan="3" class="table-secondary fw-bold">
									Member-mapping attributes (override <code>specialDates</code> property names)
								</td>
							</tr>
							<tr>
								<td><code>date-member</code></td>
								<td>string</td>
								<td>date</td>
							</tr>
							<tr>
								<td><code>badge-text-member</code></td>
								<td>string</td>
								<td>badgeText</td>
							</tr>
							<tr>
								<td><code>badge-class-member</code></td>
								<td>string</td>
								<td>badgeClass</td>
							</tr>
							<tr>
								<td><code>badge-tooltip-member</code></td>
								<td>string</td>
								<td>badgeTooltip</td>
							</tr>
							<tr>
								<td><code>day-class-member</code></td>
								<td>string</td>
								<td>dayClass</td>
							</tr>
							<tr>
								<td><code>day-tooltip-member</code></td>
								<td>string</td>
								<td>dayTooltip</td>
							</tr>
							<tr>
								<td><code>is-disabled-member</code></td>
								<td>string</td>
								<td>isDisabled</td>
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
								<td><code>getInputValue()</code></td>
								<td>string</td>
								<td>Get input value as string</td>
							</tr>
							<tr>
								<td><code>hide()</code></td>
								<td>void</td>
								<td>Hide the calendar popup</td>
							</tr>
							<tr>
								<td><code>hideMessage()</code></td>
								<td>void</td>
								<td>Hide the message overlay</td>
							</tr>
							<tr>
								<td><code>setInputValue(value)</code></td>
								<td>void</td>
								<td>Set input value</td>
							</tr>
							<tr>
								<td>
									<code>setMonthNames(names)</code>
									<span class="badge bg-warning text-dark ms-1">deprecated</span>
								</td>
								<td>void</td>
								<td>Use the <code>monthNames</code> property setter instead</td>
							</tr>
							<tr>
								<td><code>setRollingItemAlignment(alignment)</code></td>
								<td>void</td>
								<td>Set rolling selector alignment</td>
							</tr>
							<tr>
								<td><code>show()</code></td>
								<td>void</td>
								<td>Show the calendar popup</td>
							</tr>
							<tr>
								<td><code>showMessage(html, type?, autoHide?)</code></td>
								<td>void</td>
								<td>
									Display message overlay. <code>type</code>:
									<code>error | warning | info | success</code>;
									<code>autoHide</code>: milliseconds
								</td>
							</tr>
							<tr>
								<td><code>toggle()</code></td>
								<td>void</td>
								<td>Toggle calendar visibility</td>
							</tr>
							<tr>
								<td colspan="3" class="small text-muted">
									Selection state is exposed as <strong>properties</strong>, not
									methods: read/write <code>selectedDate</code>,
									<code>selectedDates</code>, <code>selectedRanges</code>,
									<code>isOpen</code>, <code>value</code>.
								</td>
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
								<td><code>date-select</code></td>
								<td>CustomEvent</td>
								<td>
									Fired when a date is selected (single mode) or a range is
									committed (range/multiple mode, after Apply if shown). Detail
									shape varies by selection mode and
									<code>disabled-dates-handling</code>.
								</td>
							</tr>
							<tr>
								<td><code>change</code></td>
								<td>CustomEvent</td>
								<td>Alias of <code>date-select</code> — fires alongside it with identical detail.</td>
							</tr>
							<tr>
								<td><code>custom-action</code></td>
								<td>CustomEvent</td>
								<td>
									Fired by any button with <code>data-action="custom"</code> (action
									buttons or buttons inside <code>showMessage()</code> HTML). Detail
									contains the button's <code>data-*</code> attributes as camelCase
									keys.
								</td>
							</tr>
							<tr>
								<td colspan="3" class="small text-muted">
									Note: there are no <code>calendar-show</code>,
									<code>calendar-hide</code>, <code>date-change</code>, apply, or
									cancel events. Use <code>isOpen</code> for visibility state, listen
									for <code>date-select</code> for commits, and use
									<code>beforeDateSelectCallback</code> to gate selection.
								</td>
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
								<td><code>getMonthHeaderCallback</code></td>
								<td>Function</td>
								<td>Custom individual month header text</td>
							</tr>
							<tr>
								<td><code>getUnifiedHeaderCallback</code></td>
								<td>Function</td>
								<td>Custom unified header text</td>
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

		<!-- Properties (complex data + reactive state) -->
		<ShowcaseSection
			titleText="Properties (Complex Data & State)"
			subtitleText="JavaScript-only setters for arrays, objects, and reactive selection state"
			col1Title="Complex Data (property-wins)"
			col2Title="Reactive Selection State"
			col3Title="Precedence Rule"
			columnCount={3}
		>
			{#snippet demoContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered api-table">
						<thead>
							<tr>
								<th>Property</th>
								<th>Type</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>specialDates</code></td>
								<td>DecoratedDate[]</td>
							</tr>
							<tr>
								<td><code>disabledDates</code></td>
								<td>(Date | string)[]</td>
							</tr>
							<tr>
								<td><code>actionButtons</code></td>
								<td>ActionButton[]</td>
							</tr>
							<tr>
								<td><code>customStrings</code></td>
								<td>Partial&lt;LocaleStrings&gt;</td>
							</tr>
							<tr>
								<td><code>monthNames</code></td>
								<td>string[] (length 12)</td>
							</tr>
							<tr>
								<td colspan="2" class="table-secondary fw-bold">
									Member-mapping (also available as HTML attributes)
								</td>
							</tr>
							<tr>
								<td><code>dateMember</code></td>
								<td>string</td>
							</tr>
							<tr>
								<td><code>badgeTextMember</code></td>
								<td>string</td>
							</tr>
							<tr>
								<td><code>badgeClassMember</code></td>
								<td>string</td>
							</tr>
							<tr>
								<td><code>badgeTooltipMember</code></td>
								<td>string</td>
							</tr>
							<tr>
								<td><code>dayClassMember</code></td>
								<td>string</td>
							</tr>
							<tr>
								<td><code>dayTooltipMember</code></td>
								<td>string</td>
							</tr>
							<tr>
								<td><code>isDisabledMember</code></td>
								<td>string</td>
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
								<th>Property</th>
								<th>Type</th>
								<th>Notes</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>selectedDate</code></td>
								<td>Date | null</td>
								<td>Single mode; get/set</td>
							</tr>
							<tr>
								<td><code>selectedDates</code></td>
								<td>Date[]</td>
								<td>Multiple mode; get/set</td>
							</tr>
							<tr>
								<td><code>selectedRanges</code></td>
								<td>DateRange[]</td>
								<td>Range mode; get/set</td>
							</tr>
							<tr>
								<td><code>isOpen</code></td>
								<td>boolean</td>
								<td>Calendar visibility; get/set</td>
							</tr>
							<tr>
								<td><code>value</code></td>
								<td>string</td>
								<td>Formatted input value; get/set</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="small">
					<p>
						Complex-data properties accept values that can't fit in an HTML
						attribute (objects, callbacks, <code>Date</code> instances).
					</p>
					<p class="mb-2"><strong>Precedence:</strong></p>
					<ol class="mb-2 ps-3">
						<li>If a property is set in JavaScript, the attribute is ignored.</li>
						<li>
							If only the HTML attribute is set (e.g.
							<code>disabled-dates="2026-12-25"</code>), it is parsed and used.
						</li>
						<li>
							Property setters survive across attribute changes — the element
							re-applies them on every re-init.
						</li>
					</ol>
					<p class="mb-0">
						As of v1.11.0 most setters route through <code>updateOptions()</code>
						and preserve selection / scroll / focus state. Structural changes
						(<code>positioningMode</code>, <code>selectionMode</code>,
						<code>visibleMonthsCount</code>, layout) still trigger a full rebuild.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- CSS Custom Properties -->
		<section class="mt-5 mb-5">
			<h2 class="mb-4">CSS Custom Properties</h2>
			<p class="lead mb-4">
				Complete CSS custom properties for theming control. Variables are organized into base
				variables (foundation) and semantic component-specific variables.
			</p>
			<div class="alert alert-info">
				<strong>Global scale:</strong> set
				<code>--drp-rem</code> (default <code>10px</code>) on the host element to
				rescale the entire calendar. Every spacing and font token is
				<code>calc(N * var(--drp-rem))</code>.
				<pre class="mb-0 mt-2"><code>&lt;web-daterangepicker style="--drp-rem: 12px"&gt;&lt;/web-daterangepicker&gt;</code></pre>
			</div>
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
								<td><code>--drp-text-color-on-accent</code></td>
								<td>#ffffff</td>
							</tr>
							<tr>
								<td><code>--drp-border-color</code></td>
								<td>#e5e7eb</td>
							</tr>
							<tr>
								<td><code>--drp-dropdown-bg</code></td>
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
								<td><code>--drp-font-size-2xs</code></td>
								<td>10px</td>
							</tr>
							<tr>
								<td><code>--drp-font-size-xs</code></td>
								<td>0.75rem</td>
							</tr>
							<tr>
								<td><code>--drp-font-size-sm</code></td>
								<td>0.875rem</td>
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
								<td><code>--drp-font-size-xl</code></td>
								<td>20px</td>
							</tr>
							<tr>
								<td><code>--drp-font-size-2xl</code></td>
								<td>24px</td>
							</tr>
							<tr>
								<td><code>--drp-font-weight-normal</code></td>
								<td>400</td>
							</tr>
							<tr>
								<td><code>--drp-font-weight-medium</code></td>
								<td>500</td>
							</tr>
							<tr>
								<td><code>--drp-font-weight-semibold</code></td>
								<td>600</td>
							</tr>
							<tr>
								<td><code>--drp-line-height-tight</code></td>
								<td>1.25</td>
							</tr>
							<tr>
								<td><code>--drp-line-height-normal</code></td>
								<td>1.5</td>
							</tr>
							<tr>
								<td><code>--drp-line-height-relaxed</code></td>
								<td>1.75</td>
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
								<td colspan="2" class="table-secondary fw-bold">Layout / Border Radius</td>
							</tr>
							<tr>
								<td><code>--drp-border-radius-sm</code></td>
								<td>4px (day cells, tooltips)</td>
							</tr>
							<tr>
								<td><code>--drp-border-radius-md</code></td>
								<td>6px (input, buttons)</td>
							</tr>
							<tr>
								<td><code>--drp-border-radius-lg</code></td>
								<td>8px (calendar, selectors)</td>
							</tr>
							<tr>
								<td><code>--drp-border-radius</code></td>
								<td>alias for -md</td>
							</tr>
							<tr>
								<td><code>--drp-border-width-base</code></td>
								<td>1px</td>
							</tr>
							<tr>
								<td><code>--drp-border</code></td>
								<td>1px solid --drp-border-color</td>
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

		<!-- Input Variables -->
		<ShowcaseSection
			titleText="Input Variables"
			subtitleText="Complete input element styling control"
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
								<td><code>--drp-input-bg</code></td>
								<td>--drp-dropdown-bg</td>
							</tr>
							<tr>
								<td><code>--drp-input-color</code></td>
								<td>--drp-text-primary</td>
							</tr>
							<tr>
								<td><code>--drp-input-border</code></td>
								<td>--base-input-border</td>
							</tr>
							<tr>
								<td><code>--drp-input-border-hover</code></td>
								<td>--base-input-border-hover</td>
							</tr>
							<tr>
								<td><code>--drp-input-border-focus</code></td>
								<td>--base-input-border-focus</td>
							</tr>
							<tr>
								<td><code>--drp-input-placeholder-color</code></td>
								<td>--drp-text-secondary</td>
							</tr>
							<tr>
								<td><code>--drp-input-bg-disabled</code></td>
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
								<td>--base-input-size-xs-height (31px)</td>
							</tr>
							<tr>
								<td><code>--drp-input-size-sm-height</code></td>
								<td>--base-input-size-sm-height (33px)</td>
							</tr>
							<tr>
								<td><code>--drp-input-size-md-height</code></td>
								<td>--base-input-size-md-height (35px)</td>
							</tr>
							<tr>
								<td><code>--drp-input-size-lg-height</code></td>
								<td>--base-input-size-lg-height (38px)</td>
							</tr>
							<tr>
								<td><code>--drp-input-size-xl-height</code></td>
								<td>--base-input-size-xl-height (41px)</td>
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
			subtitleText="Day cell colors, states, and interactions"
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
								<td><code>--drp-day-border</code></td>
								<td>2px solid transparent</td>
							</tr>
							<tr>
								<td><code>--drp-day-border-hover</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-day-drag-border</code></td>
								<td>2px dashed --drp-day-range-bg</td>
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
								<td><code>--drp-day-focused-outline-width</code></td>
								<td>2px</td>
							</tr>
							<tr>
								<td><code>--drp-day-focused-outline-offset</code></td>
								<td>2px</td>
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
								<td>--drp-text-color-on-accent</td>
							</tr>
							<tr>
								<td><code>--drp-day-selected-color-hover</code></td>
								<td>--drp-day-selected-color</td>
							</tr>
							<tr>
								<td><code>--drp-day-disabled-bg</code></td>
								<td>transparent</td>
							</tr>
							<tr>
								<td><code>--drp-day-disabled-pattern-opacity</code></td>
								<td>0.1</td>
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
								<td><code>--drp-day-range-bg-hover</code></td>
								<td>--drp-accent-color-hover</td>
							</tr>
							<tr>
								<td><code>--drp-day-range-color</code></td>
								<td>--drp-text-color-on-accent</td>
							</tr>
							<tr>
								<td><code>--drp-day-range-color-hover</code></td>
								<td>--drp-day-range-color</td>
							</tr>
							<tr>
								<td><code>--drp-day-in-range-bg-opacity</code></td>
								<td>0.15</td>
							</tr>
							<tr>
								<td><code>--drp-day-in-range-hover-bg-opacity</code></td>
								<td>0.25</td>
							</tr>
							<tr>
								<td colspan="2" class="table-secondary fw-bold">
									Hover Preview (v1.13)
								</td>
							</tr>
							<tr>
								<td><code>--drp-day-hover-preview-bg-opacity</code></td>
								<td>0.18</td>
							</tr>
							<tr>
								<td><code>--drp-day-hover-preview-invalid-bg-opacity</code></td>
								<td>0.18</td>
							</tr>
							<tr>
								<td colspan="2" class="table-secondary fw-bold">Drag &amp; Invalid</td>
							</tr>
							<tr>
								<td><code>--drp-day-drag-preview-bg-opacity</code></td>
								<td>0.30</td>
							</tr>
							<tr>
								<td><code>--drp-day-drag-preview-edge-bg-opacity</code></td>
								<td>0.60</td>
							</tr>
							<tr>
								<td><code>--drp-day-dragging-scale</code></td>
								<td>1.1</td>
							</tr>
							<tr>
								<td><code>--drp-day-drag-invalid-bg</code></td>
								<td>#ef4444</td>
							</tr>
							<tr>
								<td><code>--drp-day-drag-invalid-bg-opacity</code></td>
								<td>0.20</td>
							</tr>
							<tr>
								<td><code>--drp-day-invalid-range-bg</code></td>
								<td>--drp-message-error-border</td>
							</tr>
							<tr>
								<td><code>--drp-day-invalid-range-color</code></td>
								<td>--drp-text-color-on-accent</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Header & Navigation Variables -->
		<ShowcaseSection
			titleText="Header & Navigation Variables"
			subtitleText="Header, navigation buttons, and rolling selector"
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
								<td>--drp-text-color-on-accent</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Button & Summary Variables -->
		<ShowcaseSection
			titleText="Button & Summary Variables"
			subtitleText="Action buttons and summary section"
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
								<td><code>--drp-button-bg</code></td>
								<td>transparent</td>
							</tr>
							<tr>
								<td><code>--drp-button-color</code></td>
								<td>--drp-text-primary</td>
							</tr>
							<tr>
								<td><code>--drp-button-bg-hover</code></td>
								<td>--drp-primary-bg</td>
							</tr>
							<tr>
								<td><code>--drp-button-border</code></td>
								<td>--drp-border</td>
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
								<td><code>--drp-summary-border</code></td>
								<td>--drp-border</td>
							</tr>
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
			subtitleText="Badge styling for special dates"
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
								<td>--drp-text-color-on-accent</td>
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
							<tr>
								<td><code>--drp-badge-row-height</code></td>
								<td>16px</td>
								<td>Badge row height</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Loading & Tooltip Variables -->
		<ShowcaseSection
			titleText="Loading & Tooltip Variables"
			subtitleText="Loading overlay and tooltip styling"
			col1Title="Loading Overlay"
			col2Title="Tooltip"
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
								<td><code>--drp-loading-overlay-bg</code></td>
								<td>rgba(255, 255, 255, 0.8)</td>
							</tr>
							<tr>
								<td><code>--drp-loading-spinner-color</code></td>
								<td>--drp-border-color</td>
							</tr>
							<tr>
								<td><code>--drp-loading-spinner-accent</code></td>
								<td>--drp-accent-color</td>
							</tr>
							<tr>
								<td><code>--drp-loading-spinner-size</code></td>
								<td>40px</td>
							</tr>
							<tr>
								<td><code>--drp-loading-spinner-border-width</code></td>
								<td>4px</td>
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
								<td><code>--drp-tooltip-bg</code></td>
								<td>#1f2937</td>
							</tr>
							<tr>
								<td><code>--drp-tooltip-text-color</code></td>
								<td>#ffffff</td>
							</tr>
							<tr>
								<td><code>--drp-tooltip-line-height</code></td>
								<td>1.4</td>
							</tr>
							<tr>
								<td><code>--drp-tooltip-max-width</code></td>
								<td>200px</td>
							</tr>
							<tr>
								<td><code>--drp-tooltip-arrow-size</code></td>
								<td>8px</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Modal Mode Variables (v1.12) -->
		<ShowcaseSection
			titleText="Modal Mode Variables"
			subtitleText="Centered overlay with backdrop (v1.12 — positioning-mode='modal')"
			col1Title="Sizing & Backdrop"
			col2Title="Per-Tier Widths"
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
								<td><code>--drp-modal-gap</code></td>
								<td>16px</td>
							</tr>
							<tr>
								<td><code>--drp-modal-backdrop-bg</code></td>
								<td>rgba(0, 0, 0, 0.45)</td>
							</tr>
							<tr>
								<td><code>--drp-modal-transition</code></td>
								<td>150ms ease-out</td>
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
								<th>Viewport</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><code>--drp-modal-width-xs</code></td>
								<td>calc(100vw − 2× gap)</td>
								<td>≤ 480px</td>
							</tr>
							<tr>
								<td><code>--drp-modal-width-sm</code></td>
								<td>calc(100vw − 2× gap)</td>
								<td>481–768px</td>
							</tr>
							<tr>
								<td><code>--drp-modal-width-md</code></td>
								<td>900px</td>
								<td>769–1200px</td>
							</tr>
							<tr>
								<td><code>--drp-modal-width-lg</code></td>
								<td>1100px</td>
								<td>≥ 1201px</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Message Variables -->
		<ShowcaseSection
			titleText="Message Variables"
			subtitleText="Inline message overlay colors (error / warning / info / success)"
			col1Title="Error & Warning"
			col2Title="Info & Success"
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
								<td><code>--drp-message-error-bg</code></td>
								<td>#fef2f2</td>
							</tr>
							<tr>
								<td><code>--drp-message-error-color</code></td>
								<td>#991b1b</td>
							</tr>
							<tr>
								<td><code>--drp-message-error-border</code></td>
								<td>#fecaca</td>
							</tr>
							<tr>
								<td><code>--drp-message-warning-bg</code></td>
								<td>#fffbeb</td>
							</tr>
							<tr>
								<td><code>--drp-message-warning-color</code></td>
								<td>#92400e</td>
							</tr>
							<tr>
								<td><code>--drp-message-warning-border</code></td>
								<td>#fde68a</td>
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
								<td><code>--drp-message-info-bg</code></td>
								<td>#eff6ff</td>
							</tr>
							<tr>
								<td><code>--drp-message-info-color</code></td>
								<td>#1e40af</td>
							</tr>
							<tr>
								<td><code>--drp-message-info-border</code></td>
								<td>#bfdbfe</td>
							</tr>
							<tr>
								<td><code>--drp-message-success-bg</code></td>
								<td>#f0fdf4</td>
							</tr>
							<tr>
								<td><code>--drp-message-success-color</code></td>
								<td>#166534</td>
							</tr>
							<tr>
								<td><code>--drp-message-success-border</code></td>
								<td>#bbf7d0</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Layout / Z-Index / Opacity -->
		<ShowcaseSection
			titleText="Layout, Z-Index &amp; Opacity"
			subtitleText="Calendar dimensions, stacking layers, and opacity tokens"
			col1Title="Calendar Dimensions"
			col2Title="Z-Index Layers"
			col3Title="Opacity Tokens"
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
								<td><code>--drp-month-min-width</code></td>
								<td>280px</td>
							</tr>
							<tr>
								<td><code>--drp-month-min-width-inline</code></td>
								<td>250px</td>
							</tr>
							<tr>
								<td><code>--drp-calendar-max-width</code></td>
								<td>calc(100vw − 2rem)</td>
							</tr>
							<tr>
								<td><code>--drp-grid-columns</code></td>
								<td>3</td>
							</tr>
							<tr>
								<td><code>--drp-grid-rows</code></td>
								<td>2</td>
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
								<td><code>--drp-z-index-dropdown</code></td>
								<td>9500</td>
							</tr>
							<tr>
								<td><code>--drp-z-index-modal-backdrop</code></td>
								<td>9700</td>
							</tr>
							<tr>
								<td><code>--drp-z-index-modal</code></td>
								<td>9800</td>
							</tr>
							<tr>
								<td><code>--drp-z-index-tooltip</code></td>
								<td>9999</td>
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
								<td><code>--drp-opacity-disabled</code></td>
								<td>0.6</td>
							</tr>
							<tr>
								<td><code>--drp-opacity-other-month</code></td>
								<td>0.5</td>
							</tr>
							<tr>
								<td><code>--drp-opacity-hover</code></td>
								<td>0.8</td>
							</tr>
							<tr>
								<td><code>--drp-opacity-dragging</code></td>
								<td>0.7</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Weekend hooks (v1.13) -->
		<ShowcaseSection
			titleText="Weekend &amp; Weekday Hooks (v1.13)"
			subtitleText="No defaults shipped — pure theming surface for weekend / per-day styling"
			col1Title="CSS Hooks"
			columnCount={1}
		>
			{#snippet demoContent()}
				<div class="small">
					<p>
						Every day cell carries a numeric weekday attribute and Sat/Sun get an
						additional modifier class. These have <strong>no shipped styling</strong>;
						they exist so you can target weekends or specific days from your own
						stylesheet (via <code>customStylesCallback</code>).
					</p>
					<div class="table-responsive">
						<table class="table table-sm table-bordered api-table">
							<thead>
								<tr>
									<th>Selector</th>
									<th>Matches</th>
								</tr>
							</thead>
							<tbody class="small">
								<tr>
									<td><code>.drp-date-picker__day--weekend</code></td>
									<td>Saturday and Sunday cells</td>
								</tr>
								<tr>
									<td><code>.drp-date-picker__day[data-weekday="0"]</code></td>
									<td>
										Sunday (matches
										<code>Date.prototype.getDay()</code> values 0–6)
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<pre class="mb-0"><code>{`// Highlight Sundays in red, Saturdays in dimmed text
el.customStylesCallback = () => \`
  .drp-date-picker__day[data-weekday="0"] { color: #dc2626; }
  .drp-date-picker__day[data-weekday="6"] { color: #6b7280; }
\`;`}</code></pre>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
