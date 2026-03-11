import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const bgImage = "https://images.unsplash.com/photo-1766407354000-54a7129f7140?w=1920&h=600&fit=crop";

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-green-900/80 to-blue-900/90" />

      {/* Silhouettes / Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 200 Q200 80 400 120 Q600 160 720 100 Q840 40 1040 80 Q1240 120 1440 60 L1440 200 Z" fill="rgba(0,0,0,0.15)" />
          <path d="M0 200 Q300 130 500 150 Q700 170 900 120 Q1100 70 1440 140 L1440 200 Z" fill="rgba(0,0,0,0.1)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block bg-green-400/20 border border-green-400/40 text-green-200 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            🌿 Rejoignez-nous aujourd'hui
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Rejoignez une communauté qui
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-300">
              {" "}croit en votre avenir.
            </span>
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Plus de 12 000 membres nous font confiance. Rejoignez COOPEC GRACE PLUS et
            accédez à des solutions financières adaptées à vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white px-10 py-4 rounded-full font-bold text-base shadow-xl hover:shadow-green-500/40 transition-all"
              >
                Devenir membre
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/services"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-10 py-4 rounded-full font-bold text-base backdrop-blur-sm transition-all"
              >
                Voir nos services
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}