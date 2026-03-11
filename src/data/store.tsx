import React, { createContext, useContext, useState, type ReactNode } from "react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  active: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  linkedin?: string;
  email?: string;
  order: number;
  visible: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: "banque" | "institution" | "ong";
  website?: string;
  active: boolean;
}

export interface MediaItem {
  id: string;
  url: string;
  title: string;
  category: "evenements" | "projets" | "communaute";
  thumbnail?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  photo: string;
  rating: number;
  text: string;
  active: boolean;
}

export interface ContactInfo {
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  hours: string;
  lat: number;
  lng: number;
}

export interface Agency {
  id: string;
  name: string;
  isMain: boolean;
  address: string;
  city: string;
  phone1: string;
  phone2?: string;
  email?: string;
  hours: string;
  photo: string;
  lat: number;
  lng: number;
  description?: string;
  active: boolean;
}

interface AppStore {
  services: Service[];
  setServices: (s: Service[]) => void;
  team: TeamMember[];
  setTeam: (t: TeamMember[]) => void;
  partners: Partner[];
  setPartners: (p: Partner[]) => void;
  media: MediaItem[];
  setMedia: (m: MediaItem[]) => void;
  testimonials: Testimonial[];
  setTestimonials: (t: Testimonial[]) => void;
  contactInfo: ContactInfo;
  setContactInfo: (c: ContactInfo) => void;
  agencies: Agency[];
  setAgencies: (a: Agency[]) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (v: boolean) => void;
}

const defaultServices: Service[] = [
  { id: "1", title: "Épargne", description: "Des comptes sécurisés pour faire grandir vos économies et préparer votre avenir.", icon: "PiggyBank", category: "financier", active: true },
  { id: "2", title: "Crédit", description: "Des prêts adaptés à vos besoins personnels ou professionnels à taux avantageux.", icon: "CreditCard", category: "financier", active: true },
  { id: "3", title: "Transfert d'argent", description: "Local et international, simple et rapide. Envoyez de l'argent partout dans le monde.", icon: "Send", category: "transfert", active: true },
  { id: "4", title: "Dépôts", description: "Dépôts sécurisés au guichet et mobile. Gérez vos fonds en toute sécurité.", icon: "Landmark", category: "financier", active: true },
  { id: "5", title: "Assistance financière", description: "Conseils personnalisés pour vos projets entrepreneuriaux et familiaux.", icon: "HeartHandshake", category: "conseil", active: true },
  { id: "6", title: "Assurance", description: "Des produits d'assurance adaptés pour protéger vous et votre famille.", icon: "Shield", category: "assurance", active: true },
];

