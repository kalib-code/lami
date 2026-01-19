import type { GuidelinesSlide as GuidelinesSlideType } from '@/data/types';

interface GuidelinesSlideProps {
  slide: GuidelinesSlideType;
}

export function GuidelinesSlide({ slide }: GuidelinesSlideProps) {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 animate-fade-in">
      {/* Guideline number and label */}
      <div className="flex items-center gap-6 mb-10">
        <span className="text-7xl md:text-8xl lg:text-9xl font-black text-accent leading-none">
          {slide.number}
        </span>
        <div className="flex flex-col">
          <span className="text-base md:text-lg lg:text-xl font-bold tracking-[0.15em] text-muted-foreground uppercase">
            {slide.title}
          </span>
        </div>
      </div>

      {/* Guideline text - very large */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight max-w-5xl uppercase">
        {slide.guideline}
      </h2>

      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground leading-snug max-w-4xl mt-10 md:mt-14">
        {slide.explanation}
      </p>
    </div>
  );
}
