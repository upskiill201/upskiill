/**
 * @jest-environment jsdom
 */
import { learnCards, splitReading } from '../learnCards';

const para = (n: number, w = 'word') => `<p>${Array.from({ length: n }, () => w).join(' ')}</p>`;

describe('splitReading', () => {
  it('keeps a short reading on one card', () => {
    expect(splitReading(para(30))).toHaveLength(1);
  });

  it('starts a new card at every heading, and remembers it', () => {
    const cards = splitReading(`<h2>First</h2>${para(10)}<h2>Second</h2>${para(10)}`);
    expect(cards.map((c) => c.heading)).toEqual(['First', 'Second']);
    expect(cards[1].html).toContain('<h2>Second</h2>');
  });

  it('gathers blocks up to about 70 words, never cutting one in half', () => {
    const cards = splitReading(para(40) + para(40) + para(40) + para(40));
    expect(cards).toHaveLength(2);
    expect(cards.every((c) => (c.html.match(/<p>/g) ?? []).length === 2)).toBe(true);
  });

  it('keeps a long single block whole rather than splitting mid-thought', () => {
    const cards = splitReading(para(200));
    expect(cards).toHaveLength(1);
  });

  it('skips the editor’s empty spacer paragraphs', () => {
    expect(splitReading('<p><br></p>' + para(5) + '<p> </p>')).toEqual([{ html: para(5), heading: null }]);
  });

  it('keeps a list or code sample with its card', () => {
    const cards = splitReading(`${para(20)}<ul><li>a</li><li>b</li></ul><pre><code>x = 1</code></pre>`);
    expect(cards).toHaveLength(1);
    expect(cards[0].html).toContain('<ul>');
    expect(cards[0].html).toContain('<pre>');
  });
});

describe('learnCards', () => {
  const learn = {
    videoUrl: null as string | null,
    audioUrl: null as string | null,
    textHtml: '',
    whatYouWillLearn: [] as string[],
    description: null as string | null,
    cards: null,
  };

  it('orders intro, video, audio, reading, notes', () => {
    const cards = learnCards({
      ...learn,
      whatYouWillLearn: ['x'],
      videoUrl: 'v',
      audioUrl: 'a',
      textHtml: para(10),
      description: 'One.\n\nTwo.',
    });
    expect(cards.map((c) => c.kind)).toEqual(['intro', 'video', 'audio', 'text', 'notes']);
  });

  it('has an honest empty card when the creator added nothing', () => {
    expect(learnCards(learn)).toEqual([{ kind: 'empty' }]);
  });

  it("plays a v2 deck in the creator's order, ignoring the v1 fields", () => {
    const cards = learnCards({
      ...learn,
      videoUrl: 'old-video',
      description: 'Old notes.',
      cards: [
        { id: 'c1', kind: 'callout', tone: 'tip', text: 'Heads up' },
        { id: 'c2', kind: 'code', language: 'python', code: 'print(1)' },
        { id: 'c3', kind: 'video', url: 'v', durationSec: 60 },
        { id: 'c4', kind: 'check', question: 'Q?', options: ['a', 'b'], correctIndex: 1 },
      ],
    });
    expect(cards.map((c) => c.kind)).toEqual(['callout', 'code', 'video', 'check']);
  });
});
