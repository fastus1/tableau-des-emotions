import type { LucideIcon } from 'lucide-react';
import { Flame, EyeOff, CloudRain, ThumbsDown, Ghost, Zap, Scale, HeartCrack, Gem, Moon, UserX } from 'lucide-react';

export interface AnchorPhrase {
  id: string;
  emotionName: string;
  emotionId: string;
  phrases: string[];
  color: string;
  textColor: string;
  icon: LucideIcon;
}

// Phrases d'ancrage pour chaque émotion
export const anchorPhrases: AnchorPhrase[] = [
  {
    id: 'colere',
    emotionName: 'Colère',
    emotionId: 'colere',
    phrases: [
      'J\'ai le droit d\'être en colère. Ça ne veut pas dire que je dois agir sous son impulsion.',
      'Ma colère m\'indique que quelque chose d\'important pour moi n\'est pas respecté.',
    ],
    color: 'bg-red',
    textColor: 'text-white',
    icon: Flame,
  },
  {
    id: 'honte',
    emotionName: 'Honte',
    emotionId: 'honte',
    phrases: [
      'Ce que j\'ai fait ne définit pas qui je suis.',
      'Tout le monde vit des moments embarrassants.',
    ],
    color: 'bg-orange',
    textColor: 'text-white',
    icon: EyeOff,
  },
  {
    id: 'tristesse',
    emotionName: 'Tristesse',
    emotionId: 'tristesse',
    phrases: [
      'C\'est correct de ne pas aller bien en ce moment.',
      'Cette douleur est le signe que quelque chose comptait pour moi.',
    ],
    color: 'bg-brand-primary',
    textColor: 'text-white',
    icon: CloudRain,
  },
  {
    id: 'peur',
    emotionName: 'Peur',
    emotionId: 'peur',
    phrases: [
      'Je peux avoir peur et avancer quand même.',
      'Ce que j\'imagine n\'est pas nécessairement ce qui va arriver.',
    ],
    color: 'bg-purple',
    textColor: 'text-white',
    icon: Ghost,
  },
  {
    id: 'degout',
    emotionName: 'Dégoût',
    emotionId: 'degout',
    phrases: [
      'J\'ai le droit de me protéger de ce qui me fait du mal.',
      'Prendre de la distance est parfois la meilleure chose à faire.',
    ],
    color: 'bg-green',
    textColor: 'text-white',
    icon: ThumbsDown,
  },
  {
    id: 'surprise',
    emotionName: 'Surprise',
    emotionId: 'surprise',
    phrases: [
      'Je peux prendre le temps d\'absorber ce qui vient de se passer.',
      'Je n\'ai pas besoin de réagir tout de suite.',
    ],
    color: 'bg-yellow',
    textColor: 'text-bg-primary',
    icon: Zap,
  },
  {
    id: 'culpabilite-saine',
    emotionName: 'Culpabilité (saine)',
    emotionId: 'culpabilite',
    phrases: [
      'Reconnaître mon erreur, c\'est déjà un pas vers la réparation.',
      'Je peux apprendre de cette situation.',
    ],
    color: 'bg-taupe',
    textColor: 'text-white',
    icon: Scale,
  },
  {
    id: 'culpabilisation-soi',
    emotionName: 'Culpabilisation de soi',
    emotionId: 'culpabilite',
    phrases: [
      'Je mérite la même compassion que j\'offre aux autres.',
      'Me critiquer sans cesse ne m\'aide pas à avancer.',
    ],
    color: 'bg-taupe',
    textColor: 'text-white',
    icon: Scale,
  },
  {
    id: 'se-faire-culpabiliser',
    emotionName: 'Se faire culpabiliser',
    emotionId: 'culpabilite',
    phrases: [
      'Je ne suis pas responsable des émotions des autres.',
      'Je peux écouter la critique sans l\'accepter entièrement.',
    ],
    color: 'bg-taupe',
    textColor: 'text-white',
    icon: Scale,
  },
  {
    id: 'culpabiliser-autre',
    emotionName: 'Culpabiliser l\'autre',
    emotionId: 'culpabilite',
    phrases: [
      'Blâmer l\'autre ne règle pas ce que je ressens.',
      'Qu\'est-ce que je peux faire pour moi dans cette situation?',
    ],
    color: 'bg-taupe',
    textColor: 'text-white',
    icon: Scale,
  },
  {
    id: 'jalousie',
    emotionName: 'Jalousie',
    emotionId: 'jalousie',
    phrases: [
      'Cette émotion me parle de mes peurs, pas de la réalité.',
      'Je peux demander de la réassurance au lieu de surveiller.',
    ],
    color: 'bg-magenta',
    textColor: 'text-white',
    icon: HeartCrack,
  },
  {
    id: 'envie',
    emotionName: 'Envie',
    emotionId: 'envie',
    phrases: [
      'Ce que l\'autre a ne m\'enlève rien.',
      'Qu\'est-ce que cette envie m\'apprend sur ce que je veux vraiment?',
    ],
    color: 'bg-cyan',
    textColor: 'text-bg-primary',
    icon: Gem,
  },
  {
    id: 'ennui',
    emotionName: 'Ennui',
    emotionId: 'ennui',
    phrases: [
      'L\'ennui peut être un signal que quelque chose demande à changer.',
      'Ce moment de vide peut devenir un espace pour réfléchir.',
    ],
    color: 'bg-slate',
    textColor: 'text-white',
    icon: Moon,
  },
  {
    id: 'solitude',
    emotionName: 'Solitude',
    emotionId: 'solitude',
    phrases: [
      'Me sentir seul.e ne veut pas dire que je suis seul.e.',
      'Je peux tendre la main, même si c\'est difficile.',
    ],
    color: 'bg-indigo',
    textColor: 'text-white',
    icon: UserX,
  },
];
