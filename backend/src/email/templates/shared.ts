import { emailConfig } from '../email.config';

/** Every piece of user/product-generated text (names, course titles...) must
 *  pass through this before landing in an HTML template — see spec §39/40:
 *  a course title must never be able to inject markup. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Truncates long user-supplied strings (course/creator names) so a template
 *  never breaks layout — spec §39 "long course names". */
export function clip(value: string, max = 80): string {
  const trimmed = value.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max - 1)}…` : trimmed;
}

export function safeName(firstName: string | null | undefined): string {
  const trimmed = (firstName || '').trim();
  return trimmed ? escapeHtml(clip(trimmed, 40)) : 'there';
}

const COLORS = {
  bg: '#f8fafc',
  card: '#ffffff',
  border: '#e2e8f0',
  text: '#475569',
  heading: '#0f172a',
  muted: '#94a3b8',
  brand: '#0172FD',
  brandDark: '#0050B3',
};

export interface LayoutOptions {
  /** Raw HTML — caller is responsible for escaping any interpolated data. */
  bodyHtml: string;
  preheader?: string;
  unsubscribeUrl?: string;
  preferencesUrl?: string;
}

/**
 * The one shared shell every template renders into: logo, card, footer,
 * unsubscribe. Individual templates supply only their body content, so
 * Tey's visual identity (and any future redesign) changes in one place.
 */
export function renderLayout({
  bodyHtml,
  preheader,
  unsubscribeUrl,
  preferencesUrl,
}: LayoutOptions): string {
  const appUrl = emailConfig.appUrl;
  const preheaderHtml = preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>`
    : '';

  const footerLinks: string[] = [];
  if (preferencesUrl)
    footerLinks.push(
      `<a href="${preferencesUrl}" style="color:#94a3b8;text-decoration:underline;">Email preferences</a>`,
    );
  if (unsubscribeUrl)
    footerLinks.push(
      `<a href="${unsubscribeUrl}" style="color:#94a3b8;text-decoration:underline;">Unsubscribe</a>`,
    );

  const footerHtml = footerLinks.length
    ? `<p style="font-size:12px;color:${COLORS.muted};text-align:center;margin-top:20px;">${footerLinks.join(' &nbsp;·&nbsp; ')}</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light" />
</head>
<body style="margin:0;padding:0;background-color:${COLORS.bg};">
${preheaderHtml}
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:32px 16px;color:${COLORS.text};">
  <div style="text-align:center;margin-bottom:20px;">
    <img src="${appUrl}/Teyro%20Logo.png" alt="Teyro" width="110" style="margin:0 auto;display:block;" />
  </div>
  <div style="background-color:${COLORS.card};border:1px solid ${COLORS.border};border-radius:16px;padding:32px 24px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
    ${bodyHtml}
  </div>
  ${footerHtml}
</div>
</body>
</html>`;
}

export function ctaButton(label: string, url: string): string {
  return `<div style="text-align:center;margin:28px 0;">
    <a href="${url}" style="display:inline-block;background-color:${COLORS.brand};color:#ffffff;font-weight:800;font-size:16px;text-decoration:none;padding:14px 32px;border-radius:12px;box-shadow:0 4px 12px rgba(1,114,253,0.25);">
      ${escapeHtml(label)} &rarr;
    </a>
  </div>`;
}

export function heading(text: string): string {
  return `<h1 style="font-size:22px;font-weight:900;color:${COLORS.heading};margin:0 0 16px;letter-spacing:-0.5px;">${text}</h1>`;
}

export function paragraph(text: string): string {
  return `<p style="font-size:16px;line-height:1.6;color:${COLORS.text};margin:0 0 16px;">${text}</p>`;
}

export function smallMuted(text: string): string {
  return `<p style="font-size:13px;color:${COLORS.muted};margin:0 0 12px;">${text}</p>`;
}

/**
 * Tey's opening line — the big, short, first-person sentence every lifecycle
 * email starts with, so the inbox reads as a message from Tey rather than a
 * newsletter from a company.
 */
export function teySays(text: string): string {
  return `<p style="font-size:24px;line-height:1.3;font-weight:900;color:${COLORS.heading};margin:0 0 16px;letter-spacing:-0.5px;">${text}</p>`;
}

/** A plain, scannable list — escaped by the caller. */
export function bulletList(items: string[]): string {
  if (items.length === 0) return '';
  const lis = items
    .map((i) => `<li style="margin:0 0 8px;">${i}</li>`)
    .join('');
  return `<ul style="font-size:16px;line-height:1.5;color:${COLORS.text};margin:0 0 16px;padding-left:20px;">${lis}</ul>`;
}

/** A row of big numbers ("3 sales · 12 new learners"), for digests. */
export function statRow(stats: { label: string; value: string }[]): string {
  const cells = stats
    .map(
      (s) => `<td style="text-align:center;padding:12px 8px;">
        <div style="font-size:26px;font-weight:900;color:${COLORS.heading};">${s.value}</div>
        <div style="font-size:13px;color:${COLORS.muted};margin-top:4px;">${s.label}</div>
      </td>`,
    )
    .join('');
  return `<table role="presentation" width="100%" style="border-collapse:collapse;background:${COLORS.bg};border-radius:12px;margin:0 0 20px;"><tr>${cells}</tr></table>`;
}

export function teySignOff(): string {
  return `<p style="font-size:16px;line-height:1.6;color:${COLORS.heading};font-weight:700;margin:24px 0 0;">— Tey 💙</p>`;
}

export function divider(): string {
  return `<hr style="border:none;border-top:1px solid #f1f5f9;margin:28px 0;" />`;
}
