import { useReducer, useCallback, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { steps } from '../../data/steps';
import { StepCard } from './StepCard';
import { ProgressIndicator } from './ProgressIndicator';

// Carousel state
interface CarouselState {
  pos: number;
  sliding: boolean;
  dir: 'PREV' | 'NEXT' | 'NONE';
}

// Carousel actions
type CarouselAction =
  | { type: 'PREV'; numItems: number }
  | { type: 'NEXT'; numItems: number }
  | { type: 'GO_TO'; pos: number }
  | { type: 'STOP_SLIDING' };

const initialState: CarouselState = {
  pos: 0,
  sliding: false,
  dir: 'NONE'
};

function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
  switch (action.type) {
    case 'PREV':
      // Stop at 0, no wrap
      if (state.pos === 0) return state;
      return {
        ...state,
        pos: state.pos - 1,
        sliding: true,
        dir: 'PREV'
      };
    case 'NEXT':
      // Stop at numItems-1, no wrap
      if (state.pos >= action.numItems - 1) return state;
      return {
        ...state,
        pos: state.pos + 1,
        sliding: true,
        dir: 'NEXT'
      };
    case 'GO_TO':
      if (action.pos === state.pos) return state;
      return {
        ...state,
        pos: action.pos,
        sliding: true,
        dir: action.pos > state.pos ? 'NEXT' : 'PREV'
      };
    case 'STOP_SLIDING':
      return { ...state, sliding: false };
    default:
      return state;
  }
}

/**
 * Carousel container for the 5-step emotional regulation process.
 * Supports swipe, arrow buttons, and keyboard navigation.
 */
export function StepsCarousel() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [state, dispatch] = useReducer(carouselReducer, initialState);
  const carouselRef = useRef<HTMLDivElement>(null);
  const numItems = steps.length;

  // Slide navigation functions
  const slidePrev = useCallback(() => {
    if (state.pos > 0) {
      dispatch({ type: 'PREV', numItems });
    }
  }, [state.pos, numItems]);

  const slideNext = useCallback(() => {
    if (state.pos < numItems - 1) {
      dispatch({ type: 'NEXT', numItems });
    }
  }, [state.pos, numItems]);

  const goTo = useCallback((index: number) => {
    dispatch({ type: 'GO_TO', pos: index });
  }, []);

  // Stop sliding after animation completes
  useEffect(() => {
    if (state.sliding) {
      const timeout = prefersReducedMotion ? 0 : 300;
      const timer = setTimeout(() => {
        dispatch({ type: 'STOP_SLIDING' });
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [state.sliding, prefersReducedMotion]);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => slideNext(),
    onSwipedRight: () => slidePrev(),
    delta: 50,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false
  });

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      slidePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      slideNext();
    }
  }, [slidePrev, slideNext]);

  const canGoPrev = state.pos > 0;
  const canGoNext = state.pos < numItems - 1;

  return (
    <section className="py-4 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          Les 5 étapes
        </h2>
        <p className="text-text-secondary text-base max-w-sm mx-auto">
          Du déclencheur au besoin — Mieux se comprendre
        </p>
      </div>

      {/* Navigation arrows and carousel */}
      <div className="relative">
        {/* Navigation arrows */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-10 px-1">
          <button
            onClick={slidePrev}
            disabled={!canGoPrev}
            className={`w-11 h-11 rounded-xl glass flex items-center justify-center pointer-events-auto transition-all duration-200 ${
              canGoPrev
                ? 'opacity-100 hover:bg-white/10 hover:scale-105 active:scale-95'
                : 'opacity-30 cursor-not-allowed'
            }`}
            aria-label="Étape précédente"
          >
            <ChevronLeft className="w-5 h-5 text-text-primary" />
          </button>
          <button
            onClick={slideNext}
            disabled={!canGoNext}
            className={`w-11 h-11 rounded-xl glass flex items-center justify-center pointer-events-auto transition-all duration-200 ${
              canGoNext
                ? 'opacity-100 hover:bg-white/10 hover:scale-105 active:scale-95'
                : 'opacity-30 cursor-not-allowed'
            }`}
            aria-label="Étape suivante"
          >
            <ChevronRight className="w-5 h-5 text-text-primary" />
          </button>
        </div>

        {/* Carousel container */}
        <div
          {...swipeHandlers}
          ref={carouselRef}
          className="overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-2xl"
          role="region"
          aria-roledescription="carousel"
          aria-label="Les 5 etapes de regulation emotionnelle"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* Inner flex container */}
          <div
            className={`flex ${
              prefersReducedMotion ? '' : 'transition-transform duration-300 ease-out'
            }`}
            style={{ transform: `translateX(-${state.pos * 100}%)` }}
          >
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="w-full flex-shrink-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`Etape ${index + 1} sur ${numItems}: ${step.title}`}
                aria-hidden={index !== state.pos}
              >
                <StepCard
                  step={step}
                  stepNumber={step.id}
                  totalSteps={numItems}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-6">
        <ProgressIndicator
          current={state.pos}
          total={numItems}
          onGoTo={goTo}
        />
      </div>
    </section>
  );
}
