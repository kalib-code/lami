import type { Slide } from './types';

/**
 * Extracts readable text content from any slide type.
 * Uses exhaustive switch to ensure all slide types are handled.
 */
export function extractSlideText(slide: Slide): string {
  switch (slide.type) {
    case 'title': {
      const parts = [slide.title];
      if (slide.subtitle) parts.push(slide.subtitle);
      if (slide.author) parts.push(`By: ${slide.author}`);
      return parts.join('\n');
    }

    case 'section': {
      const parts = [slide.title];
      if (slide.subtitle) parts.push(slide.subtitle);
      if (slide.duration) parts.push(`Duration: ${slide.duration}`);
      return parts.join('\n');
    }

    case 'bullet': {
      const parts = [slide.title];
      if (slide.subtitle) parts.push(slide.subtitle);
      parts.push(''); // blank line before bullets
      slide.bullets.forEach((bullet, i) => {
        parts.push(`${i + 1}. ${bullet}`);
      });
      return parts.join('\n');
    }

    case 'quote': {
      const parts: string[] = [];
      if (slide.title) parts.push(slide.title);
      parts.push(`"${slide.quote}"`);
      if (slide.attribution) parts.push(`— ${slide.attribution}`);
      if (slide.reference) parts.push(`(${slide.reference})`);
      return parts.join('\n');
    }

    case 'comparison': {
      const parts = [
        slide.title,
        '',
        `${slide.left.title}:`,
        slide.left.content,
        '',
        `${slide.right.title}:`,
        slide.right.content,
      ];
      return parts.join('\n');
    }

    case 'table': {
      const parts = [slide.title, ''];
      // Header row
      parts.push(slide.headers.join(' | '));
      parts.push(slide.headers.map(() => '---').join(' | '));
      // Data rows
      slide.rows.forEach((row) => {
        parts.push(row.join(' | '));
      });
      if (slide.footnote) {
        parts.push('');
        parts.push(`Note: ${slide.footnote}`);
      }
      return parts.join('\n');
    }

    case 'insight': {
      const parts = [slide.title, '', `Key Insight: ${slide.insight}`];
      if (slide.supporting) parts.push('', slide.supporting);
      return parts.join('\n');
    }

    case 'guidelines': {
      return [
        slide.title,
        '',
        `Guideline #${slide.number}: ${slide.guideline}`,
        '',
        slide.explanation,
      ].join('\n');
    }

    case 'resources': {
      const parts = [slide.title, ''];
      slide.resources.forEach((resource) => {
        parts.push(`- ${resource.name}`);
        if (resource.description) parts.push(`  ${resource.description}`);
        if (resource.url) parts.push(`  URL: ${resource.url}`);
      });
      return parts.join('\n');
    }

    case 'qa': {
      const parts = [slide.title];
      if (slide.contactInfo) parts.push('', `Contact: ${slide.contactInfo}`);
      return parts.join('\n');
    }

    default: {
      // TypeScript exhaustiveness check - this should never be reached
      const _exhaustive: never = slide;
      return `Unknown slide type: ${(_exhaustive as Slide).type}`;
    }
  }
}

/**
 * Creates a formatted context string for the AI including slide number and content.
 */
export function createSlideContext(
  slide: Slide,
  slideNumber: number,
  totalSlides: number
): string {
  const slideText = extractSlideText(slide);
  return `[Current Slide ${slideNumber} of ${totalSlides}]
Type: ${slide.type}

${slideText}`;
}
