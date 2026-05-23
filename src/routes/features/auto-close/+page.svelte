<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Auto-Close Behavior"
	descriptionText="Control when and how the calendar closes after selection"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				The <code>auto-close</code> attribute controls when the calendar automatically closes.
				Combined with button visibility options, you can create various interaction patterns.
			</p>
		</section>

		<!-- Auto-Close Selection -->
		<ShowcaseSection
			titleText="AC01 Auto-Close on Selection (Default)"
			subtitleText="Calendar closes immediately when selection is complete"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					auto-close="selection"
					placeholder="Select date range">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Select two dates - calendar closes automatically</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Default behavior -->
<web-daterangepicker
  selection-mode="range"
  auto-close="selection">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  autoClose: 'selection' // default
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Behavior</h5>
					<ul>
						<li>Calendar closes when selection completes (both dates selected)</li>
						<li>Input value updates immediately</li>
						<li>Events fire immediately</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Quick selection</strong> - Minimal user interaction</li>
						<li><strong>Mobile-friendly</strong> - Less screen time</li>
						<li><strong>Simple forms</strong> - One-step date selection</li>
					</ul>

					<h5>Key Option</h5>
					<ul>
						<li><code>auto-close="selection"</code> - Default value</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Auto-Close Apply -->
		<ShowcaseSection
			titleText="AC02 Auto-Close on Apply Only"
			subtitleText="Selection is deferred until Apply button is clicked"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					auto-close="apply"
					placeholder="Select and confirm">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Select dates, then click Apply to confirm</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Require explicit Apply -->
<web-daterangepicker
  selection-mode="range"
  auto-close="apply">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  autoClose: 'apply'
});

// Selection is deferred
// Input updates only after Apply click
// Events fire only after Apply click`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Behavior</h5>
					<ul>
						<li>Calendar shows Apply button automatically</li>
						<li>Selection is visual only until Apply is clicked</li>
						<li>Input value updates on Apply</li>
						<li>Events fire on Apply</li>
						<li>Closing without Apply reverts selection</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Review before commit</strong> - User can verify selection</li>
						<li><strong>Complex workflows</strong> - Allow adjustments</li>
						<li><strong>Prevent accidents</strong> - Explicit confirmation</li>
					</ul>

					<h5>Key Option</h5>
					<ul>
						<li><code>auto-close="apply"</code> - Defers selection to Apply</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Auto-Close Never -->
		<ShowcaseSection
			titleText="AC03 Never Auto-Close"
			subtitleText="Calendar stays open, selection commits immediately"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					auto-close="never"
					show-apply-button="true"
					placeholder="Select dates">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Calendar stays open - click Apply or outside to close</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Never auto-close -->
<web-daterangepicker
  selection-mode="range"
  auto-close="never"
  show-apply-button="true">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  autoClose: 'never',
  showApplyButton: true
});

// Selection commits immediately
// Apply button closes the calendar
// User can also click outside to close`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Behavior</h5>
					<ul>
						<li>Calendar never closes automatically on selection</li>
						<li>Selection commits immediately to input</li>
						<li>Apply button closes the calendar (optional)</li>
						<li>Click outside also closes</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Multiple adjustments</strong> - User can refine selection</li>
						<li><strong>Exploration</strong> - Browse dates freely</li>
						<li><strong>Dashboard widgets</strong> - Persistent calendar</li>
					</ul>

					<h5>Key Options</h5>
					<ul>
						<li><code>auto-close="never"</code> - Prevents auto-close</li>
						<li><code>show-apply-button="true"</code> - Provides explicit close</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Button Visibility -->
		<ShowcaseSection
			titleText="AC04 Button & Summary Visibility Control"
			subtitleText="Customize which buttons and the days/nights summary appear in the calendar footer"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<div class="mb-3">
					<label class="small text-muted d-block mb-1">Only Apply button:</label>
					<web-daterangepicker
						selection-mode="range"
						auto-close="apply"
						show-today-button="false"
						show-clear-button="false"
						placeholder="Apply only">
					</web-daterangepicker>
				</div>

				<div class="mb-3">
					<label class="small text-muted d-block mb-1">All buttons:</label>
					<web-daterangepicker
						selection-mode="range"
						auto-close="never"
						show-today-button="true"
						show-clear-button="true"
						show-apply-button="true"
						placeholder="All buttons">
					</web-daterangepicker>
				</div>

				<div class="mb-3">
					<label class="small text-muted d-block mb-1">No buttons:</label>
					<web-daterangepicker
						selection-mode="range"
						auto-close="selection"
						show-today-button="false"
						show-clear-button="false"
						show-apply-button="false"
						placeholder="No buttons">
					</web-daterangepicker>
				</div>

				<div>
					<label class="small text-muted d-block mb-1">
						Range mode without the days/nights summary (v1.12):
					</label>
					<web-daterangepicker
						selection-mode="range"
						show-summary="false"
						placeholder="No summary line">
					</web-daterangepicker>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Only Apply button -->
<web-daterangepicker
  auto-close="apply"
  show-today-button="false"
  show-clear-button="false">
</web-daterangepicker>

