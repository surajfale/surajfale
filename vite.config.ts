import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rolldownOptions: {
      output: {
        // Rolldown has no object-form manualChunks; codeSplitting groups replace it.
        codeSplitting: {
          groups: [
            {
              name: 'icons',
              test: /[\\/]node_modules[\\/]@phosphor-icons[\\/]/,
              priority: 20,
            },
            {
              name: 'motion',
              test: /[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/,
              priority: 20,
            },
            {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
})
