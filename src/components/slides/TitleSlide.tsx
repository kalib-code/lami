import type { TitleSlide as TitleSlideType } from '@/data/types';

interface TitleSlideProps {
  slide: TitleSlideType;
}

export function TitleSlide({ slide }: TitleSlideProps) {
  // Split title for staggered effect like the reference design
  const titleWords = slide.title.split(' ');

  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 animate-fade-in">
      {/* Small label like "SENIOR FULL STACK DEVELOPER" in reference */}
      <div className="flex items-center gap-2 mb-8">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="text-xs md:text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
          AI Ethics Presentation
        </span>
      </div>

      {/* Staggered large title */}
      <div className="space-y-0 md:space-y-2">
        {titleWords.map((word, index) => (
          <h1
            key={index}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-[0.9] uppercase"
            style={{ marginLeft: `${index * 2}rem` }}
          >
            {index === 1 ? (
              <span className="text-accent">{word}</span>
            ) : (
              word
            )}
          </h1>
        ))}
      </div>

      {slide.subtitle && (
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl mt-12 leading-relaxed">
          {slide.subtitle}
        </p>
      )}

      {slide.author && (
        <p className="text-base md:text-lg text-muted-foreground mt-8">
          {slide.author}
        </p>
      )}
    </div>
  );
}
