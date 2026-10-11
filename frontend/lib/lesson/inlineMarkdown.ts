/**
 * Lesson text comes from the editor as HTML, but imported and pasted text
 * often carries markdown emphasis inside it — learners were seeing a literal
 * "*and*". This turns the inline marks into real tags, only in text (never
 * inside a tag or a code span), before the HTML is sanitised:
 *
 *   **bold** / __bold__  → <strong>      *em* / _em_  → <em>
 *   `code`               → <code>
 *
 * Deliberately narrow: a mark must hug a word on both sides ("2 * 3 * 4"
 * and snake_case_names stay as they are).
 */

const STRONG = /(\*\*|__)(?=\S)([^<>\n]*?\S)\1/g;
// Single * or _ around a word, not inside a word (so snake_case survives).
const EM = /(^|[^\w*])([*_])(?=[^\s*_])([^<>\n*_]*?[^\s*_])\2(?![\w*])/g;
const CODE = /`([^`<>\n]+)`/g;

function convertText(text: string): string {
  // Code first, held out of the emphasis passes.
  const codes: string[] = [];
  let out = text.replace(CODE, (_, c: string) => {
    codes.push(c);
    return `\u0000${codes.length - 1}\u0000`;
  });
  out = out.replace(STRONG, '<strong>$2</strong>');
  out = out.replace(EM, '$1<em>$3</em>');
  return out.replace(/\u0000(\d+)\u0000/g, (_, i: string) => `<code>${codes[Number(i)]}</code>`);
}

export function inlineMarkdown(html: string): string {
  if (!/[*_`]/.test(html)) return html;
  let inCode = 0;
  // Split into tags and text; leave tags (and anything inside <code>/<pre>) alone.
  return html
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (part.startsWith('<')) {
        if (/^<(code|pre)\b/i.test(part)) inCode += 1;
        else if (/^<\/(code|pre)>/i.test(part)) inCode = Math.max(0, inCode - 1);
        return part;
      }
      return inCode > 0 ? part : convertText(part);
    })
    .join('');
}
