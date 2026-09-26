import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      // Mirrors the srcNews Cloud Function (functions/index.js) for local dev
      '/api/src-news': {
        target: 'https://www.src.am',
        changeOrigin: true,
        rewrite: () => '/am/getNews1?lang=am&page=1',
      },
    },
  },
})
