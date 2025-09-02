import React from 'react';
import { BarChart3, Clock, Target, Brain, TrendingUp, Calendar } from 'lucide-react';
import { Course, StudySession, Goal, UserStats } from '../types';

interface AnalyticsProps {
  courses: Course[];
  sessions: StudySession[];
  goals: Goal[];
  stats: UserStats;
}

const Analytics: React.FC<AnalyticsProps> = ({ courses, sessions, goals, stats }) => {
  // Calculate analytics data
  const thisWeek = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    return sessionDate >= weekStart;
  });

  const thisMonth = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    const now = new Date();
    return sessionDate.getMonth() === now.getMonth() && sessionDate.getFullYear() === now.getFullYear();
  });

  const courseStats = courses.map(course => {
    const courseSessions = sessions.filter(s => s.courseId === course.id);
    const totalTime = courseSessions.reduce((sum, s) => sum + s.duration, 0);
    const avgMood = courseSessions.length > 0 
      ? courseSessions.reduce((sum, s) => sum + s.mood, 0) / courseSessions.length 
      : 0;
    const avgFocus = courseSessions.length > 0 
      ? courseSessions.reduce((sum, s) => sum + s.focusRating, 0) / courseSessions.length 
      : 0;

    return {
      ...course,
      totalTime,
      avgMood: Math.round(avgMood * 10) / 10,
      avgFocus: Math.round(avgFocus * 10) / 10,
      sessionCount: courseSessions.length,
    };
  });

  const completedGoals = goals.filter(g => g.completed).length;
  const totalGoals = goals.length;
  const goalCompletionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  // Weekly study pattern
  const weeklyPattern = Array.from({ length: 7 }, (_, i) => {
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i];
    const daySessions = sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate.getDay() === i;
    });
    const totalMinutes = daySessions.reduce((sum, s) => sum + s.duration, 0);
    return { day: dayName, minutes: totalMinutes, sessions: daySessions.length };
  });

  const maxWeeklyMinutes = Math.max(...weeklyPattern.map(d => d.minutes), 1);

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Your Learning Analytics 📊
        </h2>
        <p className="text-gray-600">Insights into your study journey and progress</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-rose-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Study Time</p>
              <p className="text-2xl font-bold text-rose-600">
                {Math.round(stats.totalStudyTime / 60)}h {stats.totalStudyTime % 60}m
              </p>
            </div>
            <Clock className="h-8 w-8 text-rose-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-purple-600">{stats.currentStreak} days</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Goals Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedGoals}/{totalGoals}</p>
            </div>
            <Target className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-blue-600">{thisMonth.length} sessions</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Weekly Study Pattern */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
          Weekly Study Pattern
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {weeklyPattern.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-600 mb-2">{day.day}</div>
              <div className="bg-gray-100 rounded-lg h-32 flex flex-col justify-end p-2">
                <div 
                  className="bg-gradient-to-t from-purple-500 to-purple-400 rounded transition-all duration-300"
                  style={{ height: `${(day.minutes / maxWeeklyMinutes) * 100}%`, minHeight: day.minutes > 0 ? '8px' : '0' }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {Math.round(day.minutes / 60)}h {day.minutes % 60}m
              </div>
              <div className="text-xs text-gray-500">
                {day.sessions} sessions
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Performance */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Brain className="h-5 w-5 mr-2 text-rose-500" />
          Course Performance
        </h3>
        <div className="space-y-4">
          {courseStats.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-${course.color}-500 rounded-lg flex items-center justify-center text-white`}>
                    {course.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{course.name}</h4>
                    <p className="text-sm text-gray-600">{course.sessionCount} sessions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">
                    {Math.round(course.totalTime / 60)}h {course.totalTime % 60}m
                  </p>
                  <p className="text-sm text-gray-600">total time</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-yellow-800 font-medium">Average Mood</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= course.avgMood ? 'text-yellow-500' : 'text-gray-300'}>
                        ⭐
                      </span>
                    ))}
                    <span className="ml-2 text-yellow-700">{course.avgMood}/5</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-800 font-medium">Average Focus</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= course.avgFocus ? 'text-blue-500' : 'text-gray-300'}>
                        🎯
                      </span>
                    ))}
                    <span className="ml-2 text-blue-700">{course.avgFocus}/5</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {courseStats.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No course data available yet. Start studying to see your performance! 📚
            </p>
          )}
        </div>
      </div>

      {/* Goal Progress */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Target className="h-5 w-5 mr-2 text-green-500" />
          Goal Achievement
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - goalCompletionRate / 100)}`}
                  className="text-green-500"
                  style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{Math.round(goalCompletionRate)}%</div>
                  <div className="text-xs text-gray-600">completed</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Goal Completion Rate</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Goals</span>
              <span className="font-medium">{totalGoals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="font-medium text-green-600">{completedGoals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">In Progress</span>
              <span className="font-medium text-yellow-600">{totalGoals - completedGoals}</span>
            </div>
            <div className="pt-3 border-t">
              <p className="text-sm text-gray-600">
                {goalCompletionRate >= 80 ? "Excellent progress! 🌟" :
                 goalCompletionRate >= 60 ? "Good momentum! Keep going! 💪" :
                 goalCompletionRate >= 40 ? "You're building habits! 📈" :
                 "Every journey starts with a single step! 🌱"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">This Week's Highlights ✨</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-gray-600">Study Sessions</p>
            <p className="text-xl font-bold text-purple-600">{thisWeek.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-gray-600">Total Time</p>
            <p className="text-xl font-bold text-purple-600">
              {Math.round(thisWeek.reduce((sum, s) => sum + s.duration, 0) / 60)}h
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-gray-600">Average Mood</p>
            <p className="text-xl font-bold text-purple-600">
              {thisWeek.length > 0 ? Math.round((thisWeek.reduce((sum, s) => sum + s.mood, 0) / thisWeek.length) * 10) / 10 : 0}/5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;