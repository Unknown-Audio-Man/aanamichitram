#!/bin/bash

echo "Starting portfolio fixes..."

# Ensure we are in the correct directory by checking for package.json
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found."
    echo "Please ensure you run this script inside your project folder: ~/aanamichitram/aanamichitram"
    exit 1
fi

echo "1. Updating vite.config.js..."
cat << 'EOF' > vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', 
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
EOF

echo "2. Updating tailwind.config.js..."
cat << 'EOF' > tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#d4af37',
        cinemaBlack: '#0a0a0a',
      },
      fontFamily: {
        heading: ['Syncopate', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
EOF

echo "3. Updating src/main.jsx (Fixing the CSS import)..."
cat << 'EOF' > src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // CRITICAL: This makes Tailwind work!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

echo "4. Removing GitHub Actions and installing gh-pages..."
rm -rf .github
npm install -D gh-pages

echo "5. Ensuring CNAME is set for aanami.in..."
mkdir -p public
echo "aanami.in" > public/CNAME

echo "6. Restoring deploy scripts to package.json..."
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.homepage = 'https://aanami.in';
pkg.scripts = {
  'dev': 'vite',
  'build': 'vite build',
  'lint': 'eslint .',
  'preview': 'vite preview',
  'predeploy': 'npm run build',
  'deploy': 'gh-pages -d dist'
};
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo "7. Committing and Pushing to GitHub..."
git add .
git commit -m "Revert: Switched back to manual gh-pages deployment"
git push origin main

echo "8. Deploying directly to gh-pages branch..."
npm run deploy

echo ""
echo "==========================================================="
echo "✅ SUCCESS! Your site is built and pushed to GitHub."
echo "==========================================================="
echo "CRITICAL FINAL STEP TO FIX THE 404 ERROR:"
echo "1. Go to your repository on GitHub."
echo "2. Click 'Settings' -> 'Pages' (on the left)."
echo "3. Under 'Build and deployment', change the 'Source' dropdown to 'Deploy from a branch'."
echo "4. Under 'Branch', select 'gh-pages' and click 'Save'."
echo "Wait 1-2 minutes, refresh aanami.in, and your site will be live!"
