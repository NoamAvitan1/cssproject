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
          profile_id: string
          title: string
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
          profile_id: string
          title: string
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
          profile_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_profile_id_fkey"
            columns: ["profile_id"]
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
          price: number
          profile_id: string
          title: string
        }
        Insert: {
          access_type?: string
          created_at?: string
          description?: string | null
          downloads?: number
          id?: string
          price?: number
          profile_id: string
          title: string
        }
        Update: {
          access_type?: string
          created_at?: string
          description?: string | null
          downloads?: number
          id?: string
          price?: number
          profile_id?: string
          title?: string
        }
        Relationships: []
      }
      package_module_join: {
        Row: {
          created_at: string
          id: string
          module_id: string
          package_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          module_id: string
          package_id: string
        }
        Update: {
          created_at?: string
          id?: string
          module_id?: string
          package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_module_join_module_id_fkey"
            columns: ["module_id"]
            referencedRelation: "module"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_module_join_package_id_fkey"
            columns: ["package_id"]
            referencedRelation: "package"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          created_at: string
          id: string
          user_name: string
          profile_pic: string | null
          user_id: string
          ways_of_contact: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          profile_pic?: string | null
          user_id: string
          ways_of_contact?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          profile_pic?: string | null
          user_id?: string
          ways_of_contact?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      purchase: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          total_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          total_price: number
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      purchase_module_join: {
        Row: {
          created_at: string
          id: number
          module_id: string
          purchase_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          module_id: string
          purchase_id: string
        }
        Update: {
          created_at?: string
          id?: number
          module_id?: string
          purchase_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_module_join_module_id_fkey"
            columns: ["module_id"]
            referencedRelation: "module"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_module_join_purchase_id_fkey"
            columns: ["purchase_id"]
            referencedRelation: "purchase"
            referencedColumns: ["id"]
          }
        ]
      }
      review: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          stars: number
          text: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          stars: number
          text?: string
          type?: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          stars?: number
          text?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
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
