import { useState, useEffect } from 'react';
import type { CulpabiliteEmotion, CulpabiliteSubType } from '../../types/emotions';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
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
    <SlidePanel isOpen={isOpen} onClose={onClose}>
      {view === 'selection' ? (
        <>
          <PanelHeader title={emotion.name} onClose={onClose} />

          <div className="px-5 pb-8 space-y-6">
            {/* Icon hero */}
            <div className="flex justify-center pt-2">
              <div className="p-5 bg-gradient-to-br from-taupe/80 to-taupe/60 rounded-2xl shadow-[0_0_40px_rgba(146,64,14,0.3)] animate-scale-in">
                <Icon size={48} className={emotion.textColor} strokeWidth={1.5} />
              </div>
            </div>

            {/* Intro text */}
            <p className="text-center text-text-secondary text-base animate-fade-in">
              La culpabilité peut prendre 4 formes différentes
            </p>

            {/* 2x2 grid of sub-type cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 stagger-children">
              {emotion.subTypes.map((subType, index) => (
                <button
                  key={subType.id}
                  type="button"
                  onClick={() => handleSubTypeSelect(subType)}
                  className="group p-4 bg-white/5 border border-white/10 rounded-xl text-left
                             hover:bg-taupe/20 hover:border-taupe/30
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-taupe
                             transition-all duration-200
                             min-h-[44px] animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1.5 text-text-primary text-sm leading-tight">
                        {subType.name}
                      </h3>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {subType.keywords.join(' · ')}
                      </p>
                    </div>
                    <ChevronRight
                      size={18}
                      className="text-text-muted mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-taupe"
                    />
                  </div>
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
          />

          <div className="px-5 pb-8 space-y-6">
            {/* Variations */}
            <section className="animate-fade-in-up" style={{ animationDelay: '50ms' }}>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                Variations
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedSubType.variations.map((variation) => (
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
                {selectedSubType.triggers.map((trigger) => (
                  <li key={trigger} className="flex items-start gap-3 text-text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{trigger}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Réactions défensives */}
            <section className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                Réactions défensives
              </h3>
              <ul className="space-y-2">
                {selectedSubType.defensiveReactions.map((reaction) => (
                  <li key={reaction} className="flex items-start gap-3 text-text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{reaction}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Besoins - highlighted section */}
            <section
              className="bg-white/5 rounded-xl p-5 border-l-4 border-l-taupe animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                Besoins
              </h3>
              <ul className="space-y-2">
                {selectedSubType.needs.map((need) => (
                  <li key={need} className="flex items-start gap-3 text-text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-taupe mt-2 flex-shrink-0" />
                    <span className="leading-relaxed font-medium">{need}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      ) : null}
    </SlidePanel>
  );
}
