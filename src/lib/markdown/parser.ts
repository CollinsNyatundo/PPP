import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { markedHighlight } from 'marked-highlight';

// Configure marked with syntax highlighting
marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.error('Highlight error:', err);
      }
    }
    return code;
  }
}));

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
});

export function parseMarkdown(markdown: string): string {
  try {
    // Convert markdown to HTML
    const rawHtml = marked.parse(markdown);
    
    // Sanitize HTML
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ADD_TAGS: ['iframe'], // Allow embedded content
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
    });
    
    return cleanHtml;
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return '<p>Error parsing content</p>';
  }
}

export function htmlToMarkdown(html: string): string {
  try {
    const turndown = new (require('turndown'))({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      emDelimiter: '_',
    });
    
    // Add support for tables
    turndown.use(require('turndown-plugin-gfm').gfm);
    
    return turndown.turndown(html);
  } catch (error) {
    console.error('HTML to Markdown conversion error:', error);
    return '';
  }
}