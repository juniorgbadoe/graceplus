import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useStore } from "../../data/store";

const tabs = [
  { key: "all", label: "Tous" },
  { key: "banque", label: "Banques partenaires" },
  { key: "institution", label: "Institutions financières" },
  { key: "ong", label: "ONG & Organisations" },
];

interface Props {
  preview?: boolean;
}

export function PartnersSection({ preview = false }: Props) {
  const { partners } = useStore();
  const [activeTab, setActiveTab] = useState("all");

  const activePartners = partners.filter((p) => p.active);
  const filtered = activeTab === "all" ? activePartners : activePartners.filter((p) => p.category === activeTab);
  const displayed = preview ? activePartners.slice(0, 8) : filtered;

  return (
    <section id="partenaires" className={`py-24 ${preview ? "bg-white" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Ils nous font confiance</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Nos Partenaires
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            COOPEC GRACE PLUS collabore avec des institutions reconnues pour offrir
            les meilleurs services à nos membres.
          </p>
        </motion.div>

        {/* Tabs (full mode only) */}
        {!preview && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Partners Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={preview ? "preview" : activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {displayed.map((partner, i) => (
              <motion.a
                key={partner.id}
                href={partner.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: "#2563eb" }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-center hover:shadow-lg transition-all duration-300 aspect-[2/1]"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 max-w-full object-contain"
                />
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && !preview && (
          <p className="text-center text-gray-400 py-12">Aucun partenaire dans cette catégorie.</p>
        )}

        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/partenaires"
              className="inline-flex items-center gap-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all"
            >
              Voir tous nos partenaires
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
