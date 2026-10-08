import { NATIVE_EXPORTS, categorize } from './google-drive.types';

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
