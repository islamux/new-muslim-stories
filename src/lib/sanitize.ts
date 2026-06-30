import type { DOMPurify } from 'dompurify';

let purify: DOMPurify | null = null;

async function getDOMPurify(): Promise<DOMPurify> {
  if (!purify) {
    purify = (await import('dompurify')).default;
  }
  return purify;
}

export async function sanitizeHtmlServer(html: string): Promise<string> {
  try {
    const DOMPurify = await getDOMPurify();
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'b',
        'i',
        'em',
        'strong',
        'a',
        'ul',
        'ol',
        'li',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'pre',
        'code',
        'hr',
        'span',
        'div',
        'img',
        'figure',
        'figcaption',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class', 'id'],
      ALLOW_DATA_ATTR: false,
    });
  } catch {
    return html;
  }
}
