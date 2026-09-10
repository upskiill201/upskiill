INSERT INTO "spin_wheel_segments" ("id", "segmentIndex", "rewardType", "amountMin", "amountMax", "rarityTier", "weight", "colorKey")
VALUES
('seg-0', 0, 'COINS', 50, 50, 'common', 30, '#3B82F6'),
('seg-1', 1, 'XP', 20, 20, 'common', 20, '#EC4899'),
('seg-2', 2, 'COINS', 100, 100, 'uncommon', 15, '#EAB308'),
('seg-3', 3, 'HEARTS', 1, 1, 'common', 15, '#22C55E'),
('seg-4', 4, 'XP', 50, 50, 'uncommon', 10, '#A855F7'),
('seg-5', 5, 'COINS', 200, 200, 'rare', 4, '#EF4444'),
('seg-6', 6, 'XP', 100, 100, 'rare', 5, '#3B82F6'),
('seg-7', 7, 'STREAK_FREEZE', 1, 1, 'rare', 1, '#EAB308')
ON CONFLICT ("id") DO UPDATE SET
  "segmentIndex" = EXCLUDED."segmentIndex",
  "rewardType" = EXCLUDED."rewardType",
  "amountMin" = EXCLUDED."amountMin",
  "amountMax" = EXCLUDED."amountMax",
  "rarityTier" = EXCLUDED."rarityTier",
  "weight" = EXCLUDED."weight",
  "colorKey" = EXCLUDED."colorKey";
