<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Keyboard Navigation"
	descriptionText="Full keyboard accessibility with arrow keys, shortcuts, and screen reader support"
>
	<div class="py-1">
		<section class="mb-5">
			<p class="lead">
				Navigate and select dates entirely using the keyboard. Supports arrow key navigation,
				common shortcuts, and full ARIA compliance for screen readers.
			</p>
		</section>

		<ShowcaseSection
			titleText="KN01 Keyboard Navigation & Shortcuts"
			subtitleText="Full keyboard control with arrows, shortcuts, and multi-month support"
			col1Title="Live Demo"
			col2Title="All Keyboard Controls"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					visible-months-count="2"
					placeholder="Click, then use keyboard">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Try: Arrow keys, T (today), PageUp/PageDown, Home/End, Ctrl+Home/End, Tab
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose">
					<h5>Arrow Keys</h5>
					<ul>
						<li><code>← Left</code> - Previous day</li>
						<li><code>→ Right</code> - Next day</li>
						<li><code>↑ Up</code> - Same day previous week</li>
						<li><code>↓ Down</code> - Same day next week</li>
					</ul>

					<h5>Selection</h5>
					<ul>
						<li><code>Enter / Space</code> - Select focused date</li>
						<li><code>Escape</code> - Close calendar</li>
					</ul>

					<h5>Quick Navigation</h5>
					<ul>
						<li><code>T</code> - Jump to today</li>
						<li><code>Home</code> - First day of month (repeat: prev month)</li>
						<li><code>End</code> - Last day of month (repeat: next month)</li>
						<li><code>Page Up</code> - Previous month</li>
						<li><code>Page Down</code> - Next month</li>
					</ul>

					<h5>Year Navigation</h5>
					<ul>
						<li><code>Ctrl + Home</code> - First day of year (repeat: prev year)</li>
						<li><code>Ctrl + End</code> - Last day of year (repeat: next year)</li>
						<li><code>Ctrl + ← / →</code> - Previous/next month</li>
					</ul>

					<h5>Multi-Month Mode</h5>
					<ul>
						<li><code>Tab</code> - Switch to next month column</li>
						<li><code>Shift + Tab</code> - Switch to previous month column</li>
					</ul>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Always Enabled</h5>
					<p>Keyboard navigation is always enabled by default. No configuration needed.</p>

					<h5>Boundary Aware</h5>
					<p>
						All navigation shortcuts respect <code>rolling-year-range</code>, <code>min-date</code>,
						and <code>max-date</code> constraints. You cannot navigate outside the allowed date range.
					</p>

					<h5>Accessibility</h5>
					<p>Full keyboard support is essential for:</p>
					<ul>
						<li>Screen reader users</li>
						<li>Users with motor impairments</li>
						<li>Power users who prefer keyboard</li>
						<li>WCAG 2.1 compliance</li>
					</ul>

					<h5>Code Example</h5>
					<CodeBlock
						codeContent={`<!-- Just use the component - keyboard works automatically -->
<web-daterangepicker
  selection-mode="range"
  visible-months-count="2">
</web-daterangepicker>`}
						languageType="html"
					/>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
