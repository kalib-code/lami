import type { Slide } from '@/data/types';
import {
  TitleSlide,
  SectionSlide,
  BulletSlide,
  QuoteSlide,
  ComparisonSlide,
  TableSlide,
  InsightSlide,
  GuidelinesSlide,
  ResourcesSlide,
  QASlide,
} from './slides';

interface SlideRendererProps {
  slide: Slide;
}

/**
 * Maps slide type to the appropriate component
 * Uses TypeScript's discriminated union narrowing for type safety
 */
export function SlideRenderer({ slide }: SlideRendererProps) {
  switch (slide.type) {
    case 'title':
      return <TitleSlide slide={slide} />;
    case 'section':
      return <SectionSlide slide={slide} />;
    case 'bullet':
      return <BulletSlide slide={slide} />;
    case 'quote':
      return <QuoteSlide slide={slide} />;
    case 'comparison':
      return <ComparisonSlide slide={slide} />;
    case 'table':
      return <TableSlide slide={slide} />;
    case 'insight':
      return <InsightSlide slide={slide} />;
    case 'guidelines':
      return <GuidelinesSlide slide={slide} />;
    case 'resources':
      return <ResourcesSlide slide={slide} />;
    case 'qa':
      return <QASlide slide={slide} />;
    default:
      // TypeScript will error if we miss a case
      const _exhaustiveCheck: never = slide;
      return <div>Unknown slide type: {(_exhaustiveCheck as Slide).type}</div>;
  }
}
