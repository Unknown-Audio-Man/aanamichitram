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

echo "4. Setting up GitHub Actions Workflow..."
mkdir -p .github/workflows
cat << 'EOF' > .github/workflows/deploy.yml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build project
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF

echo "5. Ensuring CNAME is set for aanami.in..."
mkdir -p public
echo "aanami.in" > public/CNAME

echo "6. Cleaning up package.json safely..."
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.homepage = 'https://aanami.in';
pkg.scripts = {
  'dev': 'vite',
  'build': 'vite build',
  'lint': 'eslint .',
  'preview': 'vite preview'
};
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo "7. Committing and Pushing to GitHub..."
git add .
git commit -m "Fix: Applied Tailwind config, CSS import, and GitHub Actions deployment"
git push origin main

echo ""
echo "==========================================================="
echo "✅ SUCCESS! All fixes have been pushed to GitHub."
echo "==========================================================="
echo "What happens next?"
echo "1. Go to https://github.com/Unknown-Audio-Man/aanamichitram/actions"
echo "2. You will see a yellow dot indicating your site is building."
echo "3. Once it turns green (about 1 minute), refresh https://aanami.in"
echo "   and your site will have all of its cinematic styling back!"
