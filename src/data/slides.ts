import { Slide } from './types';

export const slides: Slide[] = [
  // Slide 1: Title
  {
    id: 1,
    type: 'title',
    title: 'AI Ethics for Pastors',
    subtitle: 'Navigating the New Frontier of Artificial Intelligence in Ministry',
    author: 'Karl Alibuas — Software Developer | Faith & Technology Advocate',
  },

  // Slide 2: What Is AI, Really?
  {
    id: 2,
    type: 'bullet',
    title: 'What Is AI, Really?',
    bullets: [
      'AI is software that recognizes patterns in data',
      'It learns from examples, not rules programmed by humans',
      'Modern AI is trained on vast amounts of text from the internet',
      'It generates responses by predicting what words come next',
    ],
  },

  // Slide 3: The Key Insight
  {
    id: 3,
    type: 'insight',
    title: 'The Key Insight',
    insight: 'AI predicts—it doesn\'t know.',
    supporting: 'When AI answers a theological question, it\'s generating what statistically looks like a good answer based on its training data, not drawing from genuine understanding or faith.',
  },

  // Slide 4: Section - Part 2
  {
    id: 4,
    type: 'section',
    title: 'PART 2',
    subtitle: 'What the Research Shows',
  },

  // Slide 5: Two Major Studies
  {
    id: 5,
    type: 'bullet',
    title: 'Two Major Studies (2025)',
    bullets: [
      'Gospel Coalition: Tested AI responses to doctrinal questions',
      'Gloo Study: Comprehensive analysis of AI performance across spiritual domains',
      'Both reveal systematic patterns in how AI handles faith topics',
      'Results have significant implications for pastoral ministry',
    ],
  },

  // Slide 6: Gospel Coalition Findings
  {
    id: 6,
    type: 'table',
    title: 'Gospel Coalition Findings',
    headers: ['AI Model', 'Doctrinal Accuracy', 'Theological Depth', 'Pastoral Sensitivity'],
    rows: [
      ['ChatGPT (GPT-4)', '72%', 'Moderate', 'Low'],
      ['Claude', '68%', 'High', 'Moderate'],
      ['Google Gemini', '65%', 'Low', 'Low'],
      ['Meta Llama', '58%', 'Low', 'Very Low'],
    ],
    footnote: 'Accuracy measured against historic Christian orthodoxy',
  },

  // Slide 7: Gloo Study Results
  {
    id: 7,
    type: 'table',
    title: 'Gloo Study: AI Performance by Domain',
    headers: ['Domain', 'Accuracy', 'Risk Level'],
    rows: [
      ['General Biblical Knowledge', '78%', 'Moderate'],
      ['Doctrinal Questions', '64%', 'High'],
      ['Pastoral Counseling', '52%', 'Very High'],
      ['Ethical Guidance', '71%', 'High'],
      ['Spiritual Formation', '45%', 'Critical'],
    ],
  },

  // Slide 8: The Christian Lens Drop
  {
    id: 8,
    type: 'insight',
    title: 'The Christian Lens Drop',
    insight: 'AI consistently softens or removes distinctly Christian perspectives.',
    supporting: 'When asked about sin, salvation, or eternal judgment, AI tends to present these as "one perspective among many" rather than as truth claims central to Christian faith.',
  },

  // Slide 9: Three Patterns of Theological Erosion
  {
    id: 9,
    type: 'bullet',
    title: 'Three Patterns of Theological Erosion',
    bullets: [
      'Relativization: "Christians believe..." rather than "The Bible teaches..."',
      'Softening: Reducing doctrinal distinctives to generic spirituality',
      'Omission: Leaving out challenging aspects like judgment, repentance, or exclusivity',
    ],
  },

  // Slide 10: The 70% Problem
  {
    id: 10,
    type: 'insight',
    title: 'The 70% Problem',
    insight: 'AI is approximately 70% accurate on theology—enough to seem trustworthy, not enough to be reliable.',
    supporting: 'This is the danger zone: accurate enough that errors aren\'t obvious, but flawed enough that uncritical use leads to theological drift.',
  },

  // Slide 11: Q&A
  {
    id: 11,
    type: 'qa',
    title: 'Questions & Discussion',
    contactInfo: 'kalib@alibuas.com',
  },
];

export const totalSlides = slides.length;
