import { useEffect, useCallback } from 'react';

interface UseKeyboardNavigationOptions {
  onNext: () => void;
  onPrevious: () => void;
  enabled?: boolean;
}

/**
 * Hook for keyboard navigation in presentations
 * Supports: Arrow keys, Space, PageUp/Down, Home/End
 */
export function useKeyboardNavigation({
  onNext,
  onPrevious,
  enabled = true,
}: UseKeyboardNavigationOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Don't capture keys when typing in input fields
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Space
        case 'PageDown':
          event.preventDefault();
          onNext();
          break;

        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault();
          onPrevious();
          break;
      }
    },
    [onNext, onPrevious, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
}
