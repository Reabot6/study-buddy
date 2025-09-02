import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupabase } from './hooks/useSupabase';
import { Course, StudySession, Flashcard, Goal, UserStats, DailyLearning, KokoData, MaxData } from './types';
import Login from './components/Login';
import HomeScreen from './components/HomeScreen';
import StudyMode from './components/StudyMode';
import TakeTest from './components/TakeTest';
import SignLanguage from './components/SignLanguage';
import Settings from './components/Settings';
import MobileNotification from './components/MobileNotification';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

function App() {
  const {
    user,
    loading: authLoading,
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
  } = useSupabase();

  const [userProfile, setUserProfile] = useState<any>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [dailyLearnings, setDailyLearnings] = useState<DailyLearning[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalStudyTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    sessionsThisWeek: 0,
    lastStudyDate: '',
  });
  const [companionData, setCompanionData] = useState<KokoData | MaxData>({
    funds: 0,
    busTickets: 0,
    outfits: [],
    currentOutfit: 'default',
    emotionalState: 'happy',
    lastInteraction: '',
  });

  const getUserGender = () => {
    return userProfile?.gender || user?.user_metadata?.gender || 'female';
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    if (user && !authLoading) {
      syncAllData();
    }
  }, [user, authLoading]);

  const syncAllData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const profile = await syncUserProfile();
      setUserProfile(profile);

      const [
        coursesData,
        sessionsData,
        flashcardsData,
        goalsData,
        learningsData,
        statsData,
        companionDataResult,
      ] = await Promise.all([
        syncCourses(),
        syncStudySessions(),
        syncFlashcards(),
        syncGoals(),
        syncDailyLearnings(),
        syncUserStats(),
        syncKokoData(),
      ]);

      setCourses(coursesData);
      setSessions(sessionsData);
      setFlashcards(flashcardsData);
      setGoals(goalsData);
      setDailyLearnings(learningsData);
      
      if (statsData) {
        setStats(statsData);
      }
      
      if (companionDataResult) {
        setCompanionData(companionDataResult);
      }

      const gender = getUserGender();
      const title = gender === 'male' ? 'Champion' : 'Princess';
      const companion = gender === 'male' ? 'Max' : 'Koko';
      const emoji = gender === 'male' ? '🐺⚡' : '🧸👑';
      showNotification(`Welcome back, ${title}! ${companion} missed you! ${emoji}`, 'success');
    } catch (error: any) {
      console.error('Error syncing data:', error);
      showNotification('Error loading your data. Please try refreshing the page.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string, rememberMe: boolean, gender: 'female' | 'male') => {
    await signIn(email, password, gender);
  };

  const handleSignUp = async (email: string, password: string, username: string, displayName: string, gender: 'female' | 'male') => {
    await signUp(email, password, username, displayName, gender);
  };

  const handleLogout = async () => {
    await signOut();
    setUserProfile(null);
    setCourses([]);
    setSessions([]);
    setFlashcards([]);
    setGoals([]);
    setDailyLearnings([]);
    setStats({
      totalStudyTime: 0,
      currentStreak: 0,
      longestStreak: 0,
      sessionsThisWeek: 0,
      lastStudyDate: '',
    });
    setCompanionData({
      funds: 0,
      busTickets: 0,
      outfits: [],
      currentOutfit: 'default',
      emotionalState: 'happy',
      lastInteraction: '',
    });
  };

  if (authLoading || loading) {
    const gender = getUserGender();
    const companion = gender === 'male' ? '🐺' : '🧸';
    const message = gender === 'male' ? 'Max is preparing your command center...' : 'Koko is preparing your kingdom...';
    
    return (
      <div className={`min-h-screen ${gender === 'male' ? 'bg-slate-900' : 'bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">{companion}</div>
          <h2 className={`text-2xl font-bold mb-2 ${gender === 'male' ? 'text-gray-100' : 'text-gray-800'}`}>
            {message}
          </h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} onSignUp={handleSignUp} loading={loading} />;
  }

  return (
    <Router>
      <div className={`min-h-screen ${getUserGender() === 'male' ? 'bg-slate-900' : 'bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50'}`}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomeScreen 
                  userProfile={userProfile}
                  stats={stats}
                  companionData={companionData}
                  courses={courses}
                  goals={goals}
                />
              } 
            />
            <Route 
              path="/study" 
              element={
                <StudyMode 
                  courses={courses}
                  sessions={sessions}
                  onSessionSave={async (session) => {
                    await saveStudySession(session);
                    setSessions(prev => [...prev, { ...session, id: Date.now().toString() }]);
                    showNotification('Study session saved! 🌟', 'success');
                  }}
                  onCourseAdd={async (course) => {
                    await saveCourse(course);
                    setCourses(prev => [...prev, { ...course, id: Date.now().toString(), totalSessions: 0, totalMinutes: 0 }]);
                    showNotification('Course added! 📚', 'success');
                  }}
                />
              } 
            />
            <Route 
              path="/test" 
              element={<TakeTest courses={courses} />} 
            />
            <Route 
              path="/sign-language" 
              element={<SignLanguage />} 
            />
            <Route 
              path="/settings" 
              element={
                <Settings
                  userName={userProfile?.display_name || ''}
                  theme={userProfile?.theme || (getUserGender() === 'male' ? 'champion' : 'princess')}
                  gender={getUserGender()}
                  onUserNameChange={async (newName) => {
                    const updatedProfile = await updateUserProfile({ display_name: newName });
                    setUserProfile(updatedProfile);
                    showNotification('Name updated! ✨', 'success');
                  }}
                  onThemeChange={async (newTheme) => {
                    const updatedProfile = await updateUserProfile({ theme: newTheme });
                    setUserProfile(updatedProfile);
                    showNotification('Theme updated! 🎨', 'success');
                  }}
                  onLogout={handleLogout}
                  onDataExport={() => {
                    const data = { courses, sessions, flashcards, goals, dailyLearnings, stats, companionData, userProfile };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `study-data-${new Date().toISOString().split('T')[0]}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    showNotification('Data exported! 💾', 'success');
                  }}
                  onDataImport={() => showNotification('Data import not available with cloud sync! ☁️', 'info')}
                  onDataClear={() => showNotification('Data clearing not available with cloud sync! 🔒', 'info')}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
        
        {/* Mobile Notifications */}
        <div className="fixed top-4 left-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <MobileNotification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              gender={getUserGender()}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </div>
      </div>
    </Router>
  );
}

export default App;