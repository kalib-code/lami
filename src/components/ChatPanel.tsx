import { useParams } from 'react-router-dom';
import { usePresentationContext } from '@/context/PresentationContext';
import { useChatContext } from '@/context/ChatContext';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { MessageList, ChatInput, ContextToggle } from '@/components/chat';
import { slides, totalSlides } from '@/data/slides';
import { isApiKeyConfigured } from '@/services/openrouter';
import { AlertCircle, Trash2, Lock } from 'lucide-react';

// Chat lock date: January 25, 2026
const CHAT_LOCK_DATE = new Date('2026-01-25T00:00:00');

function isChatLocked(): boolean {
  return new Date() >= CHAT_LOCK_DATE;
}

function ChatLocked() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center">
        <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Chat Unavailable
        </h3>
        <p className="text-sm text-muted-foreground max-w-[280px]">
          The AI assistant for this presentation has expired. Thank you for attending!
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          Contact: kalib@alibuas.com
        </p>
      </div>
    </div>
  );
}

function ApiKeyNotConfigured() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          API Key Required
        </h3>
        <p className="text-sm text-muted-foreground max-w-[280px] mb-4">
          To use the AI assistant, add your OpenRouter API key to the environment.
        </p>
        <div className="text-left bg-muted rounded-md p-3 text-xs font-mono">
          <p className="text-muted-foreground mb-1"># Create .env file:</p>
          <p className="text-foreground">VITE_OPENROUTER_API_KEY=your_key</p>
        </div>
      </div>
    </div>
  );
}

function ChatContent() {
  const { slideNumber } = useParams<{ slideNumber: string }>();
  const { state, sendMessage, toggleSlideContext, clearMessages } = useChatContext();

  // Get current slide data
  const currentSlideNum = parseInt(slideNumber || '1', 10) || 1;
  const currentSlide = slides[currentSlideNum - 1];

  // Check if chat is locked (after Jan 25, 2026)
  if (isChatLocked()) {
    return <ChatLocked />;
  }

  // Check if API is configured
  if (!isApiKeyConfigured()) {
    return <ApiKeyNotConfigured />;
  }

  const handleSend = (content: string) => {
    sendMessage(content, currentSlide, currentSlideNum, totalSlides);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header controls */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <ContextToggle
          includeSlideContext={state.includeSlideContext}
          onToggle={toggleSlideContext}
        />
        {state.messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearMessages}
            className="text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Error display */}
      {state.error && (
        <div className="mx-4 mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive">{state.error}</p>
        </div>
      )}

      {/* Messages */}
      <MessageList messages={state.messages} isLoading={state.isLoading} />

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={state.isLoading} />
    </div>
  );
}

export function ChatPanel() {
  const { isChatPanelOpen, closeChatPanel } = usePresentationContext();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isChatPanelOpen} onOpenChange={(open) => !open && closeChatPanel()}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>AI Assistant</DrawerTitle>
          </DrawerHeader>
          <div className="h-[70vh]">
            <ChatContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={isChatPanelOpen} onOpenChange={(open) => !open && closeChatPanel()}>
      <SheetContent side="right" className="w-[400px] p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle>AI Assistant</SheetTitle>
        </SheetHeader>
        <div className="h-[calc(100vh-80px)]">
          <ChatContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}
