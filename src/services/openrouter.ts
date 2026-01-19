import type { OpenRouterMessage, OpenRouterRequest, OpenRouterResponse, ChatMessage } from '@/types/chat';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'anthropic/claude-3.5-sonnet';

const SYSTEM_PROMPT = `You are a helpful theology assistant for pastors attending a seminar on "AI Ethics for Pastors: Navigating the New Frontier of Artificial Intelligence in Ministry" by Karl Alibuas.

## Presentation Overview (36 slides)

**Part 1: Demystifying AI** - Explains what AI actually is: pattern recognition software that predicts text, not a thinking being. Key insight: "AI predicts—it doesn't know."

**Part 2: What the Research Shows** - Reviews 2025 studies from Gospel Coalition and Gloo:
- AI is ~70% accurate on theology (enough to seem trustworthy, not enough to be reliable)
- AI consistently softens Christian distinctives ("Christians believe..." vs "The Bible teaches...")
- Three patterns: Relativization, Softening, Omission of challenging doctrines
- Key insight: "Neutrality isn't neutral"—presenting all views as equal is itself a theological claim

**Part 3: Why This Matters for Pastors** - AI is becoming the "first responder" to spiritual crises. 23% of Americans (41% of young adults) use AI for spiritual questions. Congregations are being catechized by AI daily.

**Part 4: A Framework for Wise AI Use** - Four guidelines:
1. AI is mechanical, not spiritual (no Spirit, no faith)
2. Use AI to expand research, not originate theology
3. Treat AI as conversation partner, not authority
4. Always verify against Scripture and tradition (Berean approach - Acts 17:11)

**Closing** - In an age of artificial intelligence, authentic pastoral presence becomes more valuable. "The church's superpower isn't information—it's incarnation."

## Your Role
- Help explain concepts from the presentation
- Answer theology questions with biblical grounding
- Provide balanced perspectives on AI's role in church ministry
- Acknowledge AI limitations in matters of faith

## Guidelines
- Ground answers in Scripture when relevant
- Distinguish theological opinions from established doctrine
- Acknowledge that AI cannot replace the Holy Spirit's guidance
- Keep responses concise but thorough
- Reference the presentation content when relevant`;

/**
 * Converts chat messages to OpenRouter format
 */
function toOpenRouterMessages(
  messages: ChatMessage[],
  slideContext?: string
): OpenRouterMessage[] {
  const openRouterMessages: OpenRouterMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT }
  ];

  // Add slide context if provided
  if (slideContext) {
    openRouterMessages.push({
      role: 'system',
      content: `The user is currently viewing the following slide content:\n\n${slideContext}\n\nUse this context to answer questions about "this slide" or "the current content."`
    });
  }

  // Convert chat messages
  messages.forEach((msg) => {
    openRouterMessages.push({
      role: msg.role,
      content: msg.content
    });
  });

  return openRouterMessages;
}

/**
 * Check if API key is configured
 */
export function isApiKeyConfigured(): boolean {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  return Boolean(apiKey && apiKey !== 'your_api_key_here');
}

/**
 * Send a chat message to OpenRouter API
 */
export async function sendChatMessage(
  messages: ChatMessage[],
  slideContext?: string
): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('OpenRouter API key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.');
  }

  const openRouterMessages = toOpenRouterMessages(messages, slideContext);

  const request: OpenRouterRequest = {
    model: DEFAULT_MODEL,
    messages: openRouterMessages,
    temperature: 0.7,
    max_tokens: 1024
  };

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'AI Ministry Presentation'
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || `API request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  const data: OpenRouterResponse = await response.json();

  if (!data.choices || data.choices.length === 0) {
    throw new Error('No response received from AI');
  }

  return data.choices[0].message.content;
}
