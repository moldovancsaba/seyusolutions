import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Served at the root of the custom domain (see public/CNAME), so base is '/'.
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gtc: resolve(__dirname, 'gtc.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        cookiePolicy: resolve(__dirname, 'cookie-policy.html'),
      }
    }
  }
})
