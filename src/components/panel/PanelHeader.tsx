import { ChevronLeft, X } from 'lucide-react';

interface PanelHeaderProps {
  title: string;
  onClose: () => void;
  onBack?: () => void; // Optional - shows back arrow when present
  color?: string; // Background color class for accent
}

export function PanelHeader({
  title,
  onClose,
  onBack,
  color = 'bg-bg-secondary',
}: PanelHeaderProps) {
  return (
    <div className={`sticky top-0 ${color} z-10 pt-2`}>
      {/* Drag handle indicator */}
      <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-2" />

      {/* Header row */}
      <div className="flex items-center px-4 py-3 border-b border-white/10">
        {/* Back button (optional) */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Retour"
            className="p-2 -ml-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-bg-secondary min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Title */}
        <h2 className="flex-1 text-lg font-semibold text-text-primary">
          {title}
        </h2>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          autoFocus={!onBack}
          className="p-2 -mr-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-bg-secondary min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
