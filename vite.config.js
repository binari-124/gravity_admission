import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	ssr: {
		noExternal: ['three'],
	  },
	plugins: [sveltekit()],
	server: {
		expose:true,
		port: 12000,
		strictPort: false,
	},

	preview: {
		port: 12000,
		strictPort: false,
	}
});
