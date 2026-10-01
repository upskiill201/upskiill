import { parseYouTubeId } from './youtube.util';

describe('parseYouTubeId', () => {
  const ID = 'dQw4w9WgXcQ';
  it.each([
    `https://www.youtube.com/watch?v=${ID}`,
    `https://www.youtube.com/watch?v=${ID}&t=42s`,
    `https://youtu.be/${ID}`,
    `https://youtu.be/${ID}?si=abc`,
    `https://www.youtube.com/embed/${ID}`,
    `https://www.youtube.com/shorts/${ID}`,
    `https://www.youtube.com/live/${ID}`,
    `https://m.youtube.com/watch?v=${ID}`,
    `  https://youtu.be/${ID}  `,
  ])('extracts the id from %s', (url) => {
    expect(parseYouTubeId(url)).toBe(ID);
  });

  it.each([
    '',
    null,
    undefined,
    'not a url',
    'https://vimeo.com/123456789',
    `https://evil.com/watch?v=${ID}`,
    `https://youtube.com.evil.com/watch?v=${ID}`,
    'https://www.youtube.com/watch?v=short',
    `javascript:alert(1)//youtu.be/${ID}`,
    'https://www.youtube.com/channel/UCxyz',
  ])('rejects %s', (url) => {
    expect(parseYouTubeId(url as string)).toBeNull();
  });
});
