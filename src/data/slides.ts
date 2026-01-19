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

  // Slide 2: Section - Part 1
  {
    id: 2,
    type: 'section',
    title: 'PART 1',
    subtitle: 'Demystifying AI',
    duration: '5 min',
  },

  // Slide 3: What Is AI, Really?
  {
    id: 3,
    type: 'bullet',
    title: 'What Is AI, Really?',
    bullets: [
      'AI is software that recognizes patterns in data',
      'It learns from examples, not rules programmed by humans',
      'Modern AI is trained on vast amounts of text from the internet',
      'It generates responses by predicting what words come next',
    ],
  },

  // Slide 4: How AI Actually Works
  {
    id: 4,
    type: 'bullet',
    title: 'How AI Actually Works',
    subtitle: 'The Technical Foundation',
    bullets: [
      'Large Language Models (LLMs) are trained on billions of text samples',
      'They learn statistical relationships between words and concepts',
      'When prompted, they generate text one word at a time',
      'Each word is chosen based on probability, not understanding',
    ],
  },

  // Slide 5: The Simple Version
  {
    id: 5,
    type: 'bullet',
    title: 'The Simple Version',
    subtitle: 'Understanding AI Without the Jargon',
    bullets: [
      'Think of AI as the world\'s most sophisticated autocomplete',
      'It predicts what text should come next based on patterns',
      'It doesn\'t "know" things—it predicts likely responses',
      'It has no beliefs, values, or experiences of its own',
    ],
  },

  // Slide 6: What AI is NOT
  {
    id: 6,
    type: 'bullet',
    title: 'What AI is NOT',
    bullets: [
      'NOT a thinking being with consciousness',
      'NOT infallible or always accurate',
      'NOT a replacement for human wisdom and discernment',
      'NOT able to have genuine spiritual experiences',
      'NOT capable of true understanding or belief',
    ],
  },

  // Slide 7: The Key Insight
  {
    id: 7,
    type: 'insight',
    title: 'The Key Insight',
    insight: 'AI predicts—it doesn\'t know.',
    supporting: 'When AI answers a theological question, it\'s generating what statistically looks like a good answer based on its training data, not drawing from genuine understanding or faith.',
  },

  // Slide 8: Section - Part 2
  {
    id: 8,
    type: 'section',
    title: 'PART 2',
    subtitle: 'What the Research Shows',
    duration: '10 min',
  },

  // Slide 9: Two Major Studies
  {
    id: 9,
    type: 'bullet',
    title: 'Two Major Studies (2025)',
    bullets: [
      'Gospel Coalition: Tested AI responses to doctrinal questions',
      'Gloo Study: Comprehensive analysis of AI performance across spiritual domains',
      'Both reveal systematic patterns in how AI handles faith topics',
      'Results have significant implications for pastoral ministry',
    ],
  },

  // Slide 10: Gospel Coalition Findings
  {
    id: 10,
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

  // Slide 11: The Resurrection Question
  {
    id: 11,
    type: 'comparison',
    title: 'The Resurrection Question',
    left: {
      title: 'DeepSeek R1',
      content: '"The resurrection is a matter of faith interpretation. Many scholars view it as symbolic of spiritual renewal rather than a literal historical event."',
      highlight: 'negative',
    },
    right: {
      title: 'Meta Llama',
      content: '"Christians believe Jesus rose from the dead. This belief is central to Christian faith, though views on its literal nature vary among denominations."',
      highlight: 'neutral',
    },
  },

  // Slide 12: Gloo Study Results
  {
    id: 12,
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

  // Slide 13: The Christian Lens Drop
  {
    id: 13,
    type: 'insight',
    title: 'The Christian Lens Drop',
    insight: 'AI consistently softens or removes distinctly Christian perspectives.',
    supporting: 'When asked about sin, salvation, or eternal judgment, AI tends to present these as "one perspective among many" rather than as truth claims central to Christian faith.',
  },

  // Slide 14: Three Patterns of Theological Erosion
  {
    id: 14,
    type: 'bullet',
    title: 'Three Patterns of Theological Erosion',
    bullets: [
      'Relativization: "Christians believe..." rather than "The Bible teaches..."',
      'Softening: Reducing doctrinal distinctives to generic spirituality',
      'Omission: Leaving out challenging aspects like judgment, repentance, or exclusivity',
    ],
  },

  // Slide 15: Neutrality Isn't Neutral
  {
    id: 15,
    type: 'insight',
    title: 'Neutrality Isn\'t Neutral',
    insight: 'When AI presents all religious views as equally valid, it\'s making a theological claim.',
    supporting: 'The stance that "all paths are equally true" is itself a worldview (religious pluralism) that contradicts Christian exclusivity claims like John 14:6.',
  },

  // Slide 16: Section - Part 3
  {
    id: 16,
    type: 'section',
    title: 'PART 3',
    subtitle: 'Why This Matters for Pastors',
    duration: '7 min',
  },

  // Slide 17: Your Congregation Is Being Catechized
  {
    id: 17,
    type: 'insight',
    title: 'Your Congregation Is Being Catechized',
    insight: 'Every day, AI is teaching your congregation theology—whether you\'re involved or not.',
    supporting: 'Pew Research: 23% of Americans have used AI for spiritual questions. Among young adults (18-29), it\'s 41%.',
  },

  // Slide 18: The Pastoral Visit You Never Knew Happened
  {
    id: 18,
    type: 'bullet',
    title: 'The Pastoral Visit You Never Knew Happened',
    subtitle: 'AI as Informal Spiritual Advisor',
    bullets: [
      'Your congregation member faces a crisis at 2 AM',
      'They ask ChatGPT for spiritual guidance',
      'AI provides instant, confident answers',
      'No context, no relationship, no accountability',
      'The next Sunday, they\'re processing AI\'s theology, not yours',
    ],
  },

  // Slide 19: The Problem
  {
    id: 19,
    type: 'insight',
    title: 'The Problem',
    insight: 'AI is becoming the first responder to spiritual crises.',
    supporting: 'By the time people reach out to their pastor, AI has already shaped their thinking. We\'re doing follow-up pastoral care on AI-formed theology.',
  },

  // Slide 20: Section - Part 4
  {
    id: 20,
    type: 'section',
    title: 'PART 4',
    subtitle: 'A Framework for Wise AI Use',
    duration: '10 min',
  },

  // Slide 21: The Tool Principle
  {
    id: 21,
    type: 'quote',
    title: 'The Tool Principle',
    quote: 'The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding.',
    reference: 'Proverbs 9:10',
    attribution: 'Solomon',
  },

  // Slide 22: The Berean Approach
  {
    id: 22,
    type: 'quote',
    title: 'The Berean Approach',
    quote: 'Now the Berean Jews were of more noble character than those in Thessalonica, for they received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true.',
    reference: 'Acts 17:11',
  },

  // Slide 23: Four Guidelines for Wise AI Use
  {
    id: 23,
    type: 'bullet',
    title: 'Four Guidelines for Wise AI Use',
    subtitle: 'A Pastoral Framework',
    bullets: [
      '1. AI is mechanical, not spiritual',
      '2. Use AI to expand research, not to originate theology',
      '3. Treat AI as a conversation partner, not an authority',
      '4. Always verify AI outputs against Scripture and tradition',
    ],
  },

  // Slide 24: Guideline 1 - Mechanical, Not Spiritual
  {
    id: 24,
    type: 'guidelines',
    number: 1,
    title: 'Guideline 1',
    guideline: 'AI is Mechanical, Not Spiritual',
    explanation: 'AI processes patterns, not truth. It has no Spirit, no faith, no relationship with God. It cannot pray, worship, or be transformed. Treat its outputs as data processing, not divine insight.',
  },

  // Slide 25: Guideline 2 - Expand, Not Originate
  {
    id: 25,
    type: 'guidelines',
    number: 2,
    title: 'Guideline 2',
    guideline: 'Expand Research, Don\'t Originate Theology',
    explanation: 'AI excels at finding information, organizing data, and suggesting connections. It fails at theological judgment, spiritual discernment, and pastoral wisdom. Use it to gather, not to conclude.',
  },

  // Slide 26: Guideline 3 - Conversation Partner
  {
    id: 26,
    type: 'guidelines',
    number: 3,
    title: 'Guideline 3',
    guideline: 'AI as Conversation Partner, Not Authority',
    explanation: 'Engage AI like you would a well-read but theologically untrained assistant. Question its answers. Push back on its assumptions. Never let it have the final word on spiritual matters.',
  },

  // Slide 27: Guideline 4 - Always Verify
  {
    id: 27,
    type: 'guidelines',
    number: 4,
    title: 'Guideline 4',
    guideline: 'Always Verify Against Scripture and Tradition',
    explanation: 'AI will confidently cite sources that don\'t exist and make claims that sound true. Apply the Berean standard: check everything against Scripture, historic creeds, and trusted theologians.',
  },

  // Slide 28: The 70% Problem
  {
    id: 28,
    type: 'insight',
    title: 'The 70% Problem',
    insight: 'AI is approximately 70% accurate on theology—enough to seem trustworthy, not enough to be reliable.',
    supporting: 'This is the danger zone: accurate enough that errors aren\'t obvious, but flawed enough that uncritical use leads to theological drift.',
  },

  // Slide 29: What This Means for Preaching
  {
    id: 29,
    type: 'bullet',
    title: 'What This Means for Preaching',
    bullets: [
      'AI can help with sermon research and outline organization',
      'AI should never write your sermons—your voice matters',
      'Always fact-check AI biblical references and quotations',
      'AI cannot replace the Spirit-led work of application',
      'Your congregation needs your processed wisdom, not AI\'s processed data',
    ],
  },

  // Slide 30: Section - Closing
  {
    id: 30,
    type: 'section',
    title: 'CLOSING',
    subtitle: 'Reclaiming Pastoral Presence',
    duration: '3 min',
  },

  // Slide 31: What AI Cannot Do
  {
    id: 31,
    type: 'bullet',
    title: 'What AI Cannot Do',
    subtitle: 'The Irreplaceable Role of the Pastor',
    bullets: [
      'Sit with someone in their grief',
      'Pray with the power of the Spirit',
      'Speak prophetically to a specific situation',
      'Embody the love of Christ in relationship',
      'Know your congregation\'s stories and struggles',
      'Be transformed by the same Gospel you proclaim',
    ],
  },

  // Slide 32: The Opportunity
  {
    id: 32,
    type: 'insight',
    title: 'The Opportunity',
    insight: 'In an age of artificial intelligence, authentic presence becomes more valuable, not less.',
    supporting: 'The church\'s superpower isn\'t information—it\'s incarnation. AI can answer questions; only you can be present.',
  },

  // Slide 33: Your Call to Action
  {
    id: 33,
    type: 'bullet',
    title: 'Your Call to Action',
    bullets: [
      'Educate your congregation about AI\'s limitations',
      'Position yourself as the trusted guide for spiritual questions',
      'Create spaces where people can process AI encounters',
      'Model wise AI use in your own ministry',
      'Stay curious, stay cautious, stay connected',
    ],
  },

  // Slide 34: Final Word
  {
    id: 34,
    type: 'quote',
    title: 'Final Word',
    quote: 'Examine everything carefully; hold fast to that which is good.',
    reference: '1 Thessalonians 5:21 (NASB)',
  },

  // Slide 35: Resources
  {
    id: 35,
    type: 'resources',
    title: 'Resources',
    resources: [
      {
        name: 'Gospel Coalition AI Study',
        description: 'Full research report on AI theological accuracy',
        url: 'https://www.thegospelcoalition.org/article/ai-theology/',
      },
      {
        name: 'Gloo AI Research',
        description: 'Comprehensive AI performance analysis',
        url: 'https://www.gloo.us/ai-research',
      },
      {
        name: 'AI and the Church (Book)',
        description: 'A pastoral guide to artificial intelligence',
      },
      {
        name: 'This Presentation',
        description: 'Slides and notes available online',
      },
    ],
  },

  // Slide 36: Q&A
  {
    id: 36,
    type: 'qa',
    title: 'Questions & Discussion',
    contactInfo: 'kalib@alibuas.com',
  },
];

export const totalSlides = slides.length;
