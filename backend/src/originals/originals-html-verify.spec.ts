import { readFileSync } from 'fs';
import { join } from 'path';
import { gradeHtml } from './originals-html-verify';

const page = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Mensah Beats</title>
  <style>
    h1 { color: #ff9600; }
    .card { display: flex; padding: 16px; border: 2px solid #0172fd; }
  </style>
</head>
<body>
  <h1>Mensah Beats</h1>
  <p>Beats made on a phone in Accra.</p>
  <div class="card"><img src="cover.png" alt="Album cover"><audio controls src="beat-1.mp3"></audio></div>
  <div class="card"><img src="cover-2.png"></div>
</body>
</html>`;

const run = (checks: Parameters<typeof gradeHtml>[1]) => gradeHtml(page, checks).passed;

describe('HTML runner (loader side)', () => {
  it('finds elements, counts them and reads their text', () => {
    expect(
      run([
        { message: 'a heading', dom: { selector: 'h1', text: 'mensah beats' } },
        { message: 'one h1', dom: { selector: 'h1', count: 1 } },
        { message: 'two cards', dom: { selector: '.card', min: 2 } },
        { message: 'no tables', dom: { selector: 'table', count: 0 } },
        { message: 'a missing heading', dom: { selector: 'h2' } },
      ]),
    ).toEqual([true, true, true, true, false]);
  });

  it('checks attributes on every match', () => {
    expect(
      run([
        { message: 'every image has alt text', dom: { selector: 'img', attr: 'alt' } },
        { message: 'the page is in English', dom: { selector: 'html', attr: 'lang', attrValue: 'EN' } },
      ]),
    ).toEqual([false, true]);
  });

  it('compares styles after normalising, or just "changed from the default"', () => {
    expect(
      run([
        { message: 'orange heading', dom: { selector: 'h1', style: 'color', styleValue: 'rgb(255, 150, 0)' } },
        { message: 'orange heading (hex)', dom: { selector: 'h1', style: 'color', styleValue: '#FF9600' } },
        { message: 'heading coloured at all', dom: { selector: 'h1', style: 'color' } },
        { message: 'cards are flex', dom: { selector: '.card', style: 'display', styleValue: 'flex' } },
        { message: 'paragraph coloured', dom: { selector: 'p', style: 'color' } },
      ]),
    ).toEqual([true, true, true, true, false]);
  });

  it('reads the page text for output checks', () => {
    expect(run([{ message: 'mentions Accra', outputIncludes: 'phone in accra' }])).toEqual([true]);
  });

  it('keeps the page-check rules identical to the browser copy', () => {
    const front = readFileSync(join(__dirname, '..', '..', '..', 'frontend', 'lib', 'code', 'domChecks.ts'), 'utf8');
    const back = readFileSync(join(__dirname, 'originals-dom-checks.ts'), 'utf8');
    expect(back.split('\n').slice(2).join('\n')).toBe(front);
  });
});
