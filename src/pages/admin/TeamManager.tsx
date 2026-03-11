import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, X, Check, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { useStore, type TeamMember } from "../../data/store";

const emptyMember: Omit<TeamMember, "id"> = { name: "", position: "", bio: "", photo: "", linkedin: "", email: "", order: 1, visible: true };

export default function TeamManager() {
  const { team, setTeam } = useStore();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<Omit<TeamMember, "id">>(emptyMember);

  const filtered = team.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.position.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm({ ...emptyMember, order: team.length + 1 }); setModalOpen(true); };
  const openEdit = (m: TeamMember) => { setEditing(m); setForm({ name: m.name, position: m.position, bio: m.bio, photo: m.photo, linkedin: m.linkedin || "", email: m.email || "", order: m.order, visible: m.visible }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name.trim()) { toast.error("Le nom est requis."); return; }
    if (!form.position.trim()) { toast.error("Le poste est requis."); return; }
    if (editing) {
      setTeam(team.map((m) => m.id === editing.id ? { ...m, ...form } : m));
      toast.success("Membre mis à jour !");
    } else {
      setTeam([...team, { ...form, id: Date.now().toString() }]);
      toast.success("Membre ajouté !");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => { setTeam(team.filter((m) => m.id !== id)); toast.success("Membre supprimé."); };
  const toggleVisible = (id: string) => { setTeam(team.map((m) => m.id === id ? { ...m, visible: !m.visible } : m)); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestion de l'Équipe</h2>
          <p className="text-sm text-gray-500">{team.length} membre(s) au total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
          <Plus className="w-4 h-4" /> Ajouter un membre
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un membre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Membre</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Poste</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Visibilité</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((member, i) => (
                <motion.tr key={member.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={member.photo || "https://via.placeholder.com/40"} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                        <p className="text-gray-500 text-xs md:hidden">{member.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <p className="text-sm text-gray-600">{member.position}</p>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleVisible(member.id)}>
                      {member.visible ? (
                        <span className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Visible
                        </span>
                      ) : (
                        <span className="bg-gray-50 text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" /> Masqué
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(member)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(member.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">Aucun membre trouvé.</div>}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 text-lg">{editing ? "Modifier le membre" : "Ajouter un membre"}</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Nom complet *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="Nom Prénom" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Poste *</label>
                  <input type="text" value={form.position} onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="Directeur..." />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">URL Photo</label>
                <input type="url" value={form.photo} onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Bio</label>
                <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 resize-none" placeholder="Mini-biographie..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="email@..." />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">LinkedIn</label>
                  <input type="url" value={form.linkedin} onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Ordre d'affichage</label>
                  <input type="number" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" min={1} />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <label className="text-sm font-semibold text-gray-700">Visible</label>
                  <button type="button" onClick={() => setForm((f) => ({ ...f, visible: !f.visible }))} className={`relative w-12 h-6 rounded-full transition-colors ${form.visible ? "bg-green-500" : "bg-gray-300"}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.visible ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50">Annuler</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> {editing ? "Mettre à jour" : "Ajouter"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
