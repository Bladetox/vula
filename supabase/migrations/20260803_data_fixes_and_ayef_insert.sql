-- =============================================================================
-- Migration: 20260803_data_fixes_and_ayef_insert.sql
-- Purpose  : Correct registration flags, remove duplicates, add AYEF
-- Date     : 2026-08-03
-- =============================================================================


-- ---------------------------------------------------------------------------
-- 1. REMOVE DUPLICATE ROWS
--    Three rows are confirmed duplicates based on the exported data review.
-- ---------------------------------------------------------------------------

-- Duplicate TREP row with wrong business_stage='growth' (idx29)
DELETE FROM opportunities WHERE id = 'aaab7d38-1553-435a-b86d-16f1f9ae0890';

-- Duplicate TREP row with business_stage='pre-revenue', show_nextslot_card=false (idx32)
DELETE FROM opportunities WHERE id = 'b5884efb-717d-4b34-abb7-2a38668b4499';

-- Duplicate Asset Assist row missing amount_min, max_turnover, and target flags (idx33)
DELETE FROM opportunities WHERE id = 'b5d8949e-2745-4391-8b71-db2b45c6dd38';


-- ---------------------------------------------------------------------------
-- 2. FIX TREP — requires_registration stays TRUE but target_informal = FALSE
--    TREP explicitly requires CIPC registration documents in its checklist.
--    Marking it target_informal=true caused it to surface under the
--    "no registration needed" filter path — that is incorrect.
--    It is a township/rural programme, not an informal-trader programme.
-- ---------------------------------------------------------------------------

UPDATE opportunities
SET
  target_informal   = false,
  business_stage    = 'any',          -- supports all stages, not just pre-revenue
  updated_at        = now()
WHERE id = '3db0b35d-6af2-45be-9f06-878cb5ed484d';  -- canonical TREP row (idx15)


-- ---------------------------------------------------------------------------
-- 3. FIX NYDA GRANT — requires_registration = FALSE
--    The voucher tier (R1,000–R10,000) explicitly accepts applicants with
--    PENDING CIPC registration — proof of registration is not required at
--    time of application. The full grant tiers require registration only by
--    disbursement. Setting requires_registration=false is accurate and
--    prevents the programme from disappearing under the "no registration"
--    filter when it is one of the few genuine pre-registration options.
--    Eligibility note updated to reflect the pending-registration policy.
-- ---------------------------------------------------------------------------

UPDATE opportunities
SET
  requires_registration = false,
  eligibility_notes     = 'Applicants must be South African citizens and residents aged 18 to 35, and must apply before turning 35. Applicants must have skills, experience, or potential appropriate to the business. Businesses with annual turnover above R750,000 are excluded, except cooperatives which may have turnover up to R1,000,000. The voucher tier (R1,000–R10,000) accepts applicants with pending CIPC registration — a formal company registration is not required at the time of application. Full grant tiers require CIPC registration by the time of disbursement. NYDA will not fund illegal activities, pyramid schemes, primary tobacco or alcohol businesses, loan substitution, vehicles, patent registration, most R&D seed funding, or applicants previously disqualified under NYDA rules. Cumulative lifetime grant support is capped at R200,000, except agriculture and technology-related cooperatives which may receive up to R250,000.',
  updated_at            = now()
WHERE id = '1ac990c7-4ebf-4dd4-b8de-49f8b0f378d6';  -- NYDA Grant Programme (idx7)


-- ---------------------------------------------------------------------------
-- 4. FIX SPAZA SHOP SUPPORT FUND — requires_registration = FALSE
--    Eligibility notes confirm a municipal trading licence or permit suffices
--    for applications up to R80,000. CIPC registration is only required for
--    funding above R80,000 and must be obtained within 6 months of approval.
--    The fund explicitly targets informal spaza operators — requiring CIPC
--    at the filter level defeats the purpose of the programme.
-- ---------------------------------------------------------------------------

UPDATE opportunities
SET
  requires_registration = false,
  updated_at            = now()
WHERE id = 'b0e28d59-4633-42ef-a5e5-148ca4b49b02';  -- Spaza Shop Support Fund (idx30)


-- ---------------------------------------------------------------------------
-- 5. FIX YOCO CAPITAL — requires_registration = FALSE
--    documents_required is empty. Eligibility is based entirely on Yoco
--    payment history (6 months active, 18 transactions, R3,000/month avg).
--    No CIPC certificate is listed or required. Sole traders qualify.
-- ---------------------------------------------------------------------------

UPDATE opportunities
SET
  requires_registration = false,
  updated_at            = now()
WHERE id = '47447deb-d748-446b-8ec0-94f7f78347e4';  -- Yoco Capital (idx16)


