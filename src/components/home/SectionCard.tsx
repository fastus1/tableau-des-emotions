import { ChevronRight, CloudRain, Sun, Footprints, Quote } from 'lucide-react';
import { Section } from '../../data/sections';

interface SectionCardProps {
  section: Section;
  onClick: () => void;
}

const sectionIcons = {
  unpleasant: CloudRain,
  pleasant: Sun,
  steps: Footprints,
  anchors: Quote,
};

const sectionHoverColors = {
  unpleasant: 'group-hover:from-red/90 group-hover:via-red/80 group-hover:to-red/70',
  pleasant: 'group-hover:from-mint/90 group-hover:via-mint/80 group-hover:to-mint/70',
  steps: 'group-hover:from-brand-primary/90 group-hover:via-brand-primary/80 group-hover:to-brand-primary/70',
  anchors: 'group-hover:from-amber/90 group-hover:via-amber/80 group-hover:to-amber/70',
};

const sectionHoverGlows = {
  unpleasant: 'hover:shadow-[0_8px_40px_-8px_rgba(239,68,68,0.4)]',
  pleasant: 'hover:shadow-[0_8px_40px_-8px_rgba(45,212,191,0.4)]',
  steps: 'hover:shadow-[0_8px_40px_-8px_rgba(59,130,246,0.4)]',
  anchors: 'hover:shadow-[0_8px_40px_-8px_rgba(245,158,11,0.4)]',
};

export function SectionCard({ section, onClick }: SectionCardProps) {
  const Icon = sectionIcons[section.id as keyof typeof sectionIcons];
  const hoverColor = sectionHoverColors[section.id as keyof typeof sectionHoverColors];
  const hoverGlow = sectionHoverGlows[section.id as keyof typeof sectionHoverGlows];

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full p-6 rounded-2xl text-left overflow-hidden
        bg-bg-secondary
        bg-gradient-to-br from-bg-secondary via-bg-secondary to-bg-secondary
        ${hoverColor}
        text-text-primary
        shadow-card border-2 border-brand-primary/30
        transition-all duration-300 ease-out
        hover:translate-y-[-2px] hover:border-white/30
        ${hoverGlow}
        active:scale-[0.98]
        min-h-[140px]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
        animate-fade-in-up
      `}
    >
      {/* Decorative gradient overlay - visible on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-40 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Background icon */}
      <Icon
        size={120}
        className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-15 transform rotate-12 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary group-hover:text-white/80 mb-1.5 uppercase tracking-wide transition-colors duration-300">
            {section.subtitle}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 transition-colors duration-300">
            {section.title}
          </h2>
          <p className="text-sm text-text-secondary group-hover:text-white/90 leading-relaxed max-w-[280px] transition-colors duration-300">
            {section.description}
          </p>
        </div>
        <div className="flex-shrink-0 p-2 rounded-full bg-brand-primary/10 group-hover:bg-white/20 transition-all duration-300 group-hover:translate-x-1">
          <ChevronRight size={20} className="text-brand-primary group-hover:text-white transition-colors duration-300" />
        </div>
      </div>
    </button>
  );
}
