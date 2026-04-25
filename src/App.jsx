import React, { useState, useEffect } from 'react';
import { 
  Camera, Film, Instagram, Mail, Play, MoveRight, 
  Lock, LayoutDashboard, Clock, Plus, LogOut, Trash2, 
  User, CheckCircle, ChevronRight, Eye
} from 'lucide-react';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, collection, addDoc, onSnapshot, 
  query, doc, deleteDoc, updateDoc, where 
} from 'firebase/firestore';
import { 
  getAuth, signInAnonymously, onAuthStateChanged, signOut, signInWithCustomToken 
} from 'firebase/auth';

// --- FIREBASE INITIALIZATION ---
const firebaseConfig = JSON.parse(window.__firebase_config || '{"apiKey": "", "authDomain": "", "projectId": "", "storageBucket": "", "messagingSenderId": "", "appId": ""}');
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof window.__app_id !== 'undefined' ? window.__app_id : 'aanami-pro';

const App = () => {
  const [view, setView] = useState('portfolio'); // portfolio, login, admin, client
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form States
  const [newProject, setNewProject] = useState({ title: '', clientEmail: '', status: 'Planning', note: '' });
  const [loginEmail, setLoginEmail] = useState('');

  // 1. Authentication Setup (Rule 3: Auth Before Queries)
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof window.__initial_auth_token !== 'undefined' && window.__initial_auth_token) {
          await signInWithCustomToken(auth, window.__initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth Error:", err);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Data Listener (Rule 1 & 2: Simple Queries + Strict Paths)
  useEffect(() => {
    if (!user) return;

    // Fetch all projects (Rule 2: Filter in JS memory for simplicity/no-index)
    const q = collection(db, 'artifacts', appId, 'public', 'data', 'projects');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    }, (err) => {
      setError("Database access restricted. Check Firebase rules.");
    });

    return () => unsubscribe();
  }, [user]);

  // --- ACTIONS ---
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'projects'), {
        ...newProject,
        createdAt: new Date().toISOString(),
        createdBy: user.uid,
      });
      setNewProject({ title: '', clientEmail: '', status: 'Planning', note: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'projects', id), { status });
  };

  const deleteProject = async (id) => {
    await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'projects', id));
  };

  // --- VIEWS ---

  // 1. PUBLIC PORTFOLIO
  const PortfolioView = () => (
    <div className="min-h-screen bg-[#050505] text-zinc-300">
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent">
        <div className="font-heading text-lg font-bold tracking-tighter text-white">SUSHRUTH JAY</div>
        <button 
          onClick={() => setView('login')}
          className="text-[10px] tracking-[0.3em] font-bold uppercase border border-white/10 px-4 py-2 hover:bg-white hover:text-black transition-all"
        >
          Client Access
        </button>
      </nav>

      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <div className="w-px h-20 bg-accent mb-12 animate-pulse"></div>
        <h1 className="font-heading text-6xl md:text-9xl font-bold text-white mb-6 tracking-tighter">
          AANAMI<span className="text-accent">.</span>
        </h1>
        <p className="text-zinc-500 max-w-lg mx-auto text-xs md:text-sm tracking-[0.2em] uppercase mb-12 leading-loose">
          Independent Filmmaking & <br/>Photography from Hyderabad
        </p>
        <div className="flex gap-8">
            <a href="https://instagram.com/sushruthjay" className="text-zinc-500 hover:text-accent transition-colors"><Instagram size={20} /></a>
            <a href="mailto:hello@aanami.in" className="text-zinc-500 hover:text-accent transition-colors"><Mail size={20} /></a>
        </div>
      </section>
    </div>
  );

  // 2. LOGIN GATE
  const LoginView = () => (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-zinc-900/40 border border-white/5 p-10 backdrop-blur-sm">
        <Lock className="text-accent mb-6 mx-auto" size={32} />
        <h2 className="font-heading text-xl text-white text-center mb-2 uppercase tracking-widest">Workspace</h2>
        <p className="text-zinc-500 text-[10px] text-center mb-8 uppercase tracking-[0.3em]">Enter access credentials</p>
        
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="ACCESS EMAIL"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full bg-black border border-white/10 p-4 text-[10px] tracking-widest text-white outline-none focus:border-accent transition-all"
          />
          <button 
            onClick={() => {
              // Simplified logic: If email is yours, go to Admin. Otherwise, Client.
              if (loginEmail === 'jay@aanami.in') setView('admin');
              else if (loginEmail.includes('@')) setView('client');
            }}
            className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all"
          >
            Authenticate
          </button>
          <button onClick={() => setView('portfolio')} className="w-full text-[9px] text-zinc-600 uppercase tracking-widest pt-4">Return Home</button>
        </div>
      </div>
    </div>
  );

  // 3. ADMIN DASHBOARD (FOR JAY)
  const AdminView = () => (
    <div className="min-h-screen bg-[#050505] p-8 md:p-16">
      <header className="flex justify-between items-center mb-16">
        <div>
          <h2 className="font-heading text-2xl text-white tracking-tighter">DIRECTOR'S HUB</h2>
          <p className="text-accent text-[10px] uppercase tracking-widest">Sushruth Jay • Admin</p>
        </div>
        <button onClick={() => setView('portfolio')} className="p-2 border border-white/10 text-zinc-500 hover:text-white"><LogOut size={18}/></button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form */}
        <div className="lg:col-span-4 bg-zinc-900/30 p-8 border border-white/5">
          <h3 className="font-heading text-xs text-white mb-8 uppercase tracking-widest border-b border-white/5 pb-4">Initialize Project</h3>
          <form onSubmit={handleCreateProject} className="space-y-6">
            <input 
              placeholder="PROJECT TITLE"
              className="w-full bg-transparent border-b border-white/10 py-2 text-[10px] tracking-widest outline-none focus:border-accent"
              value={newProject.title}
              onChange={e => setNewProject({...newProject, title: e.target.value})}
            />
            <input 
              placeholder="CLIENT EMAIL"
              className="w-full bg-transparent border-b border-white/10 py-2 text-[10px] tracking-widest outline-none focus:border-accent"
              value={newProject.clientEmail}
              onChange={e => setNewProject({...newProject, clientEmail: e.target.value})}
            />
            <select 
                className="w-full bg-black border border-white/10 py-2 text-[10px] tracking-widest text-zinc-400 outline-none"
                value={newProject.status}
                onChange={e => setNewProject({...newProject, status: e.target.value})}
            >
                <option>Planning</option>
                <option>Filming</option>
                <option>Editing</option>
                <option>Review</option>
                <option>Delivered</option>
            </select>
            <button className="w-full bg-accent text-black font-bold py-3 text-[10px] uppercase tracking-widest hover:bg-white transition-all">Add to Pipeline</button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="font-heading text-xs text-zinc-600 mb-8 uppercase tracking-widest">Active Pipeline</h3>
          {projects.map(proj => (
            <div key={proj.id} className="bg-zinc-900/20 border border-white/5 p-6 flex flex-col md:flex-row justify-between items-center gap-4 group hover:border-white/20 transition-all">
              <div className="text-center md:text-left">
                <h4 className="text-white text-sm font-medium tracking-wide mb-1">{proj.title}</h4>
                <p className="text-zinc-600 text-[9px] uppercase tracking-widest">{proj.clientEmail}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className={`text-[9px] px-3 py-1 uppercase tracking-tighter font-bold rounded-full ${proj.status === 'Delivered' ? 'bg-green-900/20 text-green-500' : 'bg-accent/10 text-accent'}`}>
                    {proj.status}
                </span>
                <button onClick={() => deleteProject(proj.id)} className="text-zinc-700 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 4. CLIENT VIEW (FOR YOUR CLIENTS)
  const ClientView = () => {
    const myProjects = projects.filter(p => p.clientEmail === loginEmail);
    return (
      <div className="min-h-screen bg-[#050505] p-8 md:p-16">
        <header className="mb-20 text-center">
            <h2 className="font-heading text-xl text-white mb-2 uppercase tracking-[0.4em]">Client Portal</h2>
            <p className="text-zinc-600 text-[9px] tracking-widest uppercase">Logged in as {loginEmail}</p>
        </header>

        <div className="max-w-3xl mx-auto space-y-12">
            {myProjects.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 text-zinc-700 text-sm italic">
                    No active projects found for this email address.
                </div>
            ) : myProjects.map(proj => (
                <div key={proj.id} className="relative p-10 border border-white/5 bg-zinc-900/10">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="flex-1">
                            <span className="text-accent text-[9px] font-bold uppercase tracking-[0.4em] mb-4 block">Active Project</span>
                            <h3 className="font-heading text-2xl text-white mb-6 uppercase">{proj.title}</h3>
                            
                            {/* Visual Progress Tracker */}
                            <div className="flex justify-between mb-8 relative">
                                <div className="absolute top-1/2 w-full h-[1px] bg-white/5 -z-10"></div>
                                {['Planning', 'Filming', 'Editing', 'Delivered'].map((step, idx) => (
                                    <div key={step} className="flex flex-col items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full border ${proj.status === step ? 'bg-accent border-accent scale-125' : 'bg-black border-white/20'}`}></div>
                                        <span className={`text-[8px] uppercase tracking-tighter ${proj.status === step ? 'text-white font-bold' : 'text-zinc-700'}`}>{step}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-zinc-500 text-xs leading-relaxed italic mb-8">
                                Status Update: We are currently in the <span className="text-white">{proj.status}</span> phase. Your assets will appear here once ready for review.
                            </p>
                            
                            <button className="flex items-center gap-3 text-white text-[10px] tracking-widest uppercase border border-white/10 px-6 py-3 hover:bg-white hover:text-black transition-all">
                                <Eye size={14} /> Review Latest Frames
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-20 text-center">
            <button onClick={() => setView('portfolio')} className="text-zinc-700 hover:text-white text-[9px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto">
               <LogOut size={12} /> Sign Out
            </button>
        </div>
      </div>
    );
  }

  // --- RENDER LOGIC ---
  if (loading) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        <div className="font-heading text-[10px] text-white tracking-[0.5em] animate-pulse uppercase">AANAMI WORKSPACE</div>
    </div>
  );

  return (
    <div className="font-sans selection:bg-accent/30">
        {view === 'portfolio' && <PortfolioView />}
        {view === 'login' && <LoginView />}
        {view === 'admin' && <AdminView />}
        {view === 'client' && <ClientView />}
    </div>
  );
};

export default App;
