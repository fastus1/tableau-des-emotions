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
    <div className="bg-bg-secondary rounded-2xl p-6 mx-4 min-h-[400px]">
      {/* Header with step number badge and title */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-white font-semibold text-lg"
          aria-label={`Etape ${stepNumber} sur ${totalSteps}`}
        >
          {stepNumber}
        </span>
        <h3 className="text-xl font-semibold text-text-primary">
          {step.title}
        </h3>
      </div>

      {/* Question in italics */}
      <p className="text-brand-link italic mb-6 text-lg">
        {step.question}
      </p>

      {/* Action bullets */}
      <ul className="space-y-3">
        {step.actions.map((action, index) => (
          <li key={index} className="flex items-start gap-3">
            <span
              className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-text-secondary leading-relaxed">
              {action}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
