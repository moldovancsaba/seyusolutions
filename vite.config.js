import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/seyusolutions/',
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
