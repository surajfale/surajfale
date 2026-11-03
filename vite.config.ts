import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rolldownOptions: {
      output: {
        // Rolldown has no object-form manualChunks; codeSplitting groups replace it.
        // Higher priority wins, so icons are claimed before the broader MUI group.
        codeSplitting: {
          groups: [
            {
              name: 'mui-icons',
              test: /[\\/]node_modules[\\/]@mui[\\/]icons-material[\\/]/,
              priority: 20,
            },
            {
              name: 'mui-core',
              test: /[\\/]node_modules[\\/](@mui|@emotion)[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
})
