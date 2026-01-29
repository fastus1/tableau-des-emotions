import type { Sentiment } from '../../types/emotions';
import type { LucideIcon } from 'lucide-react';
import { SlidePanel } from './SlidePanel';
import { PanelHeader } from './PanelHeader';

interface SentimentPanelProps {
  sentiment: Sentiment;
  icon: LucideIcon;
  isOpen: boolean;
  onClose: () => void;
}

// Map color classes to gradient styles
const colorToGradient: Record<string, string> = {
  'bg-red': 'from-red/80 to-red/60',
  'bg-mint': 'from-mint/80 to-mint/60',
  'bg-brand-primary': 'from-brand-primary/80 to-brand-primary/60',
  'bg-yellow': 'from-yellow/80 to-yellow/60',
  'bg-green': 'from-green/80 to-green/60',
  'bg-purple': 'from-purple/80 to-purple/60',
  'bg-orange': 'from-orange/80 to-orange/60',
  'bg-rose': 'from-rose/80 to-rose/60',
  'bg-sky': 'from-sky/80 to-sky/60',
  'bg-violet': 'from-violet/80 to-violet/60',
  'bg-emerald': 'from-emerald/80 to-emerald/60',
};

const colorToGlow: Record<string, string> = {
  'bg-red': 'shadow-[0_0_40px_rgba(239,68,68,0.3)]',
  'bg-mint': 'shadow-[0_0_40px_rgba(45,212,191,0.3)]',
  'bg-brand-primary': 'shadow-[0_0_40px_rgba(59,130,246,0.3)]',
  'bg-yellow': 'shadow-[0_0_40px_rgba(245,158,11,0.3)]',
  'bg-green': 'shadow-[0_0_40px_rgba(34,197,94,0.3)]',
  'bg-purple': 'shadow-[0_0_40px_rgba(139,92,246,0.3)]',
  'bg-orange': 'shadow-[0_0_40px_rgba(249,115,22,0.3)]',
  'bg-rose': 'shadow-[0_0_40px_rgba(244,63,94,0.3)]',
  'bg-sky': 'shadow-[0_0_40px_rgba(14,165,233,0.3)]',
  'bg-violet': 'shadow-[0_0_40px_rgba(168,85,247,0.3)]',
  'bg-emerald': 'shadow-[0_0_40px_rgba(16,185,129,0.3)]',
};

const colorToBorder: Record<string, string> = {
  'bg-red': 'border-l-red',
  'bg-mint': 'border-l-mint',
  'bg-brand-primary': 'border-l-brand-primary',
  'bg-yellow': 'border-l-yellow',
  'bg-green': 'border-l-green',
  'bg-purple': 'border-l-purple',
  'bg-orange': 'border-l-orange',
  'bg-rose': 'border-l-rose',
  'bg-sky': 'border-l-sky',
  'bg-violet': 'border-l-violet',
  'bg-emerald': 'border-l-emerald',
};

// Map color classes to bullet color
const colorToBullet: Record<string, string> = {
  'bg-red': 'bg-red',
  'bg-mint': 'bg-mint',
  'bg-brand-primary': 'bg-brand-primary',
  'bg-yellow': 'bg-yellow',
  'bg-green': 'bg-green',
  'bg-purple': 'bg-purple',
  'bg-orange': 'bg-orange',
  'bg-rose': 'bg-rose',
  'bg-sky': 'bg-sky',
  'bg-violet': 'bg-violet',
  'bg-emerald': 'bg-emerald',
};

export function SentimentPanel({
  sentiment,
  icon: Icon,
  isOpen,
  onClose,
}: SentimentPanelProps) {
  const gradient = colorToGradient[sentiment.color] || 'from-mint/80 to-mint/60';
  const glow = colorToGlow[sentiment.color] || '';
  const borderColor = colorToBorder[sentiment.color] || 'border-l-mint';
  const bulletColor = colorToBullet[sentiment.color] || 'bg-mint';

  return (
    <SlidePanel isOpen={isOpen} onClose={onClose}>
      <PanelHeader title={sentiment.name} onClose={onClose} />

      <div className="px-5 pb-8 space-y-6">
        {/* Icon hero */}
        <div className="flex justify-center pt-2">
          <div className={`p-5 bg-gradient-to-br ${gradient} rounded-2xl ${glow} animate-scale-in`}>
            <Icon size={48} className={sentiment.textColor} strokeWidth={1.5} />
          </div>
        </div>

        {/* Variations */}
        <section className="animate-fade-in-up" style={{ animationDelay: '50ms' }}>
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Variations
          </h3>
          <div className="flex flex-wrap gap-2">
            {sentiment.variations.map((variation) => (
              <span
                key={variation}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-text-secondary hover:bg-white/10 transition-colors"
              >
                {variation}
              </span>
            ))}
          </div>
        </section>

        {/* Déclencheurs */}
        <section className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Déclencheurs
          </h3>
          <ul className="space-y-2">
            {sentiment.triggers.map((trigger) => (
              <li key={trigger} className="flex items-start gap-3 text-text-primary">
                <span className={`w-1.5 h-1.5 rounded-full ${bulletColor} mt-2 flex-shrink-0`} />
                <span className="leading-relaxed">{trigger}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Besoins satisfaits - highlighted as positive */}
        <section
          className={`bg-white/5 rounded-xl p-5 border-l-4 ${borderColor} animate-fade-in-up`}
          style={{ animationDelay: '150ms' }}
        >
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Besoins satisfaits
          </h3>
          <ul className="space-y-2">
            {sentiment.satisfiedNeeds.map((need) => (
              <li key={need} className="flex items-start gap-3 text-text-primary">
                <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${sentiment.color}`} />
                <span className="leading-relaxed font-medium">{need}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SlidePanel>
  );
}
