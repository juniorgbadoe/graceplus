import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet, Navigate } from "react-router-dom";
import {
  LayoutDashboard, Settings, Users, Image, Star, MapPin, Handshake,
  Briefcase, LogOut, Bell, ChevronLeft, ChevronRight, Menu, X, Building2
} from "lucide-react";
import { useStore } from "../../data/store";
import logoImg from "../../assets/693317ecc3a78-logo-g-2.jpg";

const navItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/services", icon: Briefcase, label: "Services" },
  { path: "/admin/team", icon: Users, label: "Équipe" },
  { path: "/admin/agences", icon: Building2, label: "Agences" },
  { path: "/admin/partners", icon: Handshake, label: "Partenaires" },
  { path: "/admin/media", icon: Image, label: "Médiathèque" },
  { path: "/admin/testimonials", icon: Star, label: "Témoignages" },
  { path: "/admin/contact", icon: MapPin, label: "Localisation & Contact" },
  { path: "/admin/settings", icon: Settings, label: "Paramètres" },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsAdminLoggedIn, isAdminLoggedIn } = useStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Redirect if not logged in
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    navigate("/admin");
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-gray-100 ${collapsed ? "justify-center" : ""}`}>
        <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain shrink-0" />
        {!collapsed && (
          <div>
            <p className="text-green-700 font-bold text-xs leading-tight">COOPEC</p>
            <p className="text-blue-600 font-bold text-xs leading-tight">GRACE PLUS</p>
            <p className="text-gray-400 text-[10px]">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle (desktop) */}
      <div className="hidden md:block p-3 border-t border-gray-100">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-xl text-sm transition-all ${collapsed ? "justify-center" : ""}`}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Réduire</span></>}
        </button>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-all ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)} />
          <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl z-50 md:hidden flex flex-col">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-semibold text-gray-800 text-sm sm:text-base">
              {navItems.find((n) => n.path === location.pathname)?.label || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">Administrateur</p>
                <p className="text-xs text-gray-500">admin@coopecgraceplus.tg</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}