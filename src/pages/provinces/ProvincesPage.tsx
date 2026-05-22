import React, { useEffect, useState } from 'react';
import axiosInstance from '../../lib/axios';
import { Plus, Search, MapPin, Eye, Edit, Trash2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ProvincesPage = () => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchProvinces = async () => {
    try {
      const res = await axiosInstance.get('/provinces');
      setProvinces(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const onSubmit = (data: any) => {
    console.log('Nouvelle province:', data);
    setShowModal(false);
    reset();
  };

  const filtered = provinces.filter(p => 
    p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.region?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-sans tracking-tight">Gestion des Provinces</h2>
          <p className="text-gray-500 text-sm">Consultez et gérez les divisions administratives nationales.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:bg-primary-600 transition-all hover:shadow-primary-500/20 active:scale-95">
          <Plus className="w-5 h-5" />
          Nouvelle Province
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Rechercher par nom ou région..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 transition-all bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {filtered.length} province(s) trouvée(s)
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Province</th>
                <th className="px-6 py-4">Région / Pays</th>
                <th className="px-6 py-4">Date Création</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">Chargement des données...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">Aucune province à afficher.</td>
                </tr>
              ) : (
                filtered.map((province) => (
                  <tr key={province.id} className="hover:bg-primary-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center font-bold">
                          {province.nom.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{province.nom}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Province ID: {province.id.substring(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{province.region || 'Non spécifiée'}</p>
                      <p className="text-xs text-gray-400 uppercase">{province.pays}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(province.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 transition-opacity duration-200">
                        <button title="Voir détails" className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-all">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button title="Modifier" className="p-2 text-gray-400 hover:text-accent-500 hover:bg-accent-500/5 rounded-lg transition-all">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button title="Supprimer" className="p-2 text-gray-400 hover:text-danger hover:bg-danger/5 rounded-lg transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nouvelle Province */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Nouvelle Province</h3>
              <button onClick={() => setShowModal(false)} title="Fermer" className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Nom de la Province</label>
                <input {...register('nom')} placeholder="Ex: Kasai Occidental" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Région/Pays</label>
                <input {...register('region')} placeholder="Ex: Kasai, RDC" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Coordonnées Géographiques (optionnel)</label>
                <input {...register('latitude')} placeholder="Latitude" type="number" step="0.0001" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none mb-2" />
                <input {...register('longitude')} placeholder="Longitude" type="number" step="0.0001" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Responsable (optionnel)</label>
                <input {...register('responsable')} placeholder="Nom du responsable" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all">Annuler</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-all">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProvincesPage;
