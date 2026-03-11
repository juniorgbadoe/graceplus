import { motion } from "framer-motion";
import { Users, Calendar, Star, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "+12 000", label: "Clients satisfaits", color: "from-green-500 to-emerald-600" },
  { icon: Calendar, value: "10 ans", label: "D'expérience", color: "from-blue-500 to-blue-600" },
  { icon: Star, value: "95%", label: "Taux de satisfaction", color: "from-yellow-500 to-amber-600" },
  { icon: Globe, value: "100%", label: "Ancrage communautaire", color: "from-purple-500 to-violet-600" },
];

const bgImage = "https://images.unsplash.com/photo-1747774999070-ef45a60c9d00?w=1920&h=800&fit=crop";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 overflow-hidden">
      {/* Textured background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 to-blue-900/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green-300 font-semibold text-sm uppercase tracking-widest">Pourquoi nous ?</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
            Pourquoi choisir COOPEC GRACE PLUS ?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Depuis 10 ans, nous bâtissons des ponts entre les communautés et les opportunités financières
            au Togo et dans la sous-région.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mission text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 grid md:grid-cols-2 gap-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Notre Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              Offrir des services financiers accessibles, abordables et adaptés aux besoins
              des populations à revenus modestes et des entrepreneurs du Togo.
              Nous croyons que l'accès au financement est un levier essentiel du développement.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Notre Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              Devenir la coopérative d'épargne et de crédit de référence en Afrique de l'Ouest,
              reconnue pour son excellence, son innovation et son impact positif sur les communautés.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}