import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6 min-h-[44px] min-w-[44px]"
      aria-label="Retour a l'accueil"
    >
      <ArrowLeft size={24} />
      <span className="text-sm font-medium">Retour</span>
    </button>
  );
}
