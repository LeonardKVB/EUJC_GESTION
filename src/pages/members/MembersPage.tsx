import React, { useEffect, useState } from 'react';
import axiosInstance from '../../lib/axios';
import { Plus, Search, Users, UserPlus, ShieldCheck, Mail, Phone, MapPin, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

const MembersPage = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/members');
      // On combine les deux types de membres retournés par l'API
      const { disciples, chretiens } = res.data.data;
      const allMembers = [
        ...disciples.map((d: any) => ({ ...d, type: 'DISCIPLE' })),
        ...chretiens.map((c: any) => ({ ...c, type: 'CHRETIEN' }))
      ];
      setMembers(allMembers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const onSubmit = (data: any) => {
    console.log('Nouveau membre:', data);
    setShowModal(false);
    reset();
  };

  const filtered = members.filter(m => 
    `${m.prenom} ${m.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (m.role && m.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Membres</h2>
          <p className="text-gray-500 text-sm">Registre national des serviteurs et fidèles de l'EUJC.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95">
          <UserPlus className="w-5 h-5" />
          Nouveau Membre
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Chercher un nom, un rôle ou une ville..."
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
                <th className="px-6 py-4">Membre</th>
                <th className="px-6 py-4">Status / Rôle</th>
                <th className="px-6 py-4">Localisation</th>
                <th className="px-6 py-4 text-right">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">Chargement...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">Aucun membre trouvé.</td></tr>
              ) : (
                filtered.map((member) => (
                  <tr key={member.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                          {member.prenom[0]}{member.nom[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{member.prenom} {member.nom}</p>
                          <p className="text-[10px] text-slate-400 font-medium">ID: EUJC-M-{member.id.toString().padStart(4, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold ring-1 ring-blue-500/10 uppercase">
                        <ShieldCheck className="w-3 h-3" />
                        {member.role === 'BERGER' ? 'Responsable Bergerie' : 'Membre Fidèle'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm">{member.ville}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <p className="text-sm font-medium text-slate-900 flex items-center gap-1.5 hover:text-blue-600 cursor-pointer transition-colors">
                          <Mail className="w-3.5 h-3.5" /> {member.email}
                        </p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" /> {member.telephone}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nouveau Membre */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Nouveau Membre</h3>
              <button onClick={() => setShowModal(false)} title="Fermer" className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Prénom</label>
                <input {...register('prenom')} placeholder="Prénom" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Nom</label>
                <input {...register('nom')} placeholder="Nom" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Email</label>
                <input {...register('email')} type="email" placeholder="email@example.com" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Téléphone</label>
                <input {...register('telephone')} placeholder="+243..." className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Ville</label>
                <input {...register('ville')} placeholder="Localité" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Rôle</label>
                <select {...register('role')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required>
                  <option value="">Sélectionner un rôle...</option>
                  <option value="DISCIPLE">Disciple</option>
                  <option value="BERGER">Responsable Bergerie</option>
                  <option value="CHRETIEN">Membre Fidèle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Bergerie</label>
                <select {...register('bergerie')} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Sélectionner une bergerie...</option>
                  <option>Bergerie Centrale</option>
                  <option>Bergerie Nord</option>
                  <option>Bergerie Sud</option>
                </select>
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

export default MembersPage;
