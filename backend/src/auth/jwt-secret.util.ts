/**
 * Single source of truth for the JWT signing/verification secret.
 *
 * Hard-fails at boot when JWT_SECRET is unset — a silent fallback secret in a
 * public repo means anyone can forge valid sessions. If you see this throw,
 * set JWT_SECRET in the environment (.env locally, Render/Vercel env vars in
 * deployment).
 */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.trim().length === 0) {
    throw new Error(
      'JWT_SECRET is not set — refusing to issue or verify sessions ' +
        'with a fallback secret. Set JWT_SECRET in your environment.',
    );
  }
  return secret;
}
