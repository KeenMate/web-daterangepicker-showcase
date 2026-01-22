import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import daterangepickerPkg from '@keenmate/web-daterangepicker/package.json' with { type: 'json' };

const daterangepickerVersion = daterangepickerPkg?.version;

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__DATERANGEPICKER_VERSION__: JSON.stringify(daterangepickerVersion ?? 'unknown')
	}
});
