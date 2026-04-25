import React, { useState, useEffect } from 'react';
import { Camera, Film, Instagram, Mail, ChevronRight, Play, Maximize2, MoveRight } from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

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

  const photos = [
    { id: 1, category: 'monochrome', url: 'https://images.unsplash.com/photo-1502164980785-f8aa41d53611?auto=format&fit=crop&q=80&w=800', title: 'The Silent Street' },
    { id: 2, category: 'cinematic', url: 'https://images.unsplash.com/photo-1493238792040-e7141f457782?auto=format&fit=crop&q=80&w=800', title: 'Dawn in Deccan' },
    { id: 3, category: 'monochrome', url: 'https://images.unsplash.com/photo-1514912846102-1779f6667533?auto=format&fit=crop&q=80&w=800', title: 'Unheard Echoes' },
    { id: 4, category: 'cinematic', url: 'https://images.unsplash.com/photo-1512418490979-92798ccc13b0?auto=format&fit=crop&q=80&w=800', title: 'Shadow Play' },
  ];

  const filteredPhotos = activeTab === 'all' ? photos : photos.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-8 py-6 flex justify-between items-center ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent'}`}>
        <div className="font-heading text-xl font-bold tracking-tighter text-white">AANAMI</div>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-medium hidden md:flex">
          <a href="#work" className="hover:text-accent transition-colors">Work</a>
          <a href="#vision" className="hover:text-accent transition-colors">Vision</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
        </div>
        <div className="flex gap-4">
          <a href="https://instagram.com" className="text-zinc-500 hover:text-white transition-colors"><Instagram size={18} /></a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* Subtle Background Video/Gif Placeholder */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover scale-110 blur-sm"
            alt="Hero Background"
          />
        </div>

        <div className="relative z-20 max-w-4xl">
          <span className="block font-heading text-accent text-[10px] tracking-[0.8em] mb-6 reveal">TELUGU INDIE FILMMAKER</span>
          <h1 className="font-heading text-5xl md:text-9xl font-bold text-white mb-8 tracking-tighter reveal">
            AANAMI<span className="text-accent italic">.</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base leading-loose font-light reveal mb-10">
            "Aanami" — The Nameless. Exploring the beauty in the ordinary through independent cinema and photography. Based in Hyderabad.
          </p>
          <div className="flex gap-6 justify-center reveal">
            <a href="#work" className="px-8 py-3 border border-white/20 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">View Frames</a>
            <a href="#vision" className="px-8 py-3 bg-accent text-black text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-white transition-all">The Vision</a>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 hidden md:block vertical-text text-[10px] tracking-[0.5em] text-zinc-600 uppercase">
            Est. 2024 / Hyderabad
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 px-8 bg-[#080808]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-3 text-accent mb-6">
              <Film size={20} />
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold">Philosophy</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-8 leading-tight">CHITRAM IS <br/>A CONVERSATION.</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8 font-light italic">
              "My lens doesn't look for beauty; it looks for truth. In Telugu cinema, we often chase the grand. I chase the quiet."
            </p>
            <div className="space-y-4 text-zinc-500 text-sm leading-relaxed mb-12">
                <p>Independent filmmaking is about constraints breeding creativity. I focus on atmospheric storytelling where the environment is as much a character as the actors.</p>
                <p>From the bustling lanes of Charminar to the silence of the Godavari banks, I seek out textures that tell a story.</p>
            </div>
            <button className="group flex items-center gap-4 text-white text-[10px] tracking-[0.4em] uppercase font-bold">
              My Process <MoveRight className="group-hover:translate-x-2 transition-transform text-accent" />
            </button>
          </div>
          <div className="relative reveal">
            <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Cinema Still" />
            </div>
            <div className="absolute top-10 -right-10 w-full h-full border border-accent/20 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="work" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 reveal">
            <div>
                <h2 className="font-heading text-3xl text-white mb-2 uppercase">Recent Frames</h2>
                <p className="text-zinc-500 text-xs tracking-widest uppercase">Photography & Still Studies</p>
            </div>
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600">
              {['all', 'cinematic', 'monochrome'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`${activeTab === tab ? 'text-accent' : 'hover:text-white'} transition-colors`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="group relative aspect-video overflow-hidden bg-zinc-900 reveal">
                <img 
                  src={photo.url} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  alt={photo.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <span className="text-accent text-[10px] tracking-widest uppercase mb-2">{photo.category}</span>
                    <h3 className="font-heading text-lg text-white">{photo.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Teaser */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto border border-white/5 bg-[#050505] p-12 md:p-20 text-center reveal">
            <span className="text-accent text-[10px] tracking-[0.5em] uppercase mb-6 block">Current Project</span>
            <h2 className="font-heading text-2xl md:text-4xl text-white mb-6">"ANANTAM"</h2>
            <p className="text-zinc-500 text-sm italic mb-10">An experimental short film on the cyclical nature of memories. Shot entirely on the streets of Hyderabad.</p>
            <div className="inline-flex items-center gap-2 text-zinc-400 text-[10px] tracking-widest uppercase">
                <Play size={12} fill="currentColor" /> Teaser Dropping Soon
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-32 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 mb-20">
            <div className="reveal">
              <h2 className="font-heading text-5xl text-white mb-10 tracking-tighter">LET'S CAPTURE<br/><span className="text-stroke">THE UNSEEN.</span></h2>
              <p className="text-zinc-500 max-w-sm leading-relaxed mb-10">
                I'm always looking for collaborative projects in Telugu cinema and conceptual photography. Reach out for vision talks or bookings.
              </p>
              <a href="mailto:hello@aanami.in" className="flex items-center gap-4 text-white hover:text-accent transition-colors group">
                <Mail size={20} className="text-accent" />
                <span className="text-xl font-light">hello@aanami.in</span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 reveal">
                <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-zinc-700 mb-6">Social</h4>
                    <ul className="space-y-4 text-sm text-zinc-400">
                        <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Vimeo</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Behance</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-zinc-700 mb-6">Focus</h4>
                    <ul className="space-y-4 text-sm text-zinc-400 font-light">
                        <li>Indie Feature Films</li>
                        <li>Conceptual Shorts</li>
                        <li>Street Photography</li>
                        <li>Cinematography</li>
                    </ul>
                </div>
            </div>
          </div>
          
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 reveal">
            <div className="font-heading text-sm font-bold tracking-widest text-zinc-800">AANAMICHITRAM</div>
            <p className="text-zinc-700 text-[9px] uppercase tracking-[0.5em]">© 2024 Independent Vision. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
