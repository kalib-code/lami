import { Link } from 'react-router-dom';
import { usePresentationContext } from '@/context/PresentationContext';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, ExternalLink, FileText, ArrowRight } from 'lucide-react';
import { resources as downloadableResources } from '@/data/resources';

interface ResourceItem {
  name: string;
  url?: string;
  internalUrl?: string;
}

interface ResourceSection {
  category: string;
  items: ResourceItem[];
}

const resources: ResourceSection[] = [
  {
    category: 'Scripture References',
    items: [
      { name: 'Proverbs 9:10 - Fear of the Lord' },
      { name: 'Acts 17:11 - The Berean Standard' },
      { name: '1 Thessalonians 5:21 - Test Everything' },
    ],
  },
];

function ResourcesContent({ onClose }: { onClose?: () => void }) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 py-4 px-6">
        {/* Downloadable Resources Section */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Downloadable Guides
          </h3>
          <ul className="space-y-2">
            {downloadableResources.map((resource) => (
              <li key={resource.id}>
                <Link
                  to={`/resources/${resource.id}`}
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors text-foreground"
                >
                  <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="flex-1 text-sm">{resource.title}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/resources"
            onClick={onClose}
            className="inline-flex items-center gap-1 text-sm text-accent hover:underline mt-3 ml-2"
          >
            View all resources
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Original Resources Sections */}
        {resources.map((section, index) => (
          <div key={index}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {section.category}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.internalUrl ? (
                    <Link
                      to={item.internalUrl}
                      onClick={onClose}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors text-foreground"
                    >
                      <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="flex-1">{item.name}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    </Link>
                  ) : item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors text-foreground"
                    >
                      <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="flex-1">{item.name}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 p-2 text-foreground">
                      <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{item.name}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function ResourcesPanel() {
  const { isResourcesPanelOpen, closeResourcesPanel } = usePresentationContext();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isResourcesPanelOpen} onOpenChange={(open) => !open && closeResourcesPanel()}>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Resources</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <ResourcesContent onClose={closeResourcesPanel} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={isResourcesPanelOpen} onOpenChange={(open) => !open && closeResourcesPanel()}>
      <SheetContent side="right" className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Resources</SheetTitle>
        </SheetHeader>
        <div className="mt-4 h-[calc(100vh-100px)]">
          <ResourcesContent onClose={closeResourcesPanel} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
