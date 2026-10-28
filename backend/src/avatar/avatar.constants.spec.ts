import { isPhoto } from './avatar.constants';

describe('isPhoto', () => {
  it('counts an uploaded photo (any http(s) host)', () => {
    expect(isPhoto('https://pub-abc.r2.dev/avatars/u1/1.jpg')).toBe(true);
    expect(isPhoto('https://lh3.googleusercontent.com/a/xyz')).toBe(true);
  });

  it('does not count a Teyro character, a site path or nothing', () => {
    expect(isPhoto('/avatars/v1/01011510000000.svg')).toBe(false);
    expect(isPhoto('https://teyro.app/avatars/v1/01011510000000.svg')).toBe(false);
    expect(isPhoto('/uploads/x.png')).toBe(false);
    expect(isPhoto('')).toBe(false);
    expect(isPhoto(null)).toBe(false);
  });
});
