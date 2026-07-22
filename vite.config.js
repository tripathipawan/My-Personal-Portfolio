import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
        passes: 2,
      },
      mangle: { safari10: true },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons'
          }
          if (id.includes('node_modules/@emailjs')) {
            return 'vendor-emailjs'
          }
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    cssCodeSplit: true,
  },

  server: {
    warmup: {
      clientFiles: ['./src/main.jsx', './src/App.jsx', './src/components/sections/Hero.jsx'],
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-icons/fa', 'react-icons/fi', 'react-icons/si'],
  },
})