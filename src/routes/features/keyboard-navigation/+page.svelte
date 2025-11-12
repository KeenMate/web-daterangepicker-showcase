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
				<date-range-picker
					selection-mode="single"
					keyboard-navigation="true"
					placeholder="Click input, then use arrow keys">
				</date-range-picker>
				<p class="mt-3 small text-muted">Click input, then try: Arrow keys, Enter, Escape, Tab</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="single"
  keyboard-navigation="true"
  placeholder="Use keyboard to navigate">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  keyboardNavigation: true,
  onKeyboardSelect: (date) => {
    console.log('Selected via keyboard:', date);
  }
});`}
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

					<h5>Key Option</h5>
					<ul>
						<li><code>keyboard-navigation="true"</code> - Enables keyboard controls (default: true)</li>
					</ul>
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
				<date-range-picker
					selection-mode="range"
					keyboard-navigation="true"
					keyboard-shortcuts="true"
					visible-months-count="2"
					placeholder="Try keyboard shortcuts">
				</date-range-picker>
				<p class="mt-3 small text-muted">Try: T (today), PageUp/PageDown (months), Home/End</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="range"
  keyboard-navigation="true"
  keyboard-shortcuts="true"
  placeholder="Keyboard shortcuts enabled">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  keyboardNavigation: true,
  keyboardShortcuts: true,
  customShortcuts: {
    'ctrl+t': () => {
      // Custom shortcut: Ctrl+T for today
      picker.selectDate(new Date());
    },
    'shift+home': () => {
      // Custom: Shift+Home for start of year
      const year = new Date().getFullYear();
      picker.goToDate(new Date(year, 0, 1));
    }
  }
});`}
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

					<h5>Range Mode Shortcuts</h5>
					<ul>
						<li><code>Shift + Arrow</code> - Extend selection</li>
						<li><code>Ctrl + A</code> - Select full month</li>
					</ul>

					<h5>Custom Shortcuts</h5>
					<p>Define your own keyboard shortcuts using the <code>customShortcuts</code> option.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="Screen Reader Support"
			subtitleText="Full ARIA compliance for accessibility"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<CodeBlock
					codeContent={`<!-- Calendar has full ARIA attributes -->
<date-range-picker
  selection-mode="single"
  keyboard-navigation="true"
  aria-label="Select appointment date"
  placeholder="Accessible date picker">
</date-range-picker>

<!-- Screen reader announces: -->
<!-- "Date picker, Select appointment date" -->
<!-- "Calendar grid, November 2024" -->
<!-- "Monday, November 7, 2024" (as user navigates) -->
<!-- "Selected Monday, November 7, 2024" (on selection) -->`}
					languageType="html"
					titleText="ARIA Example"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  keyboardNavigation: true,
  ariaLabel: 'Select appointment date',
  ariaDescribedBy: 'date-instructions',
  announceSelections: true,
  
  // Custom announcements
  customAnnouncements: {
    dateSelected: (date) => {
      return \`Selected \${date.toLocaleDateString()}\`;
    },
    monthChanged: (month, year) => {
      return \`Showing \${month} \${year}\`;
    }
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>ARIA Attributes</h5>
					<ul>
						<li><code>role="dialog"</code> - Calendar popup identified as dialog</li>
						<li><code>role="grid"</code> - Calendar dates in grid structure</li>
						<li><code>aria-label</code> - Descriptive label for calendar</li>
						<li><code>aria-selected</code> - Marks selected dates</li>
						<li><code>aria-disabled</code> - Marks disabled dates</li>
					</ul>

					<h5>Announcements</h5>
					<p>Screen readers announce:</p>
					<ul>
						<li>Date focused during navigation</li>
						<li>Date selected</li>
						<li>Month/year changes</li>
						<li>Disabled dates with reason</li>
					</ul>

					<h5>Standards Compliance</h5>
					<ul>
						<li>WCAG 2.1 Level AA compliant</li>
						<li>ARIA 1.2 date picker pattern</li>
						<li>Tested with NVDA, JAWS, VoiceOver</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
