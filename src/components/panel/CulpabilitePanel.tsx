import { useState, useEffect } from 'react';
import type { CulpabiliteEmotion, CulpabiliteSubType } from '../../types/emotions';
import type { LucideIcon } from 'lucide-react';
import { SlidePanel } from './SlidePanel';
import { PanelHeader } from './PanelHeader';

interface CulpabilitePanelProps {
  emotion: CulpabiliteEmotion;
  icon: LucideIcon;
  isOpen: boolean;
  onClose: () => void;
}

type CulpabiliteView = 'selection' | 'detail';

export function CulpabilitePanel({
  emotion,
  icon: Icon,
  isOpen,
  onClose,
}: CulpabilitePanelProps) {
  const [view, setView] = useState<CulpabiliteView>('selection');
  const [selectedSubType, setSelectedSubType] = useState<CulpabiliteSubType | null>(null);

  // Reset state when panel closes
  useEffect(() => {
    if (!isOpen) {
      setView('selection');
      setSelectedSubType(null);
    }
  }, [isOpen]);

  const handleSubTypeSelect = (subType: CulpabiliteSubType) => {
    setSelectedSubType(subType);
    setView('detail');
  };

  const handleBack = () => {
    setView('selection');
    setSelectedSubType(null);
  };

  return (
    <SlidePanel isOpen={isOpen} onClose={onClose} color={emotion.color}>
      {view === 'selection' ? (
        <>
          <PanelHeader
            title={emotion.name}
            onClose={onClose}
            color={emotion.color}
          />

          <div className="p-4 space-y-6">
            {/* Icon hero */}
            <div className="flex justify-center">
              <div className={`p-4 ${emotion.color} rounded-2xl`}>
                <Icon size={48} className={emotion.textColor} />
              </div>
            </div>

            {/* Intro text */}
            <p className="text-center text-text-secondary">
              La culpabilite peut prendre 4 formes differentes
            </p>

            {/* 2x2 grid of sub-type cards */}
            <div className="grid grid-cols-2 gap-4">
              {emotion.subTypes.map((subType) => (
                <button
                  key={subType.id}
                  type="button"
                  onClick={() => handleSubTypeSelect(subType)}
                  className="p-4 bg-taupe/20 rounded-xl text-left hover:bg-taupe/30
                             focus:outline-none focus:ring-2 focus:ring-taupe focus:ring-offset-2
                             focus:ring-offset-bg-secondary transition-colors
                             min-h-[44px]"
                >
                  <h3 className="font-semibold mb-1 text-text-primary text-sm leading-tight">
                    {subType.name}
                  </h3>
                  <p className="text-xs text-text-secondary">
                    {subType.keywords.join(' · ')}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : selectedSubType ? (
        <>
          <PanelHeader
            title={selectedSubType.name}
            onClose={onClose}
            onBack={handleBack}
            color={emotion.color}
          />

          <div className="p-4 space-y-6">
            {/* Variations */}
            <section>
              <h3 className="text-sm font-medium text-text-secondary mb-2">
                Variations
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedSubType.variations.map((variation) => (
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
                {selectedSubType.triggers.map((trigger) => (
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
                {selectedSubType.defensiveReactions.map((reaction) => (
                  <li key={reaction}>{reaction}</li>
                ))}
              </ul>
            </section>

            {/* Besoins - highlighted section */}
            <section className="bg-white/5 rounded-xl p-4 -mx-4">
              <h3 className="text-sm font-medium text-text-secondary mb-2">
                Besoins
              </h3>
              <ul className="list-disc list-inside space-y-1 text-text-primary">
                {selectedSubType.needs.map((need) => (
                  <li key={need}>{need}</li>
                ))}
              </ul>
            </section>
          </div>
        </>
      ) : null}
    </SlidePanel>
  );
}
