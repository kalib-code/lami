import type { SectionSlide as SectionSlideType } from '@/data/types';

interface SectionSlideProps {
  slide: SectionSlideType;
}

export function SectionSlide({ slide }: SectionSlideProps) {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 animate-fade-in">
      {/* Part label with accent dot */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-3 h-3 rounded-full bg-accent" />
        <span className="text-sm md:text-base font-bold tracking-[0.15em] text-muted-foreground uppercase">
          {slide.title}
        </span>
      </div>

      {slide.subtitle && (
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] uppercase max-w-4xl">
          {slide.subtitle}
        </h2>
      )}

      {slide.duration && (
        <p className="text-lg md:text-xl text-muted-foreground mt-8">
          {slide.duration}
        </p>
      )}
    </div>
  );
}
