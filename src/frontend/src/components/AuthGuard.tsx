import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useIsAdmin } from "../hooks/useInquiries";
import LoadingSpinner from "./ui/LoadingSpinner";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitializing, login, isLoggingIn } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();

  if (isInitializing || (isAuthenticated && adminLoading)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div
          className="bg-card border-2 border-primary p-10 max-w-md w-full text-center"
          data-ocid="auth_guard.panel"
        >
          <div className="text-4xl mb-4">🔑</div>
          <h1 className="font-display text-2xl font-bold text-foreground uppercase tracking-widest mb-3">
            Admin Access Required
          </h1>
          <p className="text-muted-foreground font-body mb-8 leading-relaxed">
            Sign in with Internet Identity to access the admin dashboard and
            manage inquiries.
          </p>
          <button
            type="button"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="auth_guard.login_button"
            className="w-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest py-3 px-6 border-2 border-primary hover:bg-primary/90 transition-smooth disabled:opacity-50"
          >
            {isLoggingIn ? "Connecting..." : "Login with Internet Identity"}
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div
          className="bg-card border-2 border-primary p-10 max-w-md w-full text-center"
          data-ocid="auth_guard.denied_panel"
        >
          <div className="text-4xl mb-4">🚫</div>
          <h1 className="font-display text-2xl font-bold text-foreground uppercase tracking-widest mb-3">
            Access Denied
          </h1>
          <p className="text-muted-foreground font-body mb-4 leading-relaxed">
            Your account does not have admin privileges. Contact the site owner
            to request access.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
