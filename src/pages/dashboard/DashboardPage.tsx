import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { 
  Users, 
  MapPin, 
  Home, 
  CreditCard,
  TrendingUp,
  Clock,
  X
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const DashboardPage = () => {
  const { user } = useAuth();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const { register: registerReport, handleSubmit: handleReportSubmit, reset: resetReport } = useForm();
  const { register: registerAction, handleSubmit: handleActionSubmit, reset: resetAction } = useForm();

  const onReportSubmit = (data: any) => {
    console.log('Rapport:', data);
    setShowReportModal(false);
    resetReport();
  };

  const onActionSubmit = (data: any) => {
    console.log('Action:', data);
    setShowActionModal(false);
    resetAction();
  };

  const stats = [
    { label: 'Provinces', value: '12', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Stations', value: '145', icon: Home, iconType: 'building', color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Disciples', value: '2,450', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Dépenses du mois', value: '15.4M CDF', icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  const chartData = [
    { name: 'Jan', depenses: 1200000 },
    { name: 'Fév', depenses: 1500000 },
    { name: 'Mar', depenses: 900000 },
    { name: 'Avr', depenses: 1800000 },
    { name: 'Mai', depenses: 1300000 },
    { name: 'Juin', depenses: 2100000 },
  ];

  const pieData = [
    { name: 'Logistique', value: 400 },
    { name: 'Salaires', value: 300 },
    { name: 'Évangélisation', value: 300 },
    { name: 'Bâtiment', value: 200 },
  ];

  const COLORS = ['#2D5BE3', '#D4AF37', '#16A34A', '#DC2626'];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Bienvenue, {user?.prenom}</h2>
          <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Votre tableau de bord est à jour pour {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowReportModal(true)}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">
            Rapport Rapide
          </button>
          <button 
            onClick={() => setShowActionModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">
            Nouvelle Action
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-125 transition-transform duration-500">
               <stat.icon className="w-16 h-16" />
            </div>
            <div className="flex items-center justify-between mb-8">
              <div className={`${stat.bg} w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className="bg-green-50 text-green-600 text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-widest">
                <TrendingUp className="w-3 h-3" /> +4.5%
              </div>
            </div>
            <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em]">{stat.label}</p>
            <div className="flex items-end gap-2 mt-2">
               <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
               {stat.label.includes('Dépenses') && <span className="text-slate-400 text-xs font-bold mb-1">UNITÉS</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-blue-500" />
                Flux Financier National
              </h3>
              <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">Statistiques consolidées (CDF)</p>
            </div>
            <select title="Sélectionner une période" className="bg-slate-50 border-none text-slate-500 text-xs font-black rounded-xl px-4 py-2 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
               <option>6 DERNIERS MOIS</option>
               <option>ANNEE 2026</option>
            </select>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '20px'}}
                />
                <Bar dataKey="depenses" fill="url(#barGradient)" radius={[10, 10, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Info */}
        <div className="space-y-10">
           <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-xl font-black mb-8 tracking-tight">Répartition Mobile</h3>
              <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                   <p className="text-3xl font-black text-white">1,2k</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Actions</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                 {pieData.slice(0, 4).map((item, i) => (
                   <div key={i} className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-yellow-400' : i === 2 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase truncate">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-white">{item.value}%</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black mb-8 flex items-center gap-3 text-slate-900 tracking-tight">
              <Clock className="w-5 h-5 text-blue-500" />
              Journal National
            </h3>
            <div className="space-y-6">
              {[1,2,3].map((_, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                      <Users className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">Nouveau Fidèle</p>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Station de Goma - 2h</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-500 font-black text-xs uppercase tracking-widest rounded-2xl transition-all">
               Voir tout le journal
            </button>
          </div>
        </div>
      </div>

      {/* Modal Rapport */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-slate-900">Rapport Rapide</h3>
              <button onClick={() => setShowReportModal(false)} title="Fermer" className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleReportSubmit(onReportSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Type de Rapport</label>
                <select {...registerReport('type')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Activités</option>
                  <option>Finances</option>
                  <option>Croissance</option>
                  <option>Incidents</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Période</label>
                <select {...registerReport('period')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Cette semaine</option>
                  <option>Ce mois</option>
                  <option>Ce trimestre</option>
                  <option>Cette année</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Notes</label>
                <textarea {...registerReport('notes')} placeholder="Observations importantes..." className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" rows={3}></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowReportModal(false)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Annuler</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">Générer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nouvelle Action */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-slate-900">Nouvelle Action</h3>
              <button onClick={() => setShowActionModal(false)} title="Fermer" className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleActionSubmit(onActionSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Titre</label>
                <input {...registerAction('title')} placeholder="Nom de l'action..." className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Catégorie</label>
                <select {...registerAction('category')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Réunion</option>
                  <option>Évangelisation</option>
                  <option>Formation</option>
                  <option>Financière</option>
                  <option>Administrative</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Date</label>
                <input {...registerAction('date')} type="date" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Niveau</label>
                <select {...registerAction('level')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>National</option>
                  <option>Provincial</option>
                  <option>Station</option>
                  <option>Bergerie</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Description</label>
                <textarea {...registerAction('description')} placeholder="Détails de l'action..." className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" rows={3}></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowActionModal(false)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Annuler</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
