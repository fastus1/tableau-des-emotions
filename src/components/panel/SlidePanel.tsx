import { useEffect, useRef, useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function SlidePanel({
  isOpen,
  onClose,
  children,
}: SlidePanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Track scroll position to enable swipe-to-close only at top
  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      setIsAtTop(contentRef.current.scrollTop <= 0);
    }
  }, []);

  // Swipe handlers - only active when scrolled to top
  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Down' && isAtTop) {
        setDragOffset(Math.max(0, eventData.deltaY));
      }
    },
    onSwipedDown: (eventData) => {
      if (isAtTop) {
        // Close if swiped past threshold or with high velocity
        if (eventData.deltaY > 100 || eventData.velocity > 0.5) {
          onClose();
        }
      }
      setDragOffset(0);
    },
    onTouchEndOrOnMouseUp: () => {
      setDragOffset(0);
    },
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: false,
  });

  // Handle dialog open/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // Store trigger element for focus return
      triggerRef.current = document.activeElement;

      // Show dialog
      dialog.showModal();

      // Reset scroll state
      setIsAtTop(true);

      // Trigger animation after dialog is shown
      if (prefersReducedMotion) {
        setIsVisible(true);
      } else {
        // Small delay to allow CSS transition to work
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }
    } else if (dialog.open) {
      // Animate out
      setIsVisible(false);

      if (prefersReducedMotion) {
        dialog.close();
        // Return focus
        if (triggerRef.current instanceof HTMLElement) {
          triggerRef.current.focus();
        }
      } else {
        // Wait for animation to complete
        const timeout = setTimeout(() => {
          dialog.close();
          // Return focus
          if (triggerRef.current instanceof HTMLElement) {
            triggerRef.current.focus();
          }
        }, 300);
        return () => clearTimeout(timeout);
      }
    }
  }, [isOpen, prefersReducedMotion]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle native dialog close (Escape key)
  const handleDialogClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // Compute transform for animation and drag
  const computeTransform = () => {
    if (dragOffset > 0) {
      return `translateY(${dragOffset}px)`;
    }
    if (!isVisible) {
      return 'translateY(100%)';
    }
    return 'translateY(0)';
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 max-h-full max-w-full p-0 bg-transparent backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
    >
      {/* Centered container for desktop */}
      <div className="fixed inset-0 flex items-end sm:items-center sm:justify-center sm:p-6 pointer-events-none">
        <div
          ref={contentRef}
          {...swipeHandlers}
          onScroll={handleScroll}
          className={`
            pointer-events-auto
            w-full sm:max-w-lg md:max-w-xl
            rounded-t-3xl sm:rounded-2xl
            max-h-[90vh] sm:max-h-[85vh]
            overflow-y-auto
            overscroll-contain
            border border-white/10
            shadow-2xl
            ${prefersReducedMotion ? '' : 'transition-transform duration-300 ease-out'}
          `}
          style={{
            transform: computeTransform(),
            background: 'linear-gradient(180deg, rgba(30, 33, 40, 0.98) 0%, rgba(22, 24, 28, 0.99) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            WebkitOverflowScrolling: 'touch',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </dialog>
  );
}
