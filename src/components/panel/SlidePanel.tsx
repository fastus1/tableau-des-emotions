import { useEffect, useRef, useState, useCallback } from 'react';
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
  const triggerRef = useRef<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Handle dialog open/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      triggerRef.current = document.activeElement;
      dialog.showModal();

      if (prefersReducedMotion) {
        setIsVisible(true);
      } else {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }
    } else if (dialog.open) {
      setIsVisible(false);

      if (prefersReducedMotion) {
        dialog.close();
        if (triggerRef.current instanceof HTMLElement) {
          triggerRef.current.focus();
        }
      } else {
        const timeout = setTimeout(() => {
          dialog.close();
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

  const handleDialogClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 max-h-full max-w-full p-0 bg-transparent backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
    >
      <div className="fixed inset-0 flex items-end sm:items-center sm:justify-center sm:p-6 pointer-events-none">
        <div
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
            transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
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
