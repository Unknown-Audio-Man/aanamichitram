import React, { useState, useEffect } from 'react';
import { 
  Camera, Film, MoveRight, 
  Lock, LayoutDashboard, Plus, LogOut, 
  ChevronRight, MonitorPlay 
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

// --- CUSTOM INSTAGRAM ICON (Fixes the build error) ---
const InstagramIcon = ({ size = 20 }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// 1. Firebase Initialization
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  // Navigation & State
  const [view, setView] = useState('portfolio'); // 'portfolio', 'login', 'workspace'
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Login Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Firebase Listeners
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        const unsubscribeDb = onSnapshot(collection(db, "projects"), (snapshot) => {
          const projData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setProjects(projData);
        });
        return () => unsubscribeDb();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Actions
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setView('workspace');
    } catch (error) {
      alert("Access Denied: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setView('portfolio');
  };

  const handleCreateProject = async () => {
    const title = prompt("Enter Project Title:");
    const clientEmail = prompt("Enter Client Email:");
    if (title && clientEmail) {
      await addDoc(collection(db, "projects"), {
        title,
        clientEmail,
        status: 'Pre-Production',
        createdAt: serverTimestamp(),
        notes: "Initial project creation."
      });
    }
  };

  // --- 🎬 PUBLIC PORTFOLIO VIEW ---
  const renderPortfolio = () => (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-amber-900 selection:text-amber-50">
      
      <nav className="fixed w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <div className="text-xl tracking-[0.2em] font-bold text-white uppercase">S.Jay</div>
        <div className="flex gap-6 items-center">
          <a href="https://www.instagram.com/sushruthjay" target="_blank" rel="noreferrer" className="hover:text-amber-500 transition-colors">
            <InstagramIcon size={20} />
          </a>
          <button onClick={() => setView('login')} className="text-sm tracking-widest hover:text-amber-500 transition-colors uppercase">
            Client Portal
          </button>
        </div>
      </nav>

      <header className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale"></div>
        
        <div className="relative z-10 text-center space-y-6">
          <h2 className="text-amber-500 tracking-[0.4em] uppercase text-sm font-medium">Independent Filmmaker & Photographer</h2>
          <h1 className="text-7xl md:text-9xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-600 mb-2">
            ఆనామి
          </h1>
          <p className="text-2xl md:text-3xl tracking-[0.3em] font-light text-zinc-400 uppercase">
            Aanami Chitram
          </p>
        </div>
        
        <div className="absolute bottom-10 animate-bounce">
          <p className="text-xs tracking-widest text-zinc-500 uppercase mb-2">Scroll</p>
          <div className="w-[1px] h-12 bg-zinc-700 mx-auto"></div>
        </div>
      </header>

      <section className="py-32 px-6 max-w-4xl mx-auto text-center space-y-8">
        <Film className="mx-auto text-amber-500 mb-8" size={32} />
        <h3 className="text-3xl font-light tracking-wide uppercase">The Vision</h3>
        <p className="text-zinc-400 text-lg leading-relaxed font-light">
          Cinema is not just moving pictures; it is the manipulation of light, shadow, and time to reveal the truth of a moment. At Aanami Chitram, we don't just capture images—we author visual narratives. From the raw streets of Telugu states to highly curated sets, every frame has a purpose.
        </p>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-4">
          <h3 className="text-2xl tracking-[0.2em] uppercase">Still Frames</h3>
          <Camera className="text-zinc-600" size={24} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1621217646549-b00427387cc8?q=80&w=2070&auto=format&fit=crop'
          ].map((img, idx) => (
            <div key={idx} className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 cursor-pointer">
              <img src={img} alt={`Frame ${idx + 1}`} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-sm tracking-widest uppercase text-amber-500 flex items-center gap-2">View Frame <MoveRight size={16} /></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-12 border-t border-zinc-900 mt-20 text-center text-zinc-600 text-sm tracking-widest uppercase flex flex-col items-center gap-4">
        <p>© {new Date().getFullYear()} Aanami Chitram. S.Jay.</p>
        <button onClick={() => setView('login')} className="flex items-center gap-2 hover:text-white transition-colors">
          <Lock size={14} /> Workspace Access
        </button>
      </footer>
    </div>
  );

  // --- 🔐 LOGIN PORTAL VIEW ---
  const renderLogin = () => (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col justify-center items-center p-6">
      <button onClick={() => setView('portfolio')} className="absolute top-8 left-8 text-zinc-500 hover:text-white flex items-center gap-2 tracking-widest uppercase text-sm">
        <MoveRight className="rotate-180" size={16} /> Return to Site
      </button>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Lock className="mx-auto text-amber-500 mb-4" size={32} />
          <h2 className="text-2xl tracking-[0.2em] uppercase">Aanami Workspace</h2>
          <p className="text-zinc-500 text-sm tracking-widest">Authorized Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 mt-10">
          <input 
            type="email" placeholder="Email Address" 
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 p-4 outline-none focus:border-amber-500 transition-colors"
          />
          <input 
            type="password" placeholder="Password" 
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 p-4 outline-none focus:border-amber-500 transition-colors"
          />
          <button type="submit" className="w-full bg-amber-600 text-black font-bold tracking-[0.2em] uppercase p-4 hover:bg-amber-500 transition-colors">
            Enter Workspace
          </button>
        </form>
      </div>
    </div>
  );

  // --- 🗄️ SECURE WORKSPACE VIEW ---
  const renderWorkspace = () => (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex">
      <aside className="w-64 border-r border-zinc-900 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl tracking-[0.2em] text-amber-500 font-bold mb-10">AANAMI.<br/>WORKSPACE</h2>
          <nav className="space-y-4 text-sm tracking-widest uppercase text-zinc-400">
            <button className="flex items-center gap-3 text-white"><LayoutDashboard size={16} /> Projects</button>
            <button className="flex items-center gap-3 hover:text-white transition-colors"><MonitorPlay size={16} /> Deliverables</button>
          </nav>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-3 text-sm tracking-widest uppercase text-zinc-600 hover:text-red-500 transition-colors">
          <LogOut size={16} /> Disconnect
        </button>
      </aside>

      <main className="flex-1 p-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl tracking-widest uppercase font-light">Active Projects</h1>
          <button onClick={handleCreateProject} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-6 py-3 text-sm tracking-widest uppercase hover:bg-zinc-800 transition-colors">
            <Plus size={16} /> New Project
          </button>
        </div>

        <div className="grid gap-6">
          {projects.length === 0 ? (
            <div className="text-zinc-600 text-center py-20 border border-dashed border-zinc-800">
              No active projects found.
            </div>
          ) : (
            projects.map(project => (
              <div key={project.id} className="bg-zinc-900/50 border border-zinc-800 p-6 flex justify-between items-center hover:border-amber-500/50 transition-colors cursor-pointer group">
                <div>
                  <h3 className="text-xl font-medium tracking-wide mb-1">{project.title}</h3>
                  <p className="text-zinc-500 text-sm">{project.clientEmail}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="px-3 py-1 border border-amber-900 text-amber-500 text-xs tracking-widest uppercase rounded-full bg-amber-950/30">
                    {project.status}
                  </span>
                  <ChevronRight className="text-zinc-600 group-hover:text-amber-500 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );

  // --- ROUTING ---
  if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-amber-500 tracking-[0.3em] uppercase animate-pulse">Loading Workspace...</div>;

  if (view === 'portfolio') return renderPortfolio();
  if (view === 'login') return user ? setView('workspace') : renderLogin();
  if (view === 'workspace') return user ? renderWorkspace() : setView('login');

  return null;
}
