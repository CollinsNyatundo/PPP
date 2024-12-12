import DOMPurify from 'dompurify';

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'b', 'i', 'strong', 'em',
  'ul', 'ol', 'li', 'blockquote', 'code',
  'pre', 'a', 'img', 'table', 'thead',
  'tbody', 'tr', 'th', 'td', 'hr',
  'del', 'ins', 'sup', 'sub',
];

const ALLOWED_ATTR = [
  'href', 'src', 'alt', 'title',
  'class', 'id', 'name', 'target',
  'rel', 'style',
];

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'style'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick'],
  });
}