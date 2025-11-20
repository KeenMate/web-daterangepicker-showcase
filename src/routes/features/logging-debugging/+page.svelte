<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { onMount } from 'svelte';

	onMount(() => {
		import('@keenmate/web-daterangepicker');
	});
</script>

<DocLayout
	titleText="Debug Logging"
	descriptionText="Category-based debug logging system for troubleshooting date picker issues"
>
	<div class="py-1">
		<!-- Overview -->
		<section class="mb-5">
			<p class="lead">
				Web Daterangepicker includes a powerful, category-based logging system built on <code
					>loglevel</code
				>. Enable detailed debug logs during development or troubleshoot production issues via
				the browser console API.
			</p>

			<div class="alert alert-info">
				<strong>Key Features:</strong> 8 hierarchical log categories, color-coded console output,
				millisecond timestamps, and zero performance overhead when disabled.
			</div>
		</section>

		<!-- Quick Start -->
		<section class="mb-5">
			<h2>Quick Start</h2>
			<p>Enable logging globally for all categories:</p>

			<CodeBlock
				codeContent={`// In your main.js or app initialization
import { enableLogging } from '@keenmate/web-daterangepicker/logger';

// Enable all debug logging
enableLogging();

// Or enable only in development
if (import.meta.env.DEV) {
  enableLogging();
}`}
				languageType="javascript"
				titleText="Enable Debug Logging"
			/>

			<p class="mt-3">
				When enabled, you'll see color-coded logs in your browser console with timestamps:
			</p>

			<div class="alert alert-secondary">
				<code style="color: #0ea5e9;">[14:32:15.234] [DEBUG] [DRP] Week starts on day: 0</code><br
				/>
				<code style="color: #10b981;">[14:32:15.235] [INFO] [DRP:RENDERING] Rendering calendar</code
				><br />
				<code style="color: #f59e0b;">[14:32:15.240] [WARN] [DRP:VALIDATION] Date disabled</code
				><br />
				<code style="color: #ef4444;">[14:32:15.245] [ERROR] [DRP:SELECTION] Invalid date range</code
				>
			</div>
		</section>

		<!-- Logging Categories -->
		<section class="mb-5">
			<h2>Logging Categories</h2>
			<p>
				The logger uses a hierarchical category system for granular control. Enable only the
				categories you need:
			</p>

			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Category</th>
						<th>Description</th>
						<th>Use When</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>DRP</code></td>
						<td>Core initialization and lifecycle</td>
						<td>Component won't initialize, options not applied</td>
					</tr>
					<tr>
						<td><code>DRP:RENDERING</code></td>
						<td>Calendar rendering and DOM updates</td>
						<td>Calendar not visible, dates not displaying correctly</td>
					</tr>
					<tr>
						<td><code>DRP:INTERACTION</code></td>
						<td>User interactions (clicks, hovers, keyboard)</td>
						<td>Clicks not working, keyboard navigation broken</td>
					</tr>
					<tr>
						<td><code>DRP:SELECTION</code></td>
						<td>Date selection logic</td>
						<td>Dates not selecting, range not working</td>
					</tr>
					<tr>
						<td><code>DRP:NAVIGATION</code></td>
						<td>Month/year navigation</td>
						<td>Navigation buttons not working, wrong month shown</td>
					</tr>
					<tr>
						<td><code>DRP:UI</code></td>
						<td>Show/hide calendar, positioning</td>
						<td>Calendar won't open, positioning incorrect</td>
					</tr>
					<tr>
						<td><code>DRP:VALIDATION</code></td>
						<td>Date validation and restrictions</td>
						<td>Disabled dates not working, validation issues</td>
					</tr>
					<tr>
						<td><code>DRP:DRAG</code></td>
						<td>Drag-to-adjust range functionality</td>
						<td>Drag behavior not working in range mode</td>
					</tr>
				</tbody>
			</table>
		</section>

		<!-- Configuration API -->
		<section class="mb-5">
			<h2>Configuration API</h2>
			<p>Control logging programmatically at application startup:</p>

			<h5 class="mt-4">Enable All Logging</h5>
			<CodeBlock
				codeContent={`import { enableLogging } from '@keenmate/web-daterangepicker/logger';

// Enable all categories at debug level
enableLogging();`}
				languageType="javascript"
			/>

			<h5 class="mt-4">Disable All Logging</h5>
			<CodeBlock
				codeContent={`import { disableLogging } from '@keenmate/web-daterangepicker/logger';

// Silence all logging
disableLogging();`}
				languageType="javascript"
			/>

			<h5 class="mt-4">Set Global Log Level</h5>
			<CodeBlock
				codeContent={`import { setLogLevel } from '@keenmate/web-daterangepicker/logger';

// Set all categories to a specific level
setLogLevel('warn');  // Only show warnings and errors
setLogLevel('info');  // Show info, warnings, and errors
setLogLevel('debug'); // Show all logs (equivalent to enableLogging())`}
				languageType="javascript"
			/>

			<h5 class="mt-4">Set Category-Specific Level</h5>
			<CodeBlock
				codeContent={`import { setCategoryLevel } from '@keenmate/web-daterangepicker/logger';

// Enable only rendering logs
setCategoryLevel('DRP:RENDERING', 'debug');

// Multiple categories
setCategoryLevel('DRP:SELECTION', 'debug');
setCategoryLevel('DRP:NAVIGATION', 'debug');`}
				languageType="javascript"
			/>

			<div class="alert alert-info mt-3">
				<strong>Tip:</strong> Use category-specific logging instead of enabling all logs. This reduces
				noise and helps you focus on the specific issue you're debugging.
			</div>
		</section>

		<!-- Browser Console API -->
		<section class="mb-5">
			<h2>Browser Console API</h2>
			<p>
				Control logging at runtime via the browser console - no rebuild required! This is perfect
				for debugging production issues or testing on the fly.
			</p>

			<h5 class="mt-4">Access the API</h5>
			<CodeBlock
				codeContent={`// Open browser devtools console (F12) and type:
window.components['web-daterangepicker']

// Available properties:
window.components['web-daterangepicker'].version()     // Get version
window.components['web-daterangepicker'].config        // View package metadata
window.components['web-daterangepicker'].logging       // Access logging API`}
				languageType="javascript"
			/>

			<h5 class="mt-4">Enable/Disable Logging</h5>
			<CodeBlock
				codeContent={`// Enable all logging
window.components['web-daterangepicker'].logging.enableLogging()

// Disable all logging
window.components['web-daterangepicker'].logging.disableLogging()`}
				languageType="javascript"
			/>

			<h5 class="mt-4">Set Log Levels</h5>
			<CodeBlock
				codeContent={`// Set global level
window.components['web-daterangepicker'].logging.setLogLevel('debug')

// Set category-specific level
window.components['web-daterangepicker'].logging.setCategoryLevel('DRP:RENDERING', 'debug')`}
				languageType="javascript"
			/>

			<h5 class="mt-4">List Available Categories</h5>
			<CodeBlock
				codeContent={`// Get array of all categories
window.components['web-daterangepicker'].logging.getCategories()

// Returns:
// ['DRP', 'DRP:RENDERING', 'DRP:INTERACTION', 'DRP:SELECTION',
//  'DRP:NAVIGATION', 'DRP:UI', 'DRP:VALIDATION', 'DRP:DRAG']`}
				languageType="javascript"
			/>

			<h5 class="mt-4">Common Use Cases</h5>

			<div class="alert alert-secondary">
				<strong>Debug Production Issues:</strong><br />
				Calendar not working in production? Enable logging in the browser console to see what's happening
				without redeploying.
			</div>

			<div class="alert alert-secondary">
				<strong>Test Changes On-The-Fly:</strong><br />
				Experimenting with date restrictions or validation? Enable validation logging to see how dates
				are being processed in real-time.
			</div>

			<div class="alert alert-secondary">
				<strong>Check Component Version:</strong><br />
				Verify you're using the correct version of the component with
				<code>window.components['web-daterangepicker'].version()</code>
			</div>

			<div class="alert alert-secondary">
				<strong>Explore Available Categories:</strong><br />
				Not sure what categories are available? Call <code>getCategories()</code> to see the full list.
			</div>

			<h5 class="mt-4">Benefits</h5>
			<ul>
				<li><strong>No Rebuild Required:</strong> Toggle logging instantly in production</li>
				<li>
					<strong>Selective Debugging:</strong> Enable only the categories you need to investigate
				</li>
				<li><strong>Runtime Inspection:</strong> Check component version and configuration</li>
				<li><strong>Safe for Production:</strong> All logging functions are SSR-safe</li>
				<li><strong>Per-Instance Control:</strong> Each component instance respects global settings</li>
				<li>
					<strong>Zero Code Changes:</strong> Debug issues without modifying your source code
				</li>
			</ul>

			<div class="alert alert-warning mt-3">
				<strong>Note:</strong> The browser console API is only available client-side. It won't work
				during SSR (server-side rendering).
			</div>
		</section>

		<!-- Common Debugging Scenarios -->
		<section class="mb-5">
			<h2>Common Debugging Scenarios</h2>

			<h5 class="mt-4">Calendar Not Rendering</h5>
			<CodeBlock
				codeContent={`// Enable rendering logs
window.components['web-daterangepicker'].logging.setCategoryLevel('DRP:RENDERING', 'debug')

// Expected output:
// [14:32:15.235] [DEBUG] [DRP:RENDERING] Creating calendar
// [14:32:15.240] [DEBUG] [DRP:RENDERING] Rendering calendar
// [14:32:15.245] [DEBUG] [DRP:RENDERING] Rendering month: 2025-01
// [14:32:15.250] [DEBUG] [DRP:RENDERING] Rendered 31 days`}
				languageType="javascript"
			/>

			<h5 class="mt-4">Selection Not Working</h5>
			<CodeBlock
				codeContent={`// Enable selection logs
window.components['web-daterangepicker'].logging.setCategoryLevel('DRP:SELECTION', 'debug')

// Expected output:
// [14:32:20.100] [DEBUG] [DRP:SELECTION] Selecting date: 2025-01-15
// [14:32:20.105] [DEBUG] [DRP:SELECTION] Selection mode: single
// [14:32:20.110] [DEBUG] [DRP:SELECTION] Date selected successfully`}
				languageType="javascript"
			/>

			<h5 class="mt-4">Navigation Issues</h5>
			<CodeBlock
				codeContent={`// Enable navigation logs
window.components['web-daterangepicker'].logging.setCategoryLevel('DRP:NAVIGATION', 'debug')

// Expected output:
// [14:32:25.200] [DEBUG] [DRP:NAVIGATION] Navigate to next month
// [14:32:25.205] [DEBUG] [DRP:NAVIGATION] Current month: 2025-01
// [14:32:25.210] [DEBUG] [DRP:NAVIGATION] New month: 2025-02`}
				languageType="javascript"
			/>

			<h5 class="mt-4">Drag Behavior Problems</h5>
			<CodeBlock
				codeContent={`// Enable drag logs
window.components['web-daterangepicker'].logging.setCategoryLevel('DRP:DRAG', 'debug')

// Expected output:
// [14:32:30.300] [DEBUG] [DRP:DRAG] Drag start: 2025-01-10
// [14:32:30.350] [DEBUG] [DRP:DRAG] Drag move: 2025-01-12
// [14:32:30.400] [DEBUG] [DRP:DRAG] Drag end: 2025-01-15`}
				languageType="javascript"
			/>
		</section>

		<!-- Output Format -->
		<section class="mb-5">
			<h2>Output Format</h2>
			<p>
				All log messages follow a consistent format for easy parsing and filtering in browser
				devtools:
			</p>

			<div class="alert alert-secondary">
				<code>[HH:MM:SS.mmm] [LEVEL] [CATEGORY] message</code>
			</div>

			<p><strong>Format Breakdown:</strong></p>
			<ul>
				<li><strong>Timestamp:</strong> 24-hour time with milliseconds for precise timing</li>
				<li><strong>Level:</strong> DEBUG, INFO, WARN, or ERROR</li>
				<li><strong>Category:</strong> Hierarchical category (e.g., DRP:RENDERING)</li>
				<li><strong>Message:</strong> The actual log content</li>
			</ul>

			<h5 class="mt-4">Color Coding</h5>
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Level</th>
						<th>Color</th>
						<th>Use Case</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>DEBUG</td>
						<td><span style="color: #0ea5e9;">■</span> Blue</td>
						<td>Detailed diagnostic information</td>
					</tr>
					<tr>
						<td>INFO</td>
						<td><span style="color: #10b981;">■</span> Green</td>
						<td>Informational messages about normal operation</td>
					</tr>
					<tr>
						<td>WARN</td>
						<td><span style="color: #f59e0b;">■</span> Orange</td>
						<td>Potential issues or unexpected states</td>
					</tr>
					<tr>
						<td>ERROR</td>
						<td><span style="color: #ef4444;">■</span> Red</td>
						<td>Errors that prevent normal operation</td>
					</tr>
				</tbody>
			</table>
		</section>

		<!-- Best Practices -->
		<section class="mb-5">
			<h2>Best Practices</h2>

			<h5 class="mt-4">1. Enable Only in Development</h5>
			<p>
				Logging has minimal overhead when disabled, but it's still best to avoid it in
				production:
			</p>
			<CodeBlock
				codeContent={`// Vite
if (import.meta.env.DEV) {
  enableLogging();
}

// Webpack
if (process.env.NODE_ENV === 'development') {
  enableLogging();
}

// Or use a custom environment variable
if (import.meta.env.VITE_DEBUG === 'true') {
  enableLogging();
}`}
				languageType="javascript"
			/>

			<h5 class="mt-4">2. Use Category-Specific Logging</h5>
			<p>Instead of enabling all logs, focus on the category you're debugging:</p>
			<CodeBlock
				codeContent={`// ❌ Don't do this (too noisy)
enableLogging();

// ✅ Do this (targeted debugging)
setCategoryLevel('DRP:SELECTION', 'debug');
setCategoryLevel('DRP:VALIDATION', 'debug');`}
				languageType="javascript"
			/>

			<h5 class="mt-4">3. Different Levels for Different Categories</h5>
			<CodeBlock
				codeContent={`// Show all rendering logs
setCategoryLevel('DRP:RENDERING', 'debug');

// Only show warnings for navigation
setCategoryLevel('DRP:NAVIGATION', 'warn');

// Only show errors for validation
setCategoryLevel('DRP:VALIDATION', 'error');`}
				languageType="javascript"
			/>

			<h5 class="mt-4">4. Configuration Warnings Are Always Visible</h5>
			<p>
				Important configuration issues are logged via <code>console.warn</code> or
				<code>console.error</code> and are <strong>always visible</strong>, regardless of logging
				settings:
			</p>
			<ul>
				<li>Invalid configuration options</li>
				<li>Deprecated API usage</li>
				<li>Missing required attributes</li>
			</ul>
		</section>

		<!-- Performance -->
		<section class="mb-5">
			<h2>Performance</h2>

			<div class="alert alert-success">
				<strong>Zero Overhead:</strong> When logging is disabled (the default), there is virtually
				no performance impact. Log statements are compiled away and don't affect your application's
				speed.
			</div>

			<p><strong>Library Size:</strong></p>
			<ul>
				<li><code>loglevel</code>: ~1KB gzipped</li>
				<li><code>loglevel-plugin-prefix</code>: ~500B gzipped</li>
			</ul>

			<p><strong>Runtime Performance:</strong></p>
			<ul>
				<li>Disabled logs: &lt;1 microsecond per log call (negligible)</li>
				<li>Enabled logs: ~50-100 microseconds per log call (only in development)</li>
				<li>Production builds: Tree-shaken if not imported</li>
			</ul>
		</section>

		<!-- Implementation Details -->
		<section class="mb-5">
			<h2>Implementation Details</h2>

			<p><strong>Why loglevel?</strong></p>
			<ul>
				<li>Lightweight (~1KB) and battle-tested</li>
				<li>Zero dependencies</li>
				<li>Works in all browsers and Node.js</li>
				<li>Supports log levels and filtering</li>
				<li>Extensible via plugins</li>
			</ul>

			<h5 class="mt-4">Logger Structure</h5>
			<CodeBlock
				codeContent={`// src/logger.ts exports
export const drpLogger: log.Logger;           // Main logger
export const renderingLogger: log.Logger;     // Rendering category
export const interactionLogger: log.Logger;   // Interaction category
export const selectionLogger: log.Logger;     // Selection category
export const navigationLogger: log.Logger;    // Navigation category
export const uiLogger: log.Logger;            // UI category
export const validationLogger: log.Logger;    // Validation category
export const dragLogger: log.Logger;          // Drag category

// API functions
export const enableLogging: () => void;
export const disableLogging: () => void;
export const setLogLevel: (level) => void;
export const setCategoryLevel: (category, level) => void;
export const getCategories: () => string[];`}
				languageType="typescript"
			/>
		</section>

		<!-- Troubleshooting -->
		<section class="mb-5">
			<h2>Troubleshooting</h2>

			<h5 class="mt-4">Logs Not Appearing</h5>
			<ol>
				<li>
					<strong>Check if logging is enabled:</strong>
					<CodeBlock
						codeContent={`window.components['web-daterangepicker'].logging.enableLogging()`}
						languageType="javascript"
					/>
				</li>
				<li>
					<strong>Check browser console filters:</strong> Make sure you haven't filtered out console
					logs in your devtools settings
				</li>
				<li>
					<strong>Check log level:</strong> Some logs may be at INFO or WARN level. Try setting debug
					level:
					<CodeBlock
						codeContent={`window.components['web-daterangepicker'].logging.setLogLevel('debug')`}
						languageType="javascript"
					/>
				</li>
				<li>
					<strong>Verify component is loaded:</strong> Check that the web component is registered:
					<CodeBlock
						codeContent={`window.components['web-daterangepicker'].version()`}
						languageType="javascript"
					/>
				</li>
			</ol>

			<h5 class="mt-4">Too Many Logs</h5>
			<ol>
				<li>
					<strong>Use category-specific logging:</strong> Enable only what you need
				</li>
				<li>
					<strong>Increase log level:</strong> Use 'info' or 'warn' instead of 'debug'
				</li>
				<li>
					<strong>Filter in devtools:</strong> Use browser console filtering to search for specific
					messages
				</li>
			</ol>
		</section>
	</div>
</DocLayout>
