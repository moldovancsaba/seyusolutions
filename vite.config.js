import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Served from the GitHub Pages project path: moldovancsaba.github.io/seyusolutions/
  base: '/seyusolutions/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        marketingAgency: resolve(import.meta.dirname, 'marketing-agency.html'),
        gtc: resolve(import.meta.dirname, 'gtc.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        cookiePolicy: resolve(import.meta.dirname, 'cookie-policy.html'),
        founder: resolve(import.meta.dirname, 'founder.html'),
      }
    }
  }
})
