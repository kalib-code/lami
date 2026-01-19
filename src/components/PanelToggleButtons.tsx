import { BookOpen, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePresentationContext } from '@/context/PresentationContext';

export function PanelToggleButtons() {
  const {
    isResourcesPanelOpen,
    isChatPanelOpen,
    toggleResourcesPanel,
    toggleChatPanel,
  } = usePresentationContext();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isResourcesPanelOpen ? 'default' : 'ghost'}
        size="icon"
        onClick={toggleResourcesPanel}
        aria-label="Toggle resources panel"
        title="Resources"
      >
        <BookOpen className="w-5 h-5" />
      </Button>

      <Button
        variant={isChatPanelOpen ? 'default' : 'ghost'}
        size="icon"
        onClick={toggleChatPanel}
        aria-label="Toggle chat panel"
        title="AI Chat"
      >
        <MessageCircle className="w-5 h-5" />
      </Button>
    </div>
  );
}
