import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Hand, Settings, Target, Clock, Award, TrendingUp } from 'lucide-react';

interface HomeScreenProps {
  userProfile: any;
  stats: any;
  companionData: any;
  courses: any[];
  goals: any[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userProfile, stats, companionData, courses, goals }) => {
  const navigate = useNavigate();
  const gender = userProfile?.gender || 'female';
  const isMale = gender === 'male';

  const getGreeting = () => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    const title = isMale ? 'Champion' : 'Princess';
    return `${timeGreeting}, ${title} ${userProfile?.display_name || ''}!`;
  };

  const getCompanionEmoji = () => {
    if (isMale) {
      const outfitEmojis: { [key: string]: string } = {
        'default': '🐺',
        'glasses': '🤓🐺',
        'hat': '🎩🐺',
        'backpack': '🎒🐺',
        'bow': '🎀🐺',
        'crown': '👑🐺'
      };
      return outfitEmojis[companionData.currentOutfit] || '🐺';
    } else {
      const outfitEmojis: { [key: string]: string } = {
        'default': '🧸',
        'glasses': '🤓🧸',
        'hat': '🎩🧸',
        'backpack': '🎒🧸',
        'bow': '🎀🧸',
        'crown': '👑🧸'
      };
      return outfitEmojis[companionData.currentOutfit] || '🧸';
    }
  };

  const mainFeatures = [
    {
      id: 'study',
      title: isMale ? 'Training Mode' : 'Study Mode',
      description: isMale ? 'Begin tactical training sessions' : 'Start your learning journey',
      icon: BookOpen,
      color: isMale ? 'from-slate-600 to-gray-700' : 'from-rose-400 to-pink-500',
      path: '/study'
    },
    {
      id: 'test',
      title: isMale ? 'Combat Assessment' : 'Take Test',
      description: isMale ? 'Test your tactical knowledge' : 'Quiz yourself on any topic',
      icon: FileText,
      color: isMale ? 'from-blue-600 to-indigo-700' : 'from-purple-400 to-indigo-500',
      path: '/test'
    },
    {
      id: 'sign-language',
      title: 'Sign Language',
      description: 'Learn inclusive communication',
      icon: Hand,
      color: isMale ? 'from-green-600 to-emerald-700' : 'from-green-400 to-emerald-500',
      path: '/sign-language'
    },
    {
      id: 'settings',
      title: isMale ? 'Command Center' : 'Settings',
      description: isMale ? 'Configure your arsenal' : 'Customize your experience',
      icon: Settings,
      color: isMale ? 'from-zinc-600 to-slate-700' : 'from-gray-400 to-gray-500',
      path: '/settings'
    }
  ];

  const quickStats = [
    {
      label: isMale ? 'Battle Streak' : 'Study Streak',
      value: `${stats.currentStreak} days`,
      icon: Award,
      color: isMale ? 'text-yellow-400' : 'text-yellow-500'
    },
    {
      label: isMale ? 'Training Time' : 'Study Time',
      value: `${Math.floor(stats.totalStudyTime / 60)}h ${stats.totalStudyTime % 60}m`,
      icon: Clock,
      color: isMale ? 'text-blue-400' : 'text-blue-500'
    },
    {
      label: isMale ? 'Active Missions' : 'Active Goals',
      value: goals.filter(g => !g.completed).length,
      icon: Target,
      color: isMale ? 'text-green-400' : 'text-green-500'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${isMale ? 'bg-slate-900' : 'bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50'}`}
    >
      {/* Mobile Header */}
      <div className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-rose-200'} border-b px-4 py-6 safe-area-top`}>
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-4">
            <div className="text-6xl mb-2 animate-bounce">
              {getCompanionEmoji()}
            </div>
            <h1 className={`text-xl font-bold ${isMale ? 'text-gray-100' : 'text-gray-800'}`}>
              {getGreeting()}
            </h1>
            <p className={`text-sm ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
              {isMale ? 'Ready to dominate today?' : 'Ready to bloom with knowledge?'}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className={`${isMale ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200'} border rounded-lg p-3 text-center`}>
                  <Icon className={`h-4 w-4 mx-auto mb-1 ${stat.color}`} />
                  <div className={`text-xs font-medium ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="px-4 py-6">
        <div className="max-w-sm mx-auto">
          <h2 className={`text-lg font-semibold mb-4 ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
            {isMale ? 'Command Center' : 'Learning Hub'}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {mainFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.button
                  key={feature.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(feature.path)}
                  className={`bg-gradient-to-br ${feature.color} p-6 rounded-2xl shadow-lg text-white text-left h-32 flex flex-col justify-between`}
                >
                  <Icon className="h-8 w-8 mb-2" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs opacity-90">{feature.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className={`text-base font-semibold mb-3 ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
              {isMale ? 'Recent Training' : 'Recent Activity'}
            </h3>
            <div className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-4`}>
              {courses.length === 0 ? (
                <div className="text-center py-6">
                  <BookOpen className={`h-12 w-12 mx-auto mb-2 ${isMale ? 'text-gray-600' : 'text-gray-400'}`} />
                  <p className={`text-sm ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
                    {isMale ? 'No training modules yet' : 'No courses yet'}
                  </p>
                  <button
                    onClick={() => navigate('/study')}
                    className={`mt-2 text-sm ${isMale ? 'text-blue-400' : 'text-rose-500'} font-medium`}
                  >
                    {isMale ? 'Start Training' : 'Create Course'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {courses.slice(0, 3).map((course) => (
                    <div key={course.id} className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-${course.color}-500 rounded-lg flex items-center justify-center text-white`}>
                        {course.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
                          {course.name}
                        </h4>
                        <p className={`text-xs ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
                          {course.totalSessions} sessions • {Math.floor(course.totalMinutes / 60)}h {course.totalMinutes % 60}m
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeScreen;