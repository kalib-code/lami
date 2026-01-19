import { useEffect, useRef, useCallback } from 'react';

interface UseTouchNavigationOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  enabled?: boolean;
  threshold?: number;
}

/**
 * Hook for touch/swipe navigation
 * Swipe left = next slide, Swipe right = previous slide
 */
export function useTouchNavigation({
  onSwipeLeft,
  onSwipeRight,
  enabled = true,
  threshold = 50, // minimum swipe distance in pixels
}: UseTouchNavigationOptions) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (!enabled) return;
      touchStartX.current = event.touches[0].clientX;
      touchStartY.current = event.touches[0].clientY;
    },
    [enabled]
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!enabled || touchStartX.current === null || touchStartY.current === null) {
        return;
      }

      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;

      // Only trigger if horizontal movement is greater than vertical
      // This prevents triggering on vertical scrolls
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          // Swipe right = previous slide
          onSwipeRight();
        } else {
          // Swipe left = next slide
          onSwipeLeft();
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    },
    [enabled, threshold, onSwipeLeft, onSwipeRight]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd, enabled]);
}
