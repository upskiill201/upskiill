import { inlineMarkdown } from '../inlineMarkdown';

describe('inlineMarkdown — markdown marks inside lesson HTML', () => {
  it('turns single-star emphasis into <em> (the "*and*" learners saw)', () => {
    expect(inlineMarkdown('<p>the project *and* its history</p>')).toBe('<p>the project <em>and</em> its history</p>');
  });

  it('turns double stars and underscores into <strong>', () => {
    expect(inlineMarkdown('**Git** is __fast__')).toBe('<strong>Git</strong> is <strong>fast</strong>');
  });

  it('turns backticks into <code> and leaves stars inside them alone', () => {
    expect(inlineMarkdown('run `git log *.md` now')).toBe('run <code>git log *.md</code> now');
  });

  it('leaves maths, snake_case and existing code blocks untouched', () => {
    expect(inlineMarkdown('2 * 3 * 4')).toBe('2 * 3 * 4');
    expect(inlineMarkdown('my_var_name')).toBe('my_var_name');
    expect(inlineMarkdown('<pre><code>a *b* c</code></pre>')).toBe('<pre><code>a *b* c</code></pre>');
  });

  it('never touches attributes', () => {
    expect(inlineMarkdown('<a href="/x_*y*_">*hi*</a>')).toBe('<a href="/x_*y*_"><em>hi</em></a>');
  });
});
