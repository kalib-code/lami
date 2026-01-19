import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { slides, totalSlides } from '@/data/slides';
import { SlideRenderer } from './SlideRenderer';
import { ProgressBar } from './ProgressBar';
import { NavigationControls } from './NavigationControls';
import { PanelToggleButtons } from './PanelToggleButtons';
import { ResourcesPanel } from './ResourcesPanel';
import { ChatPanel } from './ChatPanel';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useTouchNavigation } from '@/hooks/useTouchNavigation';
import { usePresentationContext } from '@/context/PresentationContext';

export function Presentation() {
  const navigate = useNavigate();
  const { slideNumber } = useParams<{ slideNumber: string }>();
  const { isResourcesPanelOpen, isChatPanelOpen } = usePresentationContext();

  // Parse current slide number from URL, default to 1
  const currentSlide = Math.max(
    1,
    Math.min(totalSlides, parseInt(slideNumber || '1', 10) || 1)
  );

  // Navigation functions
  const goToSlide = useCallback(
    (slideNum: number) => {
      if (slideNum >= 1 && slideNum <= totalSlides) {
        navigate(`/slide/${slideNum}`);
      }
    },
    [navigate]
  );

  const goToNextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const goToPreviousSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Enable keyboard and touch navigation only when panels are closed
  const navigationEnabled = !isResourcesPanelOpen && !isChatPanelOpen;

  useKeyboardNavigation({
    onNext: goToNextSlide,
    onPrevious: goToPreviousSlide,
    enabled: navigationEnabled,
  });

  useTouchNavigation({
    onSwipeLeft: goToNextSlide,
    onSwipeRight: goToPreviousSlide,
    enabled: navigationEnabled,
  });

  // Redirect to valid slide number if out of range
  useEffect(() => {
    const parsed = parseInt(slideNumber || '1', 10);
    if (isNaN(parsed) || parsed < 1) {
      navigate('/slide/1', { replace: true });
    } else if (parsed > totalSlides) {
      navigate(`/slide/${totalSlides}`, { replace: true });
    }
  }, [slideNumber, navigate]);

  const currentSlideData = slides[currentSlide - 1];

  if (!currentSlideData) {
    return <div>Slide not found</div>;
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header with panel toggles */}
      <header className="flex items-center justify-end p-4 border-b border-border">
        <PanelToggleButtons />
      </header>

      {/* Slide content area */}
      <main className="flex-1 overflow-hidden">
        <div key={currentSlide} className="h-full">
          <SlideRenderer slide={currentSlideData} />
        </div>
      </main>

      {/* Footer with progress and navigation */}
      <footer className="border-t border-border p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <ProgressBar currentSlide={currentSlide} totalSlides={totalSlides} />
          </div>
          <NavigationControls
            onPrevious={goToPreviousSlide}
            onNext={goToNextSlide}
            canGoPrevious={currentSlide > 1}
            canGoNext={currentSlide < totalSlides}
          />
        </div>
      </footer>

      {/* Side panels */}
      <ResourcesPanel />
      <ChatPanel />
    </div>
  );
}
