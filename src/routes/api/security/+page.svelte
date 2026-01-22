<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
</script>

<DocLayout
	titleText="Security"
	descriptionText="Important information about HTML injection and XSS in rendering callbacks and methods">

	<div class="py-4">
		<!-- Warning Banner -->
		<div class="alert alert-warning mb-5">
			<h4 class="alert-heading">Design Decision: Raw HTML Allowed</h4>
			<p class="mb-0">
				This component <strong>intentionally allows raw HTML injection</strong> in rendering callbacks
				and message content to give developers full control over content display. This is a conscious design choice, not a bug.
				<strong>If you display user-generated content, you must sanitize it yourself.</strong>
			</p>
		</div>

		<!-- Overview -->
		<section class="mb-5">
			<h2 class="mb-3">Overview</h2>
			<p class="lead">
				The DateRangePicker component uses <code>innerHTML</code> for rendering custom content in several callbacks
				and the <code>showMessage()</code> method.
				This provides maximum flexibility for creating rich, interactive content but requires developers to be
				aware of XSS (Cross-Site Scripting) implications when displaying untrusted data.
			</p>
		</section>

		<!-- Unsafe Callbacks -->
		<section class="mb-5">
			<h2 class="mb-4">Callbacks & Methods Allowing HTML Injection</h2>
			<p>The following callbacks and methods output is rendered using <code>innerHTML</code> and will execute any HTML/JavaScript:</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Callback/Method</th>
							<th>Used In</th>
							<th>Risk</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>showMessage(html)</code></td>
							<td>Message area in calendar</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>renderDayCallback</code></td>
							<td>Day cell content (full replacement)</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>renderDayContentCallback</code></td>
							<td>Day cell content (augmentation)</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>getDateMetadataCallback</code> (badgeText)</td>
							<td>Badge text on dates</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>getDateMetadataCallback</code> (dayTooltip)</td>
							<td>Tooltip on dates</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>formatSummaryCallback</code></td>
							<td>Summary display (days/nights count)</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>getMonthHeaderCallback</code></td>
							<td>Month header text</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>getUnifiedHeaderCallback</code></td>
							<td>Unified navigation header</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>actionButtons[].label</code></td>
							<td>Custom action button labels</td>
							<td><span class="badge bg-danger">HTML Injection</span></td>
						</tr>
						<tr>
							<td><code>customStylesCallback</code></td>
							<td>Style tag injection</td>
							<td><span class="badge bg-warning text-dark">CSS Injection</span></td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Safe Callbacks -->
		<section class="mb-5">
			<h2 class="mb-4">Safe Callbacks</h2>
			<p>The following callbacks are safe - their output is escaped or used as data only:</p>

			<div class="table-responsive mb-4">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Callback</th>
							<th>Usage</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>beforeDateSelectCallback</code></td>
							<td>Returns action object (accept/reject/adjust)</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>beforeMonthChangedCallback</code></td>
							<td>Returns action object + metadata</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>onSelect</code></td>
							<td>Event handler</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>onChange</code></td>
							<td>Event handler</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>getDateMetadataCallback</code> (isDisabled)</td>
							<td>Boolean check</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>getDateMetadataCallback</code> (dayClass)</td>
							<td>CSS class names only</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
						<tr>
							<td><code>getDateMetadataCallback</code> (badgeClass)</td>
							<td>CSS class names only</td>
							<td><span class="badge bg-success">Safe</span></td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Why This Design -->
		<section class="mb-5">
			<h2 class="mb-4">Why Allow Raw HTML?</h2>

			<div class="row g-4 mb-4">
				<div class="col-md-6">
					<div class="card h-100 border-success">
						<div class="card-body">
							<h3 class="h5 card-title text-success">Benefits</h3>
							<ul class="mb-0">
								<li>Full control over rendering</li>
								<li>Rich content with images, icons, badges</li>
								<li>Complex layouts in day cells</li>
								<li>Custom pricing displays</li>
								<li>Interactive message buttons</li>
								<li>No limitations on creativity</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card h-100 border-warning">
						<div class="card-body">
							<h3 class="h5 card-title text-warning">Your Responsibility</h3>
							<ul class="mb-0">
								<li>Sanitize user-generated content</li>
								<li>Validate data from external APIs</li>
								<li>Use a sanitization library (DOMPurify, sanitize-html)</li>
								<li>Escape special characters when needed</li>
								<li>Review third-party data sources</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Examples -->
		<section class="mb-5">
			<h2 class="mb-4">Sanitization Examples</h2>

			<div class="mb-4">
				<h3 class="h5">Using DOMPurify</h3>
				<CodeBlock
					codeContent={`import DOMPurify from 'dompurify';

const picker = document.querySelector('web-daterangepicker');

// Sanitize user-generated content in messages
picker.showMessage(\`
  <p>\${DOMPurify.sanitize(userMessage)}</p>
  <button data-action="close-message">OK</button>
\`);

// Sanitize in day rendering callback
picker.renderDayContentCallback = (data) => {
  // If tooltip comes from user input - MUST sanitize
  const safeNote = DOMPurify.sanitize(data.userNote || '');
  return safeNote ? \`<small>\${safeNote}</small>\` : null;
};`}
					languageType="javascript"
					titleText="Sanitizing with DOMPurify"
				/>
			</div>

			<div class="mb-4">
				<h3 class="h5">Simple Text Escaping</h3>
				<CodeBlock
					codeContent={`// Simple escape function for text-only content
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

picker.getDateMetadataCallback = (date) => {
  const note = getUserNote(date); // From user input
  return note ? {
    dayTooltip: escapeHtml(note)  // Escape user content
  } : null;
};`}
					languageType="javascript"
					titleText="Simple HTML Escaping"
				/>
			</div>

			<div class="mb-4">
				<h3 class="h5">Safe Static Content</h3>
				<CodeBlock
					codeContent={`// If data is from YOUR database and trusted, no sanitization needed
picker.getDateMetadataCallback = (date) => {
  const price = getPriceForDate(date); // From our controlled database
  return {
    badgeText: \`$\${price}\`,
    dayTooltip: 'Click to select'
  };
};

// Custom pricing summary - controlled data
picker.formatSummaryCallback = (data) => {
  return \`\${data.nights} nights × $150 = $\${data.nights * 150}\`;
};`}
					languageType="javascript"
					titleText="Trusted Data (No Sanitization)"
				/>
			</div>
		</section>

		<!-- When to Sanitize -->
		<section class="mb-5">
			<h2 class="mb-4">When to Sanitize</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th>Data Source</th>
							<th>Sanitization Required?</th>
							<th>Example</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Your own database (controlled)</td>
							<td><span class="badge bg-secondary">Usually No</span></td>
							<td>Pricing data, availability, room counts</td>
						</tr>
						<tr>
							<td>User input (forms, notes)</td>
							<td><span class="badge bg-danger">Yes - Always</span></td>
							<td>User notes on dates, custom messages</td>
						</tr>
						<tr>
							<td>External APIs</td>
							<td><span class="badge bg-warning text-dark">Yes - Recommended</span></td>
							<td>Third-party booking data, weather info</td>
						</tr>
						<tr>
							<td>URL parameters</td>
							<td><span class="badge bg-danger">Yes - Always</span></td>
							<td>Date presets from URL, error messages</td>
						</tr>
						<tr>
							<td>Static hardcoded values</td>
							<td><span class="badge bg-success">No</span></td>
							<td>Price labels, fixed tooltips, button text</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Important Notes -->
		<div class="mt-5 p-4 bg-light border rounded">
			<h3 class="h5 mb-3">Key Takeaways</h3>
			<ul class="mb-0">
				<li><strong>This is intentional:</strong> Raw HTML support is a feature, not a vulnerability</li>
				<li><strong>You control the data:</strong> Only you know if your data is trusted</li>
				<li><strong>Sanitize at the boundary:</strong> Clean data before it enters rendering callbacks</li>
				<li><strong>Use established libraries:</strong> DOMPurify, sanitize-html, or your framework's built-in sanitizer</li>
				<li><strong>When in doubt, sanitize:</strong> It's better to over-sanitize than to expose an XSS vulnerability</li>
			</ul>
		</div>
	</div>
</DocLayout>
