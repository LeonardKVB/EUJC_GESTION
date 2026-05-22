import React, { useState } from 'react';
import { Bell, Plus, Calendar, Megaphone, Clock, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

const AnnouncementsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log('Nouvelle annonce:', data);
    setShowModal(false);
    reset();
  };

  const announcements = [
    { id: 1, title: 'Grande Veillée de Prière', date: '15 Mai 2026', scope: 'National', priority: 'Haute' },
    { id: 2, title: 'Session de Formation des Bergers', date: '20 Mai 2026', scope: 'Province Kinshasa', priority: 'Moyenne' },
    { id: 3, title: 'Rapport Trimestriel Attendu', date: '30 Mai 2026', scope: 'Tous les Représentants', priority: 'Critique' },
  ];

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Annonces & Communications</h2>
          <p className="text-slate-500 mt-2">Diffusez les informations importantes à travers la hiérarchie.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-blue-600/20 transition-all">
          <Plus className="w-5 h-5" />
          Nouvelle Annonce
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {announcements.map((ann) => (
          <div key={ann.id} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-2 h-full ${ann.priority === 'Critique' ? 'bg-red-500' : ann.priority === 'Haute' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                <Megaphone className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${ann.priority === 'Critique' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                {ann.priority}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2">{ann.title}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{ann.date}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Clock className="w-4 h-4" />
                <span>Cible: {ann.scope}</span>
              </div>
            </div>

            <button className="w-full mt-8 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-xl transition-colors text-sm">
              Lire les détails
            </button>
          </div>
        ))}
      </div>

      {/* Modal Nouvelle Annonce */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Nouvelle Annonce</h3>
              <button onClick={() => setShowModal(false)} title="Fermer" className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Titre</label>
                <input {...register('title')} placeholder="Titre de l'annonce" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Description</label>
                <textarea {...register('description')} placeholder="Contenu détaillé de l'annonce..." className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" rows={4} required></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Date Limite</label>
                <input {...register('date')} type="date" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Priorité</label>
                <select {...register('priority')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required>
                  <option value="">Sélectionner une priorité...</option>
                  <option value="Basse">Basse</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Haute">Haute</option>
                  <option value="Critique">Critique</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Cible</label>
                <select {...register('scope')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required>
                  <option value="">Sélectionner une cible...</option>
                  <option value="National">National</option>
                  <option value="Province Kinshasa">Province Kinshasa</option>
                  <option value="Tous les Représentants">Tous les Représentants</option>
                  <option value="Station Spécifique">Station Spécifique</option>
                  <option value="Bergerie">Bergerie</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-3 text-sm cursor-pointer">
                  <input {...register('urgent')} type="checkbox" className="w-4 h-4 rounded" />
                  <span className="font-bold text-slate-600">Marquer comme urgent</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Annuler</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">Publier</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
