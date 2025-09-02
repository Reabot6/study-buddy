import React from 'react';
import { BookOpen, Home, Target, Brain, BarChart3, Settings, PenTool } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  // Get user gender from localStorage
  const getUserGender = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.user_metadata?.gender || 'female';
  };

  const gender = getUserGender();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'learning', label: 'Daily Learning', icon: PenTool },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'flashcards', label: 'Flashcards', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className={`${gender === 'male' ? 'bg-slate-900 border-slate-600' : 'bg-white border-rose-300'} shadow-lg border-t-4 sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center space-x-2 md:space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 py-3 md:py-4 px-2 md:px-6 text-xs md:text-sm font-medium transition-all duration-200 ${
                  gender === 'male' ? 'hover:text-slate-300' : 'hover:text-rose-600'
                } whitespace-nowrap ${
                  activeTab === tab.id
                    ? gender === 'male' 
                      ? 'text-slate-300 border-b-2 border-slate-500' 
                      : 'text-rose-600 border-b-2 border-rose-300'
                    : gender === 'male' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <Icon size={16} className="md:w-5 md:h-5" />
                <span className="hidden sm:block md:inline">{tab.label}</span>
                <span className="sm:hidden text-xs">{tab.id === 'learning' ? 'Learn' : tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;