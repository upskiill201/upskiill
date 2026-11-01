/**
 * What Tey says about the community. One module, so a push, the bell row and
 * the email read as the same voice.
 *
 * The rules are the same as the rest of Tey's event copy (tey-event.notifier):
 * the title states the fact (who did what), the body gives the detail and, only
 * where it earns it, one cheeky line. Guilt-trip the silence, never the person,
 * and never mock what someone wrote. The sender address is noreply@, so nothing
 * here may invite a reply to the email.
 */

export type CommunityKind =
  | 'COMMUNITY_REPLY'
  | 'COMMUNITY_COMMENT'
  | 'COMMUNITY_MENTION'
  | 'COMMUNITY_ANNOUNCEMENT'
  | 'COMMUNITY_POST';

export interface CommunityCopyInput {
  kind: CommunityKind;
  /** Who did it (first name is enough). */
  actor: string;
  /** What they wrote, trimmed to a line. */
  excerpt: string;
  courseName: string;
  /** Announcements and challenges carry their own headline. */
  headline?: string;
  /** CHALLENGE reads differently from a plain announcement. */
  challenge?: boolean;
  /** Picks a variant; stable per event so a retry says the same thing. */
  seed: string;
}

export interface CommunityCopy {
  title: string;
  body: string;
}

const quote = (s: string) => `“${s}”`;

function pick<T>(options: T[], seed: string): T {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return options[h % options.length];
}

/** First name, safe for a headline. */
export function firstName(full: string | null | undefined): string {
  const n = (full ?? '').trim().split(/\s+/)[0];
  return n || 'A classmate';
}

/** One tidy line: markup-free, whitespace collapsed, clipped on a word. */
export function oneLine(text: string, max = 90): string {
  const flat = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max);
  const space = cut.lastIndexOf(' ');
  return `${(space > 40 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

export function communityCopy(i: CommunityCopyInput): CommunityCopy {
  const ex = quote(oneLine(i.excerpt));

  switch (i.kind) {
    case 'COMMUNITY_REPLY':
      return {
        title: `${i.actor} replied to your comment`,
        body: pick(
          [
            `${ex} I kept your seat warm. Go answer.`,
            `${ex} Leaving them on read? Bold.`,
            `${ex} I’d reply soon. Just saying.`,
          ],
          i.seed,
        ),
      };
    case 'COMMUNITY_COMMENT':
      return {
        title: `${i.actor} commented on your post`,
        body: pick(
          [
            `${ex} Your post is doing numbers. Go see.`,
            `${ex} Somebody is paying attention to you.`,
            `${ex} People read what you write. Terrifying, I know.`,
          ],
          i.seed,
        ),
      };
    case 'COMMUNITY_MENTION':
      return {
        title: `${i.actor} mentioned you`,
        body: pick(
          [
            `${ex} You were named. In public. Go see why.`,
            `${ex} Your name came up in ${i.courseName}. I’d check.`,
          ],
          i.seed,
        ),
      };
    case 'COMMUNITY_ANNOUNCEMENT': {
      const what = i.headline ? oneLine(i.headline, 80) : oneLine(i.excerpt, 80);
      return i.challenge
        ? {
            title: `New challenge in ${i.courseName}`,
            body: `${what}. I’d start before the rest of the class does.`,
          }
        : {
            title: `New announcement in ${i.courseName}`,
            body: `${what}. The class is reading it. Are you?`,
          };
    }
    case 'COMMUNITY_POST':
      return {
        title: `${i.actor} posted in ${i.courseName}`,
        body: pick(
          [
            `${ex} Your classmates are talking. I’d peek.`,
            `${ex} Don’t be the last one to see this.`,
          ],
          i.seed,
        ),
      };
  }
}

/** The inbox row type for each kind (the bell renders TEY_ rows as events). */
export const COMMUNITY_INBOX_TYPE: Record<CommunityKind, string> = {
  COMMUNITY_REPLY: 'TEY_COMMUNITY_REPLY',
  COMMUNITY_COMMENT: 'TEY_COMMUNITY_COMMENT',
  COMMUNITY_MENTION: 'TEY_COMMUNITY_MENTION',
  COMMUNITY_ANNOUNCEMENT: 'TEY_COMMUNITY_ANNOUNCEMENT',
  COMMUNITY_POST: 'TEY_COMMUNITY_POST',
};

/** Where the notification opens: the post, inside its course community. */
export function communityPostUrl(courseId: string, postId: string): string {
  return `/dashboard/community/${courseId}/p/${postId}`;
}
