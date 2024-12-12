import React from 'react';
import { parseMarkdown } from '../../lib/markdown/parser';
import { sanitizeHtml } from '../../lib/markdown/sanitizer';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
}) => {
  const html = React.useMemo(() => {
    const parsedHtml = parseMarkdown(content);
    return sanitizeHtml(parsedHtml);
  }, [content]);

  return (
    <div
      className={`prose prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};