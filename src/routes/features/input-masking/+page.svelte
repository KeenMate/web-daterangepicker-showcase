<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Input Masking"
	descriptionText="Automatic formatting and validation as users type dates"
>
	<div class="py-1">
		<section class="mb-5">
			<p class="lead">
				Input masking provides real-time formatting guidance and validation, making manual date entry
				easier and reducing input errors.
			</p>
		</section>

		<ShowcaseSection
			titleText="Basic Input Masking"
			subtitleText="Automatic formatting as you type"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<date-range-picker
					selection-mode="single"
					date-format="MM/DD/YYYY"
					enable-input-mask="true"
					placeholder="MM/DD/YYYY">
				</date-range-picker>
				<p class="mt-3 small text-muted">Try typing: 12252024 - it becomes 12/25/2024</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="single"
  date-format="MM/DD/YYYY"
  enable-input-mask="true"
  placeholder="MM/DD/YYYY">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  dateFormat: 'MM/DD/YYYY',
  enableInputMask: true,
  onInvalidInput: (value) => {
    console.log('Invalid input:', value);
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>How It Works</h5>
					<p>As users type numbers, separators are automatically inserted according to the date format:</p>
					<ul>
						<li>Type <code>12252024</code> → Displays <code>12/25/2024</code></li>
						<li>Type <code>25122024</code> with DD/MM format → <code>25/12/2024</code></li>
					</ul>

					<h5>Benefits</h5>
					<ul>
						<li><strong>Error prevention</strong> - Visual format guidance</li>
						<li><strong>Faster input</strong> - No need to type separators</li>
						<li><strong>Better UX</strong> - Immediate visual feedback</li>
					</ul>

					<h5>Key Option</h5>
					<ul>
						<li><code>enable-input-mask="true"</code> - Activates input masking</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="Different Format Masks"
			subtitleText="Masking adapts to your date format"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<date-range-picker
					selection-mode="single"
					date-format="YYYY-MM-DD"
					enable-input-mask="true"
					placeholder="YYYY-MM-DD">
				</date-range-picker>
				<p class="mt-3 small text-muted">ISO format: type 20241225 → 2024-12-25</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- US Format -->
<date-range-picker
  date-format="MM/DD/YYYY"
  enable-input-mask="true">
</date-range-picker>

<!-- European Format -->
<date-range-picker
  date-format="DD.MM.YYYY"
  enable-input-mask="true">
</date-range-picker>

<!-- ISO Format -->
<date-range-picker
  date-format="YYYY-MM-DD"
  enable-input-mask="true">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

// US format with /
const picker1 = new PureDatePicker(input1, {
  dateFormat: 'MM/DD/YYYY',
  enableInputMask: true
});

// European format with .
const picker2 = new PureDatePicker(input2, {
  dateFormat: 'DD.MM.YYYY',
  enableInputMask: true
});

// ISO format with -
const picker3 = new PureDatePicker(input3, {
  dateFormat: 'YYYY-MM-DD',
  enableInputMask: true
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Format Examples</h5>
					<ul>
						<li><code>MM/DD/YYYY</code> - 12252024 → 12/25/2024</li>
						<li><code>DD.MM.YYYY</code> - 25122024 → 25.12.2024</li>
						<li><code>YYYY-MM-DD</code> - 20241225 → 2024-12-25</li>
						<li><code>DD MM YYYY</code> - 25122024 → 25 12 2024</li>
					</ul>

					<h5>Automatic Separator Detection</h5>
					<p>The mask automatically uses the separator defined in your <code>date-format</code> property.</p>

					<h5>Supported Separators</h5>
					<ul>
						<li><code>/</code> - Slash</li>
						<li><code>-</code> - Dash</li>
						<li><code>.</code> - Period</li>
						<li><code> </code> - Space</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="Validation and Error Handling"
			subtitleText="Real-time input validation"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<CodeBlock
					codeContent={`const picker = document.querySelector('date-range-picker');

picker.addEventListener('input-invalid', (e) => {
  console.log('Invalid input detected:', e.detail.value);
  console.log('Reason:', e.detail.reason);
  
  // Show error message
  showError('Please enter a valid date');
});

picker.addEventListener('input-valid', (e) => {
  console.log('Valid date entered:', e.detail.date);
  hideError();
});`}
					languageType="javascript"
					titleText="Event Handling"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  enableInputMask: true,
  dateFormat: 'MM/DD/YYYY',
  validateOnInput: true,
  
  onInvalidInput: (value, reason) => {
    // value: what user typed
    // reason: 'format', 'range', 'date-invalid'
    console.log('Invalid:', value, reason);
  },
  
  onValidInput: (date) => {
    console.log('Valid date:', date);
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Validation Types</h5>
					<ul>
						<li><strong>Format validation</strong> - Ensures input matches date format</li>
						<li><strong>Date validity</strong> - Checks for valid dates (no Feb 30)</li>
						<li><strong>Range validation</strong> - Respects min/max date constraints</li>
					</ul>

					<h5>Events</h5>
					<ul>
						<li><code>input-invalid</code> - Fired when input is invalid</li>
						<li><code>input-valid</code> - Fired when complete valid date entered</li>
					</ul>

					<h5>Error Reasons</h5>
					<ul>
						<li><code>format</code> - Doesn't match expected format</li>
						<li><code>date-invalid</code> - Not a real date</li>
						<li><code>range</code> - Outside min/max range</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
