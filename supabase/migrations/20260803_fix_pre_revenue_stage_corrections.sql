-- =============================================================================
-- Migration: fix pre-revenue business_stage corrections
-- Date: 2026-08-03
-- Author: audit via confirmed source URLs
--
-- Deep-dive findings:
--   CLEAR ERRORS (require trading evidence the eligibility notes confirm):
--     CDSP (idx 22)  — requires bank statements + management accounts → 'early'
--     Seda STP (idx 23) — requires operational manufacturing entity + ROI → 'early'
--
--   BORDERLINE / OVERLY RESTRICTIVE (no revenue requirement but not idea-stage):
--     SPII (idx 13)  — pre-commercialisation of ONE product; other revenue allowed → 'early'
--     Spaza Shop (idx 29) — targets existing owner-operators in practice → 'early'
--     SEDA SABS (idx 40) — needs physical product to test; idea-only cannot apply → 'early'
--
--   UNPUBLISHED DEFENSIVE FIX:
--     IDC General (idx 5, published=false) — requires business case + repayment ability → 'early'
--
--   CONFIRMED CORRECT (no changes):
--     NYDA Grant (idx 7)  — explicitly accepts idea-stage + pending CIPC → stays 'pre-revenue'
--     TIA Seed Fund (idx 26) — TRL 5-6, no revenue requirement confirmed → stays 'pre-revenue'
-- =============================================================================

-- 1. CDSP — Co-operatives Development Support Programme
--    Source: https://www.dsbd.gov.za/programme/co-operatives-development-support-programme-cdsp
--    Evidence: requires bank statements, management accounts, and financial statements;
--    a brand-new zero-revenue co-op cannot supply these.
UPDATE public.funding_opportunities
SET
  business_stage = 'early',
  updated_at     = now()
WHERE id = '6acdf00e-0e0d-4611-b999-748750c8ea01';

-- 2. Seda Technology Programme (STP)
--    Source: https://www.thedtic.gov.za/financial-and-non-financial-support/incentives/stp/
--    Evidence: preference for "operational manufacturing enterprises";
--    requires ROI motivation — pre-revenue idea stage cannot demonstrate this.
UPDATE public.funding_opportunities
SET
  business_stage = 'early',
  updated_at     = now()
WHERE id = '6bbc9abe-e86d-411c-bad1-c4aaa450d2d9';

-- 3. SPII — Support Programme for Industrial Innovation
--    Source: https://www.thedtic.gov.za/financial-and-non-financial-support/incentives/support-programme-for-industrial-innovation-spii/
--    Evidence: covers pre-commercialisation of a SPECIFIC product/process but does NOT
--    require the applicant to have zero revenue overall. A business earning revenue
--    from other products while developing a new one fully qualifies.
--    'early' is more accurate than 'pre-revenue'.
UPDATE public.funding_opportunities
SET
  business_stage = 'early',
  updated_at     = now()
WHERE id = '39cc30b5-77dc-4219-a72d-a9fdc04d72d6';

-- 4. Spaza Shop Support Fund
--    Source: https://www.spazashopfund.co.za/eligibility-criteria/
--    Evidence: no explicit trading history requirement in the rules, but the fund
--    targets existing owner-managed shops upgrading their operations (stock,
--    refrigeration, shelving). In practice applicants are already trading.
--    'early' is more honest.
UPDATE public.funding_opportunities
SET
  business_stage = 'early',
  updated_at     = now()
WHERE id = 'b0e28d59-4633-42ef-a5e5-148ca4b49b02';

-- 5. SEDA Product Testing Grant (SABS)
--    Source: https://www.thedtic.gov.za/financial-and-non-financial-support/incentives/seda-technology-programme/
--    Evidence: applicant must have an actual physical product ready to submit
--    for SABS testing. Idea-only applicants cannot use this grant at all.
--    No revenue requirement, but not truly idea-stage either → 'early'.
UPDATE public.funding_opportunities
SET
  business_stage = 'early',
  updated_at     = now()
WHERE id = 'f30b91b6-228a-4f9b-aaec-5a5f2a290b76';

-- 6. IDC General Business Funding (published = false — defensive fix)
--    Source: https://www.idc.co.za/what-we-offer-2/
--    Evidence: requires viable business case and ability to repay debt.
--    Not appropriate for pre-revenue stage; corrected ahead of any re-publish.
UPDATE public.funding_opportunities
SET
  business_stage = 'early',
  updated_at     = now()
WHERE id = '104b384f-ae1b-4e0d-b498-7c92553c1b48';

-- =============================================================================
-- Verification query (run after applying migration):
-- Expected: only NYDA Grant and TIA Seed Fund remain as pre-revenue.
--
-- SELECT id, title, business_stage, published
-- FROM public.funding_opportunities
-- WHERE business_stage = 'pre-revenue'
-- ORDER BY title;
-- =============================================================================
