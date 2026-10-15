import { communityCopy, firstName, oneLine, type CommunityKind } from './community.copy';

const base = { actor: 'Amara', excerpt: 'How do I center a div?', courseName: 'Web Basics', seed: 'x1' };

describe('community copy (Tey’s voice)', () => {
  it('leads with the fact: who did what', () => {
    expect(communityCopy({ ...base, kind: 'COMMUNITY_REPLY' }).title).toBe('Amara replied to your comment');
    expect(communityCopy({ ...base, kind: 'COMMUNITY_COMMENT' }).title).toBe('Amara commented on your post');
    expect(communityCopy({ ...base, kind: 'COMMUNITY_MENTION' }).title).toBe('Amara mentioned you');
    expect(communityCopy({ ...base, kind: 'COMMUNITY_POST' }).title).toBe('Amara posted in Web Basics');
  });

  it('quotes what was written, then adds Tey’s line', () => {
    const { body } = communityCopy({ ...base, kind: 'COMMUNITY_REPLY' });
    expect(body.startsWith('“How do I center a div?”')).toBe(true);
    expect(body.length).toBeGreaterThan('“How do I center a div?”'.length + 5);
  });

  it('never invites a reply to the email (the sender is noreply@)', () => {
    const kinds: CommunityKind[] = ['COMMUNITY_REPLY', 'COMMUNITY_COMMENT', 'COMMUNITY_MENTION', 'COMMUNITY_POST', 'COMMUNITY_ANNOUNCEMENT'];
    for (const kind of kinds) {
      for (const seed of ['a', 'b', 'c', 'd']) {
        const { title, body } = communityCopy({ ...base, kind, seed });
        expect(`${title} ${body}`).not.toMatch(/reply to this email/i);
      }
    }
  });

  it('says the same thing for the same event (a retry must not rephrase)', () => {
    const a = communityCopy({ ...base, kind: 'COMMUNITY_COMMENT', seed: 'comment-9' });
    const b = communityCopy({ ...base, kind: 'COMMUNITY_COMMENT', seed: 'comment-9' });
    expect(a).toEqual(b);
  });

  it('writes announcements and challenges as the creator speaking to the class', () => {
    const a = communityCopy({ ...base, kind: 'COMMUNITY_ANNOUNCEMENT', headline: 'Quiz on Friday' });
    expect(a.title).toBe('New announcement in Web Basics');
    expect(a.body).toContain('Quiz on Friday');
    const c = communityCopy({ ...base, kind: 'COMMUNITY_ANNOUNCEMENT', headline: 'Build a navbar', challenge: true });
    expect(c.title).toBe('New challenge in Web Basics');
  });

  it('keeps excerpts to one clean line', () => {
    expect(oneLine('<p>Hello   <b>world</b></p>\n\nagain')).toBe('Hello world again');
    const long = oneLine('word '.repeat(60), 90);
    expect(long.length).toBeLessThanOrEqual(91);
    expect(long.endsWith('…')).toBe(true);
    expect(firstName('  Amara Okafor ')).toBe('Amara');
    expect(firstName(null)).toBe('A classmate');
  });
});
