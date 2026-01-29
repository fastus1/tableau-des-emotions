import { anchorPhrases } from '../../data/anchorPhrases';
import { AnchorAccordion } from './AnchorAccordion';

export function AnchorPhrasesPage() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          Phrases d'ancrage
        </h1>
        <p className="text-text-secondary text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Des phrases simples pour s'aider à traverser le moment difficile
        </p>
      </header>

      {/* Accordion list */}
      <AnchorAccordion items={anchorPhrases} />
    </div>
  );
}
