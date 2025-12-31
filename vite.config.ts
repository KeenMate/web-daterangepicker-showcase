import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import packageLock from './package-lock.json' with { type: 'json' };

// Get version from package-lock.json (handles both normal and file: links)
const daterangepickerPkg = packageLock.packages['node_modules/@keenmate/web-daterangepicker'];
const daterangepickerVersion = daterangepickerPkg?.link
	? packageLock.packages[daterangepickerPkg.resolved]?.version
	: daterangepickerPkg?.version;

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__DATERANGEPICKER_VERSION__: JSON.stringify(daterangepickerVersion ?? 'unknown')
	}
});
