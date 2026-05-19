export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      funding_opportunities: {
        Row: {
          id: string
          slug: string
          title: string
          funder: string
          description: string
          amount_min: number | null
          amount_max: number | null
          status: string
          requires_registration: boolean
          target_youth: boolean
          target_women: boolean
          target_disability: boolean
          target_cooperative: boolean
          target_informal: boolean
          apply_url: string | null
          official_source_url: string | null
          funding_type: string | null
          industries: string[]
          eligibility_notes: string | null
          documents_required: string[]
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['funding_opportunities']['Row'], 'id' | 'created_at' | 'updated_at'> & {
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
      submissions: {
        Row: {
          id: string
          title: string
          funder: string
          amount_range: string | null
          description: string
          eligibility: string | null
          apply_url: string | null
          official_source_url: string | null
          sector_tags: string[]
          status: string
          submitted_by_email: string | null
          reviewer_notes: string | null
          created_at: string
          reviewed_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['submissions']['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
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
