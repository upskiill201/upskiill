-- Type: ADDITIVE ONLY
-- Persistent store for WhatsApp OTP codes (onboarding Step 6 / profile settings).
-- Replaces the previous in-memory Map so codes survive Render restarts,
-- redeploys, and sleep/wake cycles. One row per normalised E.164 phone.
--
-- Rollback:
-- DROP TABLE IF EXISTS "whatsapp_otps";

CREATE TABLE IF NOT EXISTS "whatsapp_otps" (
  "phone"            TEXT        NOT NULL,
  "codeHash"         TEXT        NOT NULL,
  "expiresAt"        TIMESTAMP(3) NOT NULL,
  "attempts"         INTEGER     NOT NULL DEFAULT 0,
  "sentCount"        INTEGER     NOT NULL DEFAULT 0,
  "windowStartedAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastSentAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- Anonymous verification journeys (user signs up at onboarding Step 12,
  -- after the WhatsApp step): successful pre-auth verifies stamp verifiedAt,
  -- then the row is claimed (claimedBy) once the account exists.
  "verifiedAt"       TIMESTAMP(3),
  "claimedBy"        TEXT,
  "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"        TIMESTAMP(3) NOT NULL,

  CONSTRAINT "whatsapp_otps_pkey" PRIMARY KEY ("phone")
);
