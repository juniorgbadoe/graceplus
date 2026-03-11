import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Shield, Zap, Users } from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1655682597128-2b10c079cf83?w=1920&h=1080&fit=crop";

export function HeroSection() {
  const scrollToNext = () => {
    const el = document.getElementById("why-us");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Gradient Overlay: green → blue */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-green-800/70 to-blue-900/85" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-green-400/20 border border-green-400/40 text-green-200 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              🌿 Coopérative d'Épargne et de Crédit – Lomé, Togo
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            Ensemble, construisons{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
              votre avenir financier.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-200 mb-10 leading-relaxed"
          >
            Épargne, crédits, dépôts, transferts d'argent – des solutions accessibles
            pour renforcer votre autonomie financière.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <Link
              to="/services"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-green-500/40 hover:scale-105"
            >
              Découvrir nos services
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-base transition-all backdrop-blur-sm hover:scale-105"
            >
              Nous contacter
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-6"
          >
            {[
              { icon: Shield, label: "Sécurisé" },
              { icon: Users, label: "Accessible" },
              { icon: Zap, label: "Rapide" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/80">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Icon className="w-4 h-4 text-green-300" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1, y: { repeat: Infinity, duration: 1.5 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
}