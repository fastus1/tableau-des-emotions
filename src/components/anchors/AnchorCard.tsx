import type { LucideIcon } from 'lucide-react';
import { Quote } from 'lucide-react';

interface AnchorCardProps {
  emotionName: string;
  phrases: string[];
  color: string;
  textColor: string;
  icon: LucideIcon;
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
  'bg-magenta': 'group-hover:from-magenta group-hover:to-magenta/80',
  'bg-cyan': 'group-hover:from-cyan group-hover:to-cyan/80',
  'bg-slate': 'group-hover:from-slate group-hover:to-slate/80',
  'bg-indigo': 'group-hover:from-indigo group-hover:to-indigo/80',
};

// Map color classes to glow classes
const colorToGlow: Record<string, string> = {
  'bg-red': 'hover:shadow-[0_8px_30px_-4px_rgba(239,68,68,0.5)]',
  'bg-orange': 'hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.5)]',
  'bg-brand-primary': 'hover:shadow-[0_8px_30px_-4px_rgba(59,130,246,0.5)]',
  'bg-green': 'hover:shadow-[0_8px_30px_-4px_rgba(34,197,94,0.5)]',
  'bg-purple': 'hover:shadow-[0_8px_30px_-4px_rgba(139,92,246,0.5)]',
  'bg-yellow': 'hover:shadow-[0_8px_30px_-4px_rgba(245,158,11,0.5)]',
  'bg-taupe': 'hover:shadow-[0_8px_30px_-4px_rgba(146,64,14,0.5)]',
  'bg-mint': 'hover:shadow-[0_8px_30px_-4px_rgba(45,212,191,0.5)]',
  'bg-magenta': 'hover:shadow-[0_8px_30px_-4px_rgba(225,29,72,0.5)]',
  'bg-cyan': 'hover:shadow-[0_8px_30px_-4px_rgba(6,182,212,0.5)]',
  'bg-slate': 'hover:shadow-[0_8px_30px_-4px_rgba(100,116,139,0.5)]',
  'bg-indigo': 'hover:shadow-[0_8px_30px_-4px_rgba(99,102,241,0.5)]',
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
  'bg-magenta': 'text-magenta',
  'bg-cyan': 'text-cyan',
  'bg-slate': 'text-slate',
  'bg-indigo': 'text-indigo',
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
  'bg-magenta': 'bg-magenta/15',
  'bg-cyan': 'bg-cyan/15',
  'bg-slate': 'bg-slate/15',
  'bg-indigo': 'bg-indigo/15',
};

export function AnchorCard({ emotionName, phrases, color, icon: Icon }: AnchorCardProps) {
  const hoverGradient = colorToHoverGradient[color] || '';
  const glowClass = colorToGlow[color] || '';
  const accentColor = colorToAccent[color] || 'text-brand-primary';
  const iconBg = colorToIconBg[color] || 'bg-brand-primary/15';

  return (
    <div
      className={`
        group relative w-full p-5 rounded-2xl overflow-hidden
        bg-bg-secondary
        bg-gradient-to-br from-bg-secondary to-bg-secondary
        ${hoverGradient}
        text-text-primary
        shadow-card border-2 border-brand-primary/30
        transition-all duration-300 ease-out
        hover:translate-y-[-3px] hover:border-white/30
        ${glowClass}
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
      <Quote
        size={80}
        className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-15 transition-all duration-300 group-hover:scale-110"
        strokeWidth={1}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative">
        {/* Header with icon and emotion name */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${iconBg} group-hover:bg-white/20 transition-all duration-300`}>
            <Icon size={20} strokeWidth={2} className={`${accentColor} group-hover:text-white transition-colors duration-300`} />
          </div>
          <h3 className="text-lg font-bold text-text-primary group-hover:text-white transition-colors duration-300">
            {emotionName}
          </h3>
        </div>

        {/* Phrases */}
        <div className="space-y-3">
          {phrases.map((phrase, index) => (
            <blockquote
              key={index}
              className="pl-4 border-l-2 border-brand-primary/30 group-hover:border-white/50 transition-colors duration-300"
            >
              <p className="text-sm text-text-secondary group-hover:text-white/90 leading-relaxed italic transition-colors duration-300">
                « {phrase} »
              </p>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
}
