#!/bin/bash

echo "🚀 Starting a Deep Clean & Rebuild of aanami.in..."

# 1. Environment Check
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this in ~/aanamichitram/aanamichitram"
    exit 1
fi

# 2. The "From Scratch" Part: Deep Cleaning
echo "🧹 Wiping old dependencies and cache..."
rm -rf node_modules package-lock.json dist
# Clear npm cache to prevent corrupted styling builds
npm cache clean --force

# 3. Reinstalling Core Engines
echo "📦 Reinstalling styling and deployment engines..."
npm install
npm install -D tailwindcss postcss autoprefixer gh-pages

# 4. Critical File Regeneration: PostCSS (Vite's Styling Bridge)
echo "🛠️ Regenerating postcss.config.js..."
cat << 'EOF' > postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# 5. Critical File Regeneration: Tailwind Config
echo "🎨 Regenerating tailwind.config.js..."
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

# 6. Critical File Regeneration: Vite Config (Domain Root)
echo "🏗️ Regenerating vite.config.js..."
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

# 7. Resetting CSS Directives
echo "📝 Resetting src/index.css..."
cat << 'EOF' > src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    background-color: #050505;
  }
  body {
    @apply bg-[#050505] text-[#e5e5e5] antialiased selection:bg-[#d4af37]/30 selection:text-white;
  }
}

.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.text-stroke {
  -webkit-text-stroke: 1px rgba(255,255,255,0.1);
  color: transparent;
}
EOF

# 8. Resetting Main Entry (The Connection)
echo "🔗 Resetting src/main.jsx..."
cat << 'EOF' > src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# 9. Ensuring Domain Identity
echo "🌐 Setting CNAME..."
mkdir -p public
echo "aanami.in" > public/CNAME

# 10. Syncing Package Scripts
echo "📑 Syncing package.json scripts..."
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

# 11. Git Push & Final Deploy
echo "📤 Pushing clean source to GitHub..."
git add .
git commit -m "Deep Clean: Rebuilt styling and config from scratch"
git push origin main

echo "🚀 Running Final Deployment..."
npm run deploy

echo ""
echo "==========================================================="
echo "✅ DEEP REBUILD COMPLETE!"
echo "==========================================================="
echo "1. Refresh aanami.in in 60 seconds."
echo "2. If styling still doesn't show, try an Incognito window."
echo "3. Double check GitHub Settings > Pages is set to 'gh-pages' branch."
