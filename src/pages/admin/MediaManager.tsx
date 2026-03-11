import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Search, X, Check, Filter } from "lucide-react";
import { toast } from "sonner";
import { useStore, type MediaItem } from "../../data/store";

type MediaCategory = "evenements" | "projets" | "communaute";
const categories: { key: MediaCategory | "all"; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "evenements", label: "Événements" },
  { key: "projets", label: "Projets" },
  { key: "communaute", label: "Communauté" },
];

const emptyMedia: Omit<MediaItem, "id"> = { url: "", title: "", category: "evenements", thumbnail: "" };

export default function MediaManager() {
  const { media, setMedia } = useStore();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<MediaCategory | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Omit<MediaItem, "id">>(emptyMedia);

  const filtered = media.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || m.category === filterCat;
    return matchSearch && matchCat;
  });

  const handleSave = () => {
    if (!form.url.trim()) { toast.error("L'URL est requise."); return; }
    if (!form.title.trim()) { toast.error("Le titre est requis."); return; }
    setMedia([...media, { ...form, id: Date.now().toString(), thumbnail: form.thumbnail || form.url }]);
    toast.success("Média ajouté !");
    setModalOpen(false);
    setForm(emptyMedia);
  };

  const handleDelete = (id: string) => { setMedia(media.filter((m) => m.id !== id)); toast.success("Média supprimé."); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestion de la Médiathèque</h2>
          <p className="text-sm text-gray-500">{media.length} média(s) au total</p>
        </div>
        <button onClick={() => { setForm(emptyMedia); setModalOpen(true); }} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm">
          <Plus className="w-4 h-4" /> Ajouter un média
        </button>
      </div>

      {/* Filters + Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Rechercher un média..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat.key} onClick={() => setFilterCat(cat.key)} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filterCat === cat.key ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
            <div className="relative aspect-[4/3]">
              <img src={item.thumbnail || item.url} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                item.category === "evenements" ? "bg-blue-50 text-blue-600" :
                item.category === "projets" ? "bg-green-50 text-green-600" : "bg-purple-50 text-purple-600"
              }`}>
                {categories.find((c) => c.key === item.category)?.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">Aucun média trouvé.</div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 text-lg">Ajouter un média</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">URL de l'image *</label>
                <input type="url" value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">URL Miniature (optionnel)</label>
                <input type="url" value={form.thumbnail} onChange={(e) => setForm((f) => ({ ...f, thumbnail: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="https://... (laisser vide pour utiliser l'URL principale)" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Titre *</label>
                <input type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="Titre du média" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Catégorie</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as MediaCategory }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 bg-white">
                  <option value="evenements">Événements</option>
                  <option value="projets">Projets</option>
                  <option value="communaute">Communauté</option>
                </select>
              </div>
              {form.url && (
                <div className="rounded-xl overflow-hidden border border-gray-100 aspect-video">
                  <img src={form.url} alt="Aperçu" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50">Annuler</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Ajouter
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
