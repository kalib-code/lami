import type { BulletSlide as BulletSlideType } from '@/data/types';

interface BulletSlideProps {
  slide: BulletSlideType;
}

export function BulletSlide({ slide }: BulletSlideProps) {
  return (
    <div className="flex flex-col h-full px-8 md:px-16 lg:px-24 py-8 md:py-12 animate-fade-in">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] uppercase mb-4">
        {slide.title}
      </h2>

      {slide.subtitle && (
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8">
          {slide.subtitle}
        </p>
      )}

      <ul className="space-y-6 md:space-y-8 mt-6 flex-1">
        {slide.bullets.map((bullet, index) => (
          <li
            key={index}
            className="flex items-start gap-5 md:gap-8"
          >
            <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent mt-4 md:mt-5 flex-shrink-0" />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
