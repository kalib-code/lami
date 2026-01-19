import { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import type { ChatState, ChatAction, ChatMessage } from '@/types/chat';
import { sendChatMessage } from '@/services/openrouter';
import { createSlideContext } from '@/data/slideUtils';
import type { Slide } from '@/data/types';

// Generate unique message ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Initial state
const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
  includeSlideContext: true
};

// Reducer function
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_USER_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: generateId(),
            role: 'user',
            content: action.payload.content,
            timestamp: new Date()
          }
        ],
        error: null
      };

    case 'ADD_ASSISTANT_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: generateId(),
            role: 'assistant',
            content: action.payload.content,
            timestamp: new Date()
          }
        ]
      };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };

    case 'TOGGLE_SLIDE_CONTEXT':
      return { ...state, includeSlideContext: !state.includeSlideContext };

    case 'CLEAR_MESSAGES':
      return { ...state, messages: [], error: null };

    default:
      return state;
  }
}

// Context type
interface ChatContextType {
  state: ChatState;
  sendMessage: (content: string, currentSlide?: Slide, slideNumber?: number, totalSlides?: number) => Promise<void>;
  toggleSlideContext: () => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const sendMessage = useCallback(async (
    content: string,
    currentSlide?: Slide,
    slideNumber?: number,
    totalSlides?: number
  ) => {
    // Add user message
    dispatch({ type: 'ADD_USER_MESSAGE', payload: { content } });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Build messages array including the new user message
      const newUserMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content,
        timestamp: new Date()
      };
      const allMessages = [...state.messages, newUserMessage];

      // Create slide context if enabled and slide data is available
      let slideContext: string | undefined;
      if (state.includeSlideContext && currentSlide && slideNumber && totalSlides) {
        slideContext = createSlideContext(currentSlide, slideNumber, totalSlides);
      }

      // Send to API
      const response = await sendChatMessage(allMessages, slideContext);

      // Add assistant response
      dispatch({ type: 'ADD_ASSISTANT_MESSAGE', payload: { content: response } });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.messages, state.includeSlideContext]);

  const toggleSlideContext = useCallback(() => {
    dispatch({ type: 'TOGGLE_SLIDE_CONTEXT' });
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, []);

  return (
    <ChatContext.Provider value={{ state, sendMessage, toggleSlideContext, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
