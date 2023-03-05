import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pixel_rain: resolve(__dirname, 'pixel_rain/index.html')
      }
    }
  }
})