import { extractDocumentText, extractableKind } from './document-text';
import { CourseImportError } from './course-import-error';

// unpdf loads pdfjs with a native dynamic import, which Jest's VM can't run
// (plain Node, as in production, can). The parse itself is unpdf's job; this
// checks what we do with its result.
const mockPdfText = jest.fn<string, []>();
jest.mock('unpdf', () => ({
  getDocumentProxy: jest.fn(() => Promise.resolve({})),
  extractText: jest.fn(() =>
    Promise.resolve({ totalPages: 1, text: mockPdfText() }),
  ),
}));

/** The smallest valid one-page PDF (bytes only; parsing is mocked above). */
function makePdf(text: string): Buffer {
  const stream = `BT /F1 12 Tf 72 720 Td (${text}) Tj ET`;
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];
  let out = '%PDF-1.4\n';
  const offsets: number[] = [];
  objs.forEach((o, i) => {
    offsets.push(out.length);
    out += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  out += offsets
    .map((o) => `${String(o).padStart(10, '0')} 00000 n \n`)
    .join('');
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(out, 'latin1');
}

function serve(body: Buffer | string, status = 200) {
  const bytes = typeof body === 'string' ? Buffer.from(body) : body;
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: status < 400,
    status,
    arrayBuffer: () =>
      Promise.resolve(
        bytes.buffer.slice(
          bytes.byteOffset,
          bytes.byteOffset + bytes.byteLength,
        ),
      ),
  } as unknown as Response);
}

const LONG =
  'A reading lesson needs enough words to teach something real. '.repeat(8);

describe('document text', () => {
  afterEach(() => jest.restoreAllMocks());

  it('knows which documents it can read', () => {
    expect(extractableKind('k/notes.pdf', 'application/pdf')).toBe('pdf');
    expect(
      extractableKind('k/Notes.pdf', 'application/vnd.google-apps.document'),
    ).toBe('pdf');
    expect(extractableKind('k/brief.docx', 'application/octet-stream')).toBe(
      'docx',
    );
    expect(extractableKind('k/readme.txt', 'text/plain')).toBe('text');
    expect(extractableKind('k/old.doc', 'application/msword')).toBeNull();
  });

  it('reads plain text', async () => {
    serve(`  ${LONG}\r\n\r\n\r\n\r\nEnd.  `);
    const text = await extractDocumentText(
      'https://cdn/x.txt',
      'k/x.txt',
      'text/plain',
    );
    expect(text.startsWith('A reading lesson')).toBe(true);
    expect(text).not.toMatch(/\n{3,}/);
  });

  it('reads the text out of a PDF', async () => {
    mockPdfText.mockReturnValue(LONG.slice(0, 400));
    serve(makePdf(LONG.slice(0, 400)));
    const text = await extractDocumentText(
      'https://cdn/x.pdf',
      'k/x.pdf',
      'application/pdf',
    );
    expect(text).toContain('A reading lesson needs enough words');
  });

  it('refuses a document with too little text, saying why', async () => {
    mockPdfText.mockReturnValue('Cover page');
    serve(makePdf('Cover page'));
    await expect(
      extractDocumentText('https://cdn/x.pdf', 'k/x.pdf', 'application/pdf'),
    ).rejects.toThrow(/too little text/);
  });

  it('reports a missing object as a storage error', async () => {
    serve('', 404);
    const err = await extractDocumentText(
      'https://cdn/x.pdf',
      'k/x.pdf',
      'application/pdf',
    ).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(CourseImportError);
    expect((err as CourseImportError).code).toBe('STORAGE_OBJECT_NOT_FOUND');
  });
});
