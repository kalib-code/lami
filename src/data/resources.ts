export interface Resource {
  id: string;
  title: string;
  description: string;
  filename: string;
}

export const resources: Resource[] = [
  {
    id: '10-rules-ai-pastors',
    title: '10 Rules for Pastors Using AI',
    description: 'Scripture-grounded guidelines for responsible AI use in pastoral ministry.',
    filename: '10-rules-ai-pastors.md',
  },
  {
    id: 'ai-ethics-presentation',
    title: 'AI Ethics Presentation',
    description: 'Comprehensive overview of ethical considerations for AI in church contexts.',
    filename: 'ai-ethics-presentation.md',
  },
  {
    id: 'ai-ethics-study-guide',
    title: 'AI Ethics Study Guide',
    description: 'Discussion questions and study materials for small groups and classes.',
    filename: 'ai-ethics-study-guide.md',
  },
  {
    id: 'ai-research-studies-2025',
    title: 'AI Research Studies 2025',
    description: 'Latest research findings on AI performance with faith-based questions.',
    filename: 'ai-research-studies-2025.md',
  },
  {
    id: 'chatgpt-sermon-prep-tips',
    title: 'ChatGPT Sermon Prep Tips',
    description: 'Practical strategies for using AI tools effectively in sermon preparation.',
    filename: 'chatgpt-sermon-prep-tips.md',
  },
  {
    id: 'sermon-prep-prompt-templates',
    title: 'Sermon Prep Prompt Templates',
    description: 'Ready-to-use prompts for various sermon preparation tasks.',
    filename: 'sermon-prep-prompt-templates.md',
  },
];
