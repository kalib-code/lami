import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { resources } from '@/data/resources';
import { Button } from '@/components/ui/button';

export function ResourceViewer() {
  const { resourceId } = useParams<{ resourceId: string }>();
  const [searchParams] = useSearchParams();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
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

  const handleDownload = async () => {
    if (!contentRef.current || !resource) return;

    setDownloading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;

      // Clone and strip all Tailwind classes to avoid oklch color parsing errors
      const clone = contentRef.current.cloneNode(true) as HTMLElement;

      // Helper to strip classes and apply inline styles
      const processElement = (el: Element) => {
        const element = el as HTMLElement;
        const tagName = element.tagName.toLowerCase();

        // Remove all classes to prevent oklch computed styles
        element.className = '';

        // Apply base inline styles
        element.style.color = '#1a1a1a';
        element.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

        // Tag-specific styles
        switch (tagName) {
          case 'h1':
            element.style.fontSize = '2em';
            element.style.fontWeight = 'bold';
            element.style.marginTop = '0';
            element.style.marginBottom = '0.5em';
            element.style.color = '#000000';
            break;
          case 'h2':
            element.style.fontSize = '1.5em';
            element.style.fontWeight = 'bold';
            element.style.marginTop = '1.5em';
            element.style.marginBottom = '0.5em';
            element.style.color = '#000000';
            break;
          case 'h3':
            element.style.fontSize = '1.25em';
            element.style.fontWeight = 'bold';
            element.style.marginTop = '1.25em';
            element.style.marginBottom = '0.5em';
            element.style.color = '#000000';
            break;
          case 'h4':
            element.style.fontSize = '1.1em';
            element.style.fontWeight = 'bold';
            element.style.marginTop = '1em';
            element.style.marginBottom = '0.5em';
            element.style.color = '#000000';
            break;
          case 'p':
            element.style.marginTop = '0.75em';
            element.style.marginBottom = '0.75em';
            element.style.lineHeight = '1.6';
            break;
          case 'a':
            element.style.color = '#2563eb';
            element.style.textDecoration = 'underline';
            break;
          case 'ul':
          case 'ol':
            element.style.marginTop = '0.75em';
            element.style.marginBottom = '0.75em';
            element.style.paddingLeft = '1.5em';
            break;
          case 'li':
            element.style.marginTop = '0.25em';
            element.style.marginBottom = '0.25em';
            break;
          case 'table':
            element.style.width = '100%';
            element.style.borderCollapse = 'collapse';
            element.style.marginTop = '1em';
            element.style.marginBottom = '1em';
            break;
          case 'th':
            element.style.backgroundColor = '#f5f5f5';
            element.style.border = '1px solid #e5e5e5';
            element.style.padding = '8px';
            element.style.textAlign = 'left';
            element.style.fontWeight = 'bold';
            break;
          case 'td':
            element.style.border = '1px solid #e5e5e5';
            element.style.padding = '8px';
            break;
          case 'blockquote':
            element.style.borderLeft = '3px solid #e5e5e5';
            element.style.paddingLeft = '1em';
            element.style.marginLeft = '0';
            element.style.fontStyle = 'italic';
            element.style.color = '#666666';
            break;
          case 'code':
            element.style.backgroundColor = '#f5f5f5';
            element.style.padding = '2px 4px';
            element.style.borderRadius = '3px';
            element.style.fontSize = '0.9em';
            element.style.fontFamily = 'monospace';
            break;
          case 'pre':
            element.style.backgroundColor = '#f5f5f5';
            element.style.padding = '1em';
            element.style.borderRadius = '4px';
            element.style.overflow = 'auto';
            break;
          case 'hr':
            element.style.border = 'none';
            element.style.borderTop = '1px solid #e5e5e5';
            element.style.marginTop = '2em';
            element.style.marginBottom = '2em';
            break;
          case 'strong':
            element.style.fontWeight = 'bold';
            break;
          case 'em':
            element.style.fontStyle = 'italic';
            break;
        }

        // Process children
        Array.from(element.children).forEach(processElement);
      };

      // Apply container styles
      clone.className = '';
      clone.style.backgroundColor = '#ffffff';
      clone.style.color = '#1a1a1a';
      clone.style.padding = '20px';
      clone.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      clone.style.lineHeight = '1.6';

      // Process all child elements
      Array.from(clone.children).forEach(processElement);

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
        filename: `${resource.id}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const },
      };

      await html2pdf().set(opt).from(clone).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
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
          <Button onClick={handleDownload} disabled={loading || downloading}>
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download PDF
              </>
            )}
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
