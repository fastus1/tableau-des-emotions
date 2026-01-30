interface ProgressIndicatorProps {
  current: number;  // 0-indexed
  total: number;
  onGoTo: (index: number) => void;
}

/**
 * Progress indicator with bars and numeric counter.
 * Bars are clickable to jump to specific steps.
 */
export function ProgressIndicator({ current, total, onGoTo }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 px-4">
      {/* Progress bars */}
      <div className="flex items-center gap-1.5 flex-1 max-w-xs">
        {Array.from({ length: total }, (_, index) => (
          <button
            key={index}
            onClick={() => onGoTo(index)}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-brand-primary shadow-sm shadow-brand-primary/50'
                : index < current
                ? 'bg-brand-primary/50'
                : 'bg-white/20 hover:bg-white/30'
            }`}
            aria-label={`Aller à l'étape ${index + 1}`}
            aria-disabled={index === current}
            aria-current={index === current ? 'step' : undefined}
          />
        ))}
      </div>

      {/* Numeric counter */}
      <span
        className="text-text-muted text-sm font-medium tabular-nums"
        aria-live="polite"
      >
        {current + 1}/{total}
      </span>
    </div>
  );
}
