import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface AnchorAccordionItemProps {
  id: string;
  emotionName: string;
  phrases: string[];
  color: string;
  icon: LucideIcon;
  isOpen: boolean;
  onToggle: () => void;
}

// Map color classes to accent colors
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

const colorToIconBgOpen: Record<string, string> = {
  'bg-red': 'bg-red/25',
  'bg-orange': 'bg-orange/25',
  'bg-brand-primary': 'bg-brand-primary/25',
  'bg-green': 'bg-green/25',
  'bg-purple': 'bg-purple/25',
  'bg-yellow': 'bg-yellow/25',
  'bg-taupe': 'bg-taupe/25',
  'bg-mint': 'bg-mint/25',
  'bg-magenta': 'bg-magenta/25',
  'bg-cyan': 'bg-cyan/25',
  'bg-slate': 'bg-slate/25',
  'bg-indigo': 'bg-indigo/25',
};

const colorToGlow: Record<string, string> = {
  'bg-red': 'shadow-[0_4px_25px_-4px_rgba(239,68,68,0.5)]',
  'bg-orange': 'shadow-[0_4px_25px_-4px_rgba(249,115,22,0.5)]',
  'bg-brand-primary': 'shadow-[0_4px_25px_-4px_rgba(59,130,246,0.5)]',
  'bg-green': 'shadow-[0_4px_25px_-4px_rgba(34,197,94,0.5)]',
  'bg-purple': 'shadow-[0_4px_25px_-4px_rgba(139,92,246,0.5)]',
  'bg-yellow': 'shadow-[0_4px_25px_-4px_rgba(245,158,11,0.5)]',
  'bg-taupe': 'shadow-[0_4px_25px_-4px_rgba(146,64,14,0.5)]',
  'bg-mint': 'shadow-[0_4px_25px_-4px_rgba(45,212,191,0.5)]',
  'bg-magenta': 'shadow-[0_4px_25px_-4px_rgba(225,29,72,0.5)]',
  'bg-cyan': 'shadow-[0_4px_25px_-4px_rgba(6,182,212,0.5)]',
  'bg-slate': 'shadow-[0_4px_25px_-4px_rgba(100,116,139,0.5)]',
  'bg-indigo': 'shadow-[0_4px_25px_-4px_rgba(99,102,241,0.5)]',
};

const colorToBorder: Record<string, string> = {
  'bg-red': 'border-red/60',
  'bg-orange': 'border-orange/60',
  'bg-brand-primary': 'border-brand-primary/60',
  'bg-green': 'border-green/60',
  'bg-purple': 'border-purple/60',
  'bg-yellow': 'border-yellow/60',
  'bg-taupe': 'border-taupe/60',
  'bg-mint': 'border-mint/60',
  'bg-magenta': 'border-magenta/60',
  'bg-cyan': 'border-cyan/60',
  'bg-slate': 'border-slate/60',
  'bg-indigo': 'border-indigo/60',
};

const colorToQuoteBorder: Record<string, string> = {
  'bg-red': 'border-l-red/50',
  'bg-orange': 'border-l-orange/50',
  'bg-brand-primary': 'border-l-brand-primary/50',
  'bg-green': 'border-l-green/50',
  'bg-purple': 'border-l-purple/50',
  'bg-yellow': 'border-l-yellow/50',
  'bg-taupe': 'border-l-taupe/50',
  'bg-mint': 'border-l-mint/50',
  'bg-magenta': 'border-l-magenta/50',
  'bg-cyan': 'border-l-cyan/50',
  'bg-slate': 'border-l-slate/50',
  'bg-indigo': 'border-l-indigo/50',
};

function AnchorAccordionItem({
  emotionName,
  phrases,
  color,
  icon: Icon,
  isOpen,
  onToggle
}: AnchorAccordionItemProps) {
  const accentColor = colorToAccent[color] || 'text-brand-primary';
  const iconBg = colorToIconBg[color] || 'bg-brand-primary/15';
  const iconBgOpen = colorToIconBgOpen[color] || 'bg-brand-primary/25';
  const glow = colorToGlow[color] || '';
  const borderColor = colorToBorder[color] || 'border-brand-primary/60';
  const quoteBorder = colorToQuoteBorder[color] || 'border-l-brand-primary/50';

  return (
    <div
      className={`
        rounded-2xl overflow-hidden transition-all duration-300 ease-out
        bg-bg-secondary border-2
        ${isOpen
          ? `${borderColor} ${glow}`
          : 'border-brand-primary/30 hover:border-brand-primary/50'
        }
      `}
    >
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center justify-between p-4 cursor-pointer
          transition-colors duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-inset
          text-text-primary
        `}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div
            className={`
              flex items-center justify-center w-10 h-10 rounded-xl
              transition-all duration-300
              ${isOpen ? iconBgOpen : iconBg}
            `}
          >
            <Icon
              size={20}
              strokeWidth={2}
              className={`transition-colors duration-300 ${accentColor}`}
            />
          </div>
          <span className={`font-semibold text-base transition-colors duration-300 ${isOpen ? 'text-text-primary' : ''}`}>
            {emotionName}
          </span>
        </div>

        <ChevronDown
          size={20}
          className={`
            transition-all duration-300 ease-out
            ${isOpen ? `rotate-180 ${accentColor}` : 'rotate-0 text-text-muted'}
          `}
        />
      </button>

      {/* Content - expandable */}
      <div
        className={`
          grid transition-all duration-300 ease-out
          ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
        `}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-5 space-y-3">
            {phrases.map((phrase, index) => (
              <blockquote
                key={index}
                className={`
                  pl-4 border-l-2 transition-colors duration-300
                  ${quoteBorder}
                `}
              >
                <p className="text-sm leading-relaxed italic text-text-secondary">
                  « {phrase} »
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AnchorAccordionProps {
  items: {
    id: string;
    emotionName: string;
    phrases: string[];
    color: string;
    textColor: string;
    icon: LucideIcon;
  }[];
}

export function AnchorAccordion({ items }: AnchorAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <AnchorAccordionItem
          key={item.id}
          id={item.id}
          emotionName={item.emotionName}
          phrases={item.phrases}
          color={item.color}
          icon={item.icon}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
