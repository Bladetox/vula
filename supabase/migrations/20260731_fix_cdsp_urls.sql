-- Fix: Co-operatives Development Support Programme (CDSP)
-- Incorrect path: /co-operatives-development-support-programme
-- Correct path:   /programme/co-operatives-development-support-programme-cdsp
-- Source: https://www.dsbd.gov.za/programme/co-operatives-development-support-programme-cdsp

UPDATE funding_opportunities
SET
  apply_url   = 'https://www.dsbd.gov.za/programme/co-operatives-development-support-programme-cdsp',
  source_url  = 'https://www.dsbd.gov.za/programme/co-operatives-development-support-programme-cdsp',
  source_verified = true,
  data_verified   = true,
  updated_at      = now()
WHERE id = '6acdf00e-0e0d-4611-b999-748750c8ea01';
