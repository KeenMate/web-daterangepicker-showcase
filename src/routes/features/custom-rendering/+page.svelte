<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Custom Rendering"
	descriptionText="Customize day cell rendering with slots and callback functions"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				The date picker provides powerful customization options for day cell rendering through
				<strong>named slots</strong> and <strong>render callbacks</strong>. Use slots for declarative HTML customization
				or callbacks for programmatic control with dynamic content.
			</p>
			<div class="alert alert-info mt-3">
				<strong>Priority Order:</strong>
				<ol class="mb-0 mt-2">
					<li><strong>Named Slots</strong> (highest) - Specific dates via <code>slot="day-YYYY-MM-DD"</code></li>
					<li><strong>renderDay Callback</strong> - Full day cell replacement</li>
					<li><strong>renderDayContent Callback</strong> - Augment default day cell</li>
					<li><strong>Default Rendering</strong> (lowest) - Standard day number display</li>
				</ol>
			</div>
		</section>

		<!-- Named Slots -->
		<ShowcaseSection
			titleText="Named Slots (Declarative)"
			subtitleText="Use HTML slots to customize specific dates"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					selection-mode="single"
					date-format-mask="YYYY-MM-DD"
					min-date="2025-01-01"
					max-date="2025-01-31">
					<div slot="day-2025-01-01" style="background: #10b981; color: white; padding: 0.25rem; border-radius: 4px; font-weight: bold;">
						🎉 1
					</div>
					<div slot="day-2025-01-14" style="background: #ef4444; color: white; padding: 0.25rem; border-radius: 4px;">
						❤️ 14
					</div>
					<div slot="day-2025-01-15" style="background: #3b82f6; color: white; padding: 0.25rem; border-radius: 4px;">
						💼 15
					</div>
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Special dates: Jan 1 (New Year), Jan 14 (Valentine's), Jan 15 (Meeting)</p>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<web-daterangepicker
  selection-mode="single"
  min-date="2025-01-01"
  max-date="2025-01-31">

  <!-- New Year's Day -->
  <div slot="day-2025-01-01" style="...">
    🎉 1
  </div>

  <!-- Valentine's Day -->
  <div slot="day-2025-01-14" style="...">
    ❤️ 14
  </div>

  <!-- Important Meeting -->
  <div slot="day-2025-01-15" style="...">
    💼 15
  </div>
</web-daterangepicker>`}
					languageType="html"
					titleText="HTML"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Holidays & Events</strong> - Mark special dates with icons</li>
						<li><strong>Availability</strong> - Show booked/available status</li>
						<li><strong>Prices</strong> - Display different pricing on specific dates</li>
						<li><strong>Deadlines</strong> - Highlight important dates</li>
					</ul>

					<h5>Key Features</h5>
					<ul>
						<li>✅ <strong>Declarative</strong> - Define in HTML markup</li>
						<li>✅ <strong>Highest priority</strong> - Overrides all callbacks</li>
						<li>✅ <strong>Date-specific</strong> - Target exact dates with <code>slot="day-YYYY-MM-DD"</code></li>
						<li>✅ <strong>Full HTML support</strong> - Use any HTML elements, styles, components</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- renderDay Callback -->
		<ShowcaseSection
			titleText="renderDay Callback (Full Replacement)"
			subtitleText="Programmatically replace entire day cell content"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					id="render-day-demo"
					selection-mode="single"
					date-format-mask="YYYY-MM-DD"
					min-date="2025-02-01"
					max-date="2025-02-28">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Weekend dates show emoji indicators</p>
				<script>
					if (typeof window !== 'undefined') {
						setTimeout(() => {
							const picker = document.getElementById('render-day-demo');
							if (picker) {
								picker.renderDay = (data) => {
									const isWeekend = data.date.getDay() === 0 || data.date.getDay() === 6;
									const emoji = data.date.getDay() === 0 ? '😴' : data.date.getDay() === 6 ? '🎉' : '';

									const div = document.createElement('div');
									div.style.cssText = isWeekend
										? 'background: #fef3c7; padding: 0.25rem; border-radius: 4px; font-weight: 600;'
										: 'padding: 0.25rem;';
									div.innerHTML = `${emoji} ${data.day}`;
									return div;
								};
							}
						}, 100);
					}
				</script>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<web-daterangepicker id="my-picker"></web-daterangepicker>

<script>
  const picker = document.getElementById('my-picker');

  picker.renderDay = (data) => {
    const isWeekend = data.date.getDay() === 0 ||
                      data.date.getDay() === 6;
    const emoji = data.date.getDay() === 0 ? '😴' :
                  data.date.getDay() === 6 ? '🎉' : '';

    const div = document.createElement('div');
    div.style.cssText = isWeekend
      ? 'background: #fef3c7; padding: 0.25rem;'
      : 'padding: 0.25rem;';
    div.innerHTML = \`\${emoji} \${data.day}\`;
    return div;
  };
</script>`}
					languageType="html"
					titleText="JavaScript"
				/>

				<CodeBlock
					codeContent={`// Available data in renderDay callback:
interface DayRenderData {
  date: Date;           // Full Date object
  day: number;          // Day number (1-31)
  month: number;        // Month (0-11)
  year: number;         // Full year
  isOtherMonth: boolean; // From previous/next month
  isDisabled: boolean;   // Is date disabled
  isSelected: boolean;   // Is date selected
  isToday: boolean;      // Is today's date
}`}
					languageType="typescript"
					titleText="DayRenderData Interface"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Dynamic pricing</strong> - Show prices from API</li>
						<li><strong>Availability indicators</strong> - Booked/available/limited</li>
						<li><strong>Custom layouts</strong> - Multi-line content, icons, badges</li>
						<li><strong>Conditional styling</strong> - Based on date properties</li>
					</ul>

					<h5>Key Features</h5>
					<ul>
						<li>✅ <strong>Full control</strong> - Complete replacement of day cell</li>
						<li>✅ <strong>Dynamic content</strong> - Calculate based on date data</li>
						<li>✅ <strong>Return types</strong> - HTMLElement, string, or null</li>
						<li>⚠️ <strong>Overridden by slots</strong> - Named slots take priority</li>
					</ul>

					<h5>Return Values</h5>
					<ul>
						<li><code>HTMLElement</code> - Rendered element replaces default</li>
						<li><code>string</code> - HTML string replaces default</li>
						<li><code>null</code> - Falls back to default rendering</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- renderDayContent Callback -->
		<ShowcaseSection
			titleText="renderDayContent Callback (Augmentation)"
			subtitleText="Add content alongside the default day number"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<web-daterangepicker
					id="render-content-demo"
					selection-mode="single"
					date-format-mask="YYYY-MM-DD"
					min-date="2025-03-01"
					max-date="2025-03-31">
				</web-daterangepicker>
				<p class="mt-3 small text-muted">Days show availability badges below the date</p>
				<script>
					if (typeof window !== 'undefined') {
						setTimeout(() => {
							const picker = document.getElementById('render-content-demo');
							if (picker) {
								picker.renderDayContent = (data) => {
									// Simulate availability data
									const availability = data.day % 3 === 0 ? 'Full' :
									                    data.day % 3 === 1 ? 'Limited' : 'Available';
									const color = availability === 'Full' ? '#ef4444' :
									             availability === 'Limited' ? '#f59e0b' : '#10b981';

									const badge = document.createElement('div');
									badge.style.cssText = `font-size: 0.6rem; color: ${color}; font-weight: 600; margin-top: 2px;`;
									badge.textContent = availability;
									return badge;
								};
							}
						}, 100);
					}
				</script>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`<web-daterangepicker id="my-picker"></web-daterangepicker>

<script>
  const picker = document.getElementById('my-picker');

  picker.renderDayContent = (data) => {
    // Simulate availability data
    const availability = data.day % 3 === 0 ? 'Full' :
                        data.day % 3 === 1 ? 'Limited' :
                        'Available';
    const color = availability === 'Full' ? '#ef4444' :
                 availability === 'Limited' ? '#f59e0b' :
                 '#10b981';

    const badge = document.createElement('div');
    badge.style.cssText = \`
      font-size: 0.6rem;
      color: \${color};
      font-weight: 600;
      margin-top: 2px;
    \`;
    badge.textContent = availability;
    return badge;
  };
</script>`}
					languageType="html"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Badges & labels</strong> - Add indicators below date</li>
						<li><strong>Price display</strong> - Show pricing under date</li>
						<li><strong>Status indicators</strong> - Availability, capacity, etc.</li>
						<li><strong>Tooltips</strong> - Additional contextual info</li>
					</ul>

					<h5>Key Features</h5>
					<ul>
						<li>✅ <strong>Augmentation</strong> - Keeps default day number</li>
						<li>✅ <strong>Less invasive</strong> - Adds content, doesn't replace</li>
						<li>✅ <strong>Flexible layout</strong> - Content appears below day number</li>
						<li>⚠️ <strong>Lower priority</strong> - Overridden by slots and renderDay</li>
					</ul>

					<h5>Difference from renderDay</h5>
					<p><code>renderDayContent</code> <strong>adds to</strong> the default day cell, while <code>renderDay</code> <strong>replaces</strong> it entirely. Use renderDayContent when you want to keep the standard appearance but add extra information.</p>
				</div>
			{/snippet}
		</ShowcaseSection>

		<!-- Comparison -->
		<section class="mb-5">
			<h2 class="mb-4">Comparison: When to Use Each Approach</h2>

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Feature</th>
							<th>Named Slots</th>
							<th>renderDay</th>
							<th>renderDayContent</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Priority</strong></td>
							<td><span class="badge bg-success">Highest</span></td>
							<td><span class="badge bg-warning">Medium</span></td>
							<td><span class="badge bg-secondary">Lowest</span></td>
						</tr>
						<tr>
							<td><strong>Use Case</strong></td>
							<td>Specific dates (holidays, events)</td>
							<td>All dates with dynamic content</td>
							<td>Add info to all dates</td>
						</tr>
						<tr>
							<td><strong>Approach</strong></td>
							<td>Declarative HTML</td>
							<td>Programmatic JS</td>
							<td>Programmatic JS</td>
						</tr>
						<tr>
							<td><strong>Replaces Day?</strong></td>
							<td>✅ Yes (per date)</td>
							<td>✅ Yes (all dates)</td>
							<td>❌ No (augments)</td>
						</tr>
						<tr>
							<td><strong>Dynamic Data</strong></td>
							<td>❌ Static HTML</td>
							<td>✅ Full access</td>
							<td>✅ Full access</td>
						</tr>
						<tr>
							<td><strong>Best For</strong></td>
							<td>Few special dates</td>
							<td>Complex custom rendering</td>
							<td>Adding badges/labels</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Tips & Best Practices -->
		<section class="mb-5">
			<h2 class="mb-4">Tips & Best Practices</h2>

			<div class="alert alert-success">
				<strong>✅ DO:</strong>
				<ul class="mb-0 mt-2">
					<li>Use <strong>slots</strong> for a few specific dates (holidays, events)</li>
					<li>Use <strong>renderDay</strong> for complex, dynamic content on all dates</li>
					<li>Use <strong>renderDayContent</strong> to add supplementary info (prices, badges)</li>
					<li>Return <code>null</code> from callbacks to fall back to default rendering</li>
					<li>Keep custom content concise to maintain calendar readability</li>
				</ul>
			</div>

			<div class="alert alert-warning mt-3">
				<strong>⚠️ DON'T:</strong>
				<ul class="mb-0 mt-2">
					<li>Mix all three approaches unnecessarily - use the simplest solution</li>
					<li>Create extremely large custom elements that break calendar layout</li>
					<li>Forget that slots override callbacks (understand priority order)</li>
					<li>Use renderDay when renderDayContent would suffice (less intrusive)</li>
				</ul>
			</div>
		</section>

		<!-- Advanced Example -->
		<section class="mb-5">
			<h2 class="mb-4">Advanced Example: Hotel Booking</h2>
			<p>Combining slots for special events with renderDayContent for pricing:</p>

			<CodeBlock
				codeContent={`<web-daterangepicker
  id="hotel-picker"
  selection-mode="range">

  <!-- Christmas Day - Special slot -->
  <div slot="day-2025-12-25" style="background: #ef4444; color: white; padding: 0.25rem;">
    🎄 25 - CLOSED
  </div>
</web-daterangepicker>

<script>
  const picker = document.getElementById('hotel-picker');

  // Add pricing to all other days
  picker.renderDayContent = (data) => {
    if (data.isOtherMonth || data.isDisabled) return null;

    // Fetch price from your API/data
    const price = getPriceForDate(data.date);

    const priceEl = document.createElement('div');
    priceEl.style.cssText = 'font-size: 0.7rem; color: #059669; font-weight: 600;';
    priceEl.textContent = \`$\${price}\`;
    return priceEl;
  };
</script>`}
				languageType="html"
				titleText="Hotel Booking Example"
			/>
		</section>
	</div>
</DocLayout>

<style>
	.demo-output {
		margin-top: 1rem;
		padding: 0.75rem;
		background: #f3f4f6;
		border-radius: 0.375rem;
		font-family: monospace;
	}

	.prose ul {
		padding-left: 1.5rem;
	}

	.prose h5 {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		font-size: 1.1rem;
		font-weight: 600;
	}
</style>
