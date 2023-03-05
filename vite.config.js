import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pixelrain: resolve(__dirname, 'pixelrain/index.html'),
        threejs: resolve(__dirname, 'threejs/index.html')
      }
    }
  }
})