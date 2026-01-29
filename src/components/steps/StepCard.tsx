import type { Step } from '../../types/steps';

interface StepCardProps {
  step: Step;
  stepNumber: number;
  totalSteps: number;
}

/**
 * Individual step card display for the carousel.
 * Shows step number badge, title, question, and action bullets.
 */
export function StepCard({ step, stepNumber, totalSteps }: StepCardProps) {
  return (
    <div className="group bg-bg-secondary rounded-2xl p-6 mx-4 min-h-[420px] border-2 border-brand-primary/30 shadow-card transition-all duration-300 hover:border-brand-primary/60 hover:shadow-[0_8px_30px_-4px_rgba(59,130,246,0.3)]">
      {/* Header with step number badge and title */}
      <div className="flex items-center gap-4 mb-5">
        <span
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary/15 text-brand-primary font-bold text-xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-primary group-hover:to-brand-secondary group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-primary/30"
          aria-label={`Étape ${stepNumber} sur ${totalSteps}`}
        >
          {stepNumber}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-text-primary transition-colors duration-300 group-hover:text-white">
          {step.title}
        </h3>
      </div>

      {/* Question styled as quote */}
      <div className="mb-6 pl-4 border-l-2 border-brand-primary/30 transition-colors duration-300 group-hover:border-brand-primary/60">
        <p className="text-text-secondary italic text-lg leading-relaxed transition-colors duration-300 group-hover:text-brand-link">
          {step.question}
        </p>
      </div>

      {/* Action bullets */}
      <ul className="space-y-3">
        {step.actions.map((action, index) => (
          <li key={index} className="flex items-start gap-3">
            <span
              className="w-2 h-2 rounded-full bg-brand-primary/50 mt-2.5 flex-shrink-0 transition-all duration-300 group-hover:bg-brand-primary group-hover:scale-125"
              aria-hidden="true"
            />
            <span className="text-text-secondary leading-relaxed transition-colors duration-300 group-hover:text-text-primary">
              {action}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
