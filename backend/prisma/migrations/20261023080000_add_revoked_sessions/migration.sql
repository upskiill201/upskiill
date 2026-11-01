-- Type: ADDITIVE ONLY
-- Logout that actually ends the session. Session JWTs now carry a `jti`;
-- POST /auth/logout records it here and the JWT strategy refuses it from then
-- on. Before this, a stolen or shared cookie kept working for its full 7 days
-- after the owner logged out. No existing table or column is touched; tokens
-- minted before this have no jti and simply expire as they always did.
--
-- Rollback:
--   DROP TABLE IF EXISTS "revoked_sessions";

CREATE TABLE IF NOT EXISTS "revoked_sessions" (
  "jti"       TEXT NOT NULL,
  "userId"    TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "revoked_sessions_pkey" PRIMARY KEY ("jti")
);
CREATE INDEX IF NOT EXISTS "revoked_sessions_expiresAt_idx" ON "revoked_sessions"("expiresAt");
