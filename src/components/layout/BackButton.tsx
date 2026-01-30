import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2.5 text-text-secondary hover:text-text-primary transition-all duration-200 mb-8 min-h-[44px] px-3 py-2 -ml-3 rounded-xl hover:bg-white/5"
      aria-label="Retour à l'accueil"
    >
      <ArrowLeft size={20} className="transition-transform duration-200 group-hover:-translate-x-1" />
      <span className="text-sm font-medium">Retour</span>
    </button>
  );
}
