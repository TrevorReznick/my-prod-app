import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';


// https://astro.build/config
export default defineConfig({
  site: 'https://bookmarks-list.netlify.app/',
  integrations: [vue(), tailwind(), netlify()],
  output: 'server',
  adapter: netlify()
});
