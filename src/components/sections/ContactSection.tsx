import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { useStore } from "../../data/store";
import { toast } from "sonner";

export function ContactSection() {
  const { contactInfo } = useStore();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé !", { description: "Nous vous répondrons dans les plus brefs délais." });
    setForm({ name: "", email: "", message: "" });
  };

  const mapsUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${contactInfo.lng - 0.01},${contactInfo.lat - 0.01},${contactInfo.lng + 0.01},${contactInfo.lat + 0.01}&layer=mapnik&marker=${contactInfo.lat},${contactInfo.lng}`;
  const directionsUrl = `https://www.openstreetmap.org/directions?from=&to=${contactInfo.lat},${contactInfo.lng}`;

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Localisation & Contact</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Trouvez-nous & Contactez-nous
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Nous sommes à votre disposition pour répondre à toutes vos questions et vous accompagner.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-gray-100"
          >
            <iframe
              src={mapsUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              title="Localisation COOPEC GRACE PLUS"
            />
            <div className="p-4 bg-white border-t border-gray-100">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-semibold transition-all w-full"
              >
                <Navigation className="w-4 h-4" />
                Obtenir l'itinéraire
              </a>
            </div>
          </motion.div>

          {/* Contact Info + Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Info Card */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-5">Nos coordonnées</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Adresse</p>
                    <p className="text-sm text-gray-500">{contactInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Téléphone</p>
                    <p className="text-sm text-gray-500">{contactInfo.phone1}</p>
                    <p className="text-sm text-gray-500">{contactInfo.phone2}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Email</p>
                    <p className="text-sm text-gray-500">{contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Horaires</p>
                    <p className="text-sm text-gray-500">{contactInfo.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-5">Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                </div>
                <textarea
                  placeholder="Votre message..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
