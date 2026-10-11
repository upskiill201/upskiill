import { suggestEmail } from '../emailTypo';

describe('suggestEmail', () => {
  it('catches the real one: gamil.com', () => {
    expect(suggestEmail('afraim@gamil.com')).toBe('afraim@gmail.com');
  });

  it('catches one-edit typos and wrong endings', () => {
    expect(suggestEmail('a@gmial.com')).toBe('a@gmail.com');
    expect(suggestEmail('a@gmail.con')).toBe('a@gmail.com');
    expect(suggestEmail('a@hotmial.com')).toBe('a@hotmail.com');
    expect(suggestEmail('a@yaho.com')).toBe('a@yahoo.com');
    expect(suggestEmail('A@Outlok.com ')).toBe('a@outlook.com');
  });

  it('leaves real and unknown domains alone', () => {
    expect(suggestEmail('a@gmail.com')).toBeNull();
    expect(suggestEmail('a@teyro.app')).toBeNull();
    expect(suggestEmail('a@university.edu')).toBeNull();
  });

  it('waits until the address looks finished', () => {
    expect(suggestEmail('a@gma')).toBeNull();
    expect(suggestEmail('a@')).toBeNull();
    expect(suggestEmail('nope')).toBeNull();
  });
});
