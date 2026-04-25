import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: 
  // - Use '/aanamichitram/' while viewing on unknown-audio-man.github.io
  // - Change to '/' once aanami.in is fully connected and working
  base: '/aanamichitram/', 
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false, 
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
