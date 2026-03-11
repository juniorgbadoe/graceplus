import { motion } from "framer-motion";
import { Users, Briefcase, Image, Handshake, Star, TrendingUp, Activity, CheckCircle, AlertCircle, Clock, Building2 } from "lucide-react";
import { useStore } from "../../data/store";

const activities = [
  { icon: CheckCircle, text: "Nouveau service 'Assurance' ajouté", time: "Il y a 2h", color: "text-green-500" },
  { icon: Users, text: "Nouveau membre de l'équipe enregistré", time: "Il y a 4h", color: "text-blue-500" },
  { icon: Image, text: "3 nouvelles photos uploadées dans la médiathèque", time: "Il y a 1j", color: "text-purple-500" },
  { icon: Star, text: "Témoignage client validé", time: "Il y a 2j", color: "text-yellow-500" },
  { icon: Handshake, text: "Partenaire 'PNUD Togo' activé", time: "Il y a 3j", color: "text-green-500" },
  { icon: AlertCircle, text: "Contact mis à jour", time: "Il y a 5j", color: "text-orange-500" },
];

export default function AdminDashboard() {
  const { services, team, media, partners, testimonials, agencies } = useStore();

  const stats = [
    { label: "Total Clients", value: "+12 000", icon: Users, color: "from-green-500 to-emerald-600", bg: "bg-green-50" },
    { label: "Services actifs", value: services.filter((s) => s.active).length, icon: Briefcase, color: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
    { label: "Médias", value: media.length, icon: Image, color: "from-purple-500 to-violet-600", bg: "bg-purple-50" },
    { label: "Partenaires actifs", value: partners.filter((p) => p.active).length, icon: Handshake, color: "from-orange-500 to-amber-600", bg: "bg-orange-50" },
    { label: "Membres équipe", value: team.filter((m) => m.visible).length, icon: Users, color: "from-teal-500 to-cyan-600", bg: "bg-teal-50" },
    { label: "Témoignages actifs", value: testimonials.filter((t) => t.active).length, icon: Star, color: "from-yellow-500 to-amber-500", bg: "bg-yellow-50" },
    { label: "Agences actives", value: agencies.filter((a) => a.active).length, icon: Building2, color: "from-emerald-500 to-green-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Bonjour, Administrateur 👋</h2>
            <p className="text-green-100 text-sm">Voici un aperçu de votre tableau de bord COOPEC GRACE PLUS</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-semibold">Tout va bien</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <Activity className="w-4 h-4 text-gray-300" />
              </div>
              <p className="text-2xl font-extrabold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">Dernières activités</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {activities.map((activity, i) => {
            const Icon = activity.icon;
            return (
              <div key={i} className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors">
                <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{activity.text}</p>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
      >
        <h3 className="font-bold text-gray-800 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Ajouter service", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50 hover:bg-blue-100", href: "/admin/services" },
            { label: "Ajouter média", icon: Image, color: "text-purple-600", bg: "bg-purple-50 hover:bg-purple-100", href: "/admin/media" },
            { label: "Ajouter membre", icon: Users, color: "text-green-600", bg: "bg-green-50 hover:bg-green-100", href: "/admin/team" },
            { label: "Ajouter agence", icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50 hover:bg-emerald-100", href: "/admin/agences" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.label}
                href={action.href}
                className={`${action.bg} ${action.color} rounded-xl p-4 text-center flex flex-col items-center gap-2 transition-colors cursor-pointer`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-semibold">{action.label}</span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}