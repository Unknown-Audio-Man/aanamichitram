import React, { useState, useEffect } from 'react';
import { Camera, Film, Instagram, Mail, Play, MoveRight, ExternalLink, Loader2 } from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [instaPhotos, setInstaPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // INSTRUCTIONS: 
  // 1. Go to https://behold.so (Free for 1 feed)
  // 2. Connect your Instagram @sushruthjay
  // 3. Copy the "JSON Feed URL" and paste it below
  const BEHOLD_URL = ""; 

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
          setInstaPhotos(data.slice(0, 6)); // Get latest 6
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
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 px-6 md:px-12 py-8 flex justify-between items-center ${isScrolled ? 'bg-black/95 backdrop-blur-xl py-5 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="font-heading text-xl font-bold tracking-tighter text-white">SUSHRUTH JAY</div>
        <a href="https://www.instagram.com/sushruthjay" target="_blank" className="flex items-center gap-2 text-accent text-[10px] tracking-widest font-bold uppercase border-b border-accent/20 pb-1 hover:border-accent transition-all">
          Instagram <ExternalLink size={12} />
        </a>
      </nav>

      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-[#050505] z-10"></div>
          <img src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000" className="w-full h-full object-cover" alt="Hero" />
        </div>
        <div className="relative z-20">
          <span className="block font-heading text-accent text-[10px] tracking-[1em] mb-8 reveal">AANAMI CHITRAM</span>
          <h1 className="font-heading text-6xl md:text-[10rem] font-bold text-white mb-6 tracking-tighter reveal leading-none">
            SUSHRUTH<br/><span className="text-stroke">JAY.</span>
          </h1>
        </div>
      </section>

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
                <a key={photo.id} href={photo.permalink} target="_blank" className="group reveal overflow-hidden block aspect-square bg-zinc-900">
                  <img src={photo.mediaUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
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

      <footer id="contact" className="py-40 px-8 border-t border-white/5 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl text-white mb-16 reveal tracking-tighter italic">"THE FRAME NEVER LIES."</h2>
          <div className="pt-20 border-t border-white/5 reveal">
            <p className="text-zinc-700 text-[9px] uppercase tracking-[0.5em]">Independent Visuals • Hyderabad • © 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
