import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ArrowRight, Building2 } from "lucide-react";
import { useStore } from "../../data/store";

export function AgencesTeaser() {
  const { agencies } = useStore();
  const activeAgencies = agencies.filter((a) => a.active);
  const mainAgency = activeAgencies.find((a) => a.isMain);
  const branches = activeAgencies.filter((a) => !a.isMain).slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Réseau d'agences</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Près de vous, partout au Togo
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Avec {activeAgencies.length} agences réparties sur le territoire togolais, COOPEC GRACE PLUS
            est toujours à portée de main pour vous accompagner.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Main Agency Featured Card */}
          {mainAgency && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={mainAgency.photo}
                  alt={mainAgency.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Building2 className="w-3 h-3" /> Agence Principale
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl">{mainAgency.name}</h3>
                  <p className="text-white/80 text-sm">{mainAgency.city}</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="space-y-3 mb-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-600">{mainAgency.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-sm text-gray-600">{mainAgency.phone1}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-600">{mainAgency.hours}</span>
                  </div>
                </div>
                {mainAgency.description && (
                  <p className="text-gray-500 text-sm leading-relaxed border-t pt-4">{mainAgency.description}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Branch Agencies */}
          <div className="space-y-4">
            {branches.map((agency, i) => (
              <motion.div
                key={agency.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group"
              >
                <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={agency.photo}
                    alt={agency.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{agency.name}</h4>
                  <div className="flex items-start gap-1.5 mb-1">
                    <MapPin className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-500 truncate">{agency.address}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-blue-600 shrink-0" />
                    <p className="text-xs text-gray-500">{agency.phone1}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Stats Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-5 text-white"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-extrabold">{activeAgencies.length}</p>
                  <p className="text-green-200 text-xs mt-1">Agences</p>
                </div>
                <div className="border-x border-white/20">
                  <p className="text-2xl font-extrabold">3</p>
                  <p className="text-green-200 text-xs mt-1">Villes</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold">7j/7</p>
                  <p className="text-green-200 text-xs mt-1">Accessibles</p>
                </div>
              </div>
            </motion.div>

            <Link
              to="/agences"
              className="flex items-center justify-center gap-2 w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-3.5 rounded-2xl font-semibold text-sm transition-all"
            >
              Voir toutes nos agences
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
