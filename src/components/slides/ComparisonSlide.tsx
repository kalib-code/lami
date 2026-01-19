import type { ComparisonSlide as ComparisonSlideType } from '@/data/types';
import { cn } from '@/lib/utils';

interface ComparisonSlideProps {
  slide: ComparisonSlideType;
}

function getHighlightClasses(highlight?: 'positive' | 'negative' | 'neutral') {
  switch (highlight) {
    case 'positive':
      return 'border-green-500 bg-green-50';
    case 'negative':
      return 'border-red-500 bg-red-50';
    case 'neutral':
      return 'border-amber-500 bg-amber-50';
    default:
      return 'border-border bg-card';
  }
}

export function ComparisonSlide({ slide }: ComparisonSlideProps) {
  return (
    <div className="flex flex-col h-full px-8 md:px-16 lg:px-24 py-8 md:py-12 animate-fade-in">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] uppercase mb-10 md:mb-14">
        {slide.title}
      </h2>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Left comparison */}
        <div className={cn('border-l-4 pl-8 py-6', getHighlightClasses(slide.left.highlight))}>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase mb-6">
            {slide.left.title}
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed">
            {slide.left.content}
          </p>
        </div>

        {/* Right comparison */}
        <div className={cn('border-l-4 pl-8 py-6', getHighlightClasses(slide.right.highlight))}>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase mb-6">
            {slide.right.title}
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed">
            {slide.right.content}
          </p>
        </div>
      </div>
    </div>
  );
}
