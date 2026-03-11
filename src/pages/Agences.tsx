import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation, Building2, Star, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "../components/ui/PageHero";
import { useStore } from "../data/store";
import type { Agency } from "../data/store";

export default function Agences() {
  const { agencies } = useStore();
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);

  const activeAgencies = agencies.filter((a) => a.active);
  const cities = ["all", ...Array.from(new Set(activeAgencies.map((a) => a.city)))];
  const mainAgency = activeAgencies.find((a) => a.isMain);
  const branches = activeAgencies.filter((a) => !a.isMain);
  const filteredBranches =
    selectedCity === "all" ? branches : branches.filter((a) => a.city === selectedCity);

  const getDirectionsUrl = (agency: Agency) =>
    `https://www.openstreetmap.org/directions?from=&to=${agency.lat},${agency.lng}`;
  const getMapUrl = (agency: Agency) =>
    `https://www.openstreetmap.org/export/embed.html?bbox=${agency.lng - 0.01},${agency.lat - 0.01},${agency.lng + 0.01},${agency.lat + 0.01}&layer=mapnik&marker=${agency.lat},${agency.lng}`;

  return (
    <>
      <PageHero
        title="Nos Agences"
        subtitle={`Retrouvez nos ${activeAgencies.length} agences à travers le Togo, proches de vous et à votre service.`}
        badge="📍 Réseau d'agences"
        breadcrumbs={[{ label: "Agences" }]}
        bgImage="https://images.unsplash.com/photo-1734868198180-645349d586f4?w=1920&h=600&fit=crop"
      />

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: activeAgencies.length.toString(), label: "Agences au total" },
              { value: cities.length - 1 + " villes", label: "Couverture géographique" },
              { value: "1 principale", label: "Siège & agence principale" },
              { value: "Lun–Sam", label: "Jours d'ouverture" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-extrabold">{stat.value}</p>
                <p className="text-green-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Agency */}
      {mainAgency && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                <Star className="w-4 h-4 fill-green-500 text-green-500" />
                Agence Principale
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
                {mainAgency.name}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
            >
              {/* Photo + Map */}
              <div className="flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={mainAgency.photo}
                    alt={mainAgency.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Building2 className="w-3 h-3" /> Siège social
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <iframe
                    src={getMapUrl(mainAgency)}
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    loading="lazy"
                    title={`Carte ${mainAgency.name}`}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  {mainAgency.description && (
                    <p className="text-gray-600 leading-relaxed mb-8 text-sm bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                      {mainAgency.description}
                    </p>
                  )}
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Adresse</p>
                        <p className="text-sm text-gray-800 font-medium">{mainAgency.address}</p>
                        <p className="text-sm text-gray-500">{mainAgency.city}, Togo</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Téléphone</p>
                        <a href={`tel:${mainAgency.phone1}`} className="text-sm text-gray-800 font-medium hover:text-green-600 transition-colors block">
                          {mainAgency.phone1}
                        </a>
                        {mainAgency.phone2 && (
                          <a href={`tel:${mainAgency.phone2}`} className="text-sm text-gray-500 hover:text-green-600 transition-colors block">
                            {mainAgency.phone2}
                          </a>
                        )}
                      </div>
                    </div>
                    {mainAgency.email && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</p>
                          <a href={`mailto:${mainAgency.email}`} className="text-sm text-gray-800 font-medium hover:text-green-600 transition-colors">
                            {mainAgency.email}
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Horaires d'ouverture</p>
                        <p className="text-sm text-gray-800 font-medium">{mainAgency.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href={getDirectionsUrl(mainAgency)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  <Navigation className="w-4 h-4" />
                  Obtenir l'itinéraire
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Branch Agencies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Nos Agences Secondaires</h2>
                <p className="text-gray-500 text-sm mt-1">{branches.length} agences à votre service</p>
              </div>
              {/* City Filter */}
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedCity === city
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600"
                    }`}
                  >
                    {city === "all" ? "Toutes les villes" : city}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCity}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredBranches.map((agency, i) => (
                <motion.div
                  key={agency.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedAgency(agency)}
                >
                  {/* Photo */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={agency.photo}
                      alt={agency.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {agency.city}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="bg-white/20 backdrop-blur-sm border border-white/40 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <ExternalLink className="w-3 h-3" /> Voir détails
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-3 text-base">{agency.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
                        <p className="text-xs text-gray-500 line-clamp-2">{agency.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <a
                          href={`tel:${agency.phone1}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-gray-600 hover:text-green-600 transition-colors font-medium"
                        >
                          {agency.phone1}
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
                        <p className="text-xs text-gray-500">{agency.hours}</p>
                      </div>
                    </div>
                    <a
                      href={getDirectionsUrl(agency)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 flex items-center justify-center gap-1.5 w-full border border-green-200 text-green-600 hover:bg-green-600 hover:text-white hover:border-green-600 py-2.5 rounded-xl text-xs font-semibold transition-all"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Itinéraire
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredBranches.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Building2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>Aucune agence trouvée dans cette ville.</p>
            </div>
          )}
        </div>
      </section>

      {/* Agency Detail Modal */}
      <AnimatePresence>
        {selectedAgency && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setSelectedAgency(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-56 overflow-hidden rounded-t-3xl">
                <img
                  src={selectedAgency.photo}
                  alt={selectedAgency.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelectedAgency(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-5 left-5 right-14">
                  <h3 className="text-white font-extrabold text-xl">{selectedAgency.name}</h3>
                  <p className="text-white/80 text-sm">{selectedAgency.city}, Togo</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {selectedAgency.description && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                    {selectedAgency.description}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                    <MapPin className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Adresse</p>
                      <p className="text-sm text-gray-800">{selectedAgency.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                    <Phone className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Téléphone</p>
                      <a href={`tel:${selectedAgency.phone1}`} className="text-sm text-gray-800 hover:text-green-600 block">
                        {selectedAgency.phone1}
                      </a>
                      {selectedAgency.phone2 && (
                        <a href={`tel:${selectedAgency.phone2}`} className="text-sm text-gray-600 hover:text-green-600 block">
                          {selectedAgency.phone2}
                        </a>
                      )}
                    </div>
                  </div>
                  {selectedAgency.email && (
                    <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                      <Mail className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Email</p>
                        <a href={`mailto:${selectedAgency.email}`} className="text-sm text-gray-800 hover:text-green-600">
                          {selectedAgency.email}
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                    <Clock className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Horaires</p>
                      <p className="text-sm text-gray-800">{selectedAgency.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Mini Map */}
                <div className="rounded-2xl overflow-hidden border border-gray-200 mb-5">
                  <iframe
                    src={getMapUrl(selectedAgency)}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    loading="lazy"
                    title={`Carte ${selectedAgency.name}`}
                  />
                </div>

                <a
                  href={getDirectionsUrl(selectedAgency)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl text-sm font-semibold transition-all shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  Obtenir l'itinéraire
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
