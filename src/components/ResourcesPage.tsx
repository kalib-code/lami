import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { resources } from '@/data/resources';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <Link
            to="/slide/1"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Presentation
          </Link>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] uppercase">
            Resources
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-2xl">
            Download guides, templates, and research materials for AI ethics in ministry.
          </p>
        </div>

        {/* Resource Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader className="flex-1 pb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10 shrink-0">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-lg md:text-xl font-bold leading-tight">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="text-sm mt-2 line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="gap-3 pt-0">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/resources/${resource.id}`}>
                    View
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link to={`/resources/${resource.id}?download=true`}>
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
