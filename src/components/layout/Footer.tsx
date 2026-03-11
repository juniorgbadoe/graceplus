import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, MessageCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import logoImg from "../../assets/693317ecc3a78-logo-g-2.jpg";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Notre équipe", href: "/equipe" },
  { label: "Agences", href: "/agences" },
  { label: "Médiathèque", href: "/mediatheque" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Merci pour votre abonnement !", { description: "Vous recevrez nos actualités bientôt." });
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Contact */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logoImg} alt="COOPEC GRACE PLUS" className="h-14 w-auto bg-white rounded-xl p-1" />
              <div>
                <p className="text-green-400 font-bold">COOPEC</p>
                <p className="text-blue-400 font-bold">GRACE PLUS</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Votre partenaire financier de confiance au Togo. Ensemble, construisons votre avenir.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm">Avenue de la République, Lomé, Togo</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-sm">+228 22 12 34 56 / +228 90 12 34 56</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-sm">contact@coopecgraceplus.tg</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm">Lun - Ven : 08h00 - 17h00<br />Sam : 08h00 - 13h00</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Liens rapides</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover:scale-125 transition-transform" />
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors">
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Abonnez-vous pour recevoir nos dernières actualités, offres et conseils financiers directement dans votre boîte mail.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 text-sm transition-colors"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl text-sm font-semibold transition-all"
              >
                S'abonner
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} COOPEC GRACE PLUS. Tous droits réservés.
          </p>
          <p className="text-sm text-gray-500">
            Ensemble, prospérons ! 🌿
          </p>
        </div>
      </div>
    </footer>
  );
}
