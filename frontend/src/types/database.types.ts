// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string
          order_number: string
          status: 'draft' | 'in_progress' | 'completed' | 'cancelled'
          closing_date: string | null
          property_address: string | null
          cdf_data: Record<string, any>
          contacts_data: Record<string, any>
          properties_data: Record<string, any>
          payoffs_data: Record<string, any>
          calculations_data: Record<string, any>
          documents_data: Record<string, any>
          audit_log: Array<any>
          user_id: number
          created_by: string | null
          updated_by: string | null
          notes: string | null
          is_locked: boolean
          locked_at: string | null
          locked_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          status?: 'draft' | 'in_progress' | 'completed' | 'cancelled'
          closing_date?: string | null
          property_address?: string | null
          cdf_data?: Record<string, any>
          contacts_data?: Record<string, any>
          properties_data?: Record<string, any>
          payoffs_data?: Record<string, any>
          calculations_data?: Record<string, any>
          documents_data?: Record<string, any>
          audit_log?: Array<any>
          user_id: number
          created_by?: string | null
          updated_by?: string | null
          notes?: string | null
          is_locked?: boolean
          locked_at?: string | null
          locked_by?: string | null
        }
        Update: {
          id?: string
          order_number?: string
          status?: 'draft' | 'in_progress' | 'completed' | 'cancelled'
          closing_date?: string | null
          property_address?: string | null
          cdf_data?: Record<string, any>
          contacts_data?: Record<string, any>
          properties_data?: Record<string, any>
          payoffs_data?: Record<string, any>
          calculations_data?: Record<string, any>
          documents_data?: Record<string, any>
          audit_log?: Array<any>
          user_id?: number
          created_by?: string | null
          updated_by?: string | null
          notes?: string | null
          is_locked?: boolean
          locked_at?: string | null
          locked_by?: string | null
        }
      }
      Users: {
        Row: {
          id: number
          firstName: string | null
          lastName: string | null
          email: string
          password: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          firstName?: string | null
          lastName?: string | null
          email: string
          password: string
        }
        Update: {
          id?: number
          firstName?: string | null
          lastName?: string | null
          email?: string
          password?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}