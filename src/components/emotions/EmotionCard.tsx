import type { LucideIcon } from 'lucide-react';

interface EmotionCardProps {
  name: string;
  keywords: [string, string, string];
  color: string;      // e.g. 'bg-red'
  textColor: string;  // e.g. 'text-white'
  icon: LucideIcon;
  onClick: () => void;
}

export function EmotionCard({ name, keywords, color, textColor, icon: Icon, onClick }: EmotionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-6 rounded-2xl text-left
        ${color} ${textColor}
        shadow-md hover:shadow-xl
        transition-shadow duration-200
        focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-bg-primary
        min-h-[140px]
      `}
    >
      <Icon size={32} className="mb-3" />
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-sm opacity-90">
        {keywords.join(' \u00b7 ')}
      </p>
    </button>
  );
}
