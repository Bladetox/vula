export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      funding_opportunities: {
        Row: {
          id: string
          title: string
          funder: string
          description: string
          amount_min: number | null
          amount_max: number | null
          amount_label: string | null
          funding_type: string | null
          status: string
          requires_registration: boolean | null
          target_youth: boolean | null
          target_women: boolean | null
          target_disability: boolean | null
          target_cooperative: boolean | null
          target_informal: boolean | null
          target_rural: boolean | null
          target_township: boolean | null
          target_over35: boolean
          show_nextslot_card: boolean
          min_turnover: number | null
          max_turnover: number | null
          documents_required: string[] | null
          eligibility_notes: string | null
          apply_url: string | null
          source_url: string
          source_verified: boolean | null
          published: boolean | null
          deadline: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: Omit<
          Database['public']['Tables']['funding_opportunities']['Row'],
          'id' | 'created_at' | 'updated_at'
        > & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['funding_opportunities']['Insert']>
      }
      industries: {
        Row: {
          id: string
          slug: string
          name: string
          icon_name: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['industries']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['industries']['Insert']>
      }
      opportunity_industries: {
        Row: {
          id: string
          opportunity_id: string
          industry_id: string
        }
        Insert: Omit<Database['public']['Tables']['opportunity_industries']['Row'], 'id'> & {
          id?: string
        }
        Update: Partial<Database['public']['Tables']['opportunity_industries']['Insert']>
      }
      submissions: {
        Row: {
          id: string
          title: string
          funder: string
          amount_range: string | null
          description: string
          eligibility: string | null
          apply_url: string | null
          source_url: string | null
          sector_tags: string[]
          status: string
          submitted_by_email: string | null
          reviewer_notes: string | null
          created_at: string
          reviewed_at: string | null
        }
        Insert: Omit<
          Database['public']['Tables']['submissions']['Row'],
          'id' | 'created_at' | 'status' | 'reviewer_notes' | 'reviewed_at'
        > & {
          id?: string
          created_at?: string
          status?: string
          reviewer_notes?: string | null
          reviewed_at?: string | null
        }
        Update: Partial<Database['public']['Tables']['submissions']['Insert']>
      }
      saved_opportunities: {
        Row: {
          id: string
          user_id: string
          opportunity_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['saved_opportunities']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['saved_opportunities']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
