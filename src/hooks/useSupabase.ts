import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { Course, StudySession, Flashcard, Goal, UserStats, DailyLearning, KokoData, MaxData } from '../types';

export function useSupabase() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auth functions
  const signUp = async (email: string, password: string, username: string, displayName: string, gender: 'female' | 'male') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          display_name: displayName,
          theme: gender === 'male' ? 'champion' : 'princess',
          gender
        }
      }
    });

    if (error) throw error;
    return data;
  };

  const signIn = async (email: string, password: string, gender: 'female' | 'male') => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    // Update user metadata with gender preference
    if (data.user) {
      await supabase.auth.updateUser({
        data: { gender }
      });
    }
    
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // Data sync functions
  const syncUserProfile = async () => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data;
  };

  const updateUserProfile = async (updates: { username?: string; display_name?: string; theme?: string; gender?: 'female' | 'male' }) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const syncCourses = async (): Promise<Course[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data.map(course => ({
      id: course.id,
      name: course.name,
      color: course.color,
      icon: course.icon,
      goal: course.goal,
      totalSessions: course.total_sessions,
      totalMinutes: course.total_minutes,
    }));
  };

  const saveCourse = async (course: Omit<Course, 'id' | 'totalSessions' | 'totalMinutes'>) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('courses')
      .insert({
        user_id: user.id,
        name: course.name,
        color: course.color,
        icon: course.icon,
        goal: course.goal || '',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateCourse = async (id: string, updates: Partial<Course>) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('courses')
      .update({
        name: updates.name,
        color: updates.color,
        icon: updates.icon,
        goal: updates.goal,
        total_sessions: updates.totalSessions,
        total_minutes: updates.totalMinutes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteCourse = async (id: string) => {
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
  };

  const syncStudySessions = async (): Promise<StudySession[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (error) throw error;
    return data.map(session => ({
      id: session.id,
      courseId: session.course_id,
      date: session.date,
      duration: session.duration,
      notes: session.notes,
      reflection: session.reflection,
      mood: session.mood,
      focusRating: session.focus_rating,
    }));
  };

  const saveStudySession = async (session: Omit<StudySession, 'id'>) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('study_sessions')
      .insert({
        user_id: user.id,
        course_id: session.courseId,
        date: session.date,
        duration: session.duration,
        notes: session.notes,
        reflection: session.reflection,
        mood: session.mood,
        focus_rating: session.focusRating,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const syncFlashcards = async (): Promise<Flashcard[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data.map(card => ({
      id: card.id,
      courseId: card.course_id,
      question: card.question,
      answer: card.answer,
      difficulty: card.difficulty as 'easy' | 'medium' | 'hard',
      nextReview: card.next_review,
      reviewCount: card.review_count,
      lastReviewed: card.last_reviewed,
    }));
  };

  const saveFlashcard = async (flashcard: Omit<Flashcard, 'id'>) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('flashcards')
      .insert({
        user_id: user.id,
        course_id: flashcard.courseId,
        question: flashcard.question,
        answer: flashcard.answer,
        difficulty: flashcard.difficulty,
        next_review: flashcard.nextReview,
        review_count: flashcard.reviewCount,
        last_reviewed: flashcard.lastReviewed,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateFlashcard = async (id: string, updates: Partial<Flashcard>) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('flashcards')
      .update({
        question: updates.question,
        answer: updates.answer,
        difficulty: updates.difficulty,
        next_review: updates.nextReview,
        review_count: updates.reviewCount,
        last_reviewed: updates.lastReviewed,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const syncGoals = async (): Promise<Goal[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data.map(goal => ({
      id: goal.id,
      title: goal.title,
      description: goal.description,
      targetDate: goal.target_date,
      completed: goal.completed,
      courseId: goal.course_id,
      progress: goal.progress,
    }));
  };

  const saveGoal = async (goal: Omit<Goal, 'id'>) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('goals')
      .insert({
        user_id: user.id,
        course_id: goal.courseId,
        title: goal.title,
        description: goal.description,
        target_date: goal.targetDate,
        completed: goal.completed,
        progress: goal.progress,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('goals')
      .update({
        title: updates.title,
        description: updates.description,
        target_date: updates.targetDate,
        completed: updates.completed,
        course_id: updates.courseId,
        progress: updates.progress,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteGoal = async (id: string) => {
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
  };

  const syncDailyLearnings = async (): Promise<DailyLearning[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('daily_learnings')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (error) throw error;
    return data.map(learning => ({
      id: learning.id,
      date: learning.date,
      content: learning.content,
      courseId: learning.course_id,
      tags: learning.tags,
    }));
  };

  const saveDailyLearning = async (learning: Omit<DailyLearning, 'id'>) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('daily_learnings')
      .insert({
        user_id: user.id,
        course_id: learning.courseId,
        date: learning.date,
        content: learning.content,
        tags: learning.tags,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateDailyLearning = async (id: string, updates: Partial<DailyLearning>) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('daily_learnings')
      .update({
        course_id: updates.courseId,
        date: updates.date,
        content: updates.content,
        tags: updates.tags,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteDailyLearning = async (id: string) => {
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('daily_learnings')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
  };

  const syncUserStats = async (): Promise<UserStats | null> => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return {
      totalStudyTime: data.total_study_time,
      currentStreak: data.current_streak,
      longestStreak: data.longest_streak,
      sessionsThisWeek: data.sessions_this_week,
      lastStudyDate: data.last_study_date,
    };
  };

  const updateUserStats = async (stats: UserStats) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('user_stats')
      .update({
        total_study_time: stats.totalStudyTime,
        current_streak: stats.currentStreak,
        longest_streak: stats.longestStreak,
        sessions_this_week: stats.sessionsThisWeek,
        last_study_date: stats.lastStudyDate,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const syncKokoData = async (): Promise<KokoData | MaxData | null> => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('koko_data')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return {
      funds: data.funds,
      busTickets: data.bus_tickets,
      outfits: data.outfits,
      currentOutfit: data.current_outfit,
      emotionalState: data.emotional_state as 'happy' | 'sad' | 'excited' | 'sleepy' | 'proud',
      lastInteraction: data.last_interaction,
    };
  };

  const updateKokoData = async (companionData: KokoData | MaxData) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('koko_data')
      .update({
        funds: companionData.funds,
        bus_tickets: companionData.busTickets,
        outfits: companionData.outfits,
        current_outfit: companionData.currentOutfit,
        emotional_state: companionData.emotionalState,
        last_interaction: companionData.lastInteraction,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    syncUserProfile,
    updateUserProfile,
    syncCourses,
    saveCourse,
    updateCourse,
    deleteCourse,
    syncStudySessions,
    saveStudySession,
    syncFlashcards,
    saveFlashcard,
    updateFlashcard,
    syncGoals,
    saveGoal,
    updateGoal,
    deleteGoal,
    syncDailyLearnings,
    saveDailyLearning,
    updateDailyLearning,
    deleteDailyLearning,
    syncUserStats,
    updateUserStats,
    syncKokoData,
    updateKokoData,
  };
}