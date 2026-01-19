// Base slide properties shared by all slide types
interface SlideBase {
  id: number;
}

// Title slide - Main presentation title
export interface TitleSlide extends SlideBase {
  type: 'title';
  title: string;
  subtitle?: string;
  author?: string;
}

// Section slide - Part dividers (e.g., "PART 1: DEMYSTIFYING AI")
export interface SectionSlide extends SlideBase {
  type: 'section';
  title: string;
  subtitle?: string;
  duration?: string;
}

// Bullet slide - Lists with title
export interface BulletSlide extends SlideBase {
  type: 'bullet';
  title: string;
  bullets: string[];
  subtitle?: string;
}

// Quote slide - Scripture or blockquotes
export interface QuoteSlide extends SlideBase {
  type: 'quote';
  title?: string;
  quote: string;
  attribution?: string;
  reference?: string;
}

// Comparison slide - Side-by-side comparisons
export interface ComparisonSlide extends SlideBase {
  type: 'comparison';
  title: string;
  left: {
    title: string;
    content: string;
    highlight?: 'positive' | 'negative' | 'neutral';
  };
  right: {
    title: string;
    content: string;
    highlight?: 'positive' | 'negative' | 'neutral';
  };
}

// Table slide - Data tables
export interface TableSlide extends SlideBase {
  type: 'table';
  title: string;
  headers: string[];
  rows: string[][];
  footnote?: string;
}

// Insight slide - Key insight callouts
export interface InsightSlide extends SlideBase {
  type: 'insight';
  title: string;
  insight: string;
  supporting?: string;
}

// Guidelines slide - Numbered guidelines
export interface GuidelinesSlide extends SlideBase {
  type: 'guidelines';
  title: string;
  guideline: string;
  explanation: string;
  number: number;
}

// Resources slide - Links and materials
export interface ResourcesSlide extends SlideBase {
  type: 'resources';
  title: string;
  resources: {
    name: string;
    description?: string;
    url?: string;
  }[];
}

// QA slide - Final Q&A
export interface QASlide extends SlideBase {
  type: 'qa';
  title: string;
  contactInfo?: string;
}

// Discriminated union of all slide types
export type Slide =
  | TitleSlide
  | SectionSlide
  | BulletSlide
  | QuoteSlide
  | ComparisonSlide
  | TableSlide
  | InsightSlide
  | GuidelinesSlide
  | ResourcesSlide
  | QASlide;

// Type guard functions
export function isTitleSlide(slide: Slide): slide is TitleSlide {
  return slide.type === 'title';
}

export function isSectionSlide(slide: Slide): slide is SectionSlide {
  return slide.type === 'section';
}

export function isBulletSlide(slide: Slide): slide is BulletSlide {
  return slide.type === 'bullet';
}

export function isQuoteSlide(slide: Slide): slide is QuoteSlide {
  return slide.type === 'quote';
}

export function isComparisonSlide(slide: Slide): slide is ComparisonSlide {
  return slide.type === 'comparison';
}

export function isTableSlide(slide: Slide): slide is TableSlide {
  return slide.type === 'table';
}

export function isInsightSlide(slide: Slide): slide is InsightSlide {
  return slide.type === 'insight';
}

export function isGuidelinesSlide(slide: Slide): slide is GuidelinesSlide {
  return slide.type === 'guidelines';
}

export function isResourcesSlide(slide: Slide): slide is ResourcesSlide {
  return slide.type === 'resources';
}

export function isQASlide(slide: Slide): slide is QASlide {
  return slide.type === 'qa';
}
