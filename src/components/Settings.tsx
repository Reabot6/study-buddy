import React, { useState } from 'react';
import { User, Bell, Palette, Download, Upload, Trash2, LogOut, Crown } from 'lucide-react';

interface SettingsProps {
  userName: string;
  theme: string;
  gender: 'female' | 'male';
  onUserNameChange: (name: string) => void;
  onThemeChange: (theme: string) => void;
  onLogout: () => void;
  onDataExport: () => void;
  onDataImport: (data: any) => void;
  onDataClear: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  userName,
  theme,
  gender,
  onUserNameChange,
  onThemeChange,
  onLogout,
  onDataExport,
  onDataImport,
  onDataClear,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(userName);
  const [notifications, setNotifications] = useState(true);

  const getThemes = () => {
    if (gender === 'male') {
      return [
        { 
          id: 'champion', 
          name: 'Dark Champion', 
          description: 'Dark slate and steel theme',
          gradient: 'bg-gradient-to-r from-slate-600 to-gray-700',
          preview: 'from-slate-800 to-gray-800'
        },
        { 
          id: 'tactical', 
          name: 'Tactical Gray', 
          description: 'Military gray and charcoal',
          gradient: 'bg-gradient-to-r from-gray-600 to-slate-700',
          preview: 'from-gray-800 to-slate-800'
        },
        { 
          id: 'ocean', 
          name: 'Deep Ocean', 
          description: 'Dark blue and indigo depths',
          gradient: 'bg-gradient-to-r from-blue-600 to-indigo-700',
          preview: 'from-blue-800 to-indigo-800'
        },
        { 
          id: 'forest', 
          name: 'Dark Forest', 
          description: 'Deep green and emerald',
          gradient: 'bg-gradient-to-r from-green-600 to-emerald-700',
          preview: 'from-green-800 to-emerald-800'
        },
        { 
          id: 'sunset', 
          name: 'Fire Sunset', 
          description: 'Dark orange and red fire',
          gradient: 'bg-gradient-to-r from-orange-600 to-red-700',
          preview: 'from-orange-800 to-red-800'
        },
        { 
          id: 'steel', 
          name: 'Steel Armor', 
          description: 'Dark zinc and steel',
          gradient: 'bg-gradient-to-r from-zinc-600 to-slate-700',
          preview: 'from-zinc-800 to-slate-800'
        }
      ];
    } else {
      return [
        { 
          id: 'princess', 
          name: 'Princess Pink', 
          description: 'Classic rose and pink theme',
          gradient: 'bg-gradient-to-r from-rose-400 to-pink-500',
          preview: 'from-rose-100 to-pink-100'
        },
        { 
          id: 'royal', 
          name: 'Royal Purple', 
          description: 'Majestic purple and gold',
          gradient: 'bg-gradient-to-r from-purple-400 to-pink-500',
          preview: 'from-purple-100 to-pink-100'
        },
        { 
          id: 'ocean', 
          name: 'Ocean Breeze', 
          description: 'Calming blue and teal',
          gradient: 'bg-gradient-to-r from-blue-400 to-teal-500',
          preview: 'from-blue-100 to-teal-100'
        },
        { 
          id: 'forest', 
          name: 'Enchanted Forest', 
          description: 'Natural green and emerald',
          gradient: 'bg-gradient-to-r from-green-400 to-emerald-500',
          preview: 'from-green-100 to-emerald-100'
        },
        { 
          id: 'sunset', 
          name: 'Golden Sunset', 
          description: 'Warm orange and red',
          gradient: 'bg-gradient-to-r from-orange-400 to-red-500',
          preview: 'from-orange-100 to-red-100'
        },
        { 
          id: 'lavender', 
          name: 'Lavender Dreams', 
          description: 'Soft purple and pink',
          gradient: 'bg-gradient-to-r from-purple-300 to-pink-400',
          preview: 'from-purple-100 to-pink-100'
        }
      ];
    }
  };

