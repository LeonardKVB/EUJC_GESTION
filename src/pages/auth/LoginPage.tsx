import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Church, 
  MapPin, 
  CreditCard, 
  ArrowRight, 
  ShieldCheck,
  ShieldAlert,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Identifiants invalides');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6 md:p-12 font-sans">
      {/* Conteneur Principal Centralisé avec coins ultra-arrondis */}
      <div className="w-full max-w-7xl h-full min-h-[700px] flex overflow-hidden rounded-[5.5rem] shadow-2xl shadow-blue-500/10 bg-[#0f172a] border border-slate-800/30 relative">
        
        {/* Colonne de Gauche - Informations (Vision du Projet) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-[#1e3a8a] via-[#1d4ed8] to-[#3b82f6] p-20 flex-col justify-between text-white relative">
          <div className="relative z-10">
            {/* Emplacement LOGO de l'Église */}
            <div className="mb-16">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white/15 backdrop-blur-2xl rounded-3xl flex items-center justify-center border border-white/20 shadow-xl overflow-hidden group">
                  {/* REMPLACER PAR <img src="/logo-eglise.png" alt="Logo EUJC" /> */}
                  <Church className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tighter uppercase">EUJC Manager</h1>
                  <p className="text-blue-100 text-xs font-bold opacity-70 tracking-[0.2em]">PLATFORME OFFICIELLE</p>
                </div>
              </div>
            </div>

            <div className="space-y-12 max-w-md">
              <div className="flex gap-8 group">
                <div className="flex-shrink-0 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-all">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Modernisation</h3>
                  <p className="text-blue-100/60 leading-relaxed">Digitalisation complète des archives et processus décisionnels de l'Église.</p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="flex-shrink-0 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-all">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Traçabilité</h3>
                  <p className="text-blue-100/60 leading-relaxed">Suivi financier et administratif transparent à tous les niveaux hiérarchiques.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-sm text-blue-100/40">
            <span>© 2026 EUJC Official</span>
            <div className="flex gap-4">
              <span>Aide</span>
              <span>Confidentialité</span>
            </div>
          </div>

          {/* Décoration subtile en arrière-plan */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-50 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px]"></div>
          </div>
        </div>

        {/* Colonne de Droite - Formulaire (Login) */}
        <div className="flex-1 flex items-center justify-center p-12 md:p-24 bg-[#0f172a]">
          <div className="w-full max-w-md space-y-12">
            <div className="text-center lg:text-left space-y-4">
               {/* Emplacement LOGO de l'Application (Visible sur mobile) */}
               <div className="flex justify-center lg:justify-start">
                  <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center border border-blue-500/20 mb-6 lg:mb-8">
                     {/* REMPLACER PAR <img src="/logo-app.png" alt="App Logo" /> */}
                     <Church className="w-10 h-10 text-blue-500" />
                  </div>
               </div>
               <h2 className="text-4xl font-extrabold text-white tracking-tight">Authentification</h2>
               <p className="text-slate-400 text-lg">
                Veuillez entrer vos identifiants sécurisés.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-300 ml-1 uppercase tracking-wider">Identifiant</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-5 bg-[#1e293b]/80 border border-slate-700/50 text-white rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-slate-600 font-medium"
                  placeholder="nom@eujc.org"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-300 ml-1 uppercase tracking-wider">Mot de passe</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-5 bg-[#1e293b]/80 border border-slate-700/50 text-white rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder-slate-600 font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-5 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  <p className="text-sm font-semibold">{error}</p>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.99] text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-4 transition-all group"
              >
                Connexion
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>

            <div className="pt-8 text-center">
              <button className="text-slate-500 hover:text-white transition-colors text-sm font-bold border-b border-slate-800 pb-1">
                Mot de passe oublié ?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
