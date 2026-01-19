import type { InsightSlide as InsightSlideType } from '@/data/types';

interface InsightSlideProps {
  slide: InsightSlideType;
}

export function InsightSlide({ slide }: InsightSlideProps) {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 animate-fade-in">
      {/* Label with accent dot */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent" />
        <span className="text-base md:text-lg lg:text-xl font-bold tracking-[0.15em] text-muted-foreground uppercase">
          {slide.title}
        </span>
      </div>

      {/* Main insight - very large */}
      <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] tracking-tight max-w-5xl">
        {slide.insight}
      </p>

      {slide.supporting && (
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground leading-snug max-w-4xl mt-10 md:mt-14">
          {slide.supporting}
        </p>
      )}
    </div>
  );
}
