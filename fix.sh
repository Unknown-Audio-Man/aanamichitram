#!/bin/bash

echo "🚀 Starting a Deep Clean & Rebuild of aanami.in with Instagram Integration..."

# 1. Environment Check
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this in ~/aanamichitram/aanamichitram"
    exit 1
fi

# 2. The "From Scratch" Part: Deep Cleaning
echo "🧹 Wiping old dependencies and cache..."
rm -rf node_modules package-lock.json dist
npm cache clean --force

# 3. Reinstalling Core Engines
echo "📦 Reinstalling styling and deployment engines..."
npm install
npm install -D tailwindcss postcss autoprefixer gh-pages lucide-react

# 4. Critical File Regeneration: PostCSS
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

# 6. Critical File Regeneration: Vite Config
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

# 8. Resetting Main Entry
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

# 9. OVERWRITING App.jsx with Full Layout and Instagram Logic
echo "📺 Implementing full cinematic App.jsx with Instagram feed..."
cat << 'EOF' > src/App.jsx
import React, { useState, useEffect } from 'react';
import { Camera, Film, Instagram, Mail, Play, MoveRight, ExternalLink, Loader2 } from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [instaPhotos, setInstaPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Directly connecting your Behold.so JSON feed
  const BEHOLD_URL = "https://feeds.behold.so/NLdRMRMBGo8CZBJTagtW"; 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Fetch Instagram via Behold
    if (BEHOLD_URL) {
      fetch(BEHOLD_URL)
        .then(res => res.json())
        .then(data => {
          setInstaPhotos(data.slice(0, 6)); // Get latest 6 photos
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 px-6 md:px-12 py-8 flex justify-between items-center ${isScrolled ? 'bg-black/95 backdrop-blur-xl py-5 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="font-heading text-xl font-bold tracking-tighter text-white">SUSHRUTH JAY</div>
        
        <div className="flex gap-10 text-[10px] uppercase tracking-[0.4em] font-semibold text-zinc-500 hidden md:flex">
          <a href="#work" className="hover:text-accent transition-colors">Frames</a>
          <a href="#vision" className="hover:text-accent transition-colors">Philosophy</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
        </div>

        <a href="https://www.instagram.com/sushruthjay" target="_blank" className="flex items-center gap-2 text-accent text-[10px] tracking-widest font-bold uppercase border-b border-accent/20 pb-1 hover:border-accent transition-all">
          Instagram <ExternalLink size={12} />
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-[#050505] z-10"></div>
          <img src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000" className="w-full h-full object-cover" alt="Hero Background" />
        </div>
        <div className="relative z-20">
          <span className="block font-heading text-accent text-[10px] tracking-[1em] mb-8 reveal">AANAMI CHITRAM PRESENTS</span>
          <h1 className="font-heading text-6xl md:text-[10rem] font-bold text-white mb-6 tracking-tighter reveal leading-none">
            SUSHRUTH<br/><span className="text-stroke">JAY.</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-center justify-center mt-12 reveal">
            <div className="flex items-center gap-3 text-zinc-500 text-[10px] tracking-widest uppercase">
              <Film size={14} className="text-accent" /> Independent Filmmaker
            </div>
            <div className="w-1 h-1 bg-zinc-800 rounded-full hidden md:block"></div>
            <div className="flex items-center gap-3 text-zinc-500 text-[10px] tracking-widest uppercase">
              <Camera size={14} className="text-accent" /> Storyteller & Photographer
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="vision" className="py-40 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-7 reveal">
              <h2 className="font-heading text-zinc-800 text-8xl absolute -top-10 -left-10 select-none pointer-events-none opacity-20 uppercase">Aanami</h2>
              <h3 className="font-heading text-3xl text-white mb-10 leading-tight">CHASING THE <span className="text-accent italic">NAMELESS</span> EMOTIONS.</h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8 font-light italic">
                "In an industry that celebrates the loud, I find my stories in the whispers of the Telugu streets."
              </p>
              <p className="text-zinc-500 text-sm leading-loose max-w-lg mb-12">
                My work as a filmmaker is an extension of my photography. I believe every story already exists in the environment; as a director, my job is simply to find the right frame to let it speak. I focus on atmosphere, texture, and the raw human condition.
              </p>
              <button className="group flex items-center gap-6 text-white text-[10px] tracking-[0.5em] uppercase font-bold">
                The Filmmaker's Eye <MoveRight className="group-hover:translate-x-3 transition-transform text-accent" />
              </button>
            </div>
            <div className="md:col-span-5 reveal">
              <div className="aspect-[3/4] overflow-hidden border border-white/5 bg-zinc-900">
                <img src="https://images.unsplash.com/photo-1542204172-3c1f11c56f7f?q=80&w=1000" className="w-full h-full object-cover opacity-70 grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Frames (Instagram) Section */}
      <section id="work" className="py-40 px-6 md:px-12 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6 reveal">
            <div>
              <h2 className="font-heading text-4xl text-white mb-4 uppercase text-left">Live Frames</h2>
              <p className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase text-left">Latest from @sushruthjay</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-accent" /></div>
          ) : instaPhotos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {instaPhotos.map((photo) => (
                <a key={photo.id} href={photo.permalink} target="_blank" rel="noreferrer" className="group reveal overflow-hidden block aspect-square bg-zinc-900">
                  <img src={photo.mediaUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" alt="Instagram Post" />
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-white/5 rounded-lg">
                <p className="text-zinc-500 italic text-sm mb-4">Instagram API connection pending.</p>
                <a href="https://instagram.com/sushruthjay" className="text-accent text-[10px] tracking-widest uppercase font-bold">View Profile Manually</a>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="py-40 px-8 border-t border-white/5 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent text-[10px] tracking-[0.6em] uppercase mb-12 block reveal">AVAILABLE FOR COLLABORATION</span>
          <h2 className="font-heading text-4xl md:text-6xl text-white mb-16 reveal tracking-tighter">LET'S BUILD A<br/>NEW PERSPECTIVE.</h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-12 mb-24 reveal">
            <a href="mailto:hello@aanami.in" className="group">
                <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-2">Email</p>
                <p className="text-xl text-white group-hover:text-accent transition-colors font-light">hello@aanami.in</p>
            </a>
            <a href="https://instagram.com/sushruthjay" target="_blank" rel="noreferrer" className="group">
                <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-2">Social</p>
                <p className="text-xl text-white group-hover:text-accent transition-colors font-light">@sushruthjay</p>
            </a>
          </div>

          <div className="pt-20 border-t border-white/5 reveal">
            <div className="font-heading text-zinc-900 text-[10vw] select-none leading-none opacity-20 mb-8">SUSHRUTH JAY</div>
            <p className="text-zinc-700 text-[9px] uppercase tracking-[0.5em]">Independent Visuals • Hyderabad, Telangana • © 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
EOF

# 10. Ensuring Domain Identity
echo "🌐 Setting CNAME..."
mkdir -p public
echo "aanami.in" > public/CNAME

# 11. Syncing Package Scripts
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

# 12. Git Push & Final Deploy
echo "📤 Pushing clean source to GitHub..."
git add .
git commit -m "Deep Clean: Restored full sections and activated Behold URL"
git push origin main

echo "🚀 Running Final Deployment..."
npm run deploy

echo ""
echo "==========================================================="
echo "✅ DEEP REBUILD COMPLETE!"
echo "==========================================================="
echo "Your Behold.so Instagram feed is now fully integrated, and the Philosophy/Contact sections are restored."
echo "Wait 60 seconds, refresh aanami.in, and your full cinematic site will be live!"
