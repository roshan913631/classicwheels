import { Toaster } from "@/components/ui/sonner";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, login, clear, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleAuth = () => {
    if (isAuthenticated) {
      clear();
      queryClient.clear();
    } else {
      login();
    }
  };

  const navLinks = [
    { to: "/", label: "Inventory" },
    { to: "/admin", label: "Admin" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster position="top-right" richColors />
      {/* Header */}
      <header className="bg-card border-b-2 border-primary sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Brand */}
            <Link
              to="/"
              data-ocid="nav.logo_link"
              className="flex items-center gap-3 group shrink-0"
            >
              <div className="w-9 h-9 bg-primary flex items-center justify-center border-2 border-primary group-hover:bg-primary/90 transition-smooth">
                <span className="text-primary-foreground font-display font-bold text-lg leading-none">
                  C
                </span>
              </div>
              <span className="font-display font-bold text-foreground text-xl uppercase tracking-widest hidden sm:block">
                ClassicWheels
              </span>
            </Link>

            {/* Nav */}
            <nav
              className="flex items-center gap-1 sm:gap-2"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.${link.label.toLowerCase()}_link`}
                  className={`font-display font-bold uppercase tracking-widest text-xs sm:text-sm px-3 py-1.5 border-2 transition-smooth ${
                    currentPath === link.to
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-foreground border-transparent hover:border-primary hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth */}
            <button
              type="button"
              onClick={handleAuth}
              disabled={isInitializing || isLoggingIn}
              data-ocid="nav.auth_button"
              className="font-display font-bold uppercase tracking-widest text-xs sm:text-sm px-3 sm:px-4 py-1.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth disabled:opacity-50 shrink-0"
            >
              {isInitializing
                ? "Loading..."
                : isLoggingIn
                  ? "Signing in..."
                  : isAuthenticated
                    ? "Sign Out"
                    : "Admin Login"}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-accent text-accent-foreground border-t-2 border-primary mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="font-display font-bold text-accent-foreground text-xl uppercase tracking-widest mb-3">
                ClassicWheels
              </div>
              <p className="font-body text-sm text-accent-foreground/80 leading-relaxed">
                Purveyors of fine vintage automobiles since 1962. Every car
                handpicked, meticulously inspected, and ready for a new chapter.
              </p>
            </div>
            {/* Links */}
            <div>
              <div className="font-display font-bold uppercase tracking-widest text-xs mb-4 text-accent-foreground/60">
                Navigation
              </div>
              <nav
                className="flex flex-col gap-2"
                aria-label="Footer navigation"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    data-ocid={`footer.${link.label.toLowerCase()}_link`}
                    className="font-body text-sm text-accent-foreground/80 hover:text-accent-foreground transition-smooth"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            {/* Contact */}
            <div>
              <div className="font-display font-bold uppercase tracking-widest text-xs mb-4 text-accent-foreground/60">
                Contact
              </div>
              <address className="not-italic font-body text-sm text-accent-foreground/80 leading-relaxed">
                <p>123 Motor Mile Boulevard</p>
                <p>Detroit, Michigan 48201</p>
                <p className="mt-2">info@classicwheels.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-primary/30 mt-8 pt-6 flex items-center justify-between flex-wrap gap-2">
            <p className="font-body text-xs text-accent-foreground/60">
              © {new Date().getFullYear()} ClassicWheels. All rights reserved.
            </p>
            <p className="font-body text-xs text-accent-foreground/60">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent-foreground transition-smooth"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
