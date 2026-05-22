import { useEffect, useState } from 'react';
import axiosInstance from '../../lib/axios';
import { Plus, Search, Filter, CheckCircle, XCircle, Clock, CreditCard, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';

const DepensesPage = () => {
  const [depenses, setDepenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const fetchDepenses = async () => {
    try {
      const res = await axiosInstance.get('/depenses');
      setDepenses(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepenses();
  }, []);

  const onSubmit = (data: any) => {
    console.log('Nouvelle dépense:', data);
    setShowModal(false);
    reset();
  };

  const validerDepense = async (id: string) => {
    try {
      await axiosInstance.patch(`/depenses/${id}/valider`);
      fetchDepenses();
    } catch (error) {
      alert('Erreur lors de la validation');
    }
  };

  const filtered = depenses.filter(d => 
    d.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.categorie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'VALIDÉ': return <span className="flex items-center gap-1 text-success bg-success/10 px-2 py-1 rounded-full text-xs font-bold"><CheckCircle className="w-3 h-3" /> Validé</span>;
      case 'REJETÉ': return <span className="flex items-center gap-1 text-danger bg-danger/10 px-2 py-1 rounded-full text-xs font-bold"><XCircle className="w-3 h-3" /> Rejeté</span>;
      default: return <span className="flex items-center gap-1 text-warning bg-warning/10 px-2 py-1 rounded-full text-xs font-bold"><Clock className="w-3 h-3" /> En attente</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Traçabilité des Dépenses</h2>
          <p className="text-gray-500 text-sm">Suivez et validez les flux financiers de l'église.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:bg-primary-600 transition-all">
          <Plus className="w-5 h-5" />
          Enregistrer une dépense
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Rechercher par libellé ou catégorie..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500 transition-all bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 text-gray-500 border border-gray-200 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 transition-all">
            <Filter className="w-4 h-4" /> Filtres avancés
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Libellé / Catégorie</th>
                <th className="px-6 py-4">Montant</th>
                <th className="px-6 py-4">Niveau / Date</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic font-mono">Chargement...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">Aucune dépense enregistrée.</td></tr>
              ) : (
                filtered.map((depense) => (
                  <tr key={depense.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 leading-tight">{depense.libelle}</p>
                          <p className="text-xs text-gray-400">{depense.categorie}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{Number(depense.montant).toLocaleString()} {depense.devise}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{depense.niveau}</p>
                      <p className="text-xs text-gray-400">{new Date(depense.date_depense).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(depense.statut)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.role === 'SUPER_ADMIN' && depense.statut === 'EN_ATTENTE' && (
                        <button 
                          onClick={() => validerDepense(depense.id)}
                          className="text-xs bg-success text-white px-3 py-1.5 rounded-lg hover:bg-success-dark transition-all font-bold"
                        >
                          Valider
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Enregistrer Dépense */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Nouvelle Dépense</h3>
              <button onClick={() => setShowModal(false)} title="Fermer" className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Libellé</label>
                <input {...register('libelle')} placeholder="Description de la dépense" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Catégorie</label>
                <select {...register('categorie')} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" required>
                  <option value="">Sélectionner une catégorie...</option>
                  <option>Logistique</option>
                  <option>Salaires</option>
                  <option>Évangélisation</option>
                  <option>Bâtiment</option>
                  <option>Fournitures</option>
                  <option>Autres</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Montant</label>
                <input {...register('montant')} type="number" placeholder="0.00" step="0.01" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Devise</label>
                <select {...register('devise')} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none">
                  <option>CDF</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Date</label>
                <input {...register('date_depense')} type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Niveau</label>
                <select {...register('niveau')} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" required>
                  <option>National</option>
                  <option>Provincial</option>
                  <option>Station</option>
                  <option>Bergerie</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">Description (optionnel)</label>
                <textarea {...register('description')} placeholder="Notes supplémentaires..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" rows={2}></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all">Annuler</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-all">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepensesPage;
