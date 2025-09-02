import React from 'react';
import { Crown, Sparkles, HelpCircle } from 'lucide-react';
import StreakDisplay from './StreakDisplay';
import KokoDisplay from './KokoDisplay';
import MaxDisplay from './MaxDisplay';
import { KokoData, MaxData } from '../types';

interface HeaderProps {
  userName: string;
  currentStreak: number;
  theme: string;
  companionData: KokoData | MaxData;
  gender: 'female' | 'male';
  onFAQOpen: () => void;
  onOutfitShop: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, currentStreak, theme, companionData, gender, onFAQOpen, onOutfitShop }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getThemeGradient = () => {
    if (gender === 'male') {
      switch (theme) {
        case 'champion':
          return 'from-slate-800 via-gray-700 to-slate-800';
        case 'tactical':
          return 'from-gray-800 via-slate-700 to-gray-800';
        case 'ocean':
          return 'from-blue-800 via-indigo-700 to-blue-800';
        case 'forest':
          return 'from-green-800 via-emerald-700 to-green-800';
        case 'sunset':
          return 'from-orange-800 via-red-700 to-orange-800';
        case 'steel':
          return 'from-zinc-800 via-slate-700 to-zinc-800';
        default:
          return 'from-slate-800 via-gray-700 to-slate-800';
      }
    } else {
      switch (theme) {
      case 'royal':
        return 'from-purple-100 via-pink-50 to-purple-100';
      case 'ocean':
        return 'from-blue-100 via-teal-50 to-blue-100';
      case 'forest':
        return 'from-green-100 via-emerald-50 to-green-100';
      case 'sunset':
        return 'from-orange-100 via-red-50 to-orange-100';
      case 'lavender':
        return 'from-purple-100 via-pink-50 to-purple-100';
      default:
        return 'from-rose-100 via-purple-50 to-pink-100';
      }
    }
  };

  const getThemeAccent = () => {
    if (gender === 'male') {
      switch (theme) {
        case 'champion':
          return 'from-slate-400 to-gray-500';
        case 'tactical':
          return 'from-gray-400 to-slate-500';
        case 'ocean':
          return 'from-blue-400 to-indigo-500';
        case 'forest':
          return 'from-green-400 to-emerald-500';
        case 'sunset':
          return 'from-orange-400 to-red-500';
        case 'steel':
          return 'from-zinc-400 to-slate-500';
        default:
          return 'from-slate-400 to-gray-500';
      }
    } else {
      switch (theme) {
      case 'royal':
        return 'from-purple-400 to-pink-500';
      case 'ocean':
        return 'from-blue-400 to-teal-500';
      case 'forest':
        return 'from-green-400 to-emerald-500';
      case 'sunset':
        return 'from-orange-400 to-red-500';
      case 'lavender':
        return 'from-purple-300 to-pink-400';
      default:
        return 'from-rose-400 to-pink-500';
      }
    }
  };

  const getTitle = () => {
    const title = gender === 'male' ? 'Champion' : 'Princess';
    return `${getGreeting()}, ${title} ${userName}!`;
  };

  const getSubtitle = () => {
    return gender === 'male' 
      ? 'Ready to conquer new challenges today?'
      : 'Ready to bloom with knowledge today?';
  };

  return (
    <header className={`bg-gradient-to-r ${getThemeGradient()} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col xl:flex-row items-center justify-between space-y-4 xl:space-y-0">
          <div className="flex items-center space-x-3 text-center lg:text-left">
            <div className={`bg-gradient-to-r ${getThemeAccent()} p-3 rounded-full`}>
              <Crown className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                {getTitle()}
                <Sparkles className="inline ml-2 h-4 w-4 md:h-6 md:w-6 text-yellow-500" />
              </h1>
              <p className="text-sm md:text-base text-gray-600">{getSubtitle()}</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* FAQ Bot Button */}
            <button
              onClick={onFAQOpen}
              className={`bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 ${gender === 'male' ? 'hover:border-blue-300' : 'hover:border-pink-300'}`}
              title={gender === 'male' ? "Ask Max for help!" : "Ask Koko for help!"}
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            
            {/* Companion Display */}
            <div className="w-full lg:w-auto max-w-xs">
              {gender === 'male' ? (
                <MaxDisplay maxData={companionData as MaxData} onOutfitShop={onOutfitShop} />
              ) : (
                <KokoDisplay kokoData={companionData as KokoData} onOutfitShop={onOutfitShop} />
              )}
            </div>
            
            {/* Streak Display */}
            <div className="w-full lg:w-auto max-w-xs">
              <StreakDisplay streak={currentStreak} theme={theme} gender={gender} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;