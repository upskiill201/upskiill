import { sanitizeExercises } from '@/lib/lesson/sanitize';

// HTML & CSS Originals: page exercises must survive the sanitiser, because
// lessons AND Jump ahead tests (lib/path/testOut.ts) both read through it.
describe('sanitizeExercises keeps HTML page exercises', () => {
  const raw = [
    {
      id: 'ex-1',
      kind: 'writeCode',
      language: 'html',
      prompt: 'Make a main heading that says Mensah Beats',
      starter: '',
      solution: '<h1>Mensah Beats</h1>',
      hint: '<h1>...</h1>',
      checks: [
        { message: 'A main heading', dom: { selector: 'h1', count: 1, text: 'Mensah Beats' } },
        { message: 'English page', dom: { selector: 'html', attr: 'lang', attrValue: 'en' } },
        { message: 'Says it', outputIncludes: 'Mensah Beats' },
      ],
    },
  ];

  it('keeps the html runner and every page check', () => {
    const [ex] = sanitizeExercises(raw);
    expect(ex).toBeDefined();
    expect(ex.kind).toBe('writeCode');
    if (ex.kind !== 'writeCode') return;
    expect(ex.language).toBe('html');
    expect(ex.checks).toHaveLength(3);
    expect(ex.checks[0].dom).toEqual({ selector: 'h1', count: 1, text: 'Mensah Beats' });
    expect(ex.checks[1].dom).toEqual({ selector: 'html', attr: 'lang', attrValue: 'en' });
  });
});
