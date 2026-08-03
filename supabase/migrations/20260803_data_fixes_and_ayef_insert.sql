-- =============================================================================
-- Migration: 20260803_data_fixes_and_ayef_insert.sql
-- Purpose  : Correct registration flags, remove duplicates, add AYEF
-- Date     : 2026-08-03
-- =============================================================================


-- ---------------------------------------------------------------------------
-- 1. REMOVE DUPLICATE ROWS
-- ---------------------------------------------------------------------------

DELETE FROM public.funding_opportunities WHERE id = 'aaab7d38-1553-435a-b86d-16f1f9ae0890';
DELETE FROM public.funding_opportunities WHERE id = 'b5884efb-717d-4b34-abb7-2a38668b4499';
DELETE FROM public.funding_opportunities WHERE id = 'b5d8949e-2745-4391-8b71-db2b45c6dd38';


-- ---------------------------------------------------------------------------
-- 2. FIX TREP
-- ---------------------------------------------------------------------------

UPDATE public.funding_opportunities
SET
  target_informal = false,
  business_stage  = 'any',
  updated_at      = now()
WHERE id = '3db0b35d-6af2-45be-9f06-878cb5ed484d';


-- ---------------------------------------------------------------------------
-- 3. FIX NYDA GRANT
-- ---------------------------------------------------------------------------

UPDATE public.funding_opportunities
SET
  requires_registration = false,
  eligibility_notes     = 'Applicants must be South African citizens and residents aged 18 to 35, and must apply before turning 35. Applicants must have skills, experience, or potential appropriate to the business. Businesses with annual turnover above R750,000 are excluded, except cooperatives which may have turnover up to R1,000,000. The voucher tier (R1,000 to R10,000) accepts applicants with pending CIPC registration. A formal company registration is not required at the time of application. Full grant tiers require CIPC registration by the time of disbursement. NYDA will not fund illegal activities, pyramid schemes, primary tobacco or alcohol businesses, loan substitution, vehicles, patent registration, most R&D seed funding, or applicants previously disqualified under NYDA rules. Cumulative lifetime grant support is capped at R200,000, except agriculture and technology-related cooperatives which may receive up to R250,000.',
  updated_at            = now()
WHERE id = '1ac990c7-4ebf-4dd4-b8de-49f8b0f378d6';


-- ---------------------------------------------------------------------------
-- 4. FIX SPAZA SHOP SUPPORT FUND
-- ---------------------------------------------------------------------------

UPDATE public.funding_opportunities
SET
  requires_registration = false,
  updated_at            = now()
WHERE id = 'b0e28d59-4633-42ef-a5e5-148ca4b49b02';


-- ---------------------------------------------------------------------------
-- 5. FIX YOCO CAPITAL
-- ---------------------------------------------------------------------------

UPDATE public.funding_opportunities
SET
  requires_registration = false,
  updated_at            = now()
WHERE id = '47447deb-d748-446b-8ec0-94f7f78347e4';


-- ---------------------------------------------------------------------------
-- 6. FIX RETAIL CAPITAL
-- ---------------------------------------------------------------------------

UPDATE public.funding_opportunities
SET
  requires_registration = false,
  updated_at            = now()
WHERE id = '622d33ec-1355-41a5-b436-ad9fc7f78724';


-- ---------------------------------------------------------------------------
-- 7. INSERT: ABSA YOUTH ENTREPRENEURSHIP FUND (AYEF)
-- ---------------------------------------------------------------------------

INSERT INTO public.funding_opportunities (
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
  'A milestone-based grant programme for young South African entrepreneurs, launched 26 June 2026. AYEF provides phased, non-repayable grant funding with no repayment and no equity taken. Open to entrepreneurs at all stages, from business ideas and informal traders through to established small businesses. Funded through a partnership between Absa and the Tshiamo Foundation.',
  null,
  null,
  'Amount determined per milestone phase',
  'grant',
  'open',
  false,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  null,
  null,
  ARRAY[
    'South African ID document',
    'Brief business idea or pitch description',
    'Proof of informal trading activity where applicable'
  ],
  'South African citizen aged 18 to 35. Open to entrepreneurs at all stages, from a business idea to informal trading to an established small business. No CIPC registration required at time of application. Funding is milestone-based and non-repayable. No equity is taken. Priority given to black-owned ventures with job-creation potential. Applications open August 2026 via the Absa website.',
  'https://www.absa.africa/absa-youth-entrepreneurship-fund/',
  'https://www.bizcommunity.com/article/absa-unveils-entrepreneurship-fund-for-young-south-africans-842773a',
  true,
  true,
  now(),
  now(),
  false,
  true,
  null,
  'pre-revenue',
  true
);


-- ---------------------------------------------------------------------------
-- VERIFICATION QUERIES (uncomment and run after migration)
-- ---------------------------------------------------------------------------

-- SELECT id, title, requires_registration, target_informal, business_stage
-- FROM public.funding_opportunities
-- WHERE business_stage IN ('pre-revenue', 'any') AND published = true
-- ORDER BY requires_registration, title;

-- SELECT id, title, business_stage, updated_at
-- FROM public.funding_opportunities
-- WHERE title ILIKE '%TREP%' OR title ILIKE '%Township and Rural%';

-- SELECT id, title, requires_registration, target_youth, target_informal, business_stage, show_nextslot_card
-- FROM public.funding_opportunities
-- WHERE title ILIKE '%AYEF%' OR title ILIKE '%Absa Youth Entrepreneurship%';
