import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PresentationProvider } from '@/context/PresentationContext';
import { ChatProvider } from '@/context/ChatContext';
import { Presentation } from '@/components/Presentation';
import { ResourcesPage } from '@/components/ResourcesPage';
import { ResourceViewer } from '@/components/ResourceViewer';

function App() {
  return (
    <BrowserRouter>
      <PresentationProvider>
        <ChatProvider>
        <Routes>
          {/* Main presentation route with slide number */}
          <Route path="/slide/:slideNumber" element={<Presentation />} />

          {/* Resources routes */}
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:resourceId" element={<ResourceViewer />} />

          {/* Redirect root to first slide */}
          <Route path="/" element={<Navigate to="/slide/1" replace />} />

          {/* Redirect any unknown routes to first slide */}
          <Route path="*" element={<Navigate to="/slide/1" replace />} />
        </Routes>
        </ChatProvider>
      </PresentationProvider>
    </BrowserRouter>
  );
}

export default App;
