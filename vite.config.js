import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginHtmlEnv from 'vite-plugin-html-env';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		VitePluginHtmlEnv({
			prefix: '{{',
			suffix: '}}',
			envPrefixes: ['VITE_APP_']
		}),
		react()
	]
});
