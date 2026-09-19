-- Type: ADDITIVE ONLY
-- AI Course Importer, Phase 2: stores the admin's Google Drive OAuth
-- connection (encrypted refresh token) so course source material can be
-- browsed/downloaded from Drive. One row per user (today: one admin). No
-- existing table is altered by this migration.

-- CreateTable
CREATE TABLE IF NOT EXISTS "google_drive_connections" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "googleAccountEmail" TEXT NOT NULL,
    "encryptedRefreshToken" TEXT NOT NULL,
    "keyVersion" INTEGER NOT NULL DEFAULT 1,
    "accessToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT NOT NULL,
    "connectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "google_drive_connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
DO $$ BEGIN
  CREATE UNIQUE INDEX "google_drive_connections_userId_key" ON "google_drive_connections"("userId");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "google_drive_connections" ADD CONSTRAINT "google_drive_connections_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
