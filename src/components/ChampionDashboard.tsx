import React from 'react';
import { Shield, Target, Clock, TrendingUp, Calendar, Award, Zap, Sword } from 'lucide-react';
import { Course, StudySession, Goal, UserStats } from '../types';

interface ChampionDashboardProps {
  courses: Course[];
  sessions: StudySession[];
  goals: Goal[];
  stats: UserStats;
}

const ChampionDashboard: React.FC<ChampionDashboardProps> = ({ courses, sessions, goals, stats }) => {
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

  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">
                {getGreeting()}, Champion! ⚡
              </h1>
              <p className="text-gray-300">
                Your tactical training center awaits your command
              </p>
            </div>
            <div className="text-4xl md:text-6xl">🐺</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-slate-800 border border-slate-600 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Training Sessions</p>
                <p className="text-xl md:text-2xl font-bold text-gray-100">
                  {thisWeek.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-700">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-600 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Battle Streak</p>
                <p className="text-xl md:text-2xl font-bold text-gray-100">
                  {stats.currentStreak} days
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-700">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-600 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Training</p>
                <p className="text-xl md:text-2xl font-bold text-gray-100">
                  {formatDuration(stats.totalStudyTime)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-700">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-600 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Missions</p>
                <p className="text-xl md:text-2xl font-bold text-gray-100">
                  {activeGoals.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-700">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Training Modules */}
          <div className="bg-slate-800 border border-slate-600 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-100 flex items-center">
                <Sword className="w-5 h-5 mr-2 text-blue-400" />
                Training Modules
              </h2>
              <span className="text-sm text-gray-400">{courses.length} active</span>
            </div>
            <div className="space-y-4">
              {courses.length === 0 ? (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No training modules deployed yet</p>
                  <p className="text-sm text-gray-500">Initialize your first tactical course</p>
                </div>
              ) : (
                courses.slice(0, 3).map((course) => (
                  <div key={course.id} className="p-4 rounded-lg bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-${course.color}-600 rounded-lg flex items-center justify-center text-white text-lg`}>
                        {course.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-100">{course.name}</h3>
                        <p className="text-sm text-gray-400">
                          {course.totalSessions} missions • {formatDuration(course.totalMinutes)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Progress</div>
                        <div className="text-sm font-medium text-blue-400">
                          {course.totalSessions > 0 ? 'Active' : 'Standby'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Training */}
          <div className="bg-slate-800 border border-slate-600 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-100 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Recent Training
              </h2>
              <span className="text-sm text-gray-400">{sessions.length} total</span>
            </div>
            <div className="space-y-4">
              {sessions.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No training sessions logged</p>
                  <p className="text-sm text-gray-500">Begin your first tactical session</p>
                </div>
              ) : (
                sessions.slice(0, 5).map((session) => {
                  const course = courses.find(c => c.id === session.courseId);
                  return (
                    <div key={session.id} className="p-4 rounded-lg bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">{course?.icon || '⚡'}</div>
                          <div>
                            <h3 className="font-semibold text-gray-100">{course?.name || 'Unknown Module'}</h3>
                            <p className="text-sm text-gray-400">
                              {new Date(session.date).toLocaleDateString()} • {formatDuration(session.duration)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            session.mood >= 4 ? 'bg-green-400' : 
                            session.mood >= 3 ? 'bg-yellow-400' : 
                            'bg-red-400'
                          }`}></div>
                          <span className="text-xs text-gray-500">
                            {session.focusRating}/5 focus
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Active Missions */}
        {activeGoals.length > 0 && (
          <div className="bg-slate-800 border border-slate-600 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-100 flex items-center">
                <Target className="w-5 h-5 mr-2 text-red-400" />
                Active Missions
              </h2>
              <span className="text-sm text-gray-400">{activeGoals.length} in progress</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeGoals.slice(0, 3).map((goal) => {
                const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={goal.id} className="p-4 rounded-lg bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-all duration-200">
                    <h3 className="font-semibold text-gray-100 mb-2">{goal.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </p>
                    <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                      <div
                        className="h-2 rounded-full bg-blue-400"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{goal.progress}% complete</span>
                      <span className={`text-xs font-medium ${
                        daysLeft < 0 ? 'text-red-400' : 
                        daysLeft < 7 ? 'text-yellow-400' : 
                        'text-green-400'
                      }`}>
                        {daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : `${daysLeft}d left`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Weekly Performance */}
        <div className="bg-slate-800 border border-slate-600 rounded-xl p-4 md:p-6 shadow-lg">
          <h2 className="text-lg md:text-xl font-bold text-gray-100 mb-6 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-400" />
            This Week's Performance ⚡
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-700 border border-slate-600 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">{thisWeek.length}</div>
              <div className="text-sm text-gray-400">Training Sessions</div>
            </div>
            <div className="bg-slate-700 border border-slate-600 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">
                {formatDuration(thisWeek.reduce((sum, s) => sum + s.duration, 0))}
              </div>
              <div className="text-sm text-gray-400">Total Training</div>
            </div>
            <div className="bg-slate-700 border border-slate-600 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {thisWeek.length > 0 ? Math.round((thisWeek.reduce((sum, s) => sum + s.mood, 0) / thisWeek.length) * 10) / 10 : 0}/5
              </div>
              <div className="text-sm text-gray-400">Avg Morale</div>
            </div>
            <div className="bg-slate-700 border border-slate-600 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">
                {completedGoals.length}
              </div>
              <div className="text-sm text-gray-400">Missions Complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionDashboard;