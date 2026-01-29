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

export function SentimentPanel({
  sentiment,
  icon: Icon,
  isOpen,
  onClose,
}: SentimentPanelProps) {
  return (
    <SlidePanel isOpen={isOpen} onClose={onClose} color={sentiment.color}>
      <PanelHeader title={sentiment.name} onClose={onClose} color={sentiment.color} />

      <div className="p-4 space-y-6">
        {/* Icon hero */}
        <div className="flex justify-center">
          <div className={`p-4 ${sentiment.color} rounded-2xl`}>
            <Icon size={48} className={sentiment.textColor} />
          </div>
        </div>

        {/* Variations */}
        <section>
          <h3 className="text-sm font-medium text-text-secondary mb-2">
            Variations
          </h3>
          <div className="flex flex-wrap gap-2">
            {sentiment.variations.map((variation) => (
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
            {sentiment.triggers.map((trigger) => (
              <li key={trigger}>{trigger}</li>
            ))}
          </ul>
        </section>

        {/* Besoins satisfaits - highlighted as positive */}
        <section className="bg-white/5 rounded-xl p-4 -mx-4">
          <h3 className="text-sm font-medium text-text-secondary mb-2">
            Besoins satisfaits
          </h3>
          <ul className="list-disc list-inside space-y-1 text-text-primary">
            {sentiment.satisfiedNeeds.map((need) => (
              <li key={need}>{need}</li>
            ))}
          </ul>
        </section>
      </div>
    </SlidePanel>
  );
}
