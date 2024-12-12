import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

export default defineConfig({
  plugins: [
    mdx(),
    react(),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    outDir: 'dist', // Ensure this matches the 'publish' directory in netlify.toml
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
  base: '/', // This ensures assets are loaded from the correct path
});