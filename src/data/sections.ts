import { View } from '../types/navigation';

export interface Section {
  id: View;
  title: string;
  subtitle: string;
  description: string;
  color: string; // Tailwind class for background
  textColor: string; // Tailwind class for text on colored bg
}

export const sections: Section[] = [
  {
    id: 'unpleasant',
    title: 'Quand ca ne va pas',
    subtitle: '7 emotions',
    description: 'Explorer les emotions desagreables et comprendre leurs messages',
    color: 'bg-red',
    textColor: 'text-white',
  },
  {
    id: 'pleasant',
    title: 'Quand ca va bien',
    subtitle: '6 sentiments',
    description: 'Decouvrir les sentiments agreables et leurs origines',
    color: 'bg-mint',
    textColor: 'text-bg-primary',
  },
  {
    id: 'steps',
    title: 'Les 5 etapes',
    subtitle: 'Regulation emotionnelle',
    description: 'Apprendre a traverser une emotion en 5 etapes',
    color: 'bg-brand-primary',
    textColor: 'text-white',
  },
];
