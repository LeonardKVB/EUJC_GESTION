import React, { useState } from 'react';
import { FileText, Download, TrendingUp, PieChart, Calendar, ChevronRight, Plus, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useForm } from 'react-hook-form';

const data = [
  { name: 'Jan', depenses: 4000, membres: 2400 },
  { name: 'Fev', depenses: 3000, membres: 1398 },
  { name: 'Mar', depenses: 2000, membres: 9800 },
  { name: 'Avr', depenses: 2780, membres: 3908 },
];

const ReportsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log('Nouveau rapport:', data);
    setShowModal(false);
    reset();
  };

  return (
    <div className="space-y-10 font-sans">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Rapports Analytiques</h2>
          <p className="text-slate-500 mt-2">Visualisez les performances et la croissance de l'EUJC.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:bg-blue-700 transition-all">
            <Plus className="w-5 h-5" />
            Nouveau Rapport
          </button>
          <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-sm hover:bg-slate-50 transition-all">
            <Calendar className="w-5 h-5" />
            Mai 2026
          </button>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-xl hover:bg-black transition-all">
            <Download className="w-5 h-5" />
            Exporter PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Croissance des Membres</h3>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorMembres" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <Tooltip />
                <Area type="monotone" dataKey="membres" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorMembres)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Flux de Dépenses</h3>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="depenses" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Modal Nouveau Rapport */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Nouveau Rapport</h3>
              <button onClick={() => setShowModal(false)} title="Fermer" className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Titre du Rapport</label>
                <input {...register('titre')} placeholder="Ex: Rapport Croissance Q2" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Type de Rapport</label>
                <select {...register('type')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required>
                  <option value="">Sélectionner un type...</option>
                  <option>Croissance Membres</option>
                  <option>Flux Financier</option>
                  <option>Activités par Station</option>
                  <option>Efficacité Évangélisation</option>
                  <option>Rapport Complet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Période</label>
                <select {...register('periode')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Ce mois</option>
                  <option>Ce trimestre</option>
                  <option>Cette année</option>
                  <option>Personnalisé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Niveau</label>
                <select {...register('niveau')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required>
                  <option>National</option>
                  <option>Provincial</option>
                  <option>Station</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Format d'Export</label>
                <select {...register('format')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                  <option>Vue en Ligne</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                  <input {...register('inclure_graphiques')} type="checkbox" className="w-4 h-4 rounded" defaultChecked />
                  <span className="font-bold text-slate-600">Inclure les graphiques</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Annuler</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">Générer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
