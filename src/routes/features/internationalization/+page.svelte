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
				<date-range-picker
					selection-mode="single"
					locale="auto"
					placeholder="Automatic locale detection"
				>
				</date-range-picker>
				<p class="mt-3 small text-muted">
					Automatically uses your browser's language setting (navigator.language)
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Web Component -->
<date-range-picker
  selection-mode="single"
  locale="auto"
  placeholder="Auto locale">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new PureDatePicker(inputElement, {
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
				<date-range-picker
					selection-mode="range"
					locale="es"
					visible-months-count="2"
					placeholder="Selecciona un rango de fechas"
				>
				</date-range-picker>
				<p class="mt-3 small text-muted">Spanish locale with localized UI</p>
			{/snippet}

			{#snippet controlsContent()}
				<date-range-picker
					selection-mode="range"
					locale="de"
					visible-months-count="2"
					placeholder="Wählen Sie einen Datumsbereich"
				>
				</date-range-picker>
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
				<date-range-picker
					selection-mode="single"
					locale="es"
					date-format-mask="YYYY-MM-DD"
					display-format-mask="dd/mm/aaaa"
					placeholder="dd/mm/aaaa"
				>
				</date-range-picker>
				<p class="mt-3 small text-muted">
					Shows "dd/mm/aaaa" to Spanish users while validating with YYYY-MM-DD
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Spanish: aaaa = año (year) -->
<date-range-picker
  locale="es"
  date-format-mask="YYYY-MM-DD"
  display-format-mask="dd/mm/aaaa"
  placeholder="dd/mm/aaaa">
</date-range-picker>

<!-- German: jjjj = jahr (year), tt = tag (day) -->
<date-range-picker
  locale="de"
  date-format-mask="DD.MM.YYYY"
  display-format-mask="tt.mm.jjjj"
  placeholder="tt.mm.jjjj">
</date-range-picker>

<!-- French: jj = jour (day), aa = année (year) -->
<date-range-picker
  locale="fr"
  date-format-mask="DD/MM/YYYY"
  display-format-mask="jj/mm/aaaa"
  placeholder="jj/mm/aaaa">
</date-range-picker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
const picker = new PureDatePicker(inputElement, {
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
	</div>
</DocLayout>
