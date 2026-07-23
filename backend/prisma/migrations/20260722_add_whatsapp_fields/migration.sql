-- Migration: add_whatsapp_fields
-- Adds whatsappPhone and whatsappVerified columns to User table

ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "whatsappPhone"    TEXT,
  ADD COLUMN IF NOT EXISTS "whatsappVerified" BOOLEAN NOT NULL DEFAULT false;
