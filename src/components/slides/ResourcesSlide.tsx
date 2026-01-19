import { ExternalLink } from 'lucide-react';
import type { ResourcesSlide as ResourcesSlideType } from '@/data/types';

interface ResourcesSlideProps {
  slide: ResourcesSlideType;
}

export function ResourcesSlide({ slide }: ResourcesSlideProps) {
  return (
    <div className="flex flex-col h-full px-8 md:px-16 lg:px-24 py-8 md:py-12 animate-fade-in">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] uppercase mb-10 md:mb-14">
        {slide.title}
      </h2>

      <div className="flex-1 grid md:grid-cols-2 gap-8 md:gap-10">
        {slide.resources.map((resource, index) => (
          <div key={index} className="border-l-4 border-accent pl-8 py-3">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              {resource.name}
            </h3>
            {resource.description && (
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4">
                {resource.description}
              </p>
            )}
            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-accent hover:underline text-lg md:text-xl lg:text-2xl font-semibold"
              >
                <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
                Visit Resource
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
