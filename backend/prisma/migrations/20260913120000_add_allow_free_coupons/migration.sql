-- Type: ADDITIVE ONLY
-- Adds an admin-controlled platform switch that lets a PERCENTAGE coupon be
-- set to exactly 100 (fully free), independent of maxDiscountPercent.
-- Rollback: ALTER TABLE "platform_settings" DROP COLUMN "allowFreeCoupons";

ALTER TABLE "platform_settings" ADD COLUMN "allowFreeCoupons" BOOLEAN NOT NULL DEFAULT false;
