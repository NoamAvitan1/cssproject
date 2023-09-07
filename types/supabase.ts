export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      modules: {
        Row: {
          access_type: string
          code: string
          created_at: string
          description: string
          downloads: number
          examples: string[]
          id: string
          price: number
          title: string
          user_id: string
        }
        Insert: {
          access_type?: string
          code: string
          created_at?: string
          description?: string
          downloads?: number
          examples: string[]
          id?: string
          price?: number
          title: string
          user_id: string
        }
        Update: {
          access_type?: string
          code?: string
          created_at?: string
          description?: string
          downloads?: number
          examples?: string[]
          id?: string
          price?: number
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      packages: {
        Row: {
          access_type: string
          created_at: string
          description: string | null
          downloads: number
          id: string
          modules: string[]
          price: number
          title: string
        }
        Insert: {
          access_type?: string
          created_at?: string
          description?: string | null
          downloads?: number
          id?: string
          modules: string[]
          price?: number
          title: string
        }
        Update: {
          access_type?: string
          created_at?: string
          description?: string | null
          downloads?: number
          id?: string
          modules?: string[]
          price?: number
          title?: string
        }
        Relationships: []
      }
      review: {
        Row: {
          created_at: string
          id: string
          stars: number
          text: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          stars: number
          text?: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          stars?: number
          text?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password: string
          role: string
        }
        Insert: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password: string
          role?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password?: string
          role?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
