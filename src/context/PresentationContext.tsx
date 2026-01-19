import { createContext, useContext, useState, ReactNode } from 'react';

interface PresentationContextType {
  isResourcesPanelOpen: boolean;
  isChatPanelOpen: boolean;
  openResourcesPanel: () => void;
  closeResourcesPanel: () => void;
  toggleResourcesPanel: () => void;
  openChatPanel: () => void;
  closeChatPanel: () => void;
  toggleChatPanel: () => void;
}

const PresentationContext = createContext<PresentationContextType | null>(null);

interface PresentationProviderProps {
  children: ReactNode;
}

export function PresentationProvider({ children }: PresentationProviderProps) {
  const [isResourcesPanelOpen, setIsResourcesPanelOpen] = useState(false);
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(false);

  const openResourcesPanel = () => {
    setIsResourcesPanelOpen(true);
    setIsChatPanelOpen(false); // Close chat when opening resources
  };

  const closeResourcesPanel = () => setIsResourcesPanelOpen(false);

  const toggleResourcesPanel = () => {
    if (isResourcesPanelOpen) {
      closeResourcesPanel();
    } else {
      openResourcesPanel();
    }
  };

  const openChatPanel = () => {
    setIsChatPanelOpen(true);
    setIsResourcesPanelOpen(false); // Close resources when opening chat
  };

  const closeChatPanel = () => setIsChatPanelOpen(false);

  const toggleChatPanel = () => {
    if (isChatPanelOpen) {
      closeChatPanel();
    } else {
      openChatPanel();
    }
  };

  return (
    <PresentationContext.Provider
      value={{
        isResourcesPanelOpen,
        isChatPanelOpen,
        openResourcesPanel,
        closeResourcesPanel,
        toggleResourcesPanel,
        openChatPanel,
        closeChatPanel,
        toggleChatPanel,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentationContext() {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentationContext must be used within a PresentationProvider');
  }
  return context;
}
