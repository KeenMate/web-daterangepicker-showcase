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
			titleText="INT01 Automatic Locale Detection"
			subtitleText="Detect and use the browser's language"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
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
			titleText="INT02 Built-in Locales"
			subtitleText="Spanish, German, French, and English"
			col1Title="Spanish Example"
			col2Title="German Example"
			col3Title="Available Locales"
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
			titleText="INT03 Localized Display Formats"
			subtitleText="Show format hints in the user's language"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					locale="es"
					date-format-mask="DD/MM/YYYY"
					placeholder="dd/mm/aaaa"
				>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Spanish locale with DD/MM/YYYY format (día/mes/año)
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Spanish: DD/MM/YYYY format -->
<web-daterangepicker
  locale="es"
  date-format-mask="DD/MM/YYYY"
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
			titleText="INT04 Custom UI Strings &amp; Month Names"
			subtitleText="Override built-in labels via property setters (v1.13+)"
			col1Title="customStrings"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<div class="alert alert-success">
					<h6>Property setters (v1.13)</h6>
					<p class="mb-2">
						<code>customStrings</code> and <code>monthNames</code> are <strong>property setters</strong>
						on the web component — set them in JavaScript after the element is in the DOM.
						They aren't HTML attributes because both accept structured data.
					</p>
					<p class="mb-0 small text-muted">
						Pre-v1.13 the web component required the JavaScript-API path
						(<code>new DateRangePicker()</code>); v1.13 lifted that limitation.
					</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- 1. Place the element -->
<web-daterangepicker id="my-picker" selection-mode="range">
</web-daterangepicker>

<script type="module">
  // 2. Wait for the upgrade, then assign the property
  customElements.whenDefined('web-daterangepicker').then(() => {
    const el = document.getElementById('my-picker');

    el.customStrings = {
      today: 'Jump to Today',
      clear: 'Reset Selection',
      apply: 'Confirm Dates',
      day: 'day',
      days: 'days',
      night: 'night',
      nights: 'nights',
      preview: 'Preview'
    };

    // Optional: override the auto-detected month names
    el.monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril',
      'Mayo', 'Junio', 'Julio', 'Agosto',
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  });
</script>`}
					languageType="html"
					titleText="Web Component (v1.13+)"
				/>

				<CodeBlock
					codeContent={`// JavaScript API path is unchanged
import { DateRangePicker } from '@keenmate/web-daterangepicker';

const picker = new DateRangePicker(inputElement, {
  selectionMode: 'range',
  customStrings: { today: 'Jump to Today', apply: 'Confirm Dates' },
  monthNames: [/* 12 strings */]
});`}
					languageType="javascript"
					titleText="JavaScript API"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Available String Keys (<code>customStrings</code>)</h5>
					<ul>
						<li><code>today</code> — "Today" button label</li>
						<li><code>clear</code> — "Clear" button label</li>
						<li><code>apply</code> — "Apply" button label (range mode)</li>
						<li><code>day</code> / <code>days</code> — Day count</li>
						<li><code>night</code> / <code>nights</code> — Night count</li>
						<li><code>preview</code> — "Preview" label when dragging</li>
					</ul>

					<h5>Partial Override</h5>
					<p>
						Only provide the strings you want to override. Unspecified strings
						fall back to the current locale's defaults.
					</p>

					<h5>Pre-Upgrade Assignment</h5>
					<p>
						You can assign the property <em>before</em> the
						<code>web-daterangepicker</code> custom element is defined — Custom
						Elements v1 lifts pre-upgrade properties into the upgraded element. The
						<code>whenDefined</code> dance above is the cautious pattern; a plain
						<code>el.customStrings = …</code> right after the element is parsed
						works too.
					</p>

					<h5>Alternative: Use Built-in Locales</h5>
					<p>
						If you just need a different language, use the <code>locale</code>
						attribute (<code>locale="es"</code>, <code>locale="de"</code>, etc.)
						instead — those translations include month/weekday/button strings.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
