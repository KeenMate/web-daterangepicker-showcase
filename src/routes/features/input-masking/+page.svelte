<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Input Masking"
	descriptionText="Automatic formatting and live calendar updates as users type dates - always enabled, works seamlessly with any date format"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				Input masking is <strong>always active</strong> in the date picker, providing real-time formatting
				guidance and automatic calendar updates as users type. No configuration needed - it just works!
			</p>
			<p>
				The masking system automatically adapts to your <code>date-format-mask</code> setting, inserting
				separators and updating the calendar in real-time as valid date segments are entered.
			</p>
		</section>

		<!-- How It Works -->
		<ShowcaseSection
			titleText="IM01 How Input Masking Works"
			subtitleText="Always-on automatic formatting"
			col1Title="Live Demo"
			col2Title="Key Behaviors"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					date-format-mask="MM/DD/YYYY"
					placeholder="MM/DD/YYYY">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Try typing: <code>12252024</code> - watch it become <code>12/25/2024</code> with separators auto-inserted
				</p>
				<p class="small text-muted">
					Notice the calendar updates as soon as you type a valid month
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose">
					<h5>Real-Time Behaviors</h5>
					<ul>
						<li><strong>Auto-separators</strong> - Typing <code>12</code> adds <code>/</code> automatically</li>
						<li><strong>Progressive parsing</strong> - Calendar updates as you type valid segments</li>
						<li><strong>Leading zero padding</strong> - Single digits padded when typing separator</li>
						<li><strong>Paste formatting</strong> - Pasted text cleaned and formatted</li>
					</ul>

					<h5>Example Flow (MM/DD/YYYY)</h5>
					<ol>
						<li>Type <code>1</code> → Shows <code>1</code></li>
						<li>Type <code>2</code> → Shows <code>12</code>, auto-adds <code>/</code></li>
						<li>Type <code>2</code> → Shows <code>12/2</code></li>
						<li>Type <code>5</code> → Shows <code>12/25</code>, auto-adds <code>/</code>, calendar updates to December</li>
						<li>Type <code>2024</code> → Shows <code>12/25/2024</code>, calendar shows Dec 2024 with 25th highlighted</li>
					</ol>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Key Features</h5>
					<ul>
						<li><strong>Always active</strong> - No configuration needed</li>
						<li><strong>Format-aware</strong> - Adapts to any <code>date-format-mask</code></li>
						<li><strong>Non-intrusive</strong> - Works naturally, doesn't block input</li>
						<li><strong>Progressive update</strong> - Calendar updates as you type valid segments</li>
					</ul>

					<h5>No Configuration Required</h5>
					<p>Unlike some date pickers, input masking is <strong>not</strong> a toggle. It's always enabled and automatically adapts to your date format.</p>

					<h5>Calendar Integration</h5>
					<p>As you type valid date segments (month, then month+day, then full date), the calendar automatically:</p>
					<ul>
						<li>Navigates to the correct month</li>
						<li>Highlights the selected day</li>
						<li>Updates the selection when complete date is entered</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Format Adaptation -->
		<ShowcaseSection
			titleText="IM02 Automatic Format Adaptation"
			subtitleText="Masking adapts to any date format"
			col1Title="Live Demos"
			col2Title="Code Examples"
			col3Title="Supported Formats">

			{#snippet demoContent()}
				<div class="row g-3">
					<div class="col-md-6">
						<h6>US Format (MM/DD/YYYY)</h6>
						<web-daterangepicker
							selection-mode="single"
							date-format-mask="MM/DD/YYYY"
							placeholder="MM/DD/YYYY">
						</web-daterangepicker>
						<p class="mt-2 small text-muted">Type: 12252024</p>
					</div>
					<div class="col-md-6">
						<h6>European Format (DD.MM.YYYY)</h6>
						<web-daterangepicker
							selection-mode="single"
							date-format-mask="DD.MM.YYYY"
							placeholder="DD.MM.YYYY">
						</web-daterangepicker>
						<p class="mt-2 small text-muted">Type: 25122024</p>
					</div>
					<div class="col-md-6">
						<h6>ISO Format (YYYY-MM-DD)</h6>
						<web-daterangepicker
							selection-mode="single"
							date-format-mask="YYYY-MM-DD"
							placeholder="YYYY-MM-DD">
						</web-daterangepicker>
						<p class="mt-2 small text-muted">Type: 20241225</p>
					</div>
					<div class="col-md-6">
						<h6>Short Year (DD/MM/YY)</h6>
						<web-daterangepicker
							selection-mode="single"
							date-format-mask="DD/MM/YY"
							placeholder="DD/MM/YY">
						</web-daterangepicker>
						<p class="mt-2 small text-muted">Type: 251224</p>
					</div>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- US Format (MM/DD/YYYY) -->
<web-daterangepicker
  date-format-mask="MM/DD/YYYY">
</web-daterangepicker>

<!-- European Format (DD.MM.YYYY) -->
<web-daterangepicker
  date-format-mask="DD.MM.YYYY">
</web-daterangepicker>

<!-- ISO Format (YYYY-MM-DD) -->
<web-daterangepicker
  date-format-mask="YYYY-MM-DD">
</web-daterangepicker>

<!-- Short Year (DD/MM/YY) -->
<web-daterangepicker
  date-format-mask="DD/MM/YY">
</web-daterangepicker>

<!-- Single-digit tokens (M/D/YYYY) -->
<web-daterangepicker
  date-format-mask="M/D/YYYY">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

// Input masking is always active
// Just set the format you want
const picker = new DateRangePicker(input, {
  dateFormatMask: 'MM/DD/YYYY'
  // That's it! Masking is automatic
});

// European format
const picker2 = new DateRangePicker(input2, {
  dateFormatMask: 'DD.MM.YYYY'
});

// ISO format
const picker3 = new DateRangePicker(input3, {
  dateFormatMask: 'YYYY-MM-DD'
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Supported Format Tokens</h5>
					<table class="table table-sm">
						<thead>
							<tr>
								<th>Token</th>
								<th>Description</th>
								<th>Example</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>YYYY</code></td>
								<td>4-digit year</td>
								<td>2024</td>
							</tr>
							<tr>
								<td><code>YY</code></td>
								<td>2-digit year</td>
								<td>24</td>
							</tr>
							<tr>
								<td><code>MM</code></td>
								<td>2-digit month</td>
								<td>01-12</td>
							</tr>
							<tr>
								<td><code>M</code></td>
								<td>1 or 2-digit month</td>
								<td>1-12</td>
							</tr>
							<tr>
								<td><code>DD</code></td>
								<td>2-digit day</td>
								<td>01-31</td>
							</tr>
							<tr>
								<td><code>D</code></td>
								<td>1 or 2-digit day</td>
								<td>1-31</td>
							</tr>
						</tbody>
					</table>

					<h5>Supported Separators</h5>
					<ul>
						<li><code>/</code> - Slash</li>
						<li><code>-</code> - Dash (hyphen)</li>
						<li><code>.</code> - Period (dot)</li>
					</ul>

					<h5>Single-Digit Tokens</h5>
					<p>Using <code>M</code> and <code>D</code> instead of <code>MM</code> and <code>DD</code> allows users to type <code>1/5/2024</code> instead of requiring <code>01/05/2024</code>. The picker is smart enough to handle both!</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Auto-Separator Insertion -->
		<ShowcaseSection
			titleText="IM03 Auto-Separator Insertion"
			subtitleText="Smart separator handling as you type"
			col1Title="Live Demo"
			col2Title="Behaviors"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					id="separator-demo"
					selection-mode="single"
					date-format-mask="MM/DD/YYYY"
					placeholder="MM/DD/YYYY">
				</web-daterangepicker>
				<p class="mt-2 small text-muted">
					<strong>Format:</strong> MM/DD/YYYY &mdash; Try typing <code>12252024</code> (just numbers, no slashes)
				</p>
				<div id="separator-output" class="mt-3 p-3 bg-light rounded" style="display:none;">
					<h6>What you typed vs what you see:</h6>
					<pre class="mb-0"><code></code></pre>
				</div>
				<script>
					if (typeof window !== 'undefined') {
						setTimeout(() => {
							const picker = document.getElementById('separator-demo');
							const output = document.getElementById('separator-output');
							if (picker) {
								const input = picker.shadowRoot?.querySelector('input');
								if (input) {
									let typed = '';
									input.addEventListener('input', (e) => {
										const newVal = input.value;
										// Try to detect what was actually typed
										if (newVal.length > typed.length) {
											const diff = newVal.replace(/[^0-9]/g, '').substring(typed.replace(/[^0-9]/g, '').length);
											typed = typed.replace(/[^0-9]/g, '') + diff;
										} else {
											typed = newVal.replace(/[^0-9]/g, '');
										}

										output.style.display = 'block';
										output.querySelector('code').textContent =
											`Typed (numbers only): ${typed}\n` +
											`Displayed (formatted): ${newVal}`;
									});
								}
							}
						}, 100);
					}
				</script>
			{/snippet}

			{#snippet controlsContent()}
				<div class="prose">
					<h5>Automatic Behaviors</h5>
					<ul>
						<li><strong>After month</strong> - Type <code>12</code>, get <code>12/</code></li>
						<li><strong>After day</strong> - Type <code>25</code> after month, get <code>12/25/</code></li>
						<li><strong>Manual separators</strong> - User can type separators too (optional)</li>
						<li><strong>Leading zeros</strong> - Type <code>1/</code>, becomes <code>01/</code></li>
					</ul>

					<h5>Examples (MM/DD/YYYY)</h5>
					<table class="table table-sm">
						<thead>
							<tr>
								<th>You Type</th>
								<th>Display Shows</th>
								<th>Why</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><code>1</code></td>
								<td><code>1</code></td>
								<td>Waiting for 2nd digit</td>
							</tr>
							<tr>
								<td><code>12</code></td>
								<td><code>12/</code></td>
								<td>Month complete, add separator</td>
							</tr>
							<tr>
								<td><code>1/</code></td>
								<td><code>01/</code></td>
								<td>Single digit, pad with zero</td>
							</tr>
							<tr>
								<td><code>12/2</code></td>
								<td><code>12/2</code></td>
								<td>Day started</td>
							</tr>
							<tr>
								<td><code>12/25</code></td>
								<td><code>12/25/</code></td>
								<td>Day complete, add separator</td>
							</tr>
							<tr>
								<td><code>12/25/2024</code></td>
								<td><code>12/25/2024</code></td>
								<td>Complete date!</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Smart Padding</h5>
					<p>When you type a separator after a single-digit month or day, the picker automatically pads it with a leading zero:</p>
					<ul>
						<li><code>1/</code> → <code>01/</code></li>
						<li><code>12/5/</code> → <code>12/05/</code></li>
					</ul>

					<h5>No Separator Typing Required</h5>
					<p>You can type <code>12252024</code> without any separators and get <code>12/25/2024</code>. The picker inserts them automatically!</p>

					<h5>Or Type Separators Manually</h5>
					<p>You can also type <code>12/25/2024</code> with separators. The picker handles both approaches seamlessly.</p>

					<h5>Paste Support</h5>
					<p>Paste a date in almost any format and the picker will try to parse and reformat it:</p>
					<ul>
						<li>Paste <code>12-25-2024</code> → Becomes <code>12/25/2024</code></li>
						<li>Paste <code>25.12.2024</code> with DD.MM.YYYY format → Becomes <code>25.12.2024</code></li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Progressive Calendar Updates -->
		<ShowcaseSection
			titleText="IM04 Progressive Calendar Updates"
			subtitleText="Calendar updates as you type valid segments"
			col1Title="Live Demo"
			col2Title="Update Triggers"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					date-format-mask="MM/DD/YYYY"
					calendar-open-trigger="typing"
					placeholder="Type a date and watch the calendar">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Set to <code>calendar-open-trigger="typing"</code> to see calendar open as you type
				</p>
				<p class="small text-muted">
					Try typing <code>12252024</code> and watch the calendar navigate month-by-month
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Calendar opens when typing starts -->
<web-daterangepicker
  date-format-mask="MM/DD/YYYY"
  calendar-open-trigger="typing">
</web-daterangepicker>

<!-- Default: calendar opens on focus -->
<web-daterangepicker
  date-format-mask="MM/DD/YYYY"
  calendar-open-trigger="focus">
</web-daterangepicker>

<!-- Manual: calendar only via button -->
<web-daterangepicker
  date-format-mask="MM/DD/YYYY"
  calendar-open-trigger="manual">
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

// Calendar opens when user starts typing
const picker = new DateRangePicker(input, {
  dateFormatMask: 'MM/DD/YYYY',
  calendarOpenTrigger: 'typing'
});

// Watch the calendar update as user types:
// Type "12" → Calendar navigates to December
// Type "25" → Day 25 is highlighted
// Type "2024" → Calendar shows Dec 2024`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Update Sequence (MM/DD/YYYY)</h5>
					<ol>
						<li><strong>Month typed</strong> (<code>12</code>) → Calendar navigates to December (current or selected year)</li>
						<li><strong>Day typed</strong> (<code>25</code>) → Day 25 is highlighted in calendar</li>
						<li><strong>Year typed</strong> (<code>2024</code>) → Calendar shows December 2024 with 25th selected</li>
					</ol>

					<h5>Trigger Modes</h5>
					<ul>
						<li><code>focus</code> - Calendar opens when input receives focus (default)</li>
						<li><code>typing</code> - Calendar opens when user starts typing</li>
						<li><code>manual</code> - Calendar only opens via button click</li>
					</ul>

					<h5>Benefits</h5>
					<ul>
						<li>Immediate visual feedback</li>
						<li>Users see what they're typing in calendar context</li>
						<li>Easier to spot typos or wrong months</li>
						<li>Natural bi-directional sync between input and calendar</li>
					</ul>

					<h5>Partial Dates</h5>
					<p>Even incomplete dates update the calendar:</p>
					<ul>
						<li>Type <code>12/</code> → Calendar shows December</li>
						<li>Type <code>12/25/</code> → Calendar shows December with 25th highlighted</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Range Mode -->
		<ShowcaseSection
			titleText="IM05 Range Mode Masking"
			subtitleText="Separate inputs with independent masking"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="range"
					date-format-mask="MM/DD/YYYY"
					visible-months-count="2"
					placeholder="Select date range">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">
					Range mode creates two input fields, each with independent masking
				</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Range mode -->
<web-daterangepicker
  selection-mode="range"
  date-format-mask="MM/DD/YYYY">
</web-daterangepicker>

<!-- Each input is independently masked:
  - Start input: MM/DD/YYYY masking
  - End input: MM/DD/YYYY masking
  - Same format for both
-->`}
					languageType="html"
					titleText="HTML"
				/>

				<CodeBlock
					codeContent={`// JavaScript API
import { DateRangePicker } from '@keenmate/web-daterangepicker';

// Range mode with masking
const picker = new DateRangePicker(input, {
  selectionMode: 'range',
  dateFormatMask: 'MM/DD/YYYY'
  // Both start and end inputs use same format
  // Both have input masking enabled
});

// User can:
// - Type "12252024" in start → "12/25/2024"
// - Type "12312024" in end → "12/31/2024"
// - Or click dates in calendar`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Range Behavior</h5>
					<ul>
						<li>Two input fields: Start date and End date</li>
						<li>Each input has independent masking</li>
						<li>Same format used for both inputs</li>
						<li>Both update calendar as you type</li>
					</ul>

					<h5>No Separate Start/End Formats</h5>
					<p>Both the start and end inputs use the same <code>date-format-mask</code>. The picker does not support different formats for start vs end dates.</p>

					<h5>Keyboard Navigation</h5>
					<ul>
						<li><strong>Tab</strong> - Move from Start input to End input</li>
						<li><strong>Enter</strong> - When end date typed, select the range</li>
						<li><strong>Escape</strong> - Close calendar without selecting</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Range Typing Separator (v1.13) -->
		<ShowcaseSection
			titleText="IM06 Range Typing — Single-Input Separator (v1.13)"
			subtitleText="In single-input range mode, the separator between start and end is &quot; - &quot;"
			col1Title="What works"
			col2Title="Examples"
			col3Title="Migration"
		>

			{#snippet demoContent()}
				<div class="prose">
					<p>
						When the picker is configured in range mode with a single input (the
						default), typing in the start/end values is accepted in two shapes:
					</p>
					<ul>
						<li>
							<strong>Spaced</strong> — <code>2026-06-10 - 2026-06-15</code> (the
							canonical form, also what the picker writes back on commit).
						</li>
						<li>
							<strong>Compact</strong> — <code>2026-06-10-2026-06-15</code> (paste
							or fast typing with no spaces; auto-normalized).
						</li>
					</ul>
					<p>
						The mask figures out which side of the separator the cursor is on and
						applies per-field formatting / progressive calendar updates the same
						way as the spaced form.
					</p>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`# Spaced (canonical, what the picker emits on commit)
2026-06-10 - 2026-06-15

# Compact (e.g. pasted, no spaces) — auto-normalized to the spaced form
2026-06-10-2026-06-15

# Both produce: start = 2026-06-10, end = 2026-06-15`}
					languageType="text"
					titleText="Accepted forms"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Migration from older versions</h5>
					<p>
						Prior to v1.13 the separator was the literal word <code>" to "</code>.
						v1.13 switched to <code>" - "</code> so the separator round-trips with
						the committed value, and so the parser doesn't depend on an
						English-specific word.
					</p>
					<p>
						<strong>If you have e2e tests or scripts that drove the input by
						typing <code>"… to …"</code>, switch them to <code>"… - …"</code>.</strong>
					</p>

					<h5>Why two forms?</h5>
					<p>
						Position-based fallback: when the separator can't be located by
						pattern, the parser splits on the midpoint of the field length so a
						bare <code>YYYY-MM-DD-YYYY-MM-DD</code> still parses correctly.
					</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Best Practices -->
		<ShowcaseSection
			titleText="IM07 Best Practices"
			subtitleText="Getting the most from input masking"
			col1Title="Recommendations"
			col2Title="Common Patterns"
			col3Title="Tips">

			{#snippet demoContent()}
				<div class="prose">
					<h5>✅ Do</h5>
					<ul>
						<li>Use <code>display-format-mask</code> to show localized format hints</li>
						<li>Set appropriate <code>placeholder</code> to guide users</li>
						<li>Choose <code>calendar-open-trigger</code> based on your UX needs</li>
						<li>Test with keyboard-only users</li>
					</ul>

					<h5>❌ Don't</h5>
					<ul>
						<li>Try to disable input masking (it's always on)</li>
						<li>Use different formats for start/end in range mode (not supported)</li>
						<li>Expect validation events (use <code>date-select</code> event instead)</li>
					</ul>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<!-- Good: Clear placeholder -->
<web-daterangepicker
  date-format-mask="MM/DD/YYYY"
  placeholder="MM/DD/YYYY"
  calendar-open-trigger="typing">
</web-daterangepicker>

<!-- Good: Localized display hint -->
<web-daterangepicker
  date-format-mask="YYYY-MM-DD"
  display-format-mask="aaaa-mm-dd"
  locale="es"
  placeholder="aaaa-mm-dd">
</web-daterangepicker>

<!-- Good: Validation via date constraints -->
<web-daterangepicker
  date-format-mask="MM/DD/YYYY"
  min-date="2024-01-01"
  max-date="2024-12-31">
</web-daterangepicker>`}
					languageType="html"
					titleText="Good Patterns"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Accessibility</h5>
					<ul>
						<li>Input masking works with screen readers</li>
						<li>Clear placeholder helps all users understand format</li>
						<li>Progressive updates provide immediate feedback</li>
					</ul>

					<h5>Internationalization</h5>
					<p>Use <code>display-format-mask</code> to show localized format hints while using English tokens for parsing:</p>
					<ul>
						<li><code>date-format-mask="YYYY-MM-DD"</code> - For parsing (always English)</li>
						<li><code>display-format-mask="aaaa-mm-dd"</code> - Visual hint in Spanish</li>
					</ul>

					<h5>Validation</h5>
					<p>Listen to the <code>date-select</code> event for validated, complete date selections:</p>
					<CodeBlock
						codeContent={`picker.addEventListener('date-select', (e) => {
  // e.detail.date is a valid Date object
  // Or e.detail.dateRange for range mode
  console.log('Valid selection:', e.detail);
});`}
						languageType="javascript"
					/>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Common Questions -->
		<section class="mt-5">
			<h2>Common Questions</h2>
			<div class="accordion" id="faq">
				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
							Can I disable input masking?
						</button>
					</h2>
					<div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faq">
						<div class="accordion-body">
							<p><strong>No.</strong> Input masking is always enabled and is a core part of how the date picker works. It's designed to be non-intrusive and helpful, working seamlessly with manual typing.</p>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
							Can I use different formats for start and end dates in range mode?
						</button>
					</h2>
					<div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faq">
						<div class="accordion-body">
							<p><strong>No.</strong> Both the start and end inputs use the same <code>date-format-mask</code>. This ensures consistency and prevents user confusion.</p>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
							How do I validate user input?
						</button>
					</h2>
					<div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faq">
						<div class="accordion-body">
							<p>Use the <code>date-select</code> event which only fires when a <strong>valid, complete</strong> date or range is selected:</p>
							<CodeBlock
								codeContent={`picker.addEventListener('date-select', (e) => {
  // This only fires for valid dates
  const date = e.detail.date;
  const formatted = e.detail.formattedValue;

  // Add your custom validation here
  if (isBusinessDay(date)) {
    submitForm(date);
  }
});`}
								languageType="javascript"
							/>
							<p>You can also use <code>min-date</code>, <code>max-date</code>, and <code>disabled-weekdays</code> for built-in validation.</p>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
							What happens if I type an invalid date like 13/32/2024?
						</button>
					</h2>
					<div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faq">
						<div class="accordion-body">
							<p>The input masking will allow you to type it, but:</p>
							<ul>
								<li>The calendar won't update (since month 13 doesn't exist)</li>
								<li>The <code>date-select</code> event won't fire (invalid date)</li>
								<li>The input will show what you typed but nothing is selected</li>
							</ul>
							<p>Users can use the calendar to correct their selection, or clear and retype.</p>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
							Does masking work with screen readers?
						</button>
					</h2>
					<div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faq">
						<div class="accordion-body">
							<p><strong>Yes.</strong> The input masking is implemented as standard input value changes, which screen readers detect and announce. The placeholder also provides format guidance for screen reader users.</p>
						</div>
					</div>
				</div>

				<div class="accordion-item">
					<h2 class="accordion-header">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq6">
							Can I paste dates from Excel or other applications?
						</button>
					</h2>
					<div id="faq6" class="accordion-collapse collapse" data-bs-parent="#faq">
						<div class="accordion-body">
							<p><strong>Yes!</strong> The picker attempts to parse and reformat pasted content. For best results, paste dates in a format close to your configured <code>date-format-mask</code>.</p>
							<p>Examples that work well:</p>
							<ul>
								<li>Paste <code>12/25/2024</code> with <code>MM/DD/YYYY</code> format ✓</li>
								<li>Paste <code>12-25-2024</code> with <code>MM/DD/YYYY</code> format ✓ (separator mismatch handled)</li>
								<li>Paste <code>2024-12-25</code> with <code>YYYY-MM-DD</code> format ✓</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</DocLayout>
