import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Printer, Loader2 } from 'lucide-react';
import { resources } from '@/data/resources';
import { Button } from '@/components/ui/button';

export function ResourceViewer() {
  const { resourceId } = useParams<{ resourceId: string }>();
  const [searchParams] = useSearchParams();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const resource = resources.find((r) => r.id === resourceId);

  useEffect(() => {
    if (!resource) return;

    const fetchContent = async () => {
      try {
        const response = await fetch(`/resources/${resource.filename}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching resource:', error);
        setContent('# Error\n\nFailed to load resource content.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [resource]);

  useEffect(() => {
    if (searchParams.get('download') === 'true' && content && !loading) {
      handleDownload();
    }
  }, [searchParams, content, loading]);

  const handleDownload = () => {
    if (!contentRef.current || !resource) return;

    // Create a print-friendly window
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download PDF');
      return;
    }

    // Clone content and strip all classes
    const clone = contentRef.current.cloneNode(true) as HTMLElement;
    const stripClasses = (el: Element) => {
      (el as HTMLElement).className = '';
      Array.from(el.children).forEach(stripClasses);
    };
    stripClasses(clone);

    // Build the print document using DOM methods
    const doc = printWindow.document;
    doc.title = resource.title;

    // Add styles
    const style = doc.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #1a1a1a;
        background: #ffffff;
        padding: 40px;
        line-height: 1.7;
        margin: 0 auto;
        max-width: 800px;
      }
      h1 { font-size: 2em; font-weight: bold; margin: 0 0 0.75em 0; color: #000; }
      h2 { font-size: 1.5em; font-weight: bold; margin: 1.5em 0 0.5em 0; color: #000; }
      h3 { font-size: 1.25em; font-weight: bold; margin: 1.25em 0 0.5em 0; color: #000; }
      h4 { font-size: 1.1em; font-weight: bold; margin: 1em 0 0.5em 0; color: #000; }
      p { margin: 0.75em 0; }
      a { color: #2563eb; text-decoration: underline; }
      ul, ol { margin: 0.75em 0; padding-left: 1.5em; }
      li { margin: 0.25em 0; }
      table { width: 100%; border-collapse: collapse; margin: 1em 0; }
      th { background: #f5f5f5; border: 1px solid #ccc; padding: 10px; text-align: left; font-weight: bold; }
      td { border: 1px solid #ccc; padding: 10px; }
      blockquote { border-left: 4px solid #ccc; padding-left: 1em; margin: 1em 0; font-style: italic; color: #555; }
      code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-size: 0.9em; font-family: monospace; }
      pre { background: #f5f5f5; padding: 1em; border-radius: 4px; overflow: auto; }
      pre code { background: none; padding: 0; }
      hr { border: none; border-top: 2px solid #e5e5e5; margin: 2em 0; }
      strong { font-weight: bold; }
      em { font-style: italic; }
      @media print {
        body { padding: 20px; }
        a { color: #000; text-decoration: underline; }
      }
    `;
    doc.head.appendChild(style);

    // Add content
    doc.body.appendChild(clone);

    // Trigger print after content loads
    printWindow.onload = () => {
      printWindow.print();
    };

    // Also try printing immediately for browsers that don't fire onload
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  if (!resource) {
    return <Navigate to="/resources" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Resources
          </Link>
          <Button onClick={handleDownload} disabled={loading}>
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </Button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div
            ref={contentRef}
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:mb-8 prose-h1:mt-0
              prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-lg prose-h4:md:text-xl prose-h4:mt-6 prose-h4:mb-3
              prose-p:text-base prose-p:md:text-lg prose-p:leading-relaxed prose-p:my-4
              prose-li:text-base prose-li:md:text-lg prose-li:my-2 prose-li:leading-relaxed
              prose-ul:my-4 prose-ol:my-4
              prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:text-muted-foreground prose-blockquote:italic prose-blockquote:my-6 prose-blockquote:pl-6 prose-blockquote:py-1
              prose-strong:text-foreground prose-strong:font-bold
              [&_p]:mb-5 [&_strong]:mr-1
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              [&_hr]:my-12 [&_hr]:border-t-2 [&_hr]:border-muted-foreground/30
              [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_table]:border [&_table]:border-border
              [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-3 [&_th]:text-left [&_th]:font-bold
              [&_td]:border [&_td]:border-border [&_td]:p-3"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
