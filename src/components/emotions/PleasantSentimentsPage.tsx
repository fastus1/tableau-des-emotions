import { useState } from 'react';
import { sentiments, sentimentIcons } from '../../data/sentiments';
import { EmotionCard } from './EmotionCard';
import type { Sentiment } from '../../types/emotions';
import { SentimentPanel } from '../panel/SentimentPanel';

export function PleasantSentimentsPage() {
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | null>(null);

  const handleCardClick = (sentiment: Sentiment) => {
    setSelectedSentiment(sentiment);
  };

  return (
    <div className="animate-fade-in">
      {/* Section header */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          Quand ça va bien
        </h1>
        <p className="text-text-secondary text-base">
          6 sentiments agréables
        </p>
      </header>

      {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {sentiments.map((sentiment) => {
          const Icon = sentimentIcons[sentiment.id];
          return (
            <div key={sentiment.id} className="animate-fade-in-up">
              <EmotionCard
                name={sentiment.name}
                keywords={sentiment.keywords}
                color={sentiment.color}
                textColor={sentiment.textColor}
                icon={Icon}
                onClick={() => handleCardClick(sentiment)}
              />
            </div>
          );
        })}
      </div>

      {/* Sentiment detail panel */}
      {selectedSentiment && (
        <SentimentPanel
          sentiment={selectedSentiment}
          icon={sentimentIcons[selectedSentiment.id]}
          isOpen={selectedSentiment !== null}
          onClose={() => setSelectedSentiment(null)}
        />
      )}
    </div>
  );
}
