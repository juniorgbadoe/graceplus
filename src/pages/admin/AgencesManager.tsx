import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, X, Check, Star, MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
import { toast } from "sonner";
import { useStore, type Agency } from "../../data/store";

const emptyAgency: Omit<Agency, "id"> = {
  name: "",
  isMain: false,
  address: "",
  city: "Lomé",
  phone1: "",
  phone2: "",
  email: "",
  hours: "Lun – Ven : 08h00 – 17h00 | Sam : 08h00 – 13h00",
  photo: "",
  lat: 6.1375,
  lng: 1.2123,
  description: "",
  active: true,
};

export default function AgencesManager() {
  const { agencies, setAgencies } = useStore();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAgency, setEditingAgency] = useState<Agency | null>(null);
  const [form, setForm] = useState<Omit<Agency, "id">>(emptyAgency);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = agencies.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.city.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingAgency(null);
    setForm(emptyAgency);
    setModalOpen(true);
  };

  const openEdit = (agency: Agency) => {
    setEditingAgency(agency);
    setForm({
      name: agency.name,
      isMain: agency.isMain,
      address: agency.address,
      city: agency.city,
      phone1: agency.phone1,
      phone2: agency.phone2 || "",
      email: agency.email || "",
      hours: agency.hours,
      photo: agency.photo,
      lat: agency.lat,
      lng: agency.lng,
      description: agency.description || "",
      active: agency.active,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) { toast.error("Le nom est requis."); return; }
    if (!form.address.trim()) { toast.error("L'adresse est requise."); return; }
    if (!form.city.trim()) { toast.error("La ville est requise."); return; }
    if (!form.phone1.trim()) { toast.error("Le numéro de téléphone est requis."); return; }

    // If set as main, unset others
    let updatedAgencies = [...agencies];
    if (form.isMain) {
      updatedAgencies = updatedAgencies.map((a) => ({ ...a, isMain: false }));
    }

    if (editingAgency) {
      setAgencies(updatedAgencies.map((a) => (a.id === editingAgency.id ? { ...a, ...form } : a)));
      toast.success("Agence mise à jour !");
    } else {
      setAgencies([...updatedAgencies, { ...form, id: Date.now().toString() }]);
      toast.success("Agence ajoutée !");
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setAgencies(agencies.filter((a) => a.id !== id));
    setDeleteConfirm(null);
    toast.success("Agence supprimée.");
  };

  const toggleActive = (id: string) => {
    setAgencies(agencies.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
    toast.success("Statut mis à jour.");
  };

  const toggleMain = (id: string) => {
    setAgencies(agencies.map((a) => ({ ...a, isMain: a.id === id })));
    toast.success("Agence principale mise à jour.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestion des Agences</h2>
          <p className="text-sm text-gray-500">{agencies.length} agence(s) au total</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Ajouter une agence
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total agences", value: agencies.length, bg: "bg-green-50", color: "text-green-600" },
          { label: "Actives", value: agencies.filter((a) => a.active).length, bg: "bg-blue-50", color: "text-blue-600" },
          { label: "Agence principale", value: agencies.filter((a) => a.isMain).length > 0 ? "Définie" : "Non définie", bg: "bg-yellow-50", color: "text-yellow-600" },
          { label: "Villes couvertes", value: new Set(agencies.map((a) => a.city)).size, bg: "bg-purple-50", color: "text-purple-600" },
        ].map((card, i) => (
          <div key={i} className={`${card.bg} rounded-2xl p-4 border border-gray-100`}>
            <p className={`text-xl font-extrabold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une agence par nom ou ville..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
      </div>

      {/* Agencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((agency, i) => (
          <motion.div
            key={agency.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${
              agency.isMain ? "border-green-300 ring-2 ring-green-100" : "border-gray-100"
            }`}
          >
            {/* Photo */}
            <div className="relative h-40 overflow-hidden">
              {agency.photo ? (
                <img
                  src={agency.photo}
                  alt={agency.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-green-300" />
                </div>
              )}
              <div className="absolute top-3 left-3 flex gap-2">
                {agency.isMain && (
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Principale
                  </span>
                )}
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  agency.active ? "bg-green-500 text-white" : "bg-gray-400 text-white"
                }`}>
                  {agency.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-3 text-sm leading-tight">{agency.name}</h3>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-500 line-clamp-1">{agency.address}, {agency.city}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <p className="text-xs text-gray-500">{agency.phone1}</p>
                </div>
                {agency.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <p className="text-xs text-gray-500 truncate">{agency.email}</p>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-500 line-clamp-1">{agency.hours}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => openEdit(agency)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-semibold transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Modifier
                </button>
                <button
                  onClick={() => toggleActive(agency.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    agency.active
                      ? "bg-gray-50 hover:bg-gray-100 text-gray-600"
                      : "bg-green-50 hover:bg-green-100 text-green-600"
                  }`}
                >
                  {agency.active ? "Désactiver" : "Activer"}
                </button>
                {!agency.isMain && (
                  <button
                    onClick={() => toggleMain(agency.id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-xl text-xs font-semibold transition-colors"
                    title="Définir comme principale"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>
                )}
                {deleteConfirm === agency.id ? (
                  <div className="flex gap-1 w-full">
                    <button
                      onClick={() => handleDelete(agency.id)}
                      className="flex-1 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold transition-colors"
                    >
                      Confirmer
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(agency.id)}
                    className="flex items-center justify-center px-3 py-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl text-xs transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">
          <Building2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-sm">Aucune agence trouvée.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h3 className="font-bold text-gray-900 text-lg">
                {editingAgency ? "Modifier l'agence" : "Ajouter une agence"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Nom de l'agence *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Ex: Agence Bè"
                />
              </div>

              {/* City + Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Ville *</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="Ex: Lomé"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Adresse *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="Ex: Rue de la Paix, Quartier Bè"
                  />
                </div>
              </div>

              {/* Phones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Téléphone principal *</label>
                  <input
                    type="text"
                    value={form.phone1}
                    onChange={(e) => setForm((f) => ({ ...f, phone1: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="+228 22 00 00 00"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Téléphone secondaire</label>
                  <input
                    type="text"
                    value={form.phone2}
                    onChange={(e) => setForm((f) => ({ ...f, phone2: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="+228 90 00 00 00"
                  />
                </div>
              </div>

              {/* Email + Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="agence@coopecgraceplus.tg"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Horaires d'ouverture</label>
                  <input
                    type="text"
                    value={form.hours}
                    onChange={(e) => setForm((f) => ({ ...f, hours: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="Lun – Ven : 08h00 – 17h00"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">URL de la photo</label>
                <input
                  type="url"
                  value={form.photo}
                  onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="https://..."
                />
                {form.photo && (
                  <div className="mt-2 rounded-xl overflow-hidden h-24 border border-gray-200">
                    <img src={form.photo} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors resize-none"
                  placeholder="Présentation de l'agence..."
                />
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={form.lat}
                    onChange={(e) => setForm((f) => ({ ...f, lat: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={form.lng}
                    onChange={(e) => setForm((f) => ({ ...f, lng: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400">Pour Lomé : Latitude ≈ 6.1375, Longitude ≈ 1.2123</p>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${form.active ? "bg-green-500" : "bg-gray-300"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.active ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                  <label className="text-sm font-semibold text-gray-700">Agence active</label>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, isMain: !f.isMain }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${form.isMain ? "bg-yellow-400" : "bg-gray-300"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.isMain ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                  <label className="text-sm font-semibold text-gray-700">Agence principale</label>
                </div>
              </div>

              {form.isMain && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-700">
                  ⚠️ Définir cette agence comme principale supprimera ce statut pour toutes les autres agences.
                </div>
              )}
            </div>

            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> {editingAgency ? "Mettre à jour" : "Ajouter"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
