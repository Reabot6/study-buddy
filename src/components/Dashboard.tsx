import React, { useState, useEffect } from 'react';
import { BookOpen, Target, Clock, TrendingUp, Calendar, Award, Zap, Shield } from 'lucide-react';
import { useSupabase } from '../hooks/useSupabase';
import { Course, StudySession, Goal, UserStats } from '../types';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user, supabase } = useSupabase();
  const [courses, setCourses] = useState<Course[]>([]);
  const [recentSessions, setRecentSessions] = useState<StudySession[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Get user gender for theming
  const getUserGender = (): 'male' | 'female' => {
    const stored = localStorage.getItem('userGender');
    return (stored as 'male' | 'female') || 'female';
  };

  const gender = getUserGender();
  const isMale = gender === 'male';

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user || !supabase) return;

    try {
      // Load courses
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      // Load recent sessions
      const { data: sessionsData } = await supabase
        .from('study_sessions')
        .select(`
          *,
          courses (name, color, icon)
        `)
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(5);

      // Load active goals
      const { data: goalsData } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', false)
        .order('target_date', { ascending: true })
        .limit(3);

      // Load user stats
      const { data: statsData } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setCourses(coursesData || []);
      setRecentSessions(sessionsData || []);
      setGoals(goalsData || []);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getThemeClasses = () => {
    if (isMale) {
      return {
        background: 'bg-slate-900',
        card: 'bg-slate-800 border-slate-700',
        text: 'text-gray-100',
        textSecondary: 'text-gray-300',
        accent: 'text-blue-400',
        button: 'bg-slate-700 hover:bg-slate-600 text-gray-100',
        gradient: 'from-slate-800 to-slate-900'
      };
    } else {
      return {
        background: 'bg-gradient-to-br from-pink-50 to-purple-50',
        card: 'bg-white border-pink-200',
        text: 'text-gray-800',
        textSecondary: 'text-gray-600',
        accent: 'text-pink-600',
        button: 'bg-pink-100 hover:bg-pink-200 text-pink-800',
        gradient: 'from-pink-100 to-purple-100'
      };
    }
  };

  const theme = getThemeClasses();

  if (loading) {
    return (
      <div className={`min-h-screen ${theme.background} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.background} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className={`${theme.card} rounded-xl p-6 mb-8 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${theme.text} mb-2`}>
                {isMale ? 'Your Training Mission Awaits' : 'Your Learning Journey Awaits'}
              </h1>
              <p className={theme.textSecondary}>
                {isMale ? 'Ready to dominate your studies, Champion?' : 'Ready to conquer your studies, Princess?'}
              </p>
            </div>
            <div className={`text-6xl ${isMale ? 'filter grayscale' : ''}`}>
              {isMale ? '🐺' : '🧸'}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={theme.textSecondary}>
                  {isMale ? "Today's Training" : "Today's Sessions"}
                </p>
                <p className={`text-2xl font-bold ${theme.text}`}>
                  {stats?.sessions_this_week || 0}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isMale ? 'bg-slate-700' : 'bg-pink-100'}`}>
                {isMale ? <Shield className="w-6 h-6 text-blue-400" /> : <BookOpen className="w-6 h-6 text-pink-600" />}
              </div>
            </div>
          </div>

          <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={theme.textSecondary}>Current Streak</p>
                <p className={`text-2xl font-bold ${theme.text}`}>
                  {stats?.current_streak || 0} days
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isMale ? 'bg-slate-700' : 'bg-orange-100'}`}>
                {isMale ? <Zap className="w-6 h-6 text-yellow-400" /> : <Award className="w-6 h-6 text-orange-600" />}
              </div>
            </div>
          </div>

          <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={theme.textSecondary}>Total Study Time</p>
                <p className={`text-2xl font-bold ${theme.text}`}>
                  {formatDuration(stats?.total_study_time || 0)}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isMale ? 'bg-slate-700' : 'bg-blue-100'}`}>
                <Clock className={`w-6 h-6 ${isMale ? 'text-green-400' : 'text-blue-600'}`} />
              </div>
            </div>
          </div>

          <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={theme.textSecondary}>Active Goals</p>
                <p className={`text-2xl font-bold ${theme.text}`}>
                  {goals.length}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isMale ? 'bg-slate-700' : 'bg-green-100'}`}>
                <Target className={`w-6 h-6 ${isMale ? 'text-red-400' : 'text-green-600'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${theme.text}`}>
                {isMale ? 'Training Modules' : 'Recent Courses'}
              </h2>
              <button
                onClick={() => onNavigate('courses')}
                className={`${theme.button} px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {courses.length === 0 ? (
                <p className={theme.textSecondary}>
                  {isMale ? 'No training modules yet. Start your first mission!' : 'No courses yet. Create your first course!'}
                </p>
              ) : (
                courses.map((course) => (
                  <div key={course.id} className={`p-4 rounded-lg ${isMale ? 'bg-slate-700' : 'bg-gray-50'} hover:shadow-md transition-shadow`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{course.icon}</span>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${theme.text}`}>{course.name}</h3>
                        <p className={theme.textSecondary}>
                          {course.total_sessions} sessions • {formatDuration(course.total_minutes)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Sessions */}
          <div className={`${theme.card} rounded-xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${theme.text}`}>
                {isMale ? 'Recent Training' : 'Recent Sessions'}
              </h2>
              <button
                onClick={() => onNavigate('analytics')}
                className={`${theme.button} px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
              >
                View Analytics
              </button>
            </div>
            <div className="space-y-4">
              {recentSessions.length === 0 ? (
                <p className={theme.textSecondary}>
                  {isMale ? 'No training sessions yet. Begin your first mission!' : 'No study sessions yet. Start your first session!'}
                </p>
              ) : (
                recentSessions.map((session) => (
                  <div key={session.id} className={`p-4 rounded-lg ${isMale ? 'bg-slate-700' : 'bg-gray-50'} hover:shadow-md transition-shadow`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{session.courses?.icon}</span>
                        <div>
                          <h3 className={`font-semibold ${theme.text}`}>{session.courses?.name}</h3>
                          <p className={theme.textSecondary}>
                            {new Date(session.date).toLocaleDateString()} • {formatDuration(session.duration)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          session.mood >= 4 ? (isMale ? 'bg-green-400' : 'bg-green-500') : 
                          session.mood >= 3 ? (isMale ? 'bg-yellow-400' : 'bg-yellow-500') : 
                          (isMale ? 'bg-red-400' : 'bg-red-500')
                        }`}></div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Active Goals */}
        {goals.length > 0 && (
          <div className={`${theme.card} rounded-xl p-6 shadow-lg mt-8`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${theme.text}`}>
                {isMale ? 'Active Missions' : 'Active Goals'}
              </h2>
              <button
                onClick={() => onNavigate('goals')}
                className={`${theme.button} px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
              >
                Manage Goals
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {goals.map((goal) => (
                <div key={goal.id} className={`p-4 rounded-lg ${isMale ? 'bg-slate-700' : 'bg-gray-50'} hover:shadow-md transition-shadow`}>
                  <h3 className={`font-semibold ${theme.text} mb-2`}>{goal.title}</h3>
                  <p className={`${theme.textSecondary} text-sm mb-3`}>
                    Due: {new Date(goal.target_date).toLocaleDateString()}
                  </p>
                  <div className={`w-full ${isMale ? 'bg-slate-600' : 'bg-gray-200'} rounded-full h-2`}>
                    <div
                      className={`h-2 rounded-full ${isMale ? 'bg-blue-400' : 'bg-pink-600'}`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <p className={`${theme.textSecondary} text-sm mt-2`}>{goal.progress}% complete</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}