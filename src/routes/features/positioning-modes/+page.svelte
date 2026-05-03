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

		<ShowcaseSection
			titleText="PM03 Modal Mode"
			subtitleText="Centered overlay with backdrop scrim — solves the small-screen overflow problem"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					id="modal-single"
					selection-mode="range"
					positioning-mode="modal"
					placeholder="Click to open">
				</web-daterangepicker>
				<button class="btn btn-primary mt-2" onclick={() => {
					const el = document.querySelector('#modal-single') as any;
					if (el) el.isOpen = true;
				}}>
					Open modal
				</button>
				<p class="mt-3 small text-muted">Calendar centers in the viewport with a backdrop. Closes via Escape, backdrop click, or completing a selection.</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<web-daterangepicker
  selection-mode="range"
  positioning-mode="modal">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// Open programmatically
document.querySelector('web-daterangepicker').isOpen = true;`}
					languageType="javascript"
					titleText="JavaScript"
				/>

				<CodeBlock
					codeContent={`/* Modal CSS variables for theming */
:root {
  --drp-modal-gap: 16px;                        /* viewport-edge gap */
  --drp-modal-backdrop-bg: rgba(0, 0, 0, 0.45); /* scrim color */
  --drp-modal-transition: 150ms ease-out;       /* fade timing */

  /* Per-tier widths (viewport breakpoints: 480 / 768 / 1200) */
  --drp-modal-width-xs: calc(100vw - 2 * var(--drp-modal-gap));
  --drp-modal-width-sm: calc(100vw - 2 * var(--drp-modal-gap));
  --drp-modal-width-md: 900px;
  --drp-modal-width-lg: 1100px;
}`}
					languageType="css"
					titleText="CSS Variables"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Mobile and small viewports</strong> - multi-month layouts that horizontally overflow in floating mode</li>
						<li><strong>Focus-demanding selection</strong> - when picking dates is the primary task on the screen</li>
						<li><strong>Complex configurations</strong> - 2×3 grids, 6-month layouts that need real estate</li>
					</ul>

					<h5>Closes On</h5>
					<ul>
						<li>Escape key</li>
						<li>Backdrop (scrim) click</li>
						<li>Apply button (range mode)</li>
						<li>Completing a selection (when <code>auto-close="selection"</code>, the default)</li>
					</ul>

					<h5>Behavior Details</h5>
					<ul>
						<li>Body scroll is locked while open</li>
						<li>Input is <code>blur()</code>-ed on open (suppresses mobile soft keyboard) and re-focused on close</li>
						<li>Per-month headers stick to the top of the scrolling months area; the action bar (Today/Clear/Apply) sticks to the bottom</li>
						<li><code>closeOnScroll</code> is a no-op in modal mode</li>
						<li>Inner content collapses to fewer columns when the modal is narrow (see <a href="/features/responsive-behavior">Responsive Behavior</a>)</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="PM04 Auto-Engage on Small Viewports"
			subtitleText="Float on desktop, modal on mobile — flip automatically based on viewport size"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					positioning-mode="floating"
					mobile-modal-breakpoint="768px"
					mobile-modal-min-height="500px"
					visible-months-count="2"
					placeholder="Floating now, modal when small">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Floating below 768px wide <strong>or</strong> 500px tall switches to modal. Resize the window in both dimensions to test.
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<web-daterangepicker
  selection-mode="range"
  positioning-mode="floating"
  mobile-modal-breakpoint="768px"
  mobile-modal-min-height="500px"
  visible-months-count="2">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Attributes</h5>
					<ul>
						<li><code>mobile-modal-breakpoint="768px"</code> — viewport <strong>width</strong> threshold (accepts any CSS length: <code>"640"</code>, <code>"640px"</code>, <code>"40em"</code>)</li>
						<li><code>mobile-modal-min-height="500px"</code> — viewport <strong>height</strong> threshold</li>
					</ul>
					<p>If both are set they OR — modal engages when <strong>either</strong> matches; switches back to floating only when <strong>both</strong> are clear.</p>

					<h5>How It Works</h5>
					<ul>
						<li>A <code>matchMedia</code> listener flips the <code>positioning-mode</code> attribute between <code>floating</code> and <code>modal</code> as the viewport crosses the threshold.</li>
						<li>Selection survives the transition because the input value persists across rebuild and the fresh init re-parses it.</li>
						<li>Only auto-engages when the configured mode is <code>floating</code>. Pickers explicitly set to <code>inline</code> or <code>modal</code> are left alone.</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
