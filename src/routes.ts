import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Equipe from "./pages/Equipe";
import Agences from "./pages/Agences";
import Partenaires from "./pages/Partenaires";
import Mediatheque from "./pages/Mediatheque";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ServicesManager from "./pages/admin/ServicesManager";
import TeamManager from "./pages/admin/TeamManager";
import AgencesManager from "./pages/admin/AgencesManager";
import PartnersManager from "./pages/admin/PartnersManager";
import MediaManager from "./pages/admin/MediaManager";
import TestimonialsManager from "./pages/admin/TestimonialsManager";
import ContactManager from "./pages/admin/ContactManager";
import AdminSettings from "./pages/admin/AdminSettings";

export const router = createBrowserRouter([
  // Public site
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "equipe", Component: Equipe },
      { path: "agences", Component: Agences },
      { path: "partenaires", Component: Partenaires },
      { path: "mediatheque", Component: Mediatheque },
      { path: "contact", Component: Contact },
    ],
  },

  // Admin – login page (standalone, no header/footer)
  {
    path: "/admin",
    Component: AdminLogin,
  },

  // Admin – protected dashboard (separate from login)
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { path: "dashboard", Component: AdminDashboard },
      { path: "services", Component: ServicesManager },
      { path: "team", Component: TeamManager },
      { path: "agences", Component: AgencesManager },
      { path: "partners", Component: PartnersManager },
      { path: "media", Component: MediaManager },
      { path: "testimonials", Component: TestimonialsManager },
      { path: "contact", Component: ContactManager },
      { path: "settings", Component: AdminSettings },
    ],
  },
]);