  const themes = getThemes();
  const title = gender === 'male' ? 'Champion' : 'Princess';
  const companion = gender === 'male' ? 'Max' : 'Koko';
  const handleNameSave = () => {
    if (newName.trim()) {
      onUserNameChange(newName.trim());
      setEditingName(false);
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          onDataImport(data);
        } catch (error) {
          console.error('Error importing data:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDataClear = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      onDataClear();
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Settings ⚙️
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Customize your {gender === 'male' ? 'tactical' : 'royal'} study experience
        </p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <User className={`h-5 w-5 mr-2 ${gender === 'male' ? 'text-blue-500' : 'text-rose-500'}`} />
          Profile
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            {editingName ? (
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className={`flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 ${gender === 'male' ? 'focus:ring-blue-500' : 'focus:ring-rose-500'} focus:border-transparent transition-all duration-200 text-sm md:text-base`}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleNameSave}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm md:text-base"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingName(false);
                      setNewName(userName);
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm md:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm md:text-base text-gray-800">{title} {userName}</span>
                <button
                  onClick={() => setEditingName(true)}
                  className={`${gender === 'male' ? 'text-blue-600 hover:text-blue-700' : 'text-rose-600 hover:text-rose-700'} font-medium text-sm md:text-base`}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Palette className={`h-5 w-5 mr-2 ${gender === 'male' ? 'text-blue-500' : 'text-pink-500'}`} />
          Theme Selection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {themes.map((themeOption) => (
            <div
              key={themeOption.id}
              onClick={() => onThemeChange(themeOption.id)}
              className={`cursor-pointer p-3 md:p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                theme === themeOption.id 
                  ? `${gender === 'male' ? 'border-blue-400 bg-blue-50' : 'border-rose-400 bg-rose-50'}` 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${themeOption.gradient}`}></div>
                <div className="flex-1">
                  <h4 className="text-sm md:text-base font-medium text-gray-800">{themeOption.name}</h4>
                  <p className="text-xs md:text-sm text-gray-600">{themeOption.description}</p>
                </div>
                {theme === themeOption.id && (
                  <Crown className={`h-4 w-4 md:h-5 md:w-5 ${gender === 'male' ? 'text-blue-500' : 'text-rose-500'}`} />
                )}
              </div>
              <div className={`mt-2 h-8 rounded bg-gradient-to-r ${themeOption.preview} border`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Bell className={`h-5 w-5 mr-2 ${gender === 'male' ? 'text-indigo-500' : 'text-purple-500'}`} />
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm md:text-base font-medium text-gray-800">Study Reminders</p>
              <p className="text-xs md:text-sm text-gray-600">
                Get {gender === 'male' ? 'tactical' : 'gentle'} reminders to study
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ${gender === 'male' ? 'peer-focus:ring-blue-300' : 'peer-focus:ring-rose-300'} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${gender === 'male' ? 'peer-checked:bg-blue-600' : 'peer-checked:bg-rose-600'}`}></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Download className="h-5 w-5 mr-2 text-blue-500" />
          Data Management
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <button
              onClick={onDataExport}
              className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-medium transition-all duration-200 text-sm md:text-base"
            >
              <Download size={16} className="md:w-5 md:h-5" />
              <span>Export Data</span>
            </button>
            
            <label className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer text-sm md:text-base">
              <Upload size={16} className="md:w-5 md:h-5" />
              <span>Import Data</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
          </div>
          
          <button
            onClick={handleDataClear}
            className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-medium transition-all duration-200 text-sm md:text-base"
          >
            <Trash2 size={16} className="md:w-5 md:h-5" />
            <span>Clear All Data</span>
          </button>
        </div>
      </div>

      {/* App Information */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">
          About {title} Study Companion
        </h3>
        <div className="space-y-2 text-xs md:text-sm text-gray-600">
          <p>Version: 2.0.0</p>
          <p>Built with love for dedicated learners 💖</p>
          <p>Features: Study tracking, {companion} companion, flashcards, goals, analytics</p>
          <p>Meet {companion}: Your study buddy who grows stronger with every session! {gender === 'male' ? '🐺' : '🧸'}</p>
        </div>
      </div>

      {/* Logout */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-medium transition-all duration-200 text-sm md:text-base"
        >
          <LogOut size={16} className="md:w-5 md:h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;