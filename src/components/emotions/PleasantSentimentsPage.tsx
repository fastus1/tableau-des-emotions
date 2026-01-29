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
    <div>
      {/* Section header */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Quand ca va bien
        </h1>
        <p className="text-text-secondary">
          6 sentiments agreables
        </p>
      </header>

      {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sentiments.map((sentiment) => {
          const Icon = sentimentIcons[sentiment.id];
          return (
            <EmotionCard
              key={sentiment.id}
              name={sentiment.name}
              keywords={sentiment.keywords}
              color={sentiment.color}
              textColor={sentiment.textColor}
              icon={Icon}
              onClick={() => handleCardClick(sentiment)}
            />
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
