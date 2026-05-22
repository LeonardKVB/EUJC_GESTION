import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Church,
  BarChart3, 
  Users, 
  MapPin, 
  Building2, 
  Home, 
  CreditCard, 
  FileText, 
  Bell, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, roles: ['SUPER_ADMIN', 'PROVINCIAL_REP', 'APOTRE', 'BERGER'] },
    { name: 'Provinces', href: '/provinces', icon: MapPin, roles: ['SUPER_ADMIN'] },
    { name: 'Stations', href: '/stations', icon: Building2, roles: ['SUPER_ADMIN', 'PROVINCIAL_REP'] },
    { name: 'Bergeries', href: '/bergeries', icon: Home, roles: ['SUPER_ADMIN', 'PROVINCIAL_REP', 'BERGER'] },
    { name: 'Membres', href: '/membres', icon: Users, roles: ['SUPER_ADMIN', 'PROVINCIAL_REP', 'APOTRE', 'BERGER', 'STATION_REP'] },
    { name: 'Dépenses', href: '/depenses', icon: CreditCard, roles: ['SUPER_ADMIN', 'PROVINCIAL_REP', 'STATION_REP'] },
    { name: 'Rapports', href: '/rapports', icon: FileText, roles: ['SUPER_ADMIN', 'PROVINCIAL_REP', 'APOTRE', 'BERGER'] },
    { name: 'Annonces', href: '/annonces', icon: Bell, roles: ['SUPER_ADMIN', 'PROVINCIAL_REP', 'APOTRE', 'BERGER'] },
  ];

  const filteredNav = navigation.filter(item => item.roles.includes(user?.role));

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans overflow-hidden">
      {/* Sidebar - Vision Moderne */}
      <aside className="w-80 bg-[#0f172a] hidden lg:flex flex-col text-slate-300 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.3)] relative z-30">
        <div className="p-10">
          <Link to="/dashboard" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-all duration-300">
              <Church className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tighter leading-none uppercase">EUJC Manager</h1>
              <p className="text-[10px] text-blue-400 font-bold tracking-[0.2em] mt-1 opacity-80">ESPACE OFFICIEL</p>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 px-6 space-y-2 overflow-y-auto pt-4 no-scrollbar">
          {filteredNav.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center justify-between px-6 py-4 rounded-[1.5rem] transition-all duration-300 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30 -translate-y-0.5' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`} />
                  <span className="text-sm font-bold tracking-tight">{item.name}</span>
                </div>
                {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>}
              </Link>
            );
          })}
        </nav>

        <div className="p-8">
          <div className="bg-slate-800/30 rounded-[2rem] p-6 border border-slate-700/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                {user?.nom[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black text-white truncate">{user?.prenom} {user?.nom}</p>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-tighter mt-1">{user?.role}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-xl transition-all text-xs font-black uppercase tracking-widest border border-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              Quitter
            </button>
          </div>
          <p className="text-[10px] text-slate-600 text-center mt-6 font-bold tracking-widest uppercase opacity-40 italic">In Christ We Trust</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Navbar Supérieure */}
        <header className="h-28 bg-white border-b border-slate-100 flex items-center justify-between px-12 relative z-20">
          <div className="flex items-center gap-6">
            <div className="lg:hidden w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
              <Church className="w-7 h-7" />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-sm font-black text-slate-400 tracking-[0.2em] uppercase opacity-70">
                {navigation.find(item => item.href === location.pathname)?.name || 'Tableau de bord'}
              </h2>
              <p className="text-[10px] text-slate-400 font-medium mt-1">
                {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Système Opérationnel</span>
            </div>

            <div className="relative group">
              <button className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-2xl transition-all border border-slate-100 hover:border-blue-100 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm ring-2 ring-red-500/20"></span>
              </button>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-105 transition-transform overflow-hidden">
               {/* Place for user avatar if available */}
               <Users className="w-6 h-6 opacity-40" />
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
           {/* Background subtile decoration for content area */}
           <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
              <Church className="w-[1000px] h-[1000px] -rotate-12 absolute -right-20 -top-20" />
           </div>
           
           <div className="relative z-10">
              <Outlet />
           </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
