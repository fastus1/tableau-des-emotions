import { ReactNode } from 'react';
import { useIframeHeight } from '../../hooks/useIframeHeight';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Sync iframe height with parent
  useIframeHeight();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary relative flex flex-col">
      {/* Subtle gradient overlay for depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />
      <main className="relative flex-1 max-w-2xl mx-auto px-5 py-8 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative py-6 border-t border-white/5 text-center">
        <p className="text-text-secondary text-sm mb-3">
          <a
            href="https://assets-v2.circle.so/61o9s1f6h32zhy7c3y6un3ecw703"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-link hover:text-brand-secondary transition-colors underline underline-offset-2"
          >
            Télécharger le tableau en version PDF
          </a>
        </p>
        <p className="text-text-muted text-xs">
          Basé sur les tableaux de régulation émotionnelle de{' '}
          <a
            href="https://communaute.avancersimplement.com/u/ce7b3989"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-link hover:text-brand-secondary transition-colors underline underline-offset-2"
          >
            Diane Lapensée
          </a>
        </p>
      </footer>
    </div>
  );
}
