import type { Step } from '../types/steps';

/**
 * The 5 steps of emotional regulation.
 * Content extracted verbatim from tableaux-regulation-emotionnelle-complet.md
 */
export const steps: Step[] = [
  {
    id: 1,
    title: "S'arrêter",
    question: "C'est plus fort que moi, je vois bien que je réagis.",
    actions: [
      "Faire le choix de s'arrêter et de laisser aller le déclencheur extérieur.",
      "Trouver un endroit pour se calmer.",
      "Prendre quelques respirations profondes.",
      "Prendre le temps de se recentrer intérieurement.",
      "Revenir dans le moment présent."
    ]
  },
  {
    id: 2,
    title: "S'observer et identifier les émotions",
    question: "Qu'est-ce qui se passe pour moi?",
    actions: [
      "Prendre conscience de son corps et identifier les sensations présentes.",
      "Porter attention à son état intérieur.",
      "S'observer de façon neutre et sans jugement.",
      "Identifier et préciser les émotions présentes."
    ]
  },
  {
    id: 3,
    title: "Accueillir les émotions et les ressentir",
    question: "Qu'est-ce que je vis en ce moment?",
    actions: [
      "Accueillir et accepter les émotions, telles qu'elles se manifestent.",
      "Prendre le temps de rester en contact avec l'émotion.",
      "Attendre que l'intensité s'estompe et que le calme s'installe.",
      "Parfois, il suffit d'accepter que c'est difficile d'accepter."
    ]
  },
  {
    id: 4,
    title: "Identifier ses besoins et se responsabiliser",
    question: "Qu'est-ce qui me ferait du bien par rapport à la situation?",
    actions: [
      "Une fois les émotions calmées, se questionner pour identifier les besoins insatisfaits en lien avec la situation.",
      "Voir comment s'occuper de son bien-être de façon saine et satisfaisante.",
      "Reconnaître sa part de responsabilité dans la situation.",
      "Prendre conscience de ce qui vient de soi."
    ]
  },
  {
    id: 5,
    title: "Passer à l'action",
    question: "Qu'est-ce qui est en mon pouvoir pour prendre soin de moi?",
    actions: [
      "Sortir de l'attente et se responsabiliser des actions pour répondre à ses besoins.",
      "Passer à l'action aide à sortir des peurs et des malaises.",
      "S'exprimer pour se libérer de la charge émotive.",
      "Faire des demandes claires en lien avec vos besoins.",
      "Poser ses limites."
    ]
  }
];
