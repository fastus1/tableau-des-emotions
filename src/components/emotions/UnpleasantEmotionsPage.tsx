import { useState } from 'react';
import { emotions, emotionIcons } from '../../data/emotions';
import { EmotionCard } from './EmotionCard';
import type { Emotion, CulpabiliteEmotion } from '../../types/emotions';
import { isCulpabilite } from '../../types/emotions';
import { EmotionPanel } from '../panel/EmotionPanel';
import { CulpabilitePanel } from '../panel/CulpabilitePanel';

export function UnpleasantEmotionsPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | CulpabiliteEmotion | null>(null);

  const handleCardClick = (emotion: Emotion | CulpabiliteEmotion) => {
    setSelectedEmotion(emotion);
  };

  return (
    <div className="animate-fade-in">
      {/* Section header */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          Quand ça ne va pas
        </h1>
        <p className="text-text-secondary text-base">
          7 émotions désagréables
        </p>
      </header>

      {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {emotions.map((emotion) => {
          const Icon = emotionIcons[emotion.id];
          return (
            <div key={emotion.id} className="animate-fade-in-up">
              <EmotionCard
                name={emotion.name}
                keywords={emotion.keywords}
                color={emotion.color}
                textColor={emotion.textColor}
                icon={Icon}
                onClick={() => handleCardClick(emotion)}
              />
            </div>
          );
        })}
      </div>

      {/* Emotion detail panel */}
      {selectedEmotion && (
        isCulpabilite(selectedEmotion) ? (
          <CulpabilitePanel
            emotion={selectedEmotion}
            icon={emotionIcons[selectedEmotion.id]}
            isOpen={selectedEmotion !== null}
            onClose={() => setSelectedEmotion(null)}
          />
        ) : (
          <EmotionPanel
            emotion={selectedEmotion}
            icon={emotionIcons[selectedEmotion.id]}
            isOpen={selectedEmotion !== null}
            onClose={() => setSelectedEmotion(null)}
          />
        )
      )}
    </div>
  );
}
