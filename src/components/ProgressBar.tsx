import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  currentSlide: number;
  totalSlides: number;
}

export function ProgressBar({ currentSlide, totalSlides }: ProgressBarProps) {
  const progress = (currentSlide / totalSlides) * 100;

  return (
    <div className="flex items-center gap-4 px-4">
      <Progress value={progress} className="flex-1 h-2" />
      <span className="text-sm text-muted-foreground whitespace-nowrap min-w-[60px] text-right">
        {currentSlide} / {totalSlides}
      </span>
    </div>
  );
}
