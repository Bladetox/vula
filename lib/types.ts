export type FundingOpportunity = {
  id: string
  title: string
  funder: string
  description: string
  amount_min: number | null
  amount_max: number | null
  amount_label: string | null
  status: string
  funding_type: string | null
  requires_registration: boolean
  target_youth: boolean
  target_women: boolean
  target_disability: boolean
  target_cooperative: boolean
  target_informal: boolean
  target_rural: boolean
  target_township: boolean
  eligibility_notes: string | null
  documents_required: string[]
  apply_url: string | null
  source_url: string | null
  source_verified: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export type Industry = {
  id: string
  slug: string
  name: string
  icon_name?: string | null
  created_at?: string
}

export type Submission = {
  id: string
  title: string
  funder: string
  amount_range: string | null
  description: string
  eligibility: string | null
  apply_url: string | null
  source_url: string | null
  sector_tags: string[]
  status: 'pending' | 'verified' | 'rejected'
  submitted_by_email: string | null
  reviewer_notes: string | null
  created_at: string
  reviewed_at: string | null
}
