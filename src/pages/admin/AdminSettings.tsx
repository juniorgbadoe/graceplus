import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Bell, Globe, Palette, Save, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, browser: false });
  const [siteName, setSiteName] = useState("COOPEC GRACE PLUS");
  const [language, setLanguage] = useState("fr");

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { toast.error("Les mots de passe ne correspondent pas."); return; }
    if (newPassword.length < 6) { toast.error("Le mot de passe doit contenir au moins 6 caractères."); return; }
    toast.success("Mot de passe mis à jour !");
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Paramètres</h2>
        <p className="text-sm text-gray-500">Configurez les paramètres de votre espace administrateur</p>
      </div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
          <Lock className="w-5 h-5 text-green-600" /> Sécurité
        </h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Mot de passe actuel</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 pr-11" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Nouveau mot de passe</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="••••••••" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Confirmer le mot de passe</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" placeholder="••••••••" />
          </div>
          <button type="submit" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            <Save className="w-4 h-4" /> Mettre à jour le mot de passe
          </button>
        </form>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
          <Bell className="w-5 h-5 text-green-600" /> Notifications
        </h3>
        <div className="space-y-4">
          {[
            { key: "email", label: "Notifications par email", desc: "Recevez des alertes par email pour les nouvelles activités" },
            { key: "browser", label: "Notifications navigateur", desc: "Activez les notifications push dans votre navigateur" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-800 text-sm">{label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                className={`relative w-12 h-6 rounded-full transition-colors ${notifications[key as keyof typeof notifications] ? "bg-green-500" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications[key as keyof typeof notifications] ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* General */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
          <Globe className="w-5 h-5 text-green-600" /> Paramètres généraux
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Nom du site</label>
            <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Langue</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 bg-white">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        <button
          onClick={() => toast.success("Paramètres généraux enregistrés !")}
          className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Save className="w-4 h-4" /> Enregistrer
        </button>
      </motion.div>
    </div>
  );
}
