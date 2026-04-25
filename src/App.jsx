import React, { useState, useEffect } from 'react';
import { Camera, Film, Instagram, Mail, Play, MoveRight, ExternalLink } from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Replace these with your actual high-res photo URLs later
  // For now, I've curated cinematic placeholders that match your vibe
  const curatedWork = [
    { id: 1, title: 'Visual Poetry', url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200' },
    { id: 2, title: 'Street Echoes', url: 'https://images.unsplash.com/photo-1493238792040-e7141f457782?q=80&w=1200' },
    { id: 3, title: 'The Silent Frame', url: 'https://images.unsplash.com/photo-1512418490979-92798ccc13b0?q=80&w=1200' },
    { id: 4, title: 'Hyderabad After Dark', url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200' },
  ];

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Cinematic Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 px-6 md:px-12 py-8 flex justify-between items-center ${isScrolled ? 'bg-black/95 backdrop-blur-xl py-5 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="font-heading text-xl font-bold tracking-tighter text-white">SUSHRUTH JAY</div>
        
        <div className="flex gap-10 text-[10px] uppercase tracking-[0.4em] font-semibold text-zinc-500 hidden md:flex">
          <a href="#work" className="hover:text-accent transition-colors">Frames</a>
          <a href="#vision" className="hover:text-accent transition-colors">Philosophy</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
        </div>

        <a 
          href="https://www.instagram.com/sushruthjay" 
          target="_blank" 
          className="flex items-center gap-2 text-accent text-[10px] tracking-widest font-bold uppercase border-b border-accent/20 pb-1 hover:border-accent transition-all"
        >
          Instagram <ExternalLink size={12} />
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-[#050505] z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000" 
            className="w-full h-full object-cover scale-105"
            alt="Hero Background"
          />
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

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white"></div>
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
                "In a industry that celebrates the loud, I find my stories in the whispers of the Telugu streets."
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

      {/* Curated Work Gallery */}
      <section id="work" className="py-40 px-6 md:px-12 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6 reveal">
            <div>
              <h2 className="font-heading text-4xl text-white mb-4 uppercase">Selected Frames</h2>
              <p className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase">Visual Studies • 2024 Archive</p>
            </div>
            <a 
              href="https://www.instagram.com/sushruthjay" 
              target="_blank"
              className="px-8 py-3 border border-white/10 hover:border-accent/50 text-white text-[10px] tracking-widest uppercase transition-all"
            >
              See Latest on Instagram
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {curatedWork.map((item) => (
              <div key={item.id} className="group reveal overflow-hidden">
                <div className="aspect-[16/9] bg-zinc-900 overflow-hidden relative">
                  <img 
                    src={item.url} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                        <Play size={16} fill="white" className="ml-1" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center px-2">
                  <h4 className="font-heading text-sm text-zinc-300 tracking-wider">{item.title}</h4>
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Case Study</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Connect */}
      <footer id="contact" className="py-40 px-8 border-t border-white/5 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent text-[10px] tracking-[0.6em] uppercase mb-12 block reveal">AVAILABLE FOR COLLABORATION</span>
          <h2 className="font-heading text-4xl md:text-6xl text-white mb-16 reveal tracking-tighter">LET'S BUILD A<br/>NEW PERSPECTIVE.</h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-12 mb-24 reveal">
            <a href="mailto:hello@aanami.in" className="group">
                <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-2">Email</p>
                <p className="text-xl text-white group-hover:text-accent transition-colors font-light">hello@aanami.in</p>
            </a>
            <a href="https://instagram.com/sushruthjay" target="_blank" className="group">
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
