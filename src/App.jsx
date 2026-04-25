import React, { useState, useEffect } from 'react';
import { 
  Camera, Film, MoveRight, 
  Lock, LayoutDashboard, Plus, LogOut, 
  ChevronRight, Eye, MonitorPlay 
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

// --- CUSTOM INSTAGRAM ICON (To bypass the build error) ---
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

// Firebase Config
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
  const [view, setView] = useState('portfolio');
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const unsubscribeDb = onSnapshot(collection(db, "projects"), (snapshot) => {
          setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribeDb();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setView('workspace');
    } catch (error) {
      alert("Access Denied: " + error.message);
    }
  };

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

      {/* HERO SECTION WITH TELUGU SCRIPT */}
      <header className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale"></div>
        <div className="relative z-10 text-center space-y-6">
          <h2 className="text-amber-500 tracking-[0.4em] uppercase text-sm font-medium">Independent Filmmaker</h2>
          <h1 className="text-7xl md:text-9xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-600">
            ఆనామి
          </h1>
          <p className="text-2xl md:text-3xl tracking-[0.3em] font-light text-zinc-400 uppercase">
            Aanami Chitram
          </p>
        </div>
        <div className="absolute bottom-10 animate-bounce flex flex-col items-center">
          <p className="text-[10px] tracking-[0.5em] text-zinc-500 uppercase mb-4">Discovery</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-700 to-transparent"></div>
        </div>
      </header>

      {/* PORTFOLIO CONTENT (Simplified for build) */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center space-y-8">
        <Film className="mx-auto text-amber-500 mb-8" size={32} />
        <h3 className="text-3xl font-light tracking-wide uppercase">The Philosophy</h3>
        <p className="text-zinc-400 text-lg leading-relaxed font-light italic">
          "Every frame is a sentence. Every cut is a heartbeat."
        </p>
      </section>

      <footer className="py-12 border-t border-zinc-900 mt-20 text-center text-zinc-600 text-sm tracking-widest uppercase">
        <p>© {new Date().getFullYear()} Aanami Chitram. S.Jay.</p>
      </footer>
    </div>
  );

  // Auth and Workspace renderers would follow here (omitted for brevity but kept in your local file)
  if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-amber-500 tracking-[0.3em] uppercase">Initialising...</div>;
  return view === 'portfolio' ? renderPortfolio() : (view === 'login' ? <div>Login Logic Here</div> : <div>Workspace Logic Here</div>);
}
