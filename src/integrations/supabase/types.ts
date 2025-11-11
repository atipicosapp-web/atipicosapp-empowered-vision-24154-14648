export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      family_achievements: {
        Row: {
          created_at: string | null
          date: string | null
          description: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          description: string
          id?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string | null
          description?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      family_progress: {
        Row: {
          ai_teacher_progress: number | null
          communication_progress: number | null
          created_at: string | null
          date: string | null
          emotions_progress: number | null
          id: string
          routine_progress: number | null
          total_percentage: number | null
          user_id: string
        }
        Insert: {
          ai_teacher_progress?: number | null
          communication_progress?: number | null
          created_at?: string | null
          date?: string | null
          emotions_progress?: number | null
          id?: string
          routine_progress?: number | null
          total_percentage?: number | null
          user_id: string
        }
        Update: {
          ai_teacher_progress?: number | null
          communication_progress?: number | null
          created_at?: string | null
          date?: string | null
          emotions_progress?: number | null
          id?: string
          routine_progress?: number | null
          total_percentage?: number | null
          user_id?: string
        }
        Relationships: []
      }
      family_reports: {
        Row: {
          content: string
          created_at: string | null
          id: string
          observations: string | null
          title: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          observations?: string | null
          title: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          observations?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      family_routines: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          name: string
          time: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          name: string
          time: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          name?: string
          time?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      mundo_atipicos_data: {
        Row: {
          coins: number | null
          created_at: string | null
          game_scores: Json | null
          id: string
          pieces: number | null
          selected_accessories: number | null
          selected_clothes: number | null
          selected_expression: number | null
          selected_hair: number | null
          selected_skin: number | null
          unlocked_rewards: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          coins?: number | null
          created_at?: string | null
          game_scores?: Json | null
          id?: string
          pieces?: number | null
          selected_accessories?: number | null
          selected_clothes?: number | null
          selected_expression?: number | null
          selected_hair?: number | null
          selected_skin?: number | null
          unlocked_rewards?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          coins?: number | null
          created_at?: string | null
          game_scores?: Json | null
          id?: string
          pieces?: number | null
          selected_accessories?: number | null
          selected_clothes?: number | null
          selected_expression?: number | null
          selected_hair?: number | null
          selected_skin?: number | null
          unlocked_rewards?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          trial_ends_at: string
        }
        Insert: {
          created_at?: string
          id: string
          trial_ends_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          trial_ends_at?: string
        }
        Relationships: []
      }
      school_connection: {
        Row: {
          created_at: string | null
          id: string
          observations: string | null
          school_name: string | null
          teacher_name: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          observations?: string | null
          school_name?: string | null
          teacher_name?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          observations?: string | null
          school_name?: string | null
          teacher_name?: string | null
          updated_at?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
