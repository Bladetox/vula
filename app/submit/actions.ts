'use server'

import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export async function submitOpportunity(formData: FormData) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const sectorTags = formData.getAll('sector_tags') as string[]

  const { error } = await supabase.from('opportunities').insert({
    opportunity_name: formData.get('opportunity_name') as string,
    funder_name: formData.get('funder_name') as string,
    description: formData.get('description') as string,
    amount_label: formData.get('amount_label') as string | null,
    funding_type: formData.get('funding_type') as string,
    apply_url: formData.get('apply_url') as string,
    deadline: formData.get('deadline') || null,
    submitter_email: formData.get('submitter_email') as string,
    sector_tags: sectorTags,
    notes: formData.get('notes') as string | null,
    status: 'pending',
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/submit/thank-you')
}
