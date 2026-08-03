-- =============================================================
-- Migration: fix trading history flags and stage inconsistencies
-- Date: 2026-08-03
-- Verified against: official source URLs where accessible
-- =============================================================

-- 1. Bridgement Invoice Finance
--    Requires outstanding B2B invoices from an operating business.
--    requires_trading_history was false — corrected to true.
UPDATE public.funding_opportunities
SET
  requires_trading_history = true,
  updated_at = now()
WHERE id = '07642db4-fd6f-4b42-9293-6ec7d3f3d2ca';

-- 2. Yoco Capital
--    Requires 6 months as an active Yoco merchant + transaction history.
--    Verified on official page: "You need to be a Yoco merchant for
--    6 months to qualify."
--    requires_trading_history was false — corrected to true.
UPDATE public.funding_opportunities
SET
  requires_trading_history = true,
  updated_at = now()
WHERE id = '47447deb-d748-446b-8ec0-94f7f78347e4';

-- 3. Retail Capital Working Capital → now GoTyme for Business
--    Retail Capital has rebranded/merged into GoTyme for Business.
--    Source URL now redirects to GoTyme. Title, funder, and URLs updated.
--    Requires 1 year trading + R40 000/month turnover, so
--    requires_trading_history corrected to true.
--    data_verified set to false pending a full GoTyme product review.
UPDATE public.funding_opportunities
SET
  title                    = 'GoTyme Business Advance (formerly Retail Capital)',
  funder                   = 'GoTyme Bank (formerly Retail Capital)',
  source_url               = 'https://www.retailcapital.co.za/',
  apply_url                = 'https://www.retailcapital.co.za/',
  requires_trading_history = true,
  data_verified            = false,
  updated_at               = now()
WHERE id = '622d33ec-1355-41a5-b436-ad9fc7f78724';

-- 4. IDF Capital SME Funding
--    Eligibility notes explicitly state: "at least 12 months of trading
--    history and a minimum of 3 completed trades".
--    requires_trading_history was false — corrected to true.
UPDATE public.funding_opportunities
SET
  requires_trading_history = true,
  updated_at = now()
WHERE id = '956775ba-6f11-4050-9799-376c3bde741b';

-- 5. Absa Youth Entrepreneurship Fund (AYEF)
--    Official FAQ confirms three tiers: Ideation (idea only, no trading
--    required), Start-up, and Early Growth. business_stage='early'
--    excluded pre-revenue / idea-stage applicants who are the primary
--    target. Corrected to 'any'.
UPDATE public.funding_opportunities
SET
  business_stage = 'any',
  updated_at     = now()
WHERE id = 'c4576c25-2245-408b-9c2e-339c4fb5d900';

-- Verify (uncomment and run after migration)
-- SELECT id, title, requires_trading_history, business_stage
-- FROM public.funding_opportunities
-- WHERE id IN (
--   '07642db4-fd6f-4b42-9293-6ec7d3f3d2ca',
--   '47447deb-d748-446b-8ec0-94f7f78347e4',
--   '622d33ec-1355-41a5-b436-ad9fc7f78724',
--   '956775ba-6f11-4050-9799-376c3bde741b',
--   'c4576c25-2245-408b-9c2e-339c4fb5d900'
-- );
