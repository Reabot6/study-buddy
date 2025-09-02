import React from 'react';

interface StreakDisplayProps {
  streak: number;
  theme: string;
  gender: 'female' | 'male';
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ streak, theme, gender }) => {
  const getCompanionState = () => {
    const name = gender === 'male' ? 'Max' : 'Koko';
    const hungerTerm = gender === 'male' ? 'training sessions' : 'meals';
    
    if (streak < 0) return { 
      emoji: gender === 'male' ? '😤' : '😢', 
      message: `${name} needs training! He needs ${Math.abs(streak)} ${hungerTerm} to feel better.`, 
      color: gender === 'male' ? 'text-red-400' : 'text-red-600', 
      bgColor: gender === 'male' ? 'bg-red-900' : 'bg-red-50' 
    };
    if (streak === 0) return { 
      emoji: gender === 'male' ? '🤔' : '😐', 
      message: `${name} is waiting for his first ${gender === 'male' ? 'training session' : 'meal'}!`, 
      color: gender === 'male' ? 'text-gray-400' : 'text-gray-600', 
      bgColor: gender === 'male' ? 'bg-gray-800' : 'bg-gray-50' 
    };
    if (streak < 3) return { 
      emoji: gender === 'male' ? '💪' : '😊', 
      message: `${name} is getting started!`, 
      color: gender === 'male' ? 'text-yellow-400' : 'text-yellow-600', 
      bgColor: gender === 'male' ? 'bg-yellow-900' : 'bg-yellow-50' 
    };
    if (streak < 7) return { 
      emoji: gender === 'male' ? '💪' : '😄', 
      message: `${name} is ${gender === 'male' ? 'getting stronger' : 'happy and growing'}!`, 
      color: gender === 'male' ? 'text-green-400' : 'text-green-600', 
      bgColor: gender === 'male' ? 'bg-green-900' : 'bg-green-50' 
    };
    if (streak < 14) return { 
      emoji: gender === 'male' ? '🔥' : '🤗', 
      message: `${name} is ${gender === 'male' ? 'on fire' : 'thriving'}!`, 
      color: gender === 'male' ? 'text-blue-400' : 'text-blue-600', 
      bgColor: gender === 'male' ? 'bg-blue-900' : 'bg-blue-50' 
    };
    if (streak < 30) return { 
      emoji: gender === 'male' ? '⚡' : '🌟', 
      message: `${name} is absolutely ${gender === 'male' ? 'dominating' : 'glowing'}!`, 
      color: gender === 'male' ? 'text-purple-400' : 'text-purple-600', 
      bgColor: gender === 'male' ? 'bg-purple-900' : 'bg-purple-50' 
    };
    return { 
      emoji: gender === 'male' ? '🏆' : '👑', 
      message: `${name} is the ${gender === 'male' ? 'champion' : 'king'} of consistency!`, 
      color: gender === 'male' ? 'text-blue-400' : 'text-rose-600', 
      bgColor: gender === 'male' ? 'bg-blue-900' : 'bg-rose-50' 
    };
  };

  const companionState = getCompanionState();
  const isNegative = streak < 0;
  const displayStreak = Math.abs(streak);

  const getThemeColors = () => {
    if (gender === 'male') {
      switch (theme) {
        case 'champion':
          return { primary: 'from-slate-400 to-gray-500', accent: 'text-slate-400' };
        case 'tactical':
          return { primary: 'from-gray-400 to-slate-500', accent: 'text-gray-400' };
        case 'ocean':
          return { primary: 'from-blue-400 to-indigo-500', accent: 'text-blue-400' };
        case 'forest':
          return { primary: 'from-green-400 to-emerald-500', accent: 'text-green-400' };
        case 'sunset':
          return { primary: 'from-orange-400 to-red-500', accent: 'text-orange-400' };
        case 'steel':
          return { primary: 'from-zinc-400 to-slate-500', accent: 'text-zinc-400' };
        default:
          return { primary: 'from-slate-400 to-gray-500', accent: 'text-slate-400' };
      }
    } else {
      switch (theme) {
      case 'royal':
        return { primary: 'from-purple-400 to-pink-500', accent: 'text-purple-600' };
      case 'ocean':
        return { primary: 'from-blue-400 to-teal-500', accent: 'text-blue-600' };
      case 'forest':
        return { primary: 'from-green-400 to-emerald-500', accent: 'text-green-600' };
      case 'sunset':
        return { primary: 'from-orange-400 to-red-500', accent: 'text-orange-600' };
      case 'lavender':
        return { primary: 'from-purple-300 to-pink-400', accent: 'text-purple-500' };
      default:
        return { primary: 'from-rose-400 to-pink-500', accent: 'text-rose-600' };
      }
    }
  };

  const themeColors = getThemeColors();
  const companionEmoji = gender === 'male' ? '🐺' : '🧸';

  return (
    <div className={`${companionState.bgColor} p-3 md:p-4 rounded-lg shadow-md border-2 ${
      isNegative 
        ? gender === 'male' ? 'border-red-600' : 'border-red-200'
        : gender === 'male' ? 'border-slate-600' : 'border-gray-200'
    }`}>
      <div className="text-center">
        {/* Companion Animation */}
        <div className="relative mb-3">
          <div className={`text-4xl md:text-6xl animate-bounce ${streak > 0 ? 'animate-pulse' : ''}`}>
            {companionEmoji}
          </div>
          <div className="absolute -top-2 -right-2 text-lg md:text-2xl animate-bounce">
            {companionState.emoji}
          </div>
        </div>

        {/* Streak Display */}
        <div className="mb-2">
          <div className={`text-xl md:text-2xl font-bold ${isNegative ? 'text-red-600' : themeColors.accent}`}>
            {isNegative ? `-${displayStreak}` : displayStreak}
          </div>
          <div className={`text-xs md:text-sm ${gender === 'male' ? 'text-gray-400' : 'text-gray-600'}`}>
            {isNegative ? (gender === 'male' ? 'sessions owed' : 'meals owed') : 'day streak 🔥'}
          </div>
        </div>

        {/* Companion's Message */}
        <div className={`text-xs md:text-sm ${companionState.color} font-medium`}>
          {companionState.message}
        </div>

        {/* Progress Bar for Positive Streaks */}
        {streak > 0 && (
          <div className="mt-3">
            <div className={`w-full ${gender === 'male' ? 'bg-slate-700' : 'bg-gray-200'} rounded-full h-2`}>
              <div 
                className={`bg-gradient-to-r ${themeColors.primary} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${Math.min((streak % 7) * 14.28, 100)}%` }}
              ></div>
            </div>
            <div className={`text-xs ${gender === 'male' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
              {streak % 7}/7 to next milestone
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreakDisplay;