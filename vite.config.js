import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Set this to your GitHub repo name for GitHub Pages deployment
  // e.g. if your repo is github.com/SaiKalyan-07/portfolio → base: '/portfolio/'
  base: '/portfolio/',

  plugins: [
    tailwindcss(),
  ],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for easier debugging
    sourcemap: false,
    rollupOptions: {
      output: {
        // Clean asset filenames
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  },

  server: {
    port: 3000,
    open: true,
  }
})