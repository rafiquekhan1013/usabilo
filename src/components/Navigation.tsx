import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Eye, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useActiveSection } from "../hooks/useActiveSection";
import { storageService } from "../services/storage.service";

type NavItem = {
  id: string;
  label: string;
  path?: string;
  isActiveStudies?: boolean;
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRefDesktop = useRef<HTMLDivElement>(null);
  const profileRefMobile = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { isAuthenticated, baSlug } = useAuth();
  const { activeSection } = useActiveSection();

  const activeStudiesPath = baSlug ? `/${baSlug}` : "/studies";

  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "how-it-works", label: "How It Works" },
    { id: "capabilities", label: "Capabilities" },
    { id: "methodology", label: "Methodology" },
    { id: "get-involved", label: "Get Involved" },
    { id: "about", label: "About" },
    {
      id: "activestudy",
      label: "Active Studies",
      path: activeStudiesPath,
      isActiveStudies: true,
    },
    { id: "survey", label: "Survey", path: "/survey" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = profileRefDesktop.current?.contains(target);
      const insideMobile = profileRefMobile.current?.contains(target);
      if (!insideDesktop && !insideMobile) setProfileOpen(false);
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const isHome = location.pathname === "/";

  const getItemHref = (item: NavItem) => {
    if (item.path) return item.path;
    return item.id === "home" ? "/" : `/#${item.id}`;
  };

  const isItemActive = (item: NavItem) => {
    if (item.isActiveStudies) {
      return (
        location.pathname === "/studies" ||
        (baSlug != null && location.pathname === `/${baSlug}`)
      );
    }
    if (item.path) {
      return (
        location.pathname === item.path ||
        location.pathname.startsWith(`${item.path}/`)
      );
    }
    if (!isHome) return item.id === "home" && location.pathname === "/";
    return activeSection === item.id;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    if (isHome && item.id !== "home" && !item.path) {
      e.preventDefault();
      scrollToSection(item.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-orange-500 rounded-lg group-hover:bg-orange-600 transition-colors">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">USABILO</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={getItemHref(item)}
                onClick={(e) => handleNavClick(e, item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isItemActive(item)
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated && (
              <div className="relative ml-2" ref={profileRefDesktop}>
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="p-2 text-gray-700 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                  aria-label="Profile"
                >
                  <User className="w-5 h-5" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-xl border border-gray-200 shadow-lg z-50">
                    <Link
                      to="/account"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <User className="w-4 h-4" /> Account
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        storageService.resetAuthData();
                        setProfileOpen(false);
                        window.location.href = "/";
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            {isAuthenticated && (
              <div className="relative" ref={profileRefMobile}>
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="p-2 text-gray-700 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                  aria-label="Profile"
                >
                  <User className="w-5 h-5" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-xl border border-gray-200 shadow-lg z-50">
                    <Link
                      to="/account"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <User className="w-4 h-4" /> Account
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        storageService.resetAuthData();
                        setProfileOpen(false);
                        window.location.href = "/";
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-orange-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={getItemHref(item)}
                onClick={(e) => handleNavClick(e, item)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isItemActive(item)
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                >
                  <User className="w-4 h-4" /> Account
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    storageService.resetAuthData();
                    setMobileMenuOpen(false);
                    window.location.href = "/";
                  }}
                  className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
