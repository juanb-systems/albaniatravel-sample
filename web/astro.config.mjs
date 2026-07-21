// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Local-first PoC: no live hosting/deployment. Content is pulled from Payload's
  // REST API at build time and the site ships as static HTML.
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});