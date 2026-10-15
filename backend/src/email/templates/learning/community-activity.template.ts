import { BaseEmailData, RenderedEmail } from '../../types';
import {
  ctaButton,
  escapeHtml,
  paragraph,
  renderLayout,
  safeName,
  teySays,
  teySignOff,
} from '../shared';

export type CommunityEmailKind = 'COMMUNITY_REPLY' | 'COMMUNITY_COMMENT' | 'COMMUNITY_MENTION';

export interface CommunityActivityData extends BaseEmailData {
  kind: CommunityEmailKind;
  /** Who did the latest thing (first name). */
  actor: string;
  /** What they wrote, already trimmed to a line. */
  excerpt: string;
  courseName: string;
  /** How many unread things are waiting on this conversation (≥ 1). */
  count: number;
  postUrl: string;
}

/**
 * "Someone answered you", in Tey's voice. Sent 20 minutes after a reply,
 * comment or mention that is still unread, once per conversation per day, and
 * only for the learner's focus course. The sender address is noreply@, so it
 * never invites a reply to the email: the one action is to open the thread.
 */
export function renderCommunityActivityEmail(data: CommunityActivityData): RenderedEmail {
  const name = safeName(data.firstName);
  const actor = escapeHtml(data.actor);
  const course = escapeHtml(data.courseName);
  const many = data.count > 1;

  const subject = many
    ? `${data.count} new things waiting for you in ${data.courseName}`
    : data.kind === 'COMMUNITY_REPLY'
      ? `${data.actor} replied to your comment`
      : data.kind === 'COMMUNITY_COMMENT'
        ? `${data.actor} commented on your post`
        : `${data.actor} mentioned you in ${data.courseName}`;

  const what = many
    ? `<strong>${actor}</strong> and others have been busy in <strong>${course}</strong>. The latest:`
    : data.kind === 'COMMUNITY_REPLY'
      ? `<strong>${actor}</strong> replied to your comment in <strong>${course}</strong>:`
      : data.kind === 'COMMUNITY_COMMENT'
        ? `<strong>${actor}</strong> commented on your post in <strong>${course}</strong>:`
        : `<strong>${actor}</strong> mentioned you in <strong>${course}</strong>:`;

  const nudge = many
    ? 'I kept count so you didn’t have to. Go catch up.'
    : data.kind === 'COMMUNITY_MENTION'
      ? 'You were named. In public. I’d go see why.'
      : 'I kept your seat warm. Go answer.';

  const bodyHtml = `
    ${teySays(`${name}, somebody is talking to you.`)}
    ${paragraph(what)}
    <blockquote style="margin:0 0 16px;padding:12px 16px;border-left:4px solid #0172FD;background:#F1F6FF;border-radius:0 12px 12px 0;color:#071233;font-size:16px;line-height:1.5;">${escapeHtml(data.excerpt)}</blockquote>
    ${paragraph(nudge)}
    ${ctaButton('Open the conversation', data.postUrl)}
    ${teySignOff()}
  `;

  return {
    subject,
    html: renderLayout({
      bodyHtml,
      preheader: nudge,
      unsubscribeUrl: data.unsubscribeUrl,
      preferencesUrl: data.preferencesUrl,
    }),
  };
}
