<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Internationalization (i18n)"
	descriptionText="Full localization support with auto-detection, built-in locales, and customizable strings"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				The date picker provides comprehensive internationalization with automatic browser locale
				detection, built-in translations for English, Spanish, German, and French, plus full
				customization options for any language.
			</p>
		</section>

		<!-- Auto-Detection -->
		<ShowcaseSection
			titleText="Automatic Locale Detection"
			subtitleText="Detect and use the browser's language"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					locale="auto"
					placeholder="Automatic locale detection"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Automatically uses your browser's language setting (navigator.language)
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<web-daterangepicker
  selection-mode="single"
  locale="auto"
  placeholder="Auto locale">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new DateRangePicker(inputElement, {
  selectionMode: 'single',
  locale: 'auto',  // Detects browser language
  onSelect: (date) => {
    console.log('Selected:', date);
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>How It Works</h5>
					<ul>
						<li>Detects the user's browser language via <code>navigator.language</code></li>
						<li>Uses built-in translations if available (en, de, fr, es)</li>
						<li>Falls back to English if locale is not supported</li>
						<li>Uses Intl API for weekday/month names in user's language</li>
					</ul>

					<h5>What Gets Localized</h5>
					<ul>
						<li><strong>Weekday names</strong> - Mo, Tu, We... (via Intl API)</li>
						<li><strong>Month names</strong> - January, February... (via Intl API)</li>
						<li><strong>Button labels</strong> - Today, Clear, Apply</li>
						<li><strong>Summary text</strong> - day/days, night/nights</li>
						<li><strong>Week start day</strong> - Sunday or Monday based on locale</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Built-in Locales -->
		<ShowcaseSection
			titleText="Built-in Locales"
			subtitleText="Spanish, German, French, and English"
			demoColumnTitle="Spanish Example"
			controlsColumnTitle="German Example"
			descriptionColumnTitle="Available Locales"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					locale="es"
					visible-months-count="2"
					placeholder="Selecciona un rango de fechas"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Spanish locale with localized UI</p>
			{/snippet}

			{#snippet controlsContent()}
				<web-daterangepicker
					selection-mode="range"
					locale="de"
					visible-months-count="2"
					placeholder="Wählen Sie einen Datumsbereich"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">German locale with localized UI</p>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Built-in Locales</h5>
					<ul>
						<li><code>locale="en"</code> - English</li>
						<li><code>locale="es"</code> - Spanish (Español)</li>
						<li><code>locale="de"</code> - German (Deutsch)</li>
						<li><code>locale="fr"</code> - French (Français)</li>
						<li><code>locale="auto"</code> - Auto-detect from browser</li>
					</ul>

					<h5>Locale Features</h5>
					<p>Each locale includes:</p>
					<ul>
						<li>Translated button labels (Today, Clear, Apply)</li>
						<li>Localized summary text (day/days, night/nights)</li>
						<li>Appropriate week start day (Mon/Sun)</li>
						<li>Month and weekday names from Intl API</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Display Format Masks -->
		<ShowcaseSection
			titleText="Localized Display Formats"
			subtitleText="Show format hints in the user's language"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					locale="es"
					date-format-mask="YYYY-MM-DD"
					display-format-mask="dd/mm/aaaa"
					placeholder="dd/mm/aaaa"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Shows "dd/mm/aaaa" to Spanish users while validating with YYYY-MM-DD
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Spanish: aaaa = año (year) -->
<web-daterangepicker
  locale="es"
  date-format-mask="YYYY-MM-DD"
  display-format-mask="dd/mm/aaaa"
  placeholder="dd/mm/aaaa">
</web-daterangepicker>

<!-- German: jjjj = jahr (year), tt = tag (day) -->
<web-daterangepicker
  locale="de"
  date-format-mask="DD.MM.YYYY"
  display-format-mask="tt.mm.jjjj"
  placeholder="tt.mm.jjjj">
</web-daterangepicker>

<!-- French: jj = jour (day), aa = année (year) -->
<web-daterangepicker
  locale="fr"
  date-format-mask="DD/MM/YYYY"
  display-format-mask="jj/mm/aaaa"
  placeholder="jj/mm/aaaa">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new DateRangePicker(inputElement, {
  locale: 'es',
  dateFormatMask: 'YYYY-MM-DD',      // Validation format
  displayFormatMask: 'dd/mm/aaaa',   // Visual hint
  onSelect: (date) => {
    console.log('Fecha seleccionada:', date);
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Dual Mask System</h5>
					<ul>
						<li>
							<code>date-format-mask</code> - Used for parsing/validation (always English: YYYY,
							MM, DD)
						</li>
						<li>
							<code>display-format-mask</code> - Shown to users as a hint (localized tokens)
						</li>
					</ul>

					<h5>Localized Tokens</h5>
					<ul>
						<li><strong>Spanish:</strong> dd/mm/aaaa (día, mes, año)</li>
						<li><strong>German:</strong> tt.mm.jjjj (tag, monat, jahr)</li>
						<li><strong>French:</strong> jj/mm/aaaa (jour, mois, année)</li>
					</ul>

					<h5>Important</h5>
					<p>
						Both masks must represent the same format structure, just with different language
						tokens. The validation always uses English tokens internally.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Custom Strings -->
		<ShowcaseSection
			titleText="Custom UI Strings (JavaScript API Only)"
			subtitleText="Override built-in button labels using the JavaScript API"
			demoColumnTitle="Limitation"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details"
		>
			{#snippet demoContent()}
				<div class="alert alert-warning">
					<h6>Web Component Limitation</h6>
					<p class="mb-0">
						The <code>customStrings</code> option is <strong>only available when using the JavaScript API</strong>
						(<code>new DateRangePicker(...)</code>). It is <strong>not exposed as a web component attribute or property</strong>.
					</p>
				</div>
				<p class="mt-3 small text-muted">
					To customize UI strings, you must instantiate the date picker using the JavaScript API instead of the web component.
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API - customStrings is available
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const inputElement = document.querySelector('input');
const picker = new DateRangePicker(inputElement, {
  selectionMode: 'range',
  customStrings: {
    today: 'Jump to Today',
    clear: 'Reset Selection',
    apply: 'Confirm Dates',
    day: 'day',
    days: 'days',
    night: 'night',
    nights: 'nights',
    preview: 'Preview'
  }
});`}
					languageType="javascript"
					titleText="JavaScript API"
				/>

				<CodeBlock
					codeContent={`<!-- Web Component - customStrings NOT available -->
<!-- This will NOT work: -->
<web-daterangepicker
  selection-mode="range"
  custom-strings="...">  <!-- ❌ Not supported -->
</web-daterangepicker>

<!-- This will also NOT work: -->
<script>
  const picker = document.querySelector('web-daterangepicker');
  picker.customStrings = {...};  // ❌ Not exposed
</script>`}
					languageType="html"
					titleText="Web Component (Not Supported)"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Available String Keys</h5>
					<p>When using the JavaScript API, you can override these strings:</p>
					<ul>
						<li><code>today</code> - "Today" button label</li>
						<li><code>clear</code> - "Clear" button label</li>
						<li><code>apply</code> - "Apply" button label (range mode)</li>
						<li><code>day</code> - Singular "day" text</li>
						<li><code>days</code> - Plural "days" text</li>
						<li><code>night</code> - Singular "night" text</li>
						<li><code>nights</code> - Plural "nights" text</li>
						<li><code>preview</code> - "Preview" label when dragging</li>
					</ul>

					<h5>Use Cases</h5>
					<ul>
						<li><strong>Branding</strong> - Match your app's voice and tone</li>
						<li><strong>Custom languages</strong> - Languages not in built-in locales</li>
						<li><strong>Domain-specific terms</strong> - "Check-in/Check-out" instead of dates</li>
					</ul>

					<h5>Partial Override</h5>
					<p>Only provide the strings you want to override. Unspecified strings use the current locale's defaults.</p>

					<h5>Alternative: Use Built-in Locales</h5>
					<p>If you just need different languages, use the <code>locale</code> attribute instead (<code>locale="es"</code>, <code>locale="de"</code>, etc.)</p>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
