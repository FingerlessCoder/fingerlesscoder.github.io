import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://fingerlesscoder.github.io',
  base: '/',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
