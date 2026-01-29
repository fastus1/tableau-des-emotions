interface ProgressIndicatorProps {
  current: number;  // 0-indexed
  total: number;
  onGoTo: (index: number) => void;
}

/**
 * Progress indicator with dots and numeric counter.
 * Dots are clickable to jump to specific steps.
 */
export function ProgressIndicator({ current, total, onGoTo }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Dot buttons */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, index) => (
          <button
            key={index}
            onClick={() => onGoTo(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current
                ? 'bg-brand-primary'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Aller a l'etape ${index + 1}`}
            aria-disabled={index === current}
            aria-current={index === current ? 'step' : undefined}
          />
        ))}
      </div>

      {/* Numeric counter */}
      <span
        className="text-text-secondary text-sm"
        aria-live="polite"
      >
        {current + 1}/{total}
      </span>
    </div>
  );
}
