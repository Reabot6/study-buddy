import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          username: string;
          display_name: string;
          theme: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          username: string;
          display_name: string;
          theme?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          username?: string;
          display_name?: string;
          theme?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          color: string;
          icon: string;
          goal: string;
          total_sessions: number;
          total_minutes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          color?: string;
          icon?: string;
          goal?: string;
          total_sessions?: number;
          total_minutes?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          color?: string;
          icon?: string;
          goal?: string;
          total_sessions?: number;
          total_minutes?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      study_sessions: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          date: string;
          duration: number;
          notes: string;
          reflection: string;
          mood: number;
          focus_rating: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          date: string;
          duration: number;
          notes?: string;
          reflection?: string;
          mood?: number;
          focus_rating?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          date?: string;
          duration?: number;
          notes?: string;
          reflection?: string;
          mood?: number;
          focus_rating?: number;
          created_at?: string;
        };
      };
      flashcards: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          question: string;
          answer: string;
          difficulty: string;
          next_review: string;
          review_count: number;
          last_reviewed: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          question: string;
          answer: string;
          difficulty?: string;
          next_review?: string;
          review_count?: number;
          last_reviewed?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          question?: string;
          answer?: string;
          difficulty?: string;
          next_review?: string;
          review_count?: number;
          last_reviewed?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      goals: {
        Row: {
          id: string;
          user_id: string;
          course_id: string | null;
          title: string;
          description: string;
          target_date: string;
          completed: boolean;
          progress: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id?: string | null;
          title: string;
          description?: string;
          target_date: string;
          completed?: boolean;
          progress?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string | null;
          title?: string;
          description?: string;
          target_date?: string;
          completed?: boolean;
          progress?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      daily_learnings: {
        Row: {
          id: string;
          user_id: string;
          course_id: string | null;
          date: string;
          content: string;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id?: string | null;
          date: string;
          content: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string | null;
          date?: string;
          content?: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      user_stats: {
        Row: {
          id: string;
          user_id: string;
          total_study_time: number;
          current_streak: number;
          longest_streak: number;
          sessions_this_week: number;
          last_study_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_study_time?: number;
          current_streak?: number;
          longest_streak?: number;
          sessions_this_week?: number;
          last_study_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_study_time?: number;
          current_streak?: number;
          longest_streak?: number;
          sessions_this_week?: number;
          last_study_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      koko_data: {
        Row: {
          id: string;
          user_id: string;
          funds: number;
          bus_tickets: number;
          outfits: string[];
          current_outfit: string;
          emotional_state: string;
          last_interaction: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          funds?: number;
          bus_tickets?: number;
          outfits?: string[];
          current_outfit?: string;
          emotional_state?: string;
          last_interaction?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          funds?: number;
          bus_tickets?: number;
          outfits?: string[];
          current_outfit?: string;
          emotional_state?: string;
          last_interaction?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}