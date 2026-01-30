import { ChevronLeft, X } from 'lucide-react';

interface PanelHeaderProps {
  title: string;
  onClose: () => void;
  onBack?: () => void; // Optional - shows back arrow when present
  color?: string; // Background color class for accent (unused now, kept for API compat)
}

export function PanelHeader({
  title,
  onClose,
  onBack,
}: PanelHeaderProps) {
  return (
    <div
      className="sticky top-0 z-10 pt-3 pb-1"
      style={{
        background: 'linear-gradient(180deg, rgba(30, 33, 40, 1) 0%, rgba(30, 33, 40, 0.95) 80%, transparent 100%)',
      }}
    >
      {/* Drag handle indicator */}
      <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4 hover:bg-white/30 transition-colors cursor-grab" />

      {/* Header row */}
      <div className="flex items-center px-5 pb-4 border-b border-white/5">
        {/* Back button (optional) */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Retour"
            className="p-2 -ml-2 mr-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ChevronLeft size={22} className="text-text-secondary" />
          </button>
        )}

        {/* Title */}
        <h2 className="flex-1 text-xl font-bold text-text-primary">
          {title}
        </h2>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          autoFocus={!onBack}
          className="p-2 -mr-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <X size={22} className="text-text-secondary" />
        </button>
      </div>
    </div>
  );
}
