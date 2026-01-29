import { useEffect, useRef, useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  color?: string; // Background color class, default 'bg-bg-secondary'
}

export function SlidePanel({
  isOpen,
  onClose,
  children,
  color = 'bg-bg-secondary',
}: SlidePanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Down') {
        setDragOffset(Math.max(0, eventData.deltaY));
      }
    },
    onSwipedDown: (eventData) => {
      // Close if swiped past threshold or with high velocity
      if (eventData.deltaY > 100 || eventData.velocity > 0.5) {
        onClose();
      }
      setDragOffset(0);
    },
    onTouchEndOrOnMouseUp: () => {
      setDragOffset(0);
    },
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: true,
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
        setIsAnimating(true);
        // Wait for animation to complete
        const timeout = setTimeout(() => {
          dialog.close();
          setIsAnimating(false);
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
      className="fixed inset-0 m-0 max-h-full max-w-full p-0 bg-transparent backdrop:bg-black/50"
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
    >
      <div
        {...swipeHandlers}
        className={`fixed bottom-0 left-0 right-0 ${color} rounded-t-2xl max-h-[85vh] overflow-y-auto ${
          prefersReducedMotion ? '' : 'transition-transform duration-300 ease-out'
        }`}
        style={{ transform: computeTransform() }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </dialog>
  );
}
