<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Responsive Behavior"
	descriptionText="How the picker adapts to viewport size — modal width tiers, container-query inner layout, and stable rendering"
>
	<div class="py-1">
		<section class="mb-5">
			<p class="lead">
				The picker has three layers of responsiveness: viewport-tier modal widths, container-query progressive
				inner content, and a stable flex-column scroll layout. They work together so a 6-month grid picker
				behaves correctly from a phone all the way to a 4K display.
			</p>
			<p class="text-muted small">
				This page is about <em>behavior</em>. For when to pick which positioning mode, see
				<a href="/features/positioning-modes">Positioning Modes</a>.
			</p>
		</section>

		<ShowcaseSection
			titleText="RB01 Modal Width Tiers"
			subtitleText="The modal's outer width adapts to viewport size via four CSS variables"
			col1Title="Tiers"
			col2Title="Override CSS"
			col3Title="Details">

			{#snippet demoContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered">
						<thead class="table-secondary">
							<tr>
								<th>Tier</th>
								<th>Viewport</th>
								<th>Default</th>
								<th>Variable</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td><strong>xs</strong></td>
								<td>≤ 480px</td>
								<td><code>calc(100vw − 2 × gap)</code></td>
								<td><code>--drp-modal-width-xs</code></td>
							</tr>
							<tr>
								<td><strong>sm</strong></td>
								<td>481–768px</td>
								<td><code>calc(100vw − 2 × gap)</code></td>
								<td><code>--drp-modal-width-sm</code></td>
							</tr>
							<tr>
								<td><strong>md</strong></td>
								<td>769–1200px</td>
								<td><code>900px</code></td>
								<td><code>--drp-modal-width-md</code></td>
							</tr>
							<tr>
								<td><strong>lg</strong></td>
								<td>≥ 1201px</td>
								<td><code>1100px</code></td>
								<td><code>--drp-modal-width-lg</code></td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="small text-muted">
					Breakpoints align with the rest of the codebase (480 / 768 / 1200, same as <code>_base.css</code>
					and the Responsive Sizing demo's <code>--drp-rem</code> scaling).
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`/* Override per-instance via the host element */
web-daterangepicker {
  --drp-modal-width-md: 75vw;
  --drp-modal-width-lg: 1300px;
}

/* Or globally on :root */
:root {
  --drp-modal-width-xs: calc(100vw - 2 * var(--drp-modal-gap));
  --drp-modal-width-sm: calc(100vw - 2 * var(--drp-modal-gap));
  --drp-modal-width-md: 900px;
  --drp-modal-width-lg: 1100px;
}`}
					languageType="css"
					titleText="CSS"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Why Hardcoded Breakpoints?</h5>
					<p>
						CSS media queries cannot read CSS variables, so the breakpoints themselves are hardcoded in
						<code>_modal.css</code>. Only the widths inside each rule are variable-driven. To shift
						breakpoints, edit <code>_modal.css</code> directly.
					</p>

					<h5>Other Modal Hooks</h5>
					<ul>
						<li><code>--drp-modal-gap</code> — viewport-edge gap (default <code>16px</code>)</li>
						<li><code>--drp-modal-backdrop-bg</code> — scrim color (default <code>rgba(0, 0, 0, 0.45)</code>)</li>
						<li><code>--drp-modal-transition</code> — fade timing (default <code>150ms ease-out</code>)</li>
						<li><code>--drp-z-index-modal</code> / <code>--drp-z-index-modal-backdrop</code></li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="RB02 Progressive Inner-Content Layout"
			subtitleText="The visible month count adapts to the modal's actual width via CSS container queries"
			col1Title="Tiers"
			col2Title="Notes"
			col3Title="Details">

			{#snippet demoContent()}
				<div class="table-responsive">
					<table class="table table-sm table-bordered">
						<thead class="table-secondary">
							<tr>
								<th>Modal width</th>
								<th>Flex layout (single row)</th>
								<th>Grid layout</th>
							</tr>
						</thead>
						<tbody class="small">
							<tr>
								<td>≤ 600px</td>
								<td>1 month visible</td>
								<td>1 column (siblings hidden)</td>
							</tr>
							<tr>
								<td>601–900px</td>
								<td>2 months visible</td>
								<td>2 columns, all months visible (wraps to more rows)</td>
							</tr>
							<tr>
								<td>901–1200px</td>
								<td>3 months visible</td>
								<td>up to 3 columns (capped from configured)</td>
							</tr>
							<tr>
								<td>&gt; 1200px</td>
								<td>Configured count</td>
								<td>Configured grid as-is</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="small text-muted">
					Driven by <code>@container drp-modal (...)</code> rules in <code>_modal.css</code> — no JS state
					changes, no rebuild on resize.
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<div class="alert alert-info small">
					<strong>Why grid keeps all months visible:</strong> a 2×3 configuration is a deliberate layout
					choice — collapsing it to "show fewer months" would surprise the user. Instead, narrow grid
					modals just stack the same months into more rows (2×3 → 3×2 at 601–900px, etc.). Only at the
					very narrow ≤600px tier do we hide siblings, since 6 months stacked vertically would be
					unusably tall on a phone.
				</div>

				<div class="alert alert-light small">
					<strong>Hidden columns still update.</strong> When sibling months are hidden via CSS, they
					still update in lockstep through the existing collision-resolve navigation logic. Range
					selection across "more months than are visible" continues to work — the user just navigates
					time linearly with the visible month's prev/next.
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Container vs Viewport Thresholds</h5>
					<p>
						The thresholds for inner content are based on the <strong>modal's actual width</strong>,
						not the viewport. So a desktop user who overrode <code>--drp-modal-width-lg</code> to
						<code>700px</code> would still get 2-column behavior even on a 1920px monitor — because
						600px ≤ 700px ≤ 900px puts them in the 2-column tier.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="RB03 Stable Calendar Height (Always-6-Week Rendering)"
			subtitleText="Every month renders 6 weeks (42 cells) regardless of how many weeks it actually fits in"
			col1Title="Why"
			col2Title="Effect"
			col3Title="Details">

			{#snippet demoContent()}
				<p>
					Without this, a month that fits in 5 weeks (e.g., October 2026) would leave empty space at
					the bottom when laid out next to a 6-week month (e.g., November 2026) in a grid — rows
					equalize to the tallest item. The visible result was a "gap" between the day grid and the
					next element.
				</p>
				<p>
					Now every month renders exactly 42 cells, spilling into the previous/next month for partial
					rows. Same height every time.
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<div class="alert alert-info small">
					This is the standard convention used by most date pickers (Google, Apple, Bootstrap
					datepicker). Clicking through months no longer makes the calendar jump in size.
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Side Effect</h5>
					<p>
						Single-month inline pickers now show one extra row of dimmed <code>--other-month</code>
						days. That's universally accepted in date-picker UI but is a behavioral change from
						earlier versions.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="RB04 Flex-Column Scroll Layout"
			subtitleText="Inside floating and modal pickers, only the months area scrolls — header and action bar stay pinned"
			col1Title="Architecture"
			col2Title="Sticky regions"
			col3Title="Details">

			{#snippet demoContent()}
				<p>
					Calendars in non-inline modes are now <code>display: flex; flex-direction: column;
					overflow: hidden</code>. The months area is the only scrollable region; the unified header,
					per-month headers, summary, and action bar are all <code>flex-shrink: 0</code> so they don't
					move.
				</p>
				<p>
					Side benefit: the action bar (Today / Clear / Apply) is always visible regardless of how
					tall the multi-month content is.
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`/* From _base.css — applies to floating + modal */
.drp-date-picker:not(.drp-date-picker--inline) {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.drp-date-picker:not(.drp-date-picker--inline) > .drp-date-picker__months,
.drp-date-picker:not(.drp-date-picker--inline) > .drp-date-picker__months--grid {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}

.drp-date-picker:not(.drp-date-picker--inline) > .drp-date-picker__unified-header,
.drp-date-picker:not(.drp-date-picker--inline) > .drp-date-picker__summary,
.drp-date-picker:not(.drp-date-picker--inline) > .drp-date-picker__actions {
  flex-shrink: 0;
}`}
					languageType="css"
					titleText="CSS"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Sticky Per-Month Headers</h5>
					<p>
						The per-month header (month name + prev/next, or static label in unified-navigation
						mode) is <code>position: sticky; top: 0</code> within the scrolling months area:
					</p>
					<ul>
						<li><strong>Single-month layouts:</strong> header always pinned at the top, days scroll under it.</li>
						<li><strong>Horizontal multi-month layouts:</strong> all headers stick simultaneously and form a continuous header strip.</li>
						<li><strong>Grid layouts:</strong> each row's headers stick while that row is being scrolled past, then unstick when the row is fully gone (stacked-sticky behavior).</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
