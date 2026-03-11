import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, X, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useStore, type Partner } from "../../data/store";

type PartnerCategory = "banque" | "institution" | "ong";

const emptyPartner: Omit<Partner, "id"> = { name: "", logo: "", category: "banque", website: "", active: true };
const categories: { key: PartnerCategory; label: string }[] = [
  { key: "banque", label: "Banque partenaire" },
  { key: "institution", label: "Institution financière" },
  { key: "ong", label: "ONG & Organisation" },
];

export default function PartnersManager() {
  const { partners, setPartners } = useStore();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState<Omit<Partner, "id">>(emptyPartner);

  const filtered = partners.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const openAdd = () => { setEditing(null); setForm(emptyPartner); setModalOpen(true); };
  const openEdit = (p: Partner) => { setEditing(p); setForm({ name: p.name, logo: p.logo, category: p.category, website: p.website || "", active: p.active }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name.trim()) { toast.error("Le nom est requis."); return; }
    if (editing) {
      setPartners(partners.map((p) => p.id === editing.id ? { ...p, ...form } : p));
      toast.success("Partenaire mis à jour !");
    } else {
      setPartners([...partners, { ...form, id: Date.now().toString() }]);
      toast.success("Partenaire ajouté !");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => { setPartners(partners.filter((p) => p.id !== id)); toast.success("Partenaire supprimé."); };
  const toggleActive = (id: string) => { setPartners(partners.map((p) => p.id === id ? { ...p, active: !p.active } : p)); };

  const getCategoryLabel = (cat: PartnerCategory) => categories.find((c) => c.key === cat)?.label || cat;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestion des Partenaires</h2>
          <p className="text-sm text-gray-500">{partners.length} partenaire(s) au total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm">
          <Plus className="w-4 h-4" /> Ajouter un partenaire
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Rechercher un partenaire..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Partenaire</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Catégorie</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((partner, i) => (
                <motion.tr key={partner.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={partner.logo} alt={partner.name} className="w-16 h-8 object-contain rounded-lg bg-gray-50 border border-gray-100 p-1" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{partner.name}</p>
                        {partner.website && <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 flex items-center gap-1 hover:underline"><ExternalLink className="w-3 h-3" /> Lien</a>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full text-xs font-medium">{getCategoryLabel(partner.category)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleActive(partner.id)}>
                      {partner.active ? (
                        <span className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Actif</span>
                      ) : (
                        <span className="bg-gray-50 text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full" /> Inactif</span>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(partner)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(partner.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">Aucun partenaire trouvé.</div>}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 text-lg">{editing ? "Modifier le partenaire" : "Ajouter un partenaire"}</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Nom *</label>
                <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="Nom du partenaire" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">URL Logo</label>
                <input type="url" value={form.logo} onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Catégorie</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as PartnerCategory }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 bg-white">
                  {categories.map((cat) => <option key={cat.key} value={cat.key}>{cat.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Site web</label>
                <input type="url" value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="https://..." />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-700">Actif</label>
                <button type="button" onClick={() => setForm((f) => ({ ...f, active: !f.active }))} className={`relative w-12 h-6 rounded-full transition-colors ${form.active ? "bg-green-500" : "bg-gray-300"}`}>
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.active ? "translate-x-6" : "translate-x-0"}`} />
                </button>
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