const defaultTeam: TeamMember[] = [
  { id: "1", name: "Kofi Mensah", position: "Directeur Général", bio: "Expert en microfinance avec plus de 15 ans d'expérience dans le secteur financier africain.", photo: "https://images.unsplash.com/photo-1770191954675-06f770e6cbd0?w=400&h=400&fit=crop", linkedin: "#", email: "k.mensah@coopecgraceplus.tg", order: 1, visible: true },
  { id: "2", name: "Ama Koffi", position: "Directrice des Opérations", bio: "Spécialiste en gestion des opérations bancaires et inclusion financière communautaire.", photo: "https://images.unsplash.com/photo-1737599819881-df2553a821ad?w=400&h=400&fit=crop", linkedin: "#", email: "a.koffi@coopecgraceplus.tg", order: 2, visible: true },
  { id: "3", name: "Kwame Adjovi", position: "Responsable Crédit", bio: "Analyste crédit senior avec une expertise dans l'accompagnement des PME et entrepreneurs.", photo: "https://images.unsplash.com/photo-1738750908048-14200459c3c9?w=400&h=400&fit=crop", linkedin: "#", email: "k.adjovi@coopecgraceplus.tg", order: 3, visible: true },
  { id: "4", name: "Akosua Tetteh", position: "Chargée de la Communication", bio: "Passionnée par la promotion des valeurs coopératives et l'engagement communautaire.", photo: "https://images.unsplash.com/photo-1758611972971-1c8b9c6d7822?w=400&h=400&fit=crop", linkedin: "#", email: "a.tetteh@coopecgraceplus.tg", order: 4, visible: true },
  { id: "5", name: "Edem Sokpoh", position: "Responsable IT", bio: "Expert en systèmes d'information financiers et sécurité numérique pour les institutions bancaires.", photo: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?w=400&h=400&fit=crop", linkedin: "#", email: "e.sokpoh@coopecgraceplus.tg", order: 5, visible: true },
  { id: "6", name: "Fatou Diallo", position: "Conseillère Clientèle Senior", bio: "Dédiée à l'accompagnement des membres avec empathie et professionnalisme.", photo: "https://images.unsplash.com/photo-1646457414979-fda326f5c85e?w=400&h=400&fit=crop", linkedin: "#", email: "f.diallo@coopecgraceplus.tg", order: 6, visible: true },
];

const defaultPartners: Partner[] = [
  { id: "1", name: "BCEAO", logo: "https://via.placeholder.com/160x80/16a34a/ffffff?text=BCEAO", category: "banque", website: "#", active: true },
  { id: "2", name: "Ecobank", logo: "https://via.placeholder.com/160x80/2563eb/ffffff?text=Ecobank", category: "banque", website: "#", active: true },
  { id: "3", name: "UNCDF", logo: "https://via.placeholder.com/160x80/0369a1/ffffff?text=UNCDF", category: "institution", website: "#", active: true },
  { id: "4", name: "IFC", logo: "https://via.placeholder.com/160x80/7c3aed/ffffff?text=IFC", category: "institution", website: "#", active: true },
  { id: "5", name: "OXFAM", logo: "https://via.placeholder.com/160x80/dc2626/ffffff?text=OXFAM", category: "ong", website: "#", active: true },
  { id: "6", name: "CARE International", logo: "https://via.placeholder.com/160x80/d97706/ffffff?text=CARE", category: "ong", website: "#", active: true },
  { id: "7", name: "UTB", logo: "https://via.placeholder.com/160x80/16a34a/ffffff?text=UTB", category: "banque", website: "#", active: true },
  { id: "8", name: "PNUD Togo", logo: "https://via.placeholder.com/160x80/0891b2/ffffff?text=PNUD", category: "ong", website: "#", active: true },
];

const defaultMedia: MediaItem[] = [
  { id: "1", url: "https://images.unsplash.com/photo-1766407354000-54a7129f7140?w=800&h=600&fit=crop", title: "Cérémonie annuelle 2024", category: "evenements", thumbnail: "https://images.unsplash.com/photo-1766407354000-54a7129f7140?w=400&h=300&fit=crop" },
  { id: "2", url: "https://images.unsplash.com/photo-1655682597128-2b10c079cf83?w=800&h=600&fit=crop", title: "Marché des femmes entrepreneures", category: "communaute", thumbnail: "https://images.unsplash.com/photo-1655682597128-2b10c079cf83?w=400&h=300&fit=crop" },
  { id: "3", url: "https://images.unsplash.com/photo-1743871718848-7206ee48f7e5?w=800&h=600&fit=crop", title: "Formation crédit agricole", category: "projets", thumbnail: "https://images.unsplash.com/photo-1743871718848-7206ee48f7e5?w=400&h=300&fit=crop" },
  { id: "4", url: "https://images.unsplash.com/photo-1747774999070-ef45a60c9d00?w=800&h=600&fit=crop", title: "Projet d'autonomisation rurale", category: "projets", thumbnail: "https://images.unsplash.com/photo-1747774999070-ef45a60c9d00?w=400&h=300&fit=crop" },
  { id: "5", url: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?w=800&h=600&fit=crop", title: "Réunion d'équipe mensuelle", category: "evenements", thumbnail: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?w=400&h=300&fit=crop" },
  { id: "6", url: "https://images.unsplash.com/photo-1646457414979-fda326f5c85e?w=800&h=600&fit=crop", title: "Remise de microcrédits", category: "communaute", thumbnail: "https://images.unsplash.com/photo-1646457414979-fda326f5c85e?w=400&h=300&fit=crop" },
  { id: "7", url: "https://images.unsplash.com/photo-1737599819881-df2553a821ad?w=800&h=600&fit=crop", title: "Atelier entrepreneuriat féminin", category: "projets", thumbnail: "https://images.unsplash.com/photo-1737599819881-df2553a821ad?w=400&h=300&fit=crop" },
  { id: "8", url: "https://images.unsplash.com/photo-1770191954675-06f770e6cbd0?w=800&h=600&fit=crop", title: "Forum des coopératives 2024", category: "evenements", thumbnail: "https://images.unsplash.com/photo-1770191954675-06f770e6cbd0?w=400&h=300&fit=crop" },
  { id: "9", url: "https://images.unsplash.com/photo-1758611972971-1c8b9c6d7822?w=800&h=600&fit=crop", title: "Journée communauté solidaire", category: "communaute", thumbnail: "https://images.unsplash.com/photo-1758611972971-1c8b9c6d7822?w=400&h=300&fit=crop" },
];

const defaultTestimonials: Testimonial[] = [
  { id: "1", clientName: "Marie Amégah", photo: "https://images.unsplash.com/photo-1737599819881-df2553a821ad?w=200&h=200&fit=crop", rating: 5, text: "Grâce au crédit de COOPEC GRACE PLUS, j'ai pu agrandir mon commerce de tissu. Aujourd'hui, j'emploie 3 personnes. Merci pour votre confiance !", active: true },
  { id: "2", clientName: "Koffi Agbenyo", photo: "https://images.unsplash.com/photo-1770191954675-06f770e6cbd0?w=200&h=200&fit=crop", rating: 5, text: "Le service d'épargne m'a permis de financer les études de mes enfants. Le personnel est toujours disponible et bienveillant.", active: true },
  { id: "3", clientName: "Abla Nuworsu", photo: "https://images.unsplash.com/photo-1646457414979-fda326f5c85e?w=200&h=200&fit=crop", rating: 5, text: "Les transferts d'argent sont rapides et sécurisés. Je recommande COOPEC GRACE PLUS à toute ma famille et mes amis !", active: true },
  { id: "4", clientName: "Yao Komla", photo: "https://images.unsplash.com/photo-1738750908048-14200459c3c9?w=200&h=200&fit=crop", rating: 4, text: "L'accompagnement pour mon projet agricole a été exceptionnel. Des conseils pertinents et un suivi régulier.", active: true },
  { id: "5", clientName: "Afi Dovi", photo: "https://images.unsplash.com/photo-1758611972971-1c8b9c6d7822?w=200&h=200&fit=crop", rating: 5, text: "Une institution qui comprend vraiment les besoins des femmes entrepreneures. Je suis fière d'être membre depuis 5 ans.", active: true },
];

const defaultContactInfo: ContactInfo = {
  address: "Avenue de la République, Lomé, Togo",
  phone1: "+228 22 12 34 56",
  phone2: "+228 90 12 34 56",
  email: "contact@coopecgraceplus.tg",
  hours: "Lun - Ven : 08h00 - 17h00 | Sam : 08h00 - 13h00",
  lat: 6.1375,
  lng: 1.2123,
};

const defaultAgencies: Agency[] = [
  {
    id: "1",
    name: "Agence Principale – Lomé Centre",
    isMain: true,
    address: "Avenue de la République, Quartier Bè, Face Pharmacie du Peuple",
    city: "Lomé",
    phone1: "+228 22 12 34 56",
    phone2: "+228 90 12 34 56",
    email: "principal@coopecgraceplus.tg",
    hours: "Lun – Ven : 08h00 – 17h00 | Sam : 08h00 – 13h00",
    photo: "https://images.unsplash.com/photo-1734868198180-645349d586f4?w=800&h=500&fit=crop",
    lat: 6.1375,
    lng: 1.2123,
    description: "Siège social et agence principale de COOPEC GRACE PLUS. Tous nos services sont disponibles dans un cadre moderne et accueillant.",
    active: true,
  },
  {
    id: "2",
    name: "Agence Bè",
    isMain: false,
    address: "Quartier Bè-Kpota, Rue des Coopératives, N°12",
    city: "Lomé",
    phone1: "+228 22 34 56 78",
    phone2: "+228 91 23 45 67",
    email: "be@coopecgraceplus.tg",
    hours: "Lun – Ven : 08h00 – 17h00 | Sam : 08h00 – 13h00",
    photo: "https://images.unsplash.com/photo-1745725427330-e2697d558a49?w=800&h=500&fit=crop",
    lat: 6.1258,
    lng: 1.2200,
    description: "Agence dédiée aux habitants du quartier Bè et des environs. Épargne, crédit et transferts disponibles.",
    active: true,
  },
  {
    id: "3",
    name: "Agence Adidogomé",
    isMain: false,
    address: "Carrefour Adidogomé, Non loin du Marché central",
    city: "Lomé",
    phone1: "+228 22 56 78 90",
    phone2: undefined,
    email: "adidogome@coopecgraceplus.tg",
    hours: "Lun – Ven : 08h00 – 17h00 | Sam : 08h00 – 12h00",
    photo: "https://images.unsplash.com/photo-1763645440106-b235d3df37e5?w=800&h=500&fit=crop",
    lat: 6.1520,
    lng: 1.1750,
    description: "Agence au service de la communauté d'Adidogomé et des quartiers environnants.",
    active: true,
  },
  {
    id: "4",
    name: "Agence Agoé",
    isMain: false,
    address: "Boulevard du 13 Janvier, Quartier Agoé Nyivé",
    city: "Lomé",
    phone1: "+228 22 78 90 12",
    phone2: "+228 92 34 56 78",
    email: "agoe@coopecgraceplus.tg",
    hours: "Lun – Ven : 08h30 – 17h00 | Sam : 08h00 – 13h00",
    photo: "https://images.unsplash.com/photo-1611255801626-01ebb701d2df?w=800&h=500&fit=crop",
    lat: 6.1900,
    lng: 1.2050,
    description: "Agence d'Agoé au service des entrepreneurs et familles du nord de Lomé.",
    active: true,
  },
  {
    id: "5",
    name: "Agence Kpalimé",
    isMain: false,
    address: "Avenue de la Paix, Quartier Commercial, Kpalimé",
    city: "Kpalimé",
    phone1: "+228 23 10 20 30",
    phone2: undefined,
    email: "kpalime@coopecgraceplus.tg",
    hours: "Lun – Ven : 08h00 – 17h00 | Sam : 08h00 – 13h00",
    photo: "https://images.unsplash.com/photo-1746171114403-f4c4877b1f04?w=800&h=500&fit=crop",
    lat: 6.9000,
    lng: 0.6333,
    description: "Agence de Kpalimé au cœur de la région des plateaux pour accompagner les producteurs et commerçants locaux.",
    active: true,
  },
  {
    id: "6",
    name: "Agence Atakpamé",
    isMain: false,
    address: "Rue du Commerce, Centre-ville d'Atakpamé",
    city: "Atakpamé",
    phone1: "+228 24 11 22 33",
    phone2: undefined,
    email: "atakpame@coopecgraceplus.tg",
    hours: "Lun – Ven : 08h00 – 17h00 | Sam : 08h00 – 12h00",
    photo: "https://images.unsplash.com/photo-1662958570149-4875c1b4d485?w=800&h=500&fit=crop",
    lat: 7.5333,
    lng: 1.1333,
    description: "Agence d'Atakpamé pour les populations de la région des Plateaux centre.",
    active: true,
  },
];

const StoreContext = createContext<AppStore | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [team, setTeam] = useState<TeamMember[]>(defaultTeam);
  const [partners, setPartners] = useState<Partner[]>(defaultPartners);
  const [media, setMedia] = useState<MediaItem[]>(defaultMedia);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [agencies, setAgencies] = useState<Agency[]>(defaultAgencies);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <StoreContext.Provider value={{
      services, setServices,
      team, setTeam,
      partners, setPartners,
      media, setMedia,
      testimonials, setTestimonials,
      contactInfo, setContactInfo,
      agencies, setAgencies,
      isAdminLoggedIn, setIsAdminLoggedIn,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
