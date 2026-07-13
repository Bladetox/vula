'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitOpportunity(formData: FormData) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('submissions').insert({
    opportunity_name: formData.get('opportunity_name'),
    funder_name: formData.get('funder_name'),
    description: formData.get('description'),
    amount_label: formData.get('amount_label'),
    funding_type: formData.get('funding_type'),
    apply_url: formData.get('apply_url'),
    deadline: formData.get('deadline') || null,
    sector_tags: formData.getAll('sector_tags'),
    submitter_email: formData.get('submitter_email'),
    notes: formData.get('notes'),
    status: 'pending', // default — you review in Supabase dashboard
  })

  if (error) throw new Error(error.message)
  revalidatePath('/submit')
  return { success: true }
}
