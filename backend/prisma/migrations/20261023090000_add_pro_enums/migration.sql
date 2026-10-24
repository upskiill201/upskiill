-- Type: ADDITIVE ONLY
-- Teyro Pro, part 1 of 2: enum types only. Separate from the tables because
-- Postgres can't use a value added by ALTER TYPE ... ADD VALUE inside the
-- transaction that added it, and the pool code writes POOL_SHARE rows.
-- Nothing existing is changed; EarningsEntryType gains one value.
--
-- Rollback (enum values can't be dropped in Postgres; the new types can):
--   DROP TYPE IF EXISTS "ProPoolRunStatus", "ExitSurveyReason", "ProOfferStatus",
--     "ProCheckoutStatus", "ProStatus", "ProProvider", "ProPlan";
--   POOL_SHARE stays on EarningsEntryType, unused.

-- CreateEnum
CREATE TYPE "ProPlan" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "ProProvider" AS ENUM ('STRIPE', 'MESOMB');

-- CreateEnum
CREATE TYPE "ProStatus" AS ENUM ('INCOMPLETE', 'TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ProCheckoutStatus" AS ENUM ('CREATED', 'REQUIRES_ACTION', 'SUCCEEDED', 'FAILED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "ProOfferStatus" AS ENUM ('OFFERED', 'REDEEMED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ExitSurveyReason" AS ENUM ('TOO_EXPENSIVE', 'NOT_SURE', 'JUST_LOOKING', 'DECIDE_LATER', 'OTHER');

-- CreateEnum
CREATE TYPE "ProPoolRunStatus" AS ENUM ('DRAFT', 'POSTED', 'SUPERSEDED');

-- AlterEnum
ALTER TYPE "EarningsEntryType" ADD VALUE IF NOT EXISTS 'POOL_SHARE';
