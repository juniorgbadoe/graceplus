import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Globe, Save } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "../../data/store";

export default function ContactManager() {
  const { contactInfo, setContactInfo } = useStore();
  const [form, setForm] = useState({ ...contactInfo });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.address.trim() || !form.email.trim()) { toast.error("L'adresse et l'email sont requis."); return; }
    setContactInfo(form);
    setSaved(true);
    toast.success("Informations de contact mises à jour !");
    setTimeout(() => setSaved(false), 3000);
  };

  const fields = [
    { key: "address", label: "Adresse complète", icon: MapPin, type: "text", placeholder: "Avenue de la République, Lomé, Togo" },
    { key: "phone1", label: "Téléphone principal", icon: Phone, type: "tel", placeholder: "+228 22 12 34 56" },
    { key: "phone2", label: "Téléphone secondaire", icon: Phone, type: "tel", placeholder: "+228 90 12 34 56" },
    { key: "email", label: "Email", icon: Mail, type: "email", placeholder: "contact@coopecgraceplus.tg" },
    { key: "hours", label: "Horaires d'ouverture", icon: Clock, type: "text", placeholder: "Lun - Ven : 08h00 - 17h00 | Sam : 08h00 - 13h00" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Localisation & Contact</h2>
        <p className="text-sm text-gray-500">Gérez les informations de contact affichées sur le site</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" /> Informations de contact
          </h3>
          <div className="space-y-4">
            {fields.map(({ key, label, icon: Icon, type, placeholder }) => (
              <div key={key}>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={type}
                    value={(form as any)[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* GPS Coordinates */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" /> Coordonnées GPS
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={form.lat}
                onChange={(e) => setForm((f) => ({ ...f, lat: parseFloat(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                placeholder="6.1375"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={form.lng}
                onChange={(e) => setForm((f) => ({ ...f, lng: parseFloat(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                placeholder="1.2123"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Ces coordonnées sont utilisées pour le marqueur sur la carte.</p>
        </motion.div>

        {/* Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-5">Aperçu de la carte</h3>
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${form.lng - 0.01},${form.lat - 0.01},${form.lng + 0.01},${form.lat + 0.01}&layer=mapnik&marker=${form.lat},${form.lng}`}
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              title="Aperçu carte"
            />
          </div>
        </motion.div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm shadow-sm transition-all ${
              saved ? "bg-green-500 text-white" : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            <Save className="w-4 h-4" />
            {saved ? "Enregistré !" : "Enregistrer les modifications"}
          </button>
        </div>
      </form>
    </div>
  );
}
