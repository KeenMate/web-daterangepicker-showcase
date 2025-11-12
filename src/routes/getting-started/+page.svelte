<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	let demoValue = $state('');

	onMount(() => {
		// Import the web component
		import('@keenmate/web-daterangepicker');

		const demo = document.getElementById('demo-picker');
		if (demo) {
			demo.addEventListener('date-select', (e: any) => {
				if (e.detail.date) {
					demoValue = e.detail.date.toLocaleDateString();
				}
			});
		}
	});
</script>

<DocLayout
	titleText="Getting Started"
	descriptionText="Learn how to install and use the Web Date Range Picker in your project"
>
	<div class="py-1">
		<!-- Installation -->
		<section class="mb-5">
			<h2 class="mb-4">Installation</h2>
			<p class="lead mb-3">Install the package via npm:</p>
			<CodeBlock
				codeContent="npm install @keenmate/web-daterangepicker"
				languageType="bash"
				titleText="NPM"
			/>
		</section>

		<!-- Web Component Usage -->
		<section class="mb-5">
			<h2 class="mb-4">Web Component Usage</h2>
			<p>The simplest way to use the date picker is as a web component:</p>

			<CodeBlock
				codeContent={`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@keenmate/web-daterangepicker/dist/style.css">
  <script type="module" src="node_modules/@keenmate/web-daterangepicker/dist/date-range-picker.js"></script>
</head>
<body>
  <date-range-picker
    selection-mode="single"
    date-format-mask="YYYY-MM-DD"
    placeholder="Select a date">
  </date-range-picker>

  <script>
    const picker = document.querySelector('date-range-picker');
    picker.addEventListener('date-select', (e) => {
      console.log('Selected:', e.detail.date);
    });
  </script>
</body>
</html>`}
				languageType="html"
				titleText="HTML Example"
			/>

			<div class="demo-container mt-4">
				<h4>Try it:</h4>
				<date-range-picker
					id="demo-picker"
					selection-mode="single"
					placeholder="Select a date"
				></date-range-picker>
				{#if demoValue}
					<div class="demo-output">Selected: {demoValue}</div>
				{/if}
			</div>
		</section>

		<!-- JavaScript API Usage -->
		<section class="mb-5">
			<h2 class="mb-4">JavaScript API Usage</h2>
			<p>For more control, use the JavaScript API:</p>

			<CodeBlock
				codeContent={`import { PureDatePicker } from '@keenmate/web-daterangepicker';
import '@keenmate/web-daterangepicker/dist/style.css';

const inputElement = document.querySelector('#myInput');

const picker = new PureDatePicker(inputElement, {
  selectionMode: 'single',
  dateFormatMask: 'YYYY-MM-DD',
  onSelect: (date) => {
    console.log('Selected date:', date);
  }
});`}
				languageType="javascript"
				titleText="JavaScript"
			/>
		</section>

		<!-- Basic Options -->
		<section class="mb-5">
			<h2 class="mb-4">Basic Options</h2>
			<p>Here are some commonly used options:</p>

			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr>
							<th>Option</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>selectionMode</code></td>
							<td><code>'single' | 'range'</code></td>
							<td><code>'single'</code></td>
							<td>Whether to select a single date or a range</td>
						</tr>
						<tr>
							<td><code>dateFormatMask</code></td>
							<td><code>string</code></td>
							<td><code>'YYYY-MM-DD'</code></td>
							<td>Format for date values</td>
						</tr>
						<tr>
							<td><code>visibleMonthsCount</code></td>
							<td><code>number</code></td>
							<td><code>1</code></td>
							<td>Number of months to display</td>
						</tr>
						<tr>
							<td><code>locale</code></td>
							<td><code>string</code></td>
							<td><code>'auto'</code></td>
							<td>Locale for UI strings and date formatting</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Debugging -->
		<section class="mb-5">
			<h2 class="mb-4">Debugging</h2>
			<p>Enable debug logging during development to troubleshoot issues:</p>

			<CodeBlock
				codeContent={`<!-- Add show-debug-info attribute -->
<date-range-picker
  selection-mode="range"
  show-debug-info>
</date-range-picker>`}
				languageType="html"
				titleText="Enable Debugging"
			/>

			<div class="alert alert-info mt-3">
				<strong>📝 Debug Logging Features:</strong>
				<ul class="mb-0 mt-2">
					<li><strong>Categorized logs</strong>: INIT, NAVIGATION, UI, RENDERING, SELECTION, VALIDATION, DRAG, INTERACTION</li>
					<li><strong>Timestamps</strong>: Millisecond precision for performance analysis</li>
					<li><strong>Function context</strong>: Each log shows which function and operation</li>
					<li><strong>Filterable</strong>: Use browser console filters to find specific issues</li>
				</ul>
			</div>

			<p class="mt-3">Example console output:</p>
			<CodeBlock
				codeContent={`[14:23:15.420] [DEBUG] [INIT] Week starts on day: 1
[14:23:15.425] [DEBUG] [INIT] Creating calendar
[14:23:15.428] [DEBUG] [RENDERING] renderCalendar() called
[14:23:15.430] [DEBUG] [UI] show() - adding visible class
[14:23:45.122] [DEBUG] [VALIDATION] validateRangeAsync called - mode: block
[14:23:45.125] [DEBUG] [VALIDATION] BLOCK mode - adjusted end: Fri Jan 05 2025`}
				languageType="text"
				titleText="Console Output"
			/>

			<p class="mt-3">
				<strong>⚠️ Important:</strong> Only enable debug logging during development. Never ship with
				<code>show-debug-info</code> enabled in production.
			</p>

			<p>
				For complete debugging documentation, see the
				<a href="https://github.com/keenmate/web-daterangepicker/blob/main/API.md#debugging--logging" target="_blank">Debugging & Logging</a> section in the API reference.
			</p>
		</section>

		<!-- Next Steps -->
		<section class="mb-5">
			<h2 class="mb-4">Next Steps</h2>
			<p>Explore the features and customization options:</p>
			<div class="d-flex gap-3">
				<a href="/features/selection-modes" class="btn btn-primary">Explore Features</a>
				<a href="/api" class="btn btn-outline-primary">API Reference</a>
			</div>
		</section>
	</div>
</DocLayout>
