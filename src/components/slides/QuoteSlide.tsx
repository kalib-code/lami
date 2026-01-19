import type { QuoteSlide as QuoteSlideType } from '@/data/types';

interface QuoteSlideProps {
  slide: QuoteSlideType;
}

export function QuoteSlide({ slide }: QuoteSlideProps) {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 animate-fade-in">
      {slide.title && (
        <div className="flex items-center gap-3 mb-8">
          <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent" />
          <span className="text-base md:text-lg lg:text-xl font-bold tracking-[0.15em] text-muted-foreground uppercase">
            {slide.title}
          </span>
        </div>
      )}

      <blockquote className="max-w-5xl">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug tracking-tight">
          "{slide.quote}"
        </p>
      </blockquote>

      <div className="mt-10 md:mt-14">
        {slide.attribution && (
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
            — {slide.attribution}
          </p>
        )}
        {slide.reference && (
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-accent mt-3">
            {slide.reference}
          </p>
        )}
      </div>
    </div>
  );
}
