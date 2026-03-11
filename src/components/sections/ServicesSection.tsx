import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PiggyBank, CreditCard, Send, Landmark, HeartHandshake, Shield, ArrowRight } from "lucide-react";
import { useStore } from "../../data/store";

const iconMap: Record<string, React.ElementType> = {
  PiggyBank, CreditCard, Send, Landmark, HeartHandshake, Shield,
};

interface Props {
  preview?: boolean;
}

export function ServicesSection({ preview = false }: Props) {
  const { services } = useStore();
  const activeServices = services.filter((s) => s.active);
  const displayed = preview ? activeServices.slice(0, 3) : activeServices;

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Ce que nous offrons</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            {preview ? "Nos Services Financiers" : "Tous nos Services"}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Des solutions financières adaptées à vos besoins, conçues pour accompagner
            chaque étape de votre vie et de vos projets.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((service, i) => {
            const Icon = iconMap[service.icon] || Shield;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(22, 163, 74, 0.15)" }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm cursor-default transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-green-100 group-hover:to-blue-100 transition-all">
                  <Icon className="w-7 h-7 text-green-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                <div className="mt-6 flex items-center gap-2 text-green-600 text-sm font-semibold group-hover:gap-3 transition-all">
                  <span>En savoir plus</span>
                  <span className="text-lg">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* "Voir tous" button in preview mode */}
        {preview && activeServices.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg"
            >
              Voir tous nos services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
