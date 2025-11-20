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
			titleText="Arrow Key Navigation"
			subtitleText="Navigate calendar dates with keyboard arrows"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					placeholder="Click input, then use arrow keys">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Click input, then try: Arrow keys, Enter, Escape, Tab</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="single"
  placeholder="Use keyboard to navigate">
</web-daterangepicker>

<!-- Keyboard navigation works automatically -->`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  onSelect: (date) => {
    console.log('Selected date:', date);
  }
});

// Keyboard navigation is always enabled`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Arrow Key Controls</h5>
					<ul>
						<li><code>← Left Arrow</code> - Previous day</li>
						<li><code>→ Right Arrow</code> - Next day</li>
						<li><code>↑ Up Arrow</code> - Same day previous week</li>
						<li><code>↓ Down Arrow</code> - Same day next week</li>
					</ul>

					<h5>Selection Keys</h5>
					<ul>
						<li><code>Enter / Space</code> - Select focused date</li>
						<li><code>Escape</code> - Close calendar without selecting</li>
					</ul>

					<h5>Accessibility</h5>
					<p>Keyboard navigation is essential for accessibility and power users who prefer keyboard-only interaction.</p>

					<h5>Always Enabled</h5>
					<p>Keyboard navigation is always enabled by default. No configuration needed.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="Keyboard Shortcuts"
			subtitleText="Quick navigation with shortcut keys"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					visible-months-count="2"
					placeholder="Try keyboard shortcuts">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Try: T (today), PageUp/PageDown (months), Home/End</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="range"
  placeholder="Keyboard shortcuts work by default">
</web-daterangepicker>

<!-- Keyboard navigation is always enabled -->
<!-- No special attributes needed -->`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

// Keyboard shortcuts work automatically
const picker = new PureDatePicker(inputElement, {
  selectionMode: 'range',
  onSelect: (dateRange) => {
    console.log('Selected:', dateRange);
  }
});

// No special keyboard options needed
// T, Home, End, PageUp, PageDown work out of the box`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Built-in Shortcuts</h5>
					<ul>
						<li><code>T</code> - Jump to today</li>
						<li><code>Home</code> - First day of current month</li>
						<li><code>End</code> - Last day of current month</li>
						<li><code>Page Up</code> - Previous month</li>
						<li><code>Page Down</code> - Next month</li>
						<li><code>Ctrl + Home</code> - First day of year</li>
						<li><code>Ctrl + End</code> - Last day of year</li>
					</ul>

					<h5>Always Enabled</h5>
					<p>Keyboard navigation and shortcuts are always enabled by default. No configuration required.</p>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
