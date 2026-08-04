import DOMPurify from 'dompurify';

// Links inside sanitized article HTML should open in a new tab
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.getAttribute('href')) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

/**
 * Sanitizes article HTML coming from the src.am API before it is rendered
 * with dangerouslySetInnerHTML.
 */
const sanitizeHtml = (html) =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ['target'],
  });

export default sanitizeHtml;
