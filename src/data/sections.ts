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
    id: 'steps',
    title: 'Les 5 étapes',
    subtitle: 'Régulation émotionnelle',
    description: 'Apprendre à traverser une émotion en 5 étapes',
    color: 'bg-brand-primary',
    textColor: 'text-white',
  },
  {
    id: 'unpleasant',
    title: 'Quand ça ne va pas',
    subtitle: '7 émotions',
    description: 'Explorer les émotions désagréables et comprendre leurs messages',
    color: 'bg-red',
    textColor: 'text-white',
  },
  {
    id: 'pleasant',
    title: 'Quand ça va bien',
    subtitle: '6 sentiments',
    description: 'Découvrir les sentiments agréables et leurs origines',
    color: 'bg-mint',
    textColor: 'text-bg-primary',
  },
];
