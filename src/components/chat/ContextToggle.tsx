import { cn } from '@/lib/utils';
import { Presentation, MessageSquare } from 'lucide-react';

interface ContextToggleProps {
  includeSlideContext: boolean;
  onToggle: () => void;
}

export function ContextToggle({ includeSlideContext, onToggle }: ContextToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
        includeSlideContext
          ? 'bg-primary/10 text-primary hover:bg-primary/20'
          : 'bg-muted text-muted-foreground hover:bg-muted/80'
      )}
    >
      {includeSlideContext ? (
        <>
          <Presentation className="w-3 h-3" />
          Slide context on
        </>
      ) : (
        <>
          <MessageSquare className="w-3 h-3" />
          General mode
        </>
      )}
    </button>
  );
}
