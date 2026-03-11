import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, X, Check, Star } from "lucide-react";
import { toast } from "sonner";
import { useStore, type Testimonial } from "../../data/store";

const emptyTestimonial: Omit<Testimonial, "id"> = { clientName: "", photo: "", rating: 5, text: "", active: true };

export default function TestimonialsManager() {
  const { testimonials, setTestimonials } = useStore();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, "id">>(emptyTestimonial);

  const filtered = testimonials.filter((t) => t.clientName.toLowerCase().includes(search.toLowerCase()));
  const openAdd = () => { setEditing(null); setForm(emptyTestimonial); setModalOpen(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setForm({ clientName: t.clientName, photo: t.photo, rating: t.rating, text: t.text, active: t.active }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.clientName.trim()) { toast.error("Le nom du client est requis."); return; }
    if (!form.text.trim()) { toast.error("Le témoignage est requis."); return; }
    if (editing) {
      setTestimonials(testimonials.map((t) => t.id === editing.id ? { ...t, ...form } : t));
      toast.success("Témoignage mis à jour !");
    } else {
      setTestimonials([...testimonials, { ...form, id: Date.now().toString() }]);
      toast.success("Témoignage ajouté !");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => { setTestimonials(testimonials.filter((t) => t.id !== id)); toast.success("Témoignage supprimé."); };
  const toggleActive = (id: string) => { setTestimonials(testimonials.map((t) => t.id === id ? { ...t, active: !t.active } : t)); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestion des Témoignages</h2>
          <p className="text-sm text-gray-500">{testimonials.length} témoignage(s) au total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm">
          <Plus className="w-4 h-4" /> Ajouter un témoignage
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={t.photo || "https://via.placeholder.com/40"} alt={t.clientName} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.clientName}</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className={`w-3 h-3 ${idx < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => toggleActive(t.id)}>
                {t.active ? (
                  <span className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs font-medium">Actif</span>
                ) : (
                  <span className="bg-gray-50 text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full text-xs font-medium">Inactif</span>
                )}
              </button>
            </div>
            <p className="text-gray-600 text-sm italic mb-4 line-clamp-3">"{t.text}"</p>
            <div className="flex gap-2">
              <button onClick={() => openEdit(t)} className="flex items-center gap-1.5 text-xs text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                <Pencil className="w-3 h-3" /> Modifier
              </button>
              <button onClick={() => handleDelete(t.id)} className="flex items-center gap-1.5 text-xs text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                <Trash2 className="w-3 h-3" /> Supprimer
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">Aucun témoignage trouvé.</div>}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 text-lg">{editing ? "Modifier le témoignage" : "Ajouter un témoignage"}</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Nom du client *</label>
                <input type="text" value={form.clientName} onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="Nom Prénom" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">URL Photo</label>
                <input type="url" value={form.photo} onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Note</label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button key={i} type="button" onClick={() => setForm((f) => ({ ...f, rating: i + 1 }))}>
                      <Star className={`w-7 h-7 transition-colors ${i < form.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Témoignage *</label>
                <textarea value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} rows={4} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 resize-none" placeholder="Témoignage du client..." />
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
