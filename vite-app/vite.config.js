import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Build va directo al directorio raíz del servidor web
    outDir: '../',
    emptyOutDir: false,

    // Target para navegadores modernos (ES2020+) para bundles más pequeños
    target: 'es2020',

    // Minificación habilitada por defecto en Vite
    minify: true,

    // CSS code splitting
    cssCodeSplit: true,

    // Source maps deshabilitados para producción
    sourcemap: false,

    // Optimización de chunks
    rollupOptions: {
      output: {
        // Estrategia de code splitting manual con función
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router-dom')) {
              return 'router';
            }
          }
        },

        // Optimizar nombres de chunks para cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // Aumentar tamaño de chunk warning (solo para review, no afecta build)
    chunkSizeWarningLimit: 1000,
  },

  // Optimizaciones de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