-- ---------------------------------------------------------------------------
-- 6. FIX RETAIL CAPITAL — requires_registration = FALSE
--    documents_required is empty. Eligibility notes explicitly state
--    "Available to sole proprietors and registered companies." No CIPC
--    certificate is listed or required. Gated by trading history and
--    monthly turnover only.
-- ---------------------------------------------------------------------------

UPDATE opportunities
SET
  requires_registration = false,
  updated_at            = now()
WHERE id = '622d33ec-1355-41a5-b436-ad9fc7f78724';  -- Retail Capital Working Capital (idx19)


-- ---------------------------------------------------------------------------
-- 7. INSERT — ABSA YOUTH ENTREPRENEURSHIP FUND (AYEF)
--    Launched 26 June 2026. Applications open August 2026.
--    The single most significant NEW pre-revenue, no-registration-required
--    grant in South Africa in 2026. Accepts idea-stage and informal
--    trading entrepreneurs. Milestone-based, non-repayable, no equity.
--    Source: https://www.absa.africa/absa-youth-entrepreneurship-fund/
--            https://www.bizcommunity.com/article/absa-unveils-entrepreneurship-fund-for-young-south-africans-842773a
-- ---------------------------------------------------------------------------

INSERT INTO opportunities (
  id,
  title,
  funder,
  description,
  amount_min,
  amount_max,
  amount_label,
  funding_type,
  status,
  requires_registration,
  target_youth,
  target_women,
  target_disability,
  target_cooperative,
  target_informal,
  target_rural,
  target_township,
  min_turnover,
  max_turnover,
  documents_required,
  eligibility_notes,
  apply_url,
  source_url,
  source_verified,
  published,
  created_at,
  updated_at,
  target_over35,
  show_nextslot_card,
  deadline,
  business_stage,
  data_verified
) VALUES (
  gen_random_uuid(),
  'Absa Youth Entrepreneurship Fund (AYEF)',
  'Absa Bank / Tshiamo Foundation',
  'A milestone-based grant programme for young South African entrepreneurs, launched 26 June 2026 to coincide with the 50th anniversary of the 1976 Youth Uprising. AYEF provides phased, non-repayable grant funding — no repayment, no equity taken. The programme is designed to support entrepreneurs at all stages of development, from early-stage business ideas and informal trading activity through to established ventures. Funded through a partnership between Absa and the Tshiamo Foundation.',
  null,
  null,
  'Amount determined per milestone phase',
  'grant',
  'open',
  false,   -- No CIPC registration required at application stage; idea-stage and informal traders explicitly accepted
  true,    -- Explicitly targets youth 18–35
  false,
  false,
  false,
  true,    -- Accepts informal traders and idea-stage entrepreneurs
  false,
  false,
  null,
  null,
  'South African ID document,Brief business idea or pitch description,Proof of informal trading activity where applicable',
  'South African citizen aged 18 to 35. Open to entrepreneurs at all stages — from a business idea to an informal trading activity to an established small business. No CIPC registration required at time of application. Funding is milestone-based and non-repayable. No equity is taken. The programme explicitly targets black youth entrepreneurs who face barriers to conventional financing. Applications open August 2026 via the Absa website. Priority given to black-owned ventures with job-creation potential.',
  'https://www.absa.africa/absa-youth-entrepreneurship-fund/',
  'https://www.bizcommunity.com/article/absa-unveils-entrepreneurship-fund-for-young-south-africans-842773a',
  true,
  true,
  now(),
  now(),
  false,   -- Explicitly age-capped at 35; over-35 entrepreneurs do not qualify
  true,    -- Feature on next-slot card — highest-value new listing for pre-revenue users
  null,
  'pre-revenue',
  true
);


-- ---------------------------------------------------------------------------
-- VERIFICATION QUERIES (run after migration to confirm correctness)
-- ---------------------------------------------------------------------------

-- Check all pre-revenue opportunities and their registration requirement:
-- SELECT id, title, requires_registration, target_informal, business_stage
-- FROM opportunities
-- WHERE business_stage IN ('pre-revenue', 'any')
-- AND published = true
-- ORDER BY requires_registration, title;

-- Confirm no duplicate TREP rows remain:
-- SELECT id, title, business_stage, updated_at
-- FROM opportunities
-- WHERE title ILIKE '%TREP%' OR title ILIKE '%Township and Rural%';

-- Confirm AYEF was inserted correctly:
-- SELECT id, title, requires_registration, target_youth, target_informal, business_stage, show_nextslot_card
-- FROM opportunities
-- WHERE title ILIKE '%AYEF%' OR title ILIKE '%Absa Youth Entrepreneurship%';
