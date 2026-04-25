import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Setting base to './' makes all asset paths relative.
  // This ensures the site works at both aanami.in and the github.io/repo-name/ URL.
  base: './', 
})
