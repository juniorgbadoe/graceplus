import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, ToggleLeft, ToggleRight, X, Check } from "lucide-react";
import { toast } from "sonner";
import { useStore, type Service } from "../../data/store";

const iconOptions = ["PiggyBank", "CreditCard", "Send", "Landmark", "HeartHandshake", "Shield", "Wallet", "Building", "TrendingUp", "DollarSign"];
const categoryOptions = ["financier", "transfert", "conseil", "assurance", "autre"];

const emptyService: Omit<Service, "id"> = { title: "", description: "", icon: "Shield", category: "financier", active: true };

export default function ServicesManager() {
  const { services, setServices } = useStore();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, "id">>(emptyService);

  const filtered = services.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => {
    setEditingService(null);
    setForm(emptyService);
    setModalOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditingService(service);
    setForm({ title: service.title, description: service.description, icon: service.icon, category: service.category, active: service.active });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) { toast.error("Le titre est requis."); return; }
    if (!form.description.trim()) { toast.error("La description est requise."); return; }
    if (editingService) {
      setServices(services.map((s) => s.id === editingService.id ? { ...s, ...form } : s));
      toast.success("Service mis à jour !");
    } else {
      setServices([...services, { ...form, id: Date.now().toString() }]);
      toast.success("Service ajouté !");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
    toast.success("Service supprimé.");
  };

  const toggleActive = (id: string) => {
    setServices(services.map((s) => s.id === id ? { ...s, active: !s.active } : s));
    toast.success("Statut mis à jour.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestion des Services</h2>
          <p className="text-sm text-gray-500">{services.length} service(s) au total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
          <Plus className="w-4 h-4" /> Ajouter un service
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Service</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Catégorie</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((service, i) => (
                <motion.tr
                  key={service.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{service.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{service.description}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium capitalize">{service.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleActive(service.id)} className="flex items-center gap-1.5">
                      {service.active ? (
                        <span className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Actif
                        </span>
                      ) : (
                        <span className="bg-gray-50 text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" /> Inactif
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(service)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Modifier">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(service.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">Aucun service trouvé.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 text-lg">{editingService ? "Modifier le service" : "Ajouter un service"}</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Titre *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Ex: Épargne"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors resize-none"
                  placeholder="Description du service..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Icône</label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 bg-white"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Catégorie</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 bg-white"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-700">Actif</label>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${form.active ? "bg-green-500" : "bg-gray-300"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.active ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
                Annuler
              </button>
              <button onClick={handleSave} className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> {editingService ? "Mettre à jour" : "Ajouter"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
