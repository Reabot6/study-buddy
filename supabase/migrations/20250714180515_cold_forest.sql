/*
  # Add automatic user profile creation trigger

  1. Trigger Function
    - `handle_new_user()` function that creates user profiles automatically
    - Extracts username, display_name, and theme from user metadata
    - Handles errors gracefully with default values

  2. Trigger Setup
    - Triggers after INSERT on auth.users
    - Automatically creates corresponding user_profiles entry
    - Also creates initial user_stats and koko_data entries

  3. Error Handling
    - Uses COALESCE for safe metadata extraction
    - Provides sensible defaults if metadata is missing
    - Prevents signup failures due to missing profile data
*/

-- Create the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into user_profiles
  INSERT INTO public.user_profiles (
    user_id,
    username,
    display_name,
    theme
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'theme', 'princess')
  );

  -- Insert initial user_stats
  INSERT INTO public.user_stats (
    user_id,
    total_study_time,
    current_streak,
    longest_streak,
    sessions_this_week
  ) VALUES (
    NEW.id,
    0,
    0,
    0,
    0
  );

  -- Insert initial koko_data
  INSERT INTO public.koko_data (
    user_id,
    funds,
    bus_tickets,
    outfits,
    current_outfit,
    emotional_state
  ) VALUES (
    NEW.id,
    0,
    0,
    ARRAY['default'],
    'default',
    'happy'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();