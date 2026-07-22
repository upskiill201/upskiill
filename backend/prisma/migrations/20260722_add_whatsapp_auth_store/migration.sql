-- Migration: add_whatsapp_auth_store
-- Creates table to persist WhatsApp session state in PostgreSQL database

CREATE TABLE IF NOT EXISTS "whatsapp_auth_store" (
  "key"       TEXT NOT NULL PRIMARY KEY,
  "value"     TEXT NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
