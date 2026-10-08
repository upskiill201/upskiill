/**
 * Plain text out of an imported document, for a reading lesson: the
 * document plays the part a transcript plays for a video. No AI involved,
 * so it costs nothing against the course-import budget.
 *
 *   PDF (incl. exported Google Docs/Slides)  unpdf
 *   DOCX                                     mammoth
 *   TXT / Markdown                           as is
 */

import * as mammoth from 'mammoth';
// unpdf's entry is small; it loads the heavy pdfjs build itself, on first use.
import { extractText, getDocumentProxy } from 'unpdf';
import { CourseImportError, codeForHttpStatus } from './course-import-error';

const DOWNLOAD_TIMEOUT_MS = 2 * 60 * 1000;
/** Fewer characters than this isn't a lesson — a cover page, a link list. */
export const MIN_READING_CHARS = 300;

export function extractableKind(
  key: string | null,
  mimeType: string,
): 'pdf' | 'docx' | 'text' | null {
  const ext = (key ?? '').split('.').pop()?.toLowerCase() ?? '';
  if (ext === 'pdf' || mimeType === 'application/pdf') return 'pdf';
  if (
    ext === 'docx' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
    return 'docx';
  if (['txt', 'md'].includes(ext) || mimeType === 'text/plain') return 'text';
  return null;
}

export async function extractDocumentText(
  url: string,
  key: string | null,
  mimeType: string,
): Promise<string> {
  const kind = extractableKind(key, mimeType);
  if (!kind) {
    throw new CourseImportError(
      'NO_TRANSCRIPT',
      'This kind of document (.doc, slides) has no readable text for a lesson. Convert it to PDF or DOCX.',
    );
  }

  const res = await fetch(url, {
    signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new CourseImportError(
      codeForHttpStatus(res.status, 'STORAGE'),
      `Could not download the document (HTTP ${res.status}).`,
    );
  }
  const bytes = new Uint8Array(await res.arrayBuffer());

  let text: string;
  if (kind === 'pdf') {
    const pdf = await getDocumentProxy(bytes);
    const out = await extractText(pdf, { mergePages: true });
    text = Array.isArray(out.text) ? out.text.join('\n\n') : out.text;
  } else if (kind === 'docx') {
    const out = await mammoth.extractRawText({ buffer: Buffer.from(bytes) });
    text = out.value;
  } else {
    text = new TextDecoder('utf-8').decode(bytes);
  }

  const clean = text
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (clean.length < MIN_READING_CHARS) {
    throw new CourseImportError(
      'NO_TRANSCRIPT',
      `This document has too little text for a reading lesson (${clean.length} characters). If it's a scanned PDF, it has no selectable text.`,
    );
  }
  return clean;
}
