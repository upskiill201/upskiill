import {
  NATIVE_EXPORTS,
  categorize,
  cleanDriveFileName,
} from './google-drive.types';

describe('categorize', () => {
  it.each([
    ['video/mp4', 'Intro.mp4', 'video'],
    ['audio/mpeg', 'Podcast.mp3', 'audio'],
    ['image/png', 'diagram.png', 'image'],
    ['application/pdf', 'notes.pdf', 'document'],
    ['text/plain', 'notes.txt', 'document'],
    ['application/vnd.google-apps.document', 'Script', 'document'],
    ['application/vnd.google-apps.presentation', 'Deck', 'presentation'],
    // Project files, however Drive labels them.
    ['application/zip', 'starter.zip', 'file'],
    ['application/x-zip-compressed', 'starter.zip', 'file'],
    ['application/octet-stream', 'project.rar', 'file'],
    ['text/x-python', 'app.py', 'file'],
    ['text/plain', 'app.py', 'file'],
    ['text/csv', 'sales.csv', 'file'],
    [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'model.xlsx',
      'file',
    ],
    ['application/vnd.google-apps.spreadsheet', 'Budget', 'file'],
    ['application/octet-stream', 'notebook.ipynb', 'file'],
    // Still nothing a learner can use.
    ['application/x-msdownload', 'setup.exe', 'other'],
    ['application/vnd.google-apps.form', 'Survey', 'other'],
  ])('%s "%s" → %s', (mime, name, category) => {
    expect(categorize(mime, name)).toBe(category);
  });

  it('exports Docs and Slides as PDF, Sheets as XLSX', () => {
    expect(NATIVE_EXPORTS['application/vnd.google-apps.document'].ext).toBe(
      'pdf',
    );
    expect(NATIVE_EXPORTS['application/vnd.google-apps.presentation'].ext).toBe(
      'pdf',
    );
    expect(NATIVE_EXPORTS['application/vnd.google-apps.spreadsheet'].ext).toBe(
      'xlsx',
    );
    expect(NATIVE_EXPORTS['application/vnd.google-apps.form']).toBeUndefined();
  });
});

describe('cleanDriveFileName', () => {
  it.each([
    [
      'Copy of 9 - Introduction.mp4 |google>|ahm7tech|or|ahm7tech.vercel.app|',
      '9 - Introduction.mp4',
    ],
    ['Copy of Copy of 02 Hooks.mp4', '02 Hooks.mp4'],
    ['Lesson 3.pdf ||telegram@channel||', 'Lesson 3.pdf'],
    ['index.html |site.app|', 'index.html'],
    ['my.notes.v2.pdf', 'my.notes.v2.pdf'],
    // Native Google Doc: no extension, cut at the first "|".
    ['Course Notes |google>|ahm7tech|', 'Course Notes'],
    ['  Drama Editing.mp4 ', 'Drama Editing.mp4'],
    ['Plain name', 'Plain name'],
  ])('%s -> %s', (raw, clean) => {
    expect(cleanDriveFileName(raw)).toBe(clean);
  });

  it('sees through junk when Drive typed a real video as a generic binary', () => {
    const junk =
      '9 - Introduction.mp4 |google>|ahm7tech|or|ahm7tech.vercel.app|';
    expect(categorize('application/octet-stream', junk)).toBe('video');
    expect(categorize('application/octet-stream', 'slides.pdf |x.app|')).toBe(
      'document',
    );
    // A real type from Drive still wins.
    expect(categorize('audio/mpeg', junk)).toBe('audio');
  });

  it('treats saved web pages as documents', () => {
    expect(categorize('text/html', 'Lesson 1.html')).toBe('document');
    expect(categorize('application/octet-stream', 'page.htm |x|')).toBe(
      'document',
    );
  });
});
