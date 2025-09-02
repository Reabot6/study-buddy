export interface Course {
  id: string;
  name: string;
  color: string;
  icon: string;
  goal?: string;
  totalSessions: number;
  totalMinutes: number;
}

export interface StudySession {
  id: string;
  courseId: string;
  date: string;
  duration: number; // in minutes
  notes: string;
  reflection: string;
  mood: number; // 1-5 scale
  focusRating: number; // 1-5 scale
}

export interface Flashcard {
  id: string;
  courseId: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nextReview: string;
  reviewCount: number;
  lastReviewed?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  courseId?: string;
  progress: number; // 0-100
}

export interface UserStats {
  totalStudyTime: number;
  currentStreak: number;
  longestStreak: number;
  sessionsThisWeek: number;
  lastStudyDate: string;
}

export interface DailyLearning {
  id: string;
  date: string;
  content: string;
  courseId?: string;
  tags: string[];
}

export interface KokoData {
  funds: number;
  busTickets: number;
  outfits: string[];
  currentOutfit: string;
  emotionalState: 'happy' | 'sad' | 'excited' | 'sleepy' | 'proud';
  lastInteraction: string;
}

export interface MaxData {
  funds: number;
  busTickets: number;
  outfits: string[];
  currentOutfit: string;
  emotionalState: 'happy' | 'sad' | 'excited' | 'sleepy' | 'proud';
  lastInteraction: string;
}

export type CompanionData = KokoData | MaxData;

export interface FAQSection {
  id: string;
  title: string;
  icon: string;
  questions: FAQQuestion[];
}

export interface FAQQuestion {
  id: string;
  question: string;
  answer: string;
}