import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // Configure custom proxy rules for the dev server. Expects an object of { key: options } pairs. Uses http-proxy.
    proxy: {
      '/api': {
        target: 'http://localhost:3500',
        secure: false,
      }
    }
  },
  plugins: [react()],
})