<!-- All buttons -->
<web-daterangepicker
  auto-close="never"
  show-today-button="true"
  show-clear-button="true"
  show-apply-button="true">
</web-daterangepicker>

<!-- No buttons -->
<web-daterangepicker
  auto-close="selection"
  show-today-button="false"
  show-clear-button="false"
  show-apply-button="false">
</web-daterangepicker>

<!-- Hide the range days/nights summary (v1.12+) -->
<web-daterangepicker
  selection-mode="range"
  show-summary="false">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Button Options</h5>
					<ul>
						<li><code>show-today-button</code> - Jump to today (default: true)</li>
						<li><code>show-clear-button</code> - Clear selection (default: true)</li>
						<li><code>show-apply-button</code> - Confirm/close (default: true for range/multiple)</li>
						<li>
							<code>show-summary</code> <span class="badge bg-info text-dark">v1.12</span> -
							Days/nights summary line in range mode (default: true). Set to
							<code>false</code> to remove the line entirely (no empty-div height jump).
						</li>
					</ul>

					<h5>Common Patterns</h5>
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Pattern</th>
								<th>auto-close</th>
								<th>Buttons</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Quick select</td>
								<td>selection</td>
								<td>None or Today only</td>
							</tr>
							<tr>
								<td>Confirm flow</td>
								<td>apply</td>
								<td>Apply required</td>
							</tr>
							<tr>
								<td>Exploration</td>
								<td>never</td>
								<td>All buttons</td>
							</tr>
						</tbody>
					</table>

					<h5>Notes</h5>
					<p class="small text-muted">
						With <code>auto-close="apply"</code>, the Apply button is always shown
						regardless of <code>show-apply-button</code> setting.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Custom Preset Buttons -->
		<ShowcaseSection
			titleText="AC05 Custom Preset Buttons"
			subtitleText="Programmatically set dates with custom action buttons"
			col1Title="Code Example"
			col2Title="Best Practices"
			col3Title="Details">

			{#snippet demoContent()}
				<CodeBlock
					codeContent={`// Custom preset button example
picker.actionButtons = [
  {
    action: 'custom',
    text: 'Last Week',
    onClick: (picker) => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      // Calculate Monday of last week
      const daysToLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const lastMonday = new Date(today);
      lastMonday.setDate(today.getDate() - daysToLastMonday - 7);
      const lastSunday = new Date(lastMonday);
      lastSunday.setDate(lastMonday.getDate() + 6);

      // Set dates
      picker.selectedStartDate = lastMonday;
      picker.selectedEndDate = lastSunday;

      // Clear focus state (important!)
      picker.focusedDayIndex = null;

      // Re-render
      picker.renderCalendar();
      picker.updateSummary();
    }
  },
  { action: 'apply', text: 'Apply' }
];`}
					languageType="javascript"
					titleText="Custom Preset"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose">
					<h5>Required Steps</h5>
					<ol>
						<li>Set <code>selectedStartDate</code> and <code>selectedEndDate</code></li>
						<li>Clear <code>focusedDayIndex = null</code> to remove old focus indicator</li>
						<li>Call <code>renderCalendar()</code> to update display</li>
						<li>Call <code>updateSummary()</code> to update the summary text</li>
					</ol>

					<h5>Why Clear focusedDayIndex?</h5>
					<p class="small text-muted">
						If a user clicks a date before using a preset button, the focus indicator
						(dotted border) remains on that date. Setting <code>focusedDayIndex = null</code>
						clears this visual state so only the new range is highlighted.
					</p>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Action Button Properties</h5>
					<ul>
						<li><code>action: 'custom'</code> - Custom onClick handler</li>
						<li><code>text</code> - Button label</li>
						<li><code>onClick(picker)</code> - Handler receives picker instance</li>
					</ul>

					<h5>Built-in Actions</h5>
					<ul>
						<li><code>action: 'today'</code> - Jump to today</li>
						<li><code>action: 'clear'</code> - Clear selection</li>
						<li><code>action: 'apply'</code> - Apply and close</li>
					</ul>

					<h5>Tip</h5>
					<p class="small text-muted">
						The Apply button will commit any selected dates to the input,
						even if they were set programmatically via custom buttons.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Comparison Table -->
		<ShowcaseSection
			titleText="AC06 Mode Comparison"
			subtitleText="Quick reference for auto-close behavior"
			col1Title="Behavior Matrix"
			col2Title=""
			col3Title="">

			{#snippet demoContent()}
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Mode</th>
							<th>Closes on Selection</th>
							<th>Input Updates</th>
							<th>Events Fire</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>selection</code></td>
							<td>Yes (immediately)</td>
							<td>Immediately</td>
							<td>Immediately</td>
						</tr>
						<tr>
							<td><code>apply</code></td>
							<td>On Apply click</td>
							<td>On Apply</td>
							<td>On Apply</td>
						</tr>
						<tr>
							<td><code>never</code></td>
							<td>Manual only</td>
							<td>Immediately</td>
							<td>Immediately</td>
						</tr>
					</tbody>
				</table>
			{/snippet}

			{#snippet controlsContent()}
			{/snippet}

			{#snippet descriptionContent()}
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
