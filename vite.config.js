import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  base: '/BurnBunny/',
  build: {
    outDir: 'dist',
    assetsDir: '',
    sourcemap: true,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        assetFileNames: '[name]-[hash][extname]',
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: '[name]-[hash].js',
      }
    }
  }
})