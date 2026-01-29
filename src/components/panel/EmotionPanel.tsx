import type { Emotion } from '../../types/emotions';
import type { LucideIcon } from 'lucide-react';
import { SlidePanel } from './SlidePanel';
import { PanelHeader } from './PanelHeader';

interface EmotionPanelProps {
  emotion: Emotion;
  icon: LucideIcon;
  isOpen: boolean;
  onClose: () => void;
}

export function EmotionPanel({
  emotion,
  icon: Icon,
  isOpen,
  onClose,
}: EmotionPanelProps) {
  return (
    <SlidePanel isOpen={isOpen} onClose={onClose} color={emotion.color}>
      <PanelHeader title={emotion.name} onClose={onClose} color={emotion.color} />

      <div className="p-4 space-y-6">
        {/* Icon hero */}
        <div className="flex justify-center">
          <div className={`p-4 ${emotion.color} rounded-2xl`}>
            <Icon size={48} className={emotion.textColor} />
          </div>
        </div>

        {/* Variations */}
        <section>
          <h3 className="text-sm font-medium text-text-secondary mb-2">
            Variations
          </h3>
          <div className="flex flex-wrap gap-2">
            {emotion.variations.map((variation) => (
              <span
                key={variation}
                className="px-3 py-1 bg-white/10 rounded-full text-sm"
              >
                {variation}
              </span>
            ))}
          </div>
        </section>

        {/* Declencheurs */}
        <section>
          <h3 className="text-sm font-medium text-text-secondary mb-2">
            Declencheurs
          </h3>
          <ul className="list-disc list-inside space-y-1 text-text-primary">
            {emotion.triggers.map((trigger) => (
              <li key={trigger}>{trigger}</li>
            ))}
          </ul>
        </section>

        {/* Reactions defensives */}
        <section>
          <h3 className="text-sm font-medium text-text-secondary mb-2">
            Reactions defensives
          </h3>
          <ul className="list-disc list-inside space-y-1 text-text-primary">
            {emotion.defensiveReactions.map((reaction) => (
              <li key={reaction}>{reaction}</li>
            ))}
          </ul>
        </section>

        {/* Besoins - highlighted section as key insight */}
        <section className="bg-white/5 rounded-xl p-4 -mx-4">
          <h3 className="text-sm font-medium text-text-secondary mb-2">
            Besoins
          </h3>
          <ul className="list-disc list-inside space-y-1 text-text-primary">
            {emotion.needs.map((need) => (
              <li key={need}>{need}</li>
            ))}
          </ul>
        </section>
      </div>
    </SlidePanel>
  );
}
