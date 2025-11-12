<script lang="ts">
	import { DocLayout, ShowcaseSection, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Custom Summary"
	descriptionText="Customize how selected dates are displayed in the input field"
>
	<div class="py-1">
		<section class="mb-5">
			<p class="lead">
				Control exactly how selected dates appear in the input field using custom summary formatters.
				Display dates, ranges, or completely custom text based on your application needs.
			</p>
		</section>

		<ShowcaseSection
			titleText="Custom Single Date Summary"
			subtitleText="Format how single dates are displayed"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<CodeBlock
					codeContent={`const picker = document.querySelector('date-range-picker');

picker.formatSummary = (date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = days[date.getDay()];
  const formatted = date.toLocaleDateString();
  return \`\${dayName}, \${formatted}\`;
};

// Result: "Mon, 11/7/2024"`}
					languageType="javascript"
					titleText="Custom Format Example"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  selectionMode: 'single',
  
  formatSummary: (date) => {
    const today = new Date();
    const diffDays = Math.floor((date - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    
    return date.toLocaleDateString();
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Use Cases</h5>
					<ul>
						<li><strong>Relative dates</strong> - "Today", "Tomorrow", "3 days from now"</li>
						<li><strong>Day names</strong> - "Monday, Nov 7, 2024"</li>
						<li><strong>Custom formats</strong> - "Week 45, 2024"</li>
					</ul>

					<h5>Key Option</h5>
					<ul>
						<li><code>formatSummary</code> - Function to customize single date display</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="Custom Range Summary"
			subtitleText="Format how date ranges are displayed"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<CodeBlock
					codeContent={`const picker = document.querySelector('date-range-picker');

picker.formatRangeSummary = (startDate, endDate) => {
  const diffTime = endDate - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const start = startDate.toLocaleDateString();
  const end = endDate.toLocaleDateString();
  
  return \`\${start} to \${end} (\${diffDays} days)\`;
};

// Result: "11/1/2024 to 11/7/2024 (7 days)"`}
					languageType="javascript"
					titleText="Range Format Example"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  selectionMode: 'range',
  
  formatRangeSummary: (startDate, endDate) => {
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const start = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return \`\${start} - \${end} (\${days}d)\`;
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Common Patterns</h5>
					<ul>
						<li><strong>With duration</strong> - "Nov 1 - Nov 7 (7 days)"</li>
						<li><strong>Same month</strong> - "November 1-7, 2024"</li>
						<li><strong>Nights calculation</strong> - "3 nights" for hotel bookings</li>
					</ul>

					<h5>Key Option</h5>
					<ul>
						<li><code>formatRangeSummary</code> - Function to customize range display</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>

		<ShowcaseSection
			titleText="Conditional Formatting"
			subtitleText="Different formats based on context"
			demoColumnTitle="Live Demo"
			controlsColumnTitle="Code Examples"
			descriptionColumnTitle="Details">

			{#snippet demoContent()}
				<CodeBlock
					codeContent={`const picker = document.querySelector('date-range-picker');

picker.formatRangeSummary = (startDate, endDate) => {
  const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 7) {
    return \`\${diffDays} day stay\`;
  }
  
  if (diffDays % 7 === 0) {
    const weeks = diffDays / 7;
    return \`\${weeks} week\${weeks > 1 ? 's' : ''}\`;
  }
  
  return \`\${diffDays} days\`;
};`}
					languageType="javascript"
					titleText="Conditional Formatting"
				/>
			{/snippet}

			{#snippet controlsContent()}
				<CodeBlock
					codeContent={`// JavaScript API
import { PureDatePicker } from '@keenmate/web-daterangepicker';

const picker = new PureDatePicker(inputElement, {
  selectionMode: 'range',
  
  formatRangeSummary: (startDate, endDate) => {
    const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Same day';
    if (diffDays === 1) return 'Overnight';
    if (diffDays <= 7) return \`\${diffDays} nights\`;
    
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    return \`\${weeks}w \${days}d\`;
  }
});`}
					languageType="javascript"
					titleText="JavaScript"
				/>
			{/snippet}

			{#snippet descriptionContent()}
				<div class="prose">
					<h5>Conditional Logic Ideas</h5>
					<ul>
						<li><strong>Duration-based</strong> - Different formats for short vs long ranges</li>
						<li><strong>Context-aware</strong> - "Weekend", "Week", "Month"</li>
						<li><strong>Business rules</strong> - Minimum night requirements</li>
					</ul>

					<h5>Best Practices</h5>
					<ul>
						<li>Keep summary concise (under 50 chars)</li>
						<li>Use familiar terminology</li>
						<li>Consider internationalization</li>
					</ul>
				</div>
			{/snippet}
		</ShowcaseSection>
	</div>
</DocLayout>
