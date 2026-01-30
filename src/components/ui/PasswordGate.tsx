import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

const ALLOWED_ORIGIN = 'https://communaute.avancersimplement.com';
const PASSWORD = '074491';

function isAllowedOrigin(): boolean {
  try {
    // Check if we're in an iframe
    const isInIframe = window.parent !== window;

    // Check referrer first (works in most cases)
    const referrer = document.referrer || '';
    if (referrer.startsWith(ALLOWED_ORIGIN)) {
      return true;
    }

    // In iframe - try to check ancestor origins (Chrome only)
    if (isInIframe && window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0) {
      const origins = Array.from(window.location.ancestorOrigins);
      if (origins.some(origin => origin === ALLOWED_ORIGIN)) {
        return true;
      }
    }

    // If in iframe but can't determine origin, allow access
    // (better UX than blocking legitimate users)
    if (isInIframe && !referrer) {
      return true;
    }

    return false;
  } catch {
    // If any error occurs, allow access in iframe context
    return window.parent !== window;
  }
}

function getSessionAuth(): boolean {
  try {
    return sessionStorage.getItem('app_authorized') === 'true';
  } catch {
    // sessionStorage blocked (third-party iframe)
    return false;
  }
}

function setSessionAuth(): void {
  try {
    sessionStorage.setItem('app_authorized', 'true');
  } catch {
    // Ignore if blocked
  }
}

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if already authorized in session
    if (getSessionAuth()) {
      setIsAuthorized(true);
      return;
    }

    // Check origin
    setIsAuthorized(isAllowedOrigin());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setSessionAuth();
      setIsAuthorized(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  // Still checking
  if (isAuthorized === null) {
    return null;
  }

  // Authorized - show app
  if (isAuthorized) {
    return <>{children}</>;
  }

  // Not authorized - show password modal
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-bg-secondary rounded-2xl p-8 border border-white/10 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center">
            <Lock className="w-8 h-8 text-brand-primary" />
          </div>
        </div>

        <h1 className="text-xl font-bold text-text-primary text-center mb-2">
          Accès restreint
        </h1>
        <p className="text-text-secondary text-sm text-center mb-6">
          Cette application est réservée aux membres de la communauté.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className={`
              w-full px-4 py-3 rounded-xl bg-bg-primary border-2
              text-text-primary placeholder:text-text-muted
              focus:outline-none focus:border-brand-primary
              transition-colors
              ${error ? 'border-red' : 'border-white/10'}
            `}
            autoFocus
          />
          {error && (
            <p className="text-red text-sm mt-2">
              Mot de passe incorrect
            </p>
          )}
          <button
            type="submit"
            className="w-full mt-4 px-4 py-3 rounded-xl bg-brand-primary text-white font-semibold
              hover:bg-brand-secondary transition-colors
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
          >
            Accéder
          </button>
        </form>
      </div>
    </div>
  );
}
