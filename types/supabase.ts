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
      module: {
        Row: {
          access_type: string
          code: string
          created_at: string
          description: string
          downloads: number
          examples: string[] | null
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
          examples?: string[] | null
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
          examples?: string[] | null
          id?: string
          price?: number
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      package: {
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
      profile: {
        Row: {
          id: string
          name: string
          profile_img: string | null
          role: string
        }
        Insert: {
          id?: string
          name?: string
          profile_img?: string | null
          role?: string
        }
        Update: {
          id?: string
          name?: string
          profile_img?: string | null
          role?: string
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
