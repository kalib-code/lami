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

      const opt = {
        margin: [0.75, 0.75, 0.75, 0.75] as [number, number, number, number],
        filename: `${resource.id}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const },
      };

      await html2pdf().set(opt).from(contentRef.current).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
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
