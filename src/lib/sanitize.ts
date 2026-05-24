let dompurify: typeof import('dompurify') | null = null;

async function getDOMPurify(): Promise<typeof import('dompurify')> {
  if (!dompurify) {
    dompurify = (await import('dompurify')).default;
  }
  return dompurify;
}

export async function sanitizeHtmlServer(html: string): Promise<string> {
  try {
    const DOMPurify = await getDOMPurify();
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'blockquote', 'pre', 'code', 'hr', 'span', 'div',
        'img', 'figure', 'figcaption',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class', 'id'],
      ALLOW_DATA_ATTR: false,
    });
  } catch {
    return html;
  }
}
