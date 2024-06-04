import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind'


// https://astro.build/config
export default defineConfig({
  site: 'https://www.xdomain.it',
  integrations: [
    vue(),
    cloudflare()
  ],
  output: 'server',
  adapter: cloudflare()
})