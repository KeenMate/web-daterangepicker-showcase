import type { PartialDocsConfig } from '@keenmate/svelte-docs';
import { mergeConfig, defaultConfig, generateSSRStyles } from '@keenmate/svelte-docs';
import pkg from '@keenmate/web-daterangepicker/package.json';

// Enable prerendering for all routes
export const prerender = true;
export const ssr = true;

const config: PartialDocsConfig = {
	site: {
		title: 'Web Date Range Picker',
		description: 'Complete documentation for @keenmate/web-daterangepicker - A feature-rich, customizable date range picker for modern web applications',
		keywords: ['date picker', 'range picker', 'calendar', 'web component', 'javascript', 'typescript', 'keenmate'],
		author: 'KeenMate',
		url: 'https://web-daterangepicker.keenmate.com',
		language: 'en'
	},
	company: {
		name: 'KeenMate',
		website: 'https://keenmate.com?utm_source=web-daterangepicker-showcase',
		social: {
			github: 'https://github.com/keenmate/web-daterangepicker'
		}
	},
	navigation: {
		main: [
			{ label: 'Home', href: '/', icon: '🏠' },
			{ label: 'Getting Started', href: '/getting-started', icon: '🚀' },
			{
				label: 'Features',
				href: '/features/selection-modes',
				icon: '✨',
				children: [
					{ label: 'Selection Modes', href: '/features/selection-modes' },
					{ label: 'Date Formats & Masking', href: '/features/date-formats' },
					{ label: 'Multi-Month Display', href: '/features/multi-month' },
					{ label: 'Unified Navigation', href: '/features/unified-navigation' },
					{ label: 'Internationalization', href: '/features/internationalization' },
					{ label: 'Date Restrictions', href: '/features/date-restrictions' },
					{ label: 'Special Dates & Badges', href: '/features/special-dates' },
					{ label: 'Bulk Metadata Loading', href: '/features/bulk-metadata-loading' },
					{ label: 'Custom Month Headers', href: '/features/custom-month-headers' },
					{ label: 'Event Callbacks', href: '/features/event-callbacks' },
					{ label: 'Custom Rendering (Slots)', href: '/features/custom-rendering' },
					{ label: 'Range Disabled Handling', href: '/features/range-disabled-handling' },
					{ label: 'Positioning Modes', href: '/features/positioning-modes' },
					{ label: 'Input Masking', href: '/features/input-masking' },
					{ label: 'Keyboard Navigation', href: '/features/keyboard-navigation' },
					{ label: 'Custom Summary Formatting', href: '/features/custom-summary' },
					{ label: 'Custom Styling & Theming', href: '/features/custom-styling' },
					{ label: 'Base Typography Variables', href: '/features/base-variables' },
					{ label: 'Logging & Debugging', href: '/features/logging-debugging' }
				]
			},
			{
				label: 'API Reference',
				href: '/api',
				icon: '📚'
			}
		]
	},
	features: {
		search: true,
		breadcrumbs: true,
		tableOfContents: true,
		analyticsScripts: [
			'<script defer data-domain="web-daterangepicker.keenmate.dev" src="https://stats.keenmate.services/js/plausible.js"></script>'
		]
	}
};

export async function load() {
	const mergedConfig = mergeConfig(defaultConfig, config);
	const ssrStyles = generateSSRStyles(mergedConfig);

	return {
		config: mergedConfig,
		ssrStyles,
		version: pkg.version
	};
}
