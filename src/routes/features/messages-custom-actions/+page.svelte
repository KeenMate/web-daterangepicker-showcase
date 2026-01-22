<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	// Helper to format date as YYYY-MM-DD (local timezone)
	function toDateKey(d: Date): string {
		const y = d.getFullYear();
		const m = String(d.getMonth() + 1).padStart(2, '0');
		const day = String(d.getDate()).padStart(2, '0');
		return `${y}-${m}-${day}`;
	}

	function formatShort(d: Date): string {
		return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	onMount(async () => {
		await import('@keenmate/web-daterangepicker');
		await new Promise(resolve => setTimeout(resolve, 100));

		// MSG01: Basic Messages
		initializeBasicMessages();

		// MSG02: Messages in Validation
		initializeValidationMessages();

		// MSG03: Custom Action Buttons
		initializeCustomActions();

		// MSG04: Post-Selection Messages
		initializePostSelectionMessages();

		// MSG05: showInvalidRange
		initializeInvalidRange();
	});

	function initializeBasicMessages() {
		const picker = document.getElementById('basic-messages-demo') as any;
		const btnError = document.getElementById('btn-show-error');
		const btnWarning = document.getElementById('btn-show-warning');
		const btnInfo = document.getElementById('btn-show-info');
		const btnSuccess = document.getElementById('btn-show-success');
		const btnCustom = document.getElementById('btn-show-custom');
		const btnHide = document.getElementById('btn-hide-message');

		if (picker) {
			btnError?.addEventListener('click', () => {
				picker.showMessage('This is an error message', 'error');
			});
			btnWarning?.addEventListener('click', () => {
				picker.showMessage('This is a warning message', 'warning');
			});
			btnInfo?.addEventListener('click', () => {
				picker.showMessage('This is an info message', 'info');
			});
			btnSuccess?.addEventListener('click', () => {
				picker.showMessage('Selection saved successfully!', 'success', 3000);
			});
			btnCustom?.addEventListener('click', () => {
				picker.showMessage(`
					<div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 6px; padding: 12px;">
						<div style="color: #0369a1; font-weight: 600;">Custom HTML Message</div>
						<div style="color: #0c4a6e; font-size: 0.875rem; margin-top: 4px;">
							You have full control over styling and content.
						</div>
					</div>
				`);
			});
			btnHide?.addEventListener('click', () => {
				picker.hideMessage();
			});
		}
	}

	function initializeValidationMessages() {
		const picker = document.getElementById('validation-messages-demo') as any;
		const statusDiv = document.getElementById('validation-status');

		if (picker && statusDiv) {
			picker.beforeDateSelectCallback = async (selection: any) => {
				if ('start' in selection && selection.end) {
					const nights = Math.round(
						(selection.end.getTime() - selection.start.getTime()) / (1000 * 60 * 60 * 24)
					);

					if (nights > 7) {
						// Show error message using built-in styled type
						picker.showMessage('Maximum 7 nights allowed. Please select a shorter range.', 'error');

						statusDiv.textContent = '❌ Blocked: Too many nights';
						statusDiv.className = 'mt-3 alert alert-danger';
						statusDiv.style.display = 'block';

						return {
							action: 'restore',
							showInvalidRange: true
						};
					}

					statusDiv.textContent = `✅ Valid: ${nights} nights`;
					statusDiv.className = 'mt-3 alert alert-success';
					statusDiv.style.display = 'block';
				}

				return { action: 'accept' };
			};
		}
	}

	function initializeCustomActions() {
		const picker = document.getElementById('custom-actions-demo') as any;
		const statusDiv = document.getElementById('custom-actions-status');

		if (picker && statusDiv) {
			picker.beforeDateSelectCallback = async (selection: any) => {
				if ('start' in selection && selection.end) {
					const nights = Math.round(
						(selection.end.getTime() - selection.start.getTime()) / (1000 * 60 * 60 * 24)
					);

					if (nights > 5) {
						// Generate alternative suggestions
						const alt1Start = new Date(selection.start);
						const alt1End = new Date(selection.start);
						alt1End.setDate(alt1End.getDate() + 3);

						const alt2Start = new Date(selection.start);
						alt2Start.setDate(alt2Start.getDate() + 7);
						const alt2End = new Date(alt2Start);
						alt2End.setDate(alt2End.getDate() + 4);

						picker.showMessage(`
							<div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 12px;">
								<div style="color: #991b1b; font-weight: 600; margin-bottom: 8px;">
									Maximum 5 nights allowed
								</div>
								<div style="color: #7f1d1d; font-size: 0.875rem; margin-bottom: 10px;">
									You requested ${nights} nights. Try one of these alternatives:
								</div>
								<div style="display: flex; gap: 8px; flex-wrap: wrap;">
									<button data-action="custom"
											data-start-date="${toDateKey(alt1Start)}"
											data-end-date="${toDateKey(alt1End)}"
											data-nights="3"
											style="background: #dcfce7; border: 1px solid #86efac; color: #166534; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
										${formatShort(alt1Start)} - ${formatShort(alt1End)} (3 nights)
									</button>
									<button data-action="custom"
											data-start-date="${toDateKey(alt2Start)}"
											data-end-date="${toDateKey(alt2End)}"
											data-nights="4"
											style="background: #dcfce7; border: 1px solid #86efac; color: #166534; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
										${formatShort(alt2Start)} - ${formatShort(alt2End)} (4 nights)
									</button>
									<button data-action="close-message"
											style="background: #f3f4f6; border: 1px solid #d1d5db; color: #374151; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
										Dismiss
									</button>
								</div>
							</div>
						`);

						statusDiv.textContent = '❌ Blocked: Select an alternative or dismiss';
						statusDiv.className = 'mt-3 alert alert-warning';
						statusDiv.style.display = 'block';

						return { action: 'restore', showInvalidRange: true };
					}
				}

				statusDiv.style.display = 'none';
				return { action: 'accept' };
			};

			// Handle custom-action event
			picker.addEventListener('custom-action', (e: CustomEvent) => {
				const { startDate, endDate, nights } = e.detail;

				statusDiv.textContent = `✅ Applied: ${startDate} to ${endDate} (${nights} nights)`;
				statusDiv.className = 'mt-3 alert alert-success';
				statusDiv.style.display = 'block';

				if (startDate && endDate) {
					picker.selectedRanges = [{
						start: new Date(startDate),
						end: new Date(endDate)
					}];
					picker.hideMessage();
				}
			});
		}
	}

	function initializePostSelectionMessages() {
		const picker = document.getElementById('post-selection-demo') as any;
		const statusDiv = document.getElementById('post-selection-status');

		if (picker && statusDiv) {
			picker.addEventListener('date-select', (e: CustomEvent) => {
				if (!e.detail.dateRange) return;

				const range = e.detail.dateRange;
				const startDay = range.start.getDay();
				const endDay = range.end.getDay();
				const nights = Math.floor((range.end - range.start) / (1000 * 60 * 60 * 24));

				// Check if selection includes weekend
				const includesWeekend = (startDay === 5 || startDay === 6 || startDay === 0 ||
										 endDay === 5 || endDay === 6 || endDay === 0 ||
										 nights >= 5);

				if (includesWeekend) {
					const suggestedStart = new Date(range.start);
					const daysToMonday = (8 - suggestedStart.getDay()) % 7 || 7;
					suggestedStart.setDate(suggestedStart.getDate() + daysToMonday);

					const suggestedEnd = new Date(suggestedStart);
					suggestedEnd.setDate(suggestedEnd.getDate() + Math.min(nights, 3));

					picker.showMessage(`
						<div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 12px;">
							<div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">
								Weekend dates have higher demand
							</div>
							<div style="color: #78350f; font-size: 0.875rem; margin-bottom: 10px;">
								Consider Mon-Wed for 15-20% lower prices.
							</div>
							<div style="display: flex; gap: 8px; flex-wrap: wrap;">
								<button data-action="custom"
										data-start-date="${toDateKey(suggestedStart)}"
										data-end-date="${toDateKey(suggestedEnd)}"
										data-reason="better-price"
										style="background: #dcfce7; border: 1px solid #86efac; color: #166534; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
									Try ${formatShort(suggestedStart)} - ${formatShort(suggestedEnd)}
								</button>
								<button data-action="close-message"
										style="background: #f3f4f6; border: 1px solid #d1d5db; color: #374151; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
									Keep my dates
								</button>
							</div>
						</div>
					`);

					statusDiv.textContent = '⚠️ Weekend selection - suggestion shown';
					statusDiv.className = 'mt-3 alert alert-warning';
				} else {
					picker.hideMessage();
					statusDiv.textContent = `✅ Weekday selection: ${nights} nights`;
					statusDiv.className = 'mt-3 alert alert-success';
				}
				statusDiv.style.display = 'block';
			});

			picker.addEventListener('custom-action', (e: CustomEvent) => {
				const { startDate, endDate } = e.detail;
				if (startDate && endDate) {
					picker.selectedRanges = [{
						start: new Date(startDate),
						end: new Date(endDate)
					}];
					picker.hideMessage();
					statusDiv.textContent = '✅ Applied better pricing dates';
					statusDiv.className = 'mt-3 alert alert-success';
				}
			});
		}
	}

	function initializeInvalidRange() {
		const picker = document.getElementById('invalid-range-demo') as any;
		const statusDiv = document.getElementById('invalid-range-status');

		if (picker && statusDiv) {
			picker.beforeDateSelectCallback = async (selection: any) => {
				if ('start' in selection && selection.end) {
					const nights = Math.round(
						(selection.end.getTime() - selection.start.getTime()) / (1000 * 60 * 60 * 24)
					);

					if (nights > 7) {
						picker.showMessage('Maximum 7 nights allowed', 'error');

						statusDiv.textContent = '❌ Invalid range shown with red styling';
						statusDiv.className = 'mt-3 alert alert-danger';
						statusDiv.style.display = 'block';

						// Key: showInvalidRange keeps the invalid selection visible with error styling
						return {
							action: 'restore',
							showInvalidRange: true
						};
					}

					statusDiv.textContent = `✅ Valid: ${nights} nights`;
					statusDiv.className = 'mt-3 alert alert-success';
					statusDiv.style.display = 'block';
				}

				return { action: 'accept' };
			};
		}
	}
</script>

<DocLayout
	titleText="Messages & Custom Actions"
	descriptionText="Display feedback messages and handle custom button actions in the calendar"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				The date picker provides a built-in message system for displaying feedback, errors, warnings,
				and interactive content with custom action buttons.
			</p>

			<div class="alert alert-info">
				<strong>Key Concepts:</strong>
				<ul class="mb-0 mt-2">
					<li><code>showMessage()</code> - Display messages in the calendar</li>
					<li><code>hideMessage()</code> - Hide the current message</li>
					<li><code>data-action="custom"</code> - Buttons that fire <code>custom-action</code> event</li>
					<li><code>data-action="close-message"</code> - Buttons that dismiss the message</li>
					<li><code>showInvalidRange: true</code> - Keep invalid selection visible with error styling</li>
				</ul>
			</div>
		</section>

		<!-- MSG01: Basic Messages -->
		<ShowcaseSection
			titleText="MSG01 Basic Messages"
			subtitleText="Display styled and custom messages"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="basic-messages-demo"
					selection-mode="range"
					positioning-mode="inline"
					visible-months-count="1"
				>
				</web-daterangepicker>
				<div class="mt-3 d-flex flex-wrap gap-2">
					<button id="btn-show-error" class="btn btn-danger btn-sm">Error</button>
					<button id="btn-show-warning" class="btn btn-warning btn-sm">Warning</button>
					<button id="btn-show-info" class="btn btn-info btn-sm">Info</button>
					<button id="btn-show-success" class="btn btn-success btn-sm">Success (auto-hide)</button>
					<button id="btn-show-custom" class="btn btn-primary btn-sm">Custom HTML</button>
					<button id="btn-hide-message" class="btn btn-secondary btn-sm">Hide</button>
				</div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Styled message types
picker.showMessage('Error occurred', 'error');
picker.showMessage('Please note...', 'warning');
picker.showMessage('Did you know?', 'info');
picker.showMessage('Saved!', 'success');

// Auto-hide after 3 seconds
picker.showMessage('Saved!', 'success', 3000);

// Custom HTML (no type = raw HTML)
picker.showMessage(\`
  <div style="background: #f0f9ff; padding: 12px;">
    <strong>Custom content</strong>
    <p>Full control over styling.</p>
  </div>
\`);

// Hide message
picker.hideMessage();`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Message Types</h5>
					<table class="table table-sm">
						<thead>
							<tr><th>Type</th><th>Use Case</th></tr>
						</thead>
						<tbody>
							<tr><td><code>'error'</code></td><td>Validation failures, blocked selections</td></tr>
							<tr><td><code>'warning'</code></td><td>Cautions, suggestions</td></tr>
							<tr><td><code>'info'</code></td><td>Tips, information</td></tr>
							<tr><td><code>'success'</code></td><td>Confirmations</td></tr>
							<tr><td><em>none</em></td><td>Custom HTML with full styling control</td></tr>
						</tbody>
					</table>

					<h5>API</h5>
					<pre><code>showMessage(content: string, type?: string, autoHide?: number)
hideMessage()</code></pre>

					<div class="alert alert-warning mt-3">
						<strong>Note:</strong> The built-in close button (×) only appears for typed messages,
						not custom HTML. Add your own close button with <code>data-action="close-message"</code>.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- MSG02: Messages in Validation -->
		<ShowcaseSection
			titleText="MSG02 Messages in Validation"
			subtitleText="Show messages from beforeDateSelectCallback"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="validation-messages-demo"
					selection-mode="range"
					positioning-mode="inline"
					visible-months-count="2"
					placeholder="Select max 7 nights"
				>
				</web-daterangepicker>
				<div id="validation-status" class="mt-3 alert" style="display: none;"></div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`picker.beforeDateSelectCallback = async (selection) => {
  if ('start' in selection && selection.end) {
    const nights = Math.round(
      (selection.end - selection.start) / (1000 * 60 * 60 * 24)
    );

    if (nights > 7) {
      // Show error message
      picker.showMessage(
        'Maximum 7 nights allowed.',
        'error'
      );

      // Block selection, keep invalid range visible
      return {
        action: 'restore',
        showInvalidRange: true
      };
    }
  }

  return { action: 'accept' };
};`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Important: Message Visibility</h5>
					<p>When <code>beforeDateSelectCallback</code> returns:</p>
					<ul>
						<li><code>{'{ action: \'accept\' }'}</code> → Message is <strong>auto-hidden</strong></li>
						<li><code>{'{ action: \'restore\' }'}</code> → Message <strong>stays visible</strong></li>
						<li><code>{'{ action: \'adjust\' }'}</code> → Message stays if no adjustment message</li>
					</ul>

					<h5>Callback Return Actions</h5>
					<table class="table table-sm">
						<thead>
							<tr><th>Action</th><th>Effect</th></tr>
						</thead>
						<tbody>
							<tr><td><code>'accept'</code></td><td>Accept selection, hide message</td></tr>
							<tr><td><code>'restore'</code></td><td>Revert to previous, keep message</td></tr>
							<tr><td><code>'adjust'</code></td><td>Modify selection</td></tr>
							<tr><td><code>'clear'</code></td><td>Clear selection entirely</td></tr>
						</tbody>
					</table>

					<div class="alert alert-info mt-3">
						<strong>Tip:</strong> Use <code>showInvalidRange: true</code> with <code>'restore'</code>
						to keep the invalid selection visible with red/error styling.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- MSG03: Custom Action Buttons -->
		<ShowcaseSection
			titleText="MSG03 Custom Action Buttons"
			subtitleText="Interactive buttons in messages"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="custom-actions-demo"
					selection-mode="range"
					positioning-mode="inline"
					visible-months-count="2"
					placeholder="Select more than 5 nights to see alternatives"
				>
				</web-daterangepicker>
				<div id="custom-actions-status" class="mt-3 alert" style="display: none;"></div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// In beforeDateSelectCallback - show message with buttons
picker.showMessage(\`
  <div style="...">
    <p>Maximum 5 nights. Try these:</p>
    <button data-action="custom"
            data-start-date="2026-01-14"
            data-end-date="2026-01-17"
            data-nights="3">
      Jan 14 - Jan 17 (3 nights)
    </button>
    <button data-action="close-message">
      Dismiss
    </button>
  </div>
\`);

return { action: 'restore', showInvalidRange: true };`}
					languageType="javascript"
					titleText="Show Message with Buttons"
				/>

				<CodeBlock
					codeContent={`// Handle custom-action event
picker.addEventListener('custom-action', (e) => {
  // e.detail contains all data-* attributes (camelCase)
  const { startDate, endDate, nights } = e.detail;

  console.log(e.detail);
  // { startDate: '2026-01-14', endDate: '2026-01-17', nights: '3' }

  if (startDate && endDate) {
    picker.selectedRanges = [{
      start: new Date(startDate),
      end: new Date(endDate)
    }];
    picker.hideMessage();
  }
});`}
					languageType="javascript"
					titleText="Handle custom-action Event"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Button Actions</h5>
					<table class="table table-sm">
						<thead>
							<tr><th>Attribute</th><th>Behavior</th></tr>
						</thead>
						<tbody>
							<tr>
								<td><code>data-action="custom"</code></td>
								<td>Fires <code>custom-action</code> event with all <code>data-*</code> attributes</td>
							</tr>
							<tr>
								<td><code>data-action="close-message"</code></td>
								<td>Hides the message (built-in)</td>
							</tr>
						</tbody>
					</table>

					<h5>Data Attribute Conversion</h5>
					<p>HTML <code>data-*</code> attributes become camelCase keys:</p>
					<ul>
						<li><code>data-start-date</code> → <code>startDate</code></li>
						<li><code>data-end-date</code> → <code>endDate</code></li>
						<li><code>data-my-value</code> → <code>myValue</code></li>
					</ul>

					<div class="alert alert-success mt-3">
						<strong>Use Case:</strong> Show alternative date suggestions when a selection is invalid,
						letting users click to apply the suggested dates.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- MSG04: Post-Selection Messages -->
		<ShowcaseSection
			titleText="MSG04 Post-Selection Messages"
			subtitleText="Show messages after selection completes"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="post-selection-demo"
					selection-mode="range"
					positioning-mode="inline"
					visible-months-count="2"
					placeholder="Select dates including a weekend"
				>
				</web-daterangepicker>
				<div id="post-selection-status" class="mt-3 alert" style="display: none;"></div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// Show informational messages AFTER selection
picker.addEventListener('date-select', (e) => {
  const { dateRange } = e.detail;
  if (!dateRange) return;

  const includesWeekend = checkWeekend(dateRange);

  if (includesWeekend) {
    picker.showMessage(\`
      <div style="background: #fef3c7; ...">
        <p>Weekend dates have higher demand.</p>
        <button data-action="custom"
                data-start-date="\${suggestedStart}"
                data-end-date="\${suggestedEnd}">
          Try weekday dates
        </button>
        <button data-action="close-message">
          Keep my dates
        </button>
      </div>
    \`);
  } else {
    picker.hideMessage();
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>When to Use</h5>
					<p>Use <code>date-select</code> event for messages that:</p>
					<ul>
						<li><strong>Don't block</strong> the selection</li>
						<li>Provide <strong>tips or suggestions</strong></li>
						<li>Show <strong>informational feedback</strong></li>
					</ul>

					<h5>Comparison</h5>
					<table class="table table-sm">
						<thead>
							<tr><th>Where</th><th>When</th><th>Use For</th></tr>
						</thead>
						<tbody>
							<tr>
								<td><code>beforeDateSelectCallback</code></td>
								<td>Before selection</td>
								<td>Block invalid, offer alternatives</td>
							</tr>
							<tr>
								<td><code>date-select</code> event</td>
								<td>After selection</td>
								<td>Tips, suggestions (non-blocking)</td>
							</tr>
						</tbody>
					</table>

					<div class="alert alert-warning mt-3">
						<strong>Remember:</strong> Messages shown from <code>beforeDateSelectCallback</code>
						with <code>{'{ action: \'accept\' }'}</code> are auto-hidden. Use the event handler
						for persistent informational messages.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- MSG05: showInvalidRange -->
		<ShowcaseSection
			titleText="MSG05 showInvalidRange Option"
			subtitleText="Keep invalid selection visible with error styling"
			col1Title="Live Demo"
			col2Title="Code Examples"
			col3Title="Details"
		>
			{#snippet demoContent()}
				<web-daterangepicker
					id="invalid-range-demo"
					selection-mode="range"
					positioning-mode="inline"
					visible-months-count="2"
					placeholder="Select more than 7 nights"
				>
				</web-daterangepicker>
				<div id="invalid-range-status" class="mt-3 alert" style="display: none;"></div>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`picker.beforeDateSelectCallback = async (selection) => {
  if (selection.end) {
    const nights = calculateNights(selection);

    if (nights > 7) {
      picker.showMessage('Maximum 7 nights allowed', 'error');

      return {
        action: 'restore',
        showInvalidRange: true  // Key option!
      };
    }
  }

  return { action: 'accept' };
};`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>What showInvalidRange Does</h5>
					<table class="table table-sm">
						<thead>
							<tr><th>State</th><th>Without</th><th>With <code>showInvalidRange: true</code></th></tr>
						</thead>
						<tbody>
							<tr>
								<td>Selection</td>
								<td>Reverts to previous</td>
								<td>Reverts to previous</td>
							</tr>
							<tr>
								<td>Visual</td>
								<td>Previous range shown</td>
								<td><strong>Invalid range in red</strong></td>
							</tr>
							<tr>
								<td>Message</td>
								<td>Stays visible</td>
								<td>Stays visible</td>
							</tr>
						</tbody>
					</table>

					<h5>User Experience</h5>
					<p>With <code>showInvalidRange: true</code>, users can see:</p>
					<ul>
						<li>What they tried to select (in error styling)</li>
						<li>Why it was invalid (via message)</li>
						<li>What to do next (select different dates or use suggestion buttons)</li>
					</ul>

					<div class="alert alert-info mt-3">
						<strong>Best Practice:</strong> Combine <code>showInvalidRange: true</code> with
						a clear error message and optionally suggestion buttons to guide users.
					</div>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Summary -->
		<section class="mt-5">
			<h3>Quick Reference</h3>
			<div class="row">
				<div class="col-md-6">
					<div class="card">
						<div class="card-header">Message Methods</div>
						<div class="card-body">
							<pre class="mb-0"><code>// Show styled message
picker.showMessage('Text', 'error');
picker.showMessage('Text', 'warning');
picker.showMessage('Text', 'info');
picker.showMessage('Text', 'success');

// Show with auto-hide (3 seconds)
picker.showMessage('Saved!', 'success', 3000);

// Show custom HTML
picker.showMessage('&lt;div&gt;...&lt;/div&gt;');

// Hide message
picker.hideMessage();</code></pre>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card">
						<div class="card-header">Button Actions</div>
						<div class="card-body">
							<pre class="mb-0"><code>&lt;!-- Fires custom-action event --&gt;
&lt;button data-action="custom"
        data-start-date="2026-01-14"
        data-end-date="2026-01-17"&gt;
  Apply dates
&lt;/button&gt;

&lt;!-- Closes message (built-in) --&gt;
&lt;button data-action="close-message"&gt;
  Dismiss
&lt;/button&gt;

// Handle event
picker.addEventListener('custom-action', (e) =&gt; &#123;
  const &#123; startDate, endDate &#125; = e.detail;
  // Apply dates...
&#125;);</code></pre>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</DocLayout>
