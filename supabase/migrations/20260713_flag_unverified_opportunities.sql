-- Migration: flag opportunities with unverified figures
-- Run in Supabase SQL editor or via supabase db push
-- These opportunities have one or more amounts/thresholds that could not be
-- fully verified against an official primary source. A disclaimer banner is
-- shown on the detail page for any row where data_verified = false.

-- 1. Add column if it doesn't already exist
ALTER TABLE funding_opportunities
  ADD COLUMN IF NOT EXISTS data_verified boolean NOT NULL DEFAULT true;

-- 2. NYDA Grant — max amount is R200k (R250k only for agri/tech), not R200k flat
UPDATE funding_opportunities
SET
  data_verified = false,
  amount_label  = 'R1 000 to R200 000 (up to R250 000 for agri/tech projects)',
  amount_max    = 200000,
  updated_at    = now()
WHERE id = '1ac990c7-4ebf-4dd4-b8de-49f8b0f378d6';

-- 3. NEF iMbewu Fund — overall fund cap is R15m; R10m applies to entrepreneurship sub-product only
UPDATE funding_opportunities
SET
  data_verified = false,
  amount_label  = 'R250 000 to R15 million',
  amount_max    = 15000000,
  updated_at    = now()
WHERE id = 'c936dd3f-4d44-4f67-ad3a-fcd383e639ba';

-- 4. Merchant Capital — official site states R50 000 min monthly turnover, not R30 000
UPDATE funding_opportunities
SET
  data_verified     = false,
  eligibility_notes = 'Must have a card machine or POS terminal with at least 6 months of processing history. Minimum average monthly card turnover of R50 000 (verify on official site — some co-branded products may differ). Hospitality, retail, and service businesses are the primary target market.',
  updated_at        = now()
WHERE id = '3d0b2c31-2341-4626-b496-baf1eea3a8f7';

-- 5. BBSDP — VAT threshold claim (R2.3m from April 2026) is unverified against SARS
UPDATE funding_opportunities
SET
  data_verified = false,
  updated_at    = now()
WHERE id = '09ffa598-b4c6-43f6-9dab-8c8fcb52dad8';

-- 6. Imbali For Her — sourced from a news blog, not an official SEDFA page
UPDATE funding_opportunities
SET
  data_verified = false,
  updated_at    = now()
WHERE id = '5ce59c8f-af33-49d7-92f7-f00d79dcf959';

-- 7. SEDA Technology Transfer Fund — SEDA merged into SEDFA April 2026; programme status uncertain
UPDATE funding_opportunities
SET
  data_verified = false,
  apply_url     = 'https://www.onesedfa.org.za/en-za/apply',
  updated_at    = now()
WHERE id = '6bbc9abe-e86d-411c-bad1-c4aaa450d2d9';

-- 8. IDC Gazelle Programme — distinct product not confirmed on current IDC website
UPDATE funding_opportunities
SET
  data_verified = false,
  updated_at    = now()
WHERE id = 'e9ee4c6f-c774-4349-811a-6037470aaf11';

-- 9. Peach Payments Capital — R2m cap unverified on official Peach Payments site
UPDATE funding_opportunities
SET
  data_verified = false,
  updated_at    = now()
WHERE id = 'c1d653fe-5e0c-419e-a445-880aa72b65e8';
