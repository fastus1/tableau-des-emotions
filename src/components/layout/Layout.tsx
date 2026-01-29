import { ReactNode } from 'react';
import { useIframeHeight } from '../../hooks/useIframeHeight';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Sync iframe height with parent
  useIframeHeight();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <main className="max-w-2xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
