import type { LucideIcon } from 'lucide-react';

// Base emotion structure for unpleasant emotions
export interface Emotion {
  id: string;
  name: string;
  keywords: [string, string, string];  // Exactly 3 keywords for closed card
  color: string;       // Tailwind bg class e.g. 'bg-red'
  textColor: string;   // Tailwind text class
  // Full content for modal (Phase 3)
  variations: string[];
  triggers: string[];
  defensiveReactions: string[];
  needs: string[];
}

// Culpabilite has 4 sub-types instead of direct content
export interface CulpabiliteSubType {
  id: 'saine' | 'de-soi' | 'se-faire' | 'faire';
  name: string;
  keywords: [string, string, string];
  variations: string[];
  triggers: string[];
  defensiveReactions: string[];
  needs: string[];
}

export interface CulpabiliteEmotion {
  id: 'culpabilite';
  name: string;
  keywords: [string, string, string];
  color: string;
  textColor: string;
  subTypes: CulpabiliteSubType[];
}

// Pleasant sentiments have different structure (no defensive reactions)
export interface Sentiment {
  id: string;
  name: string;
  keywords: [string, string, string];
  color: string;
  textColor: string;
  variations: string[];
  triggers: string[];
  satisfiedNeeds: string[];  // Different from Emotion.needs
}

// Union type for rendering
export type EmotionOrSentiment = Emotion | CulpabiliteEmotion | Sentiment;

// Type guard helpers
export function isCulpabilite(item: EmotionOrSentiment): item is CulpabiliteEmotion {
  return item.id === 'culpabilite';
}

export function isSentiment(item: EmotionOrSentiment): item is Sentiment {
  return 'satisfiedNeeds' in item;
}

// Icon mapping type
export type EmotionIconMap = Record<string, LucideIcon>;
