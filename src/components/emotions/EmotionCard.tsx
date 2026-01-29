import type { LucideIcon } from 'lucide-react';

interface EmotionCardProps {
  name: string;
  keywords: [string, string, string];
  color: string;      // e.g. 'bg-red'
  textColor: string;  // e.g. 'text-white'
  icon: LucideIcon;
  onClick: () => void;
}

// Map color classes to hover gradient classes
const colorToHoverGradient: Record<string, string> = {
  'bg-red': 'group-hover:from-red group-hover:to-red/80',
  'bg-orange': 'group-hover:from-orange group-hover:to-orange/80',
  'bg-brand-primary': 'group-hover:from-brand-primary group-hover:to-brand-primary/80',
  'bg-green': 'group-hover:from-green group-hover:to-green/80',
  'bg-purple': 'group-hover:from-purple group-hover:to-purple/80',
  'bg-yellow': 'group-hover:from-yellow group-hover:to-yellow/80',
  'bg-taupe': 'group-hover:from-taupe group-hover:to-taupe/80',
  'bg-mint': 'group-hover:from-mint group-hover:to-mint/80',
};

// Map color classes to glow classes
const colorToGlow: Record<string, string> = {
  'bg-red': 'hover:shadow-[0_8px_30px_-4px_rgba(239,68,68,0.5)]',
  'bg-orange': 'hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.5)]',
  'bg-brand-primary': 'hover:shadow-[0_8px_30px_-4px_rgba(59,130,246,0.5)]',
  'bg-green': 'hover:shadow-[0_8px_30px_-4px_rgba(34,197,94,0.5)]',
  'bg-purple': 'hover:shadow-[0_8px_30px_-4px_rgba(139,92,246,0.5)]',
  'bg-yellow': 'hover:shadow-[0_8px_30px_-4px_rgba(245,158,11,0.5)]',
  'bg-taupe': 'hover:shadow-[0_8px_30px_-4px_rgba(168,153,138,0.5)]',
  'bg-mint': 'hover:shadow-[0_8px_30px_-4px_rgba(45,212,191,0.5)]',
};

// Map color classes to icon accent color on default state
const colorToAccent: Record<string, string> = {
  'bg-red': 'text-red',
  'bg-orange': 'text-orange',
  'bg-brand-primary': 'text-brand-primary',
  'bg-green': 'text-green',
  'bg-purple': 'text-purple',
  'bg-yellow': 'text-yellow',
  'bg-taupe': 'text-taupe',
  'bg-mint': 'text-mint',
};

// Map color classes to icon background on default state
const colorToIconBg: Record<string, string> = {
  'bg-red': 'bg-red/15',
  'bg-orange': 'bg-orange/15',
  'bg-brand-primary': 'bg-brand-primary/15',
  'bg-green': 'bg-green/15',
  'bg-purple': 'bg-purple/15',
  'bg-yellow': 'bg-yellow/15',
  'bg-taupe': 'bg-taupe/15',
  'bg-mint': 'bg-mint/15',
};

export function EmotionCard({ name, keywords, color, icon: Icon, onClick }: EmotionCardProps) {
  const hoverGradient = colorToHoverGradient[color] || '';
  const glowClass = colorToGlow[color] || '';
  const accentColor = colorToAccent[color] || 'text-brand-primary';
  const iconBg = colorToIconBg[color] || 'bg-brand-primary/15';

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full p-5 rounded-2xl text-left overflow-hidden
        bg-bg-secondary
        bg-gradient-to-br from-bg-secondary to-bg-secondary
        ${hoverGradient}
        text-text-primary
        shadow-card border-2 border-brand-primary/30
        transition-all duration-300 ease-out
        hover:translate-y-[-3px] hover:border-white/30
        ${glowClass}
        active:scale-[0.98]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
        min-h-[150px]
      `}
    >
      {/* Gradient overlay for depth - visible on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Background icon watermark */}
      <Icon
        size={80}
        className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-15 transition-all duration-300 group-hover:scale-110"
        strokeWidth={1}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative">
        {/* Icon in circle */}
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${iconBg} group-hover:bg-white/20 mb-4 transition-all duration-300 group-hover:scale-105`}>
          <Icon size={24} strokeWidth={2} className={`${accentColor} group-hover:text-white transition-colors duration-300`} />
        </div>

        <h3 className="text-lg font-bold mb-2 text-text-primary group-hover:text-white transition-colors duration-300">
          {name}
        </h3>

        <p className="text-sm text-text-secondary group-hover:text-white/80 leading-relaxed transition-colors duration-300">
          {keywords.join(' · ')}
        </p>
      </div>
    </button>
  );
}
