import { cookies } from 'next/headers';
import LaunchClient from './LaunchClient';

/**
 * /launch — the installed app's start_url. Reads whether the session cookie
 * exists (the httpOnly cookie is invisible to client JS) so a signed-in
 * learner goes straight home after the splash instead of to sign-in.
 */
export const dynamic = 'force-dynamic';

export default async function LaunchPage() {
  const hasSession = Boolean((await cookies()).get('access_token')?.value);
  return <LaunchClient hasSession={hasSession} />;
}
