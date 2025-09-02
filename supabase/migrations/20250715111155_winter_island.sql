/*
  # Add gender field to user profiles

  1. Changes
    - Add gender column to user_profiles table
    - Update trigger function to handle gender from user metadata
    - Set default gender values for existing users

  2. Security
    - Maintains existing RLS policies
    - No changes to security model
*/

-- Add gender column to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS gender text DEFAULT 'female' CHECK (gender IN ('female', 'male'));

-- Update the trigger function to handle gender
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, username, display_name, theme, gender)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'theme', 'princess'),
    COALESCE(NEW.raw_user_meta_data->>'gender', 'female')
  );

  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);

  INSERT INTO public.koko_data (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;