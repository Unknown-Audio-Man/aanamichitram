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

echo "3. Creating postcss.config.js (CRITICAL for Vite to process Tailwind)..."
cat << 'EOF' > postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

echo "4. Re-writing src/index.css with Tailwind directives..."
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

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: #333;
}
::-webkit-scrollbar-thumb:hover {
  background: #d4af37;
}
EOF

echo "5. Updating src/main.jsx (Fixing the CSS import)..."
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

echo "6. Removing GitHub Actions and installing required dependencies..."
rm -rf .github
npm install -D tailwindcss postcss autoprefixer gh-pages

echo "7. Ensuring CNAME is set for aanami.in..."
mkdir -p public
echo "aanami.in" > public/CNAME

echo "8. Restoring deploy scripts to package.json..."
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

echo "9. Committing and Pushing to GitHub..."
git add .
git commit -m "Fix: Added missing PostCSS config and rebuilt CSS"
git push origin main

echo "10. Deploying directly to gh-pages branch..."
npm run deploy

echo ""
echo "==========================================================="
echo "✅ SUCCESS! Your site is built and pushed to GitHub."
echo "==========================================================="
