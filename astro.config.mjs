import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind'


// https://astro.build/config
export default defineConfig({
  site: 'https://www.xdomain.it',
  integrations: [
    vue(),
    tailwind()
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
})