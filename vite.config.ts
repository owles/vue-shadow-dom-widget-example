import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {styleInjectPlugin} from "./src/widget/widget";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    styleInjectPlugin(),
    vue()
  ],
  build: {
    watch: true,
    minify: true,
    cssCodeSplit: false,
    outDir: 'dist',
    rollupOptions: {
      chunkFileNames: 'main.ts',
      input: {
        app: './src/main.ts'
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
