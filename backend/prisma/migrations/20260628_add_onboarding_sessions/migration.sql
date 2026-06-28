-- Migration: add_onboarding_sessions
-- Creates the onboarding_sessions table for user onboarding progress.
-- One row per user. Answers stored as JSONB keyed by step number.

CREATE TABLE IF NOT EXISTS "onboarding_sessions" (
  "id"                  TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "userId"              TEXT NOT NULL,
  "currentStep"         INTEGER NOT NULL DEFAULT 1,
  "completedSteps"      INTEGER[] NOT NULL DEFAULT '{}',
  "answers"             JSONB NOT NULL DEFAULT '{}',
  "onboardingComplete"  BOOLEAN NOT NULL DEFAULT false,
  "startedAt"           TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"           TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "completedAt"         TIMESTAMP(3),

  CONSTRAINT "onboarding_sessions_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "onboarding_sessions_userId_fkey"
    FOREIGN KEY ("userId")
    REFERENCES "User"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "onboarding_sessions_userId_key"
  ON "onboarding_sessions"("userId");
