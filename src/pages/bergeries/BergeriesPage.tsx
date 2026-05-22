import React, { useEffect, useState } from 'react';
import axiosInstance from '../../lib/axios';
import { Plus, Search, Home, MapPin, UserCheck, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

const BergeriesPage = () => {
  const [bergeries, setBergeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchBergeries = async () => {
    try {
      const res = await axiosInstance.get('/bergeries');
      setBergeries(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBergeries();
  }, []);

  const onSubmit = (data: any) => {
    console.log('Nouvelle bergerie:', data);
    setShowModal(false);
    reset();
  };

  const filtered = bergeries.filter(b => 
    b.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Bergeries</h2>
          <p className="text-gray-500 text-sm">Gérez les cellules locales et les foyers spirituels.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all active:scale-95">
          <Plus className="w-5 h-5" />
          Nouvelle Bergerie
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Rechercher une bergerie..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Bergerie</th>
                <th className="px-6 py-4">Responsable</th>
                <th className="px-6 py-4">Localisation</th>
                <th className="px-6 py-4 text-right">Membres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">Chargement...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">Aucune bergerie trouvée.</td></tr>
              ) : (
                filtered.map((bergerie) => (
                  <tr key={bergerie.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                          <Home className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{bergerie.nom}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-medium">Cellule de Prière</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <UserCheck className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm font-medium">{bergerie.responsable || 'Non assigné'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {bergerie.adresse || 'En bergerie'}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                      {bergerie.nb_membres || 0}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nouvelle Bergerie */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Nouvelle Bergerie</h3>
              <button onClick={() => setShowModal(false)} title="Fermer" className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Nom de la Bergerie</label>
                <input {...register('nom')} placeholder="Ex: Bergerie du Centre Ville" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Station</label>
                <select {...register('station')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" required>
                  <option value="">Sélectionner une station...</option>
                  <option>Station Centrale</option>
                  <option>Station Est</option>
                  <option>Station Ouest</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Responsable</label>
                <input {...register('responsable')} placeholder="Nom du responsable" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Adresse</label>
                <input {...register('adresse')} placeholder="Localisation" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Jour de Réunion</label>
                <select {...register('jour_reunion')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Lundi</option>
                  <option>Mardi</option>
                  <option>Mercredi</option>
                  <option>Jeudi</option>
                  <option>Vendredi</option>
                  <option>Samedi</option>
                  <option>Dimanche</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Annuler</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BergeriesPage;
