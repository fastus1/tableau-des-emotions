import { ReactNode } from 'react';
import { useIframeHeight } from '../../hooks/useIframeHeight';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Sync iframe height with parent
  useIframeHeight();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary relative">
      {/* Subtle gradient overlay for depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />
      <main className="relative max-w-2xl mx-auto px-5 py-8">
        {children}
      </main>
    </div>
  );
}
