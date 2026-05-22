import React, { useEffect, useState } from 'react';
import axiosInstance from '../../lib/axios';
import { Plus, Search, Building2, MapPin, Phone, Users, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

const StationsPage = () => {
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchStations = async () => {
    try {
      const res = await axiosInstance.get('/stations');
      setStations(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const onSubmit = (data: any) => {
    console.log('Nouvelle station:', data);
    setShowModal(false);
    reset();
  };

  const filtered = stations.filter(s => 
    s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.adresse?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Stations</h2>
          <p className="text-gray-500 text-sm">Supervisez les stations missionnaires de vos provinces.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95">
          <Plus className="w-5 h-5" />
          Nouvelle Station
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Rechercher une station..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Station</th>
                <th className="px-6 py-4">Localisation</th>
                <th className="px-6 py-4">Capacité</th>
                <th className="px-6 py-4 text-right">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">Chargement...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">Aucune station trouvée.</td></tr>
              ) : (
                filtered.map((station) => (
                  <tr key={station.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{station.nom}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-medium">Station Missionnaire</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {station.adresse || 'N/A'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-bold text-slate-900">{station.capacite || 0}</span>
                        <span className="text-xs text-slate-400">places</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-medium text-blue-600 flex items-center justify-end gap-1">
                        <Phone className="w-3 h-3" /> {station.telephone || 'Non renseigné'}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nouvelle Station */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Nouvelle Station</h3>
              <button onClick={() => setShowModal(false)} title="Fermer" className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Nom de la Station</label>
                <input {...register('nom')} placeholder="Ex: Station Centrale de Goma" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Province</label>
                <select {...register('province')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required>
                  <option value="">Sélectionner une province...</option>
                  <option>Kasai Occidental</option>
                  <option>Kasai Oriental</option>
                  <option>Katanga</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Adresse</label>
                <input {...register('adresse')} placeholder="Localisation précise" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Téléphone</label>
                <input {...register('telephone')} placeholder="+243..." className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Capacité (places)</label>
                <input {...register('capacite')} type="number" placeholder="Ex: 150" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Annuler</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationsPage;
