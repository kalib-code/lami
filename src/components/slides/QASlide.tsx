import { Mail } from 'lucide-react';
import type { QASlide as QASlideType } from '@/data/types';

interface QASlideProps {
  slide: QASlideType;
}

export function QASlide({ slide }: QASlideProps) {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 animate-fade-in">
      {/* Label with accent dot */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-3 h-3 rounded-full bg-accent" />
        <span className="text-sm md:text-base font-bold tracking-[0.15em] text-muted-foreground uppercase">
          Let's Discuss
        </span>
      </div>

      {/* Large title */}
      <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-[0.9] uppercase">
        {slide.title.split(' ').map((word, index) => (
          <span key={index} className="block" style={{ marginLeft: `${index * 1.5}rem` }}>
            {index === 0 ? <span className="text-accent">{word}</span> : word}
          </span>
        ))}
      </h2>

      <p className="text-xl md:text-2xl text-muted-foreground mt-12">
        Thank you for your attention
      </p>

      {slide.contactInfo && (
        <div className="flex items-center gap-3 text-lg md:text-xl mt-8">
          <Mail className="w-5 h-5 text-accent" />
          <a href={`mailto:${slide.contactInfo}`} className="hover:text-accent transition-colors">
            {slide.contactInfo}
          </a>
        </div>
      )}
    </div>
  );
}
