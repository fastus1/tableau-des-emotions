import { emotions, emotionIcons } from '../../data/emotions';
import { EmotionCard } from './EmotionCard';

export function UnpleasantEmotionsPage() {
  const handleCardClick = (emotionId: string) => {
    // Phase 3 will implement panel opening
    console.log('Clicked emotion:', emotionId);
  };

  return (
    <div>
      {/* Section header */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Quand ca ne va pas
        </h1>
        <p className="text-text-secondary">
          7 emotions desagreables
        </p>
      </header>

      {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {emotions.map((emotion) => {
          const Icon = emotionIcons[emotion.id];
          return (
            <EmotionCard
              key={emotion.id}
              name={emotion.name}
              keywords={emotion.keywords}
              color={emotion.color}
              textColor={emotion.textColor}
              icon={Icon}
              onClick={() => handleCardClick(emotion.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
