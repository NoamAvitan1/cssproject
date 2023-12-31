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
      message: {
        Row: {
          body: string
          context_id: string | null
          created_at: string
          id: number
          type: string
          user_id: string
        }
        Insert: {
          body: string
          context_id?: string | null
          created_at?: string
          id?: number
          type: string
          user_id: string
        }
        Update: {
          body?: string
          context_id?: string | null
          created_at?: string
          id?: number
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      module: {
        Row: {
          access_type: Database["public"]["Enums"]["module_access_type"]
          created_at: string
          css: string
          description: string
          downloads: number
          examples_count: number
          html: string[] | null
          id: string
          price: number
          title: string
          user_id: string
          title_description: string | null
        }
        Insert: {
          access_type: Database["public"]["Enums"]["module_access_type"]
          created_at?: string
          css: string
          description?: string
          downloads?: number
          examples_count?: number
          html?: string[] | null
          id?: string
          price?: number
          title: string
          user_id: string
        }
        Update: {
          access_type?: Database["public"]["Enums"]["module_access_type"]
          created_at?: string
          css?: string
          description?: string
          downloads?: number
          examples_count?: number
          html?: string[] | null
          id?: string
          price?: number
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      module_purchase: {
        Row: {
          created_at: string
          id: string
          module_id: string | null
          price: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          module_id?: string | null
          price: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          module_id?: string | null
          price?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "module_purchase_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "module"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_purchase_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
          title: string
          user_id: string
        }
        Insert: {
          access_type?: string
          created_at?: string
          description?: string | null
          downloads?: number
          id?: string
          price?: number
          title: string
          user_id: string
        }
        Update: {
          access_type?: string
          created_at?: string
          description?: string | null
          downloads?: number
          id?: string
          price?: number
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
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
            isOneToOne: false
            referencedRelation: "module"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_module_join_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "package"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          about: string | null
          created_at: string
          email: string | null
          id: string
          module_count: number
          package_count: number
          private_modules_count: number | null
          profile_pic: string | null
          user_name: string | null
          ways_of_contact: Json | null
        }
        Insert: {
          about?: string | null
          created_at?: string
          email?: string | null
          id: string
          module_count?: number
          package_count?: number
          private_modules_count?: number | null
          profile_pic?: string | null
          user_name?: string | null
          ways_of_contact?: Json | null
        }
        Update: {
          about?: string | null
          created_at?: string
          email?: string | null
          id?: string
          module_count?: number
          package_count?: number
          private_modules_count?: number | null
          profile_pic?: string | null
          user_name?: string | null
          ways_of_contact?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      purchase: {
        Row: {
          created_at: string
          id: string
          total_price: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          total_price: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          total_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: "module"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_module_join_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "purchase"
            referencedColumns: ["id"]
          }
        ]
      }
      review: {
        Row: {
          created_at: string
          id: string
          stars: number
          text: string
          type: Database["public"]["Enums"]["review_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          stars: number
          text?: string
          type?: Database["public"]["Enums"]["review_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          stars?: number
          text?: string
          type?: Database["public"]["Enums"]["review_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
      title_description: {
        Args: {
          "": unknown
        }
        Returns: string
      }
    }
    Enums: {
      module_access_type: "public" | "private" | "paid"
      review_type: "module" | "package"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
