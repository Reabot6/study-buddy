import React, { useState } from 'react';
import { Crown, Sparkles, Heart, Eye, EyeOff, User, UserCheck } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string, rememberMe: boolean, gender: 'female' | 'male') => Promise<void>;
  onSignUp: (email: string, password: string, username: string, displayName: string, gender: 'female' | 'male') => Promise<void>;
  loading: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSignUp, loading }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'female' | 'male'>('female');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (isSignUp && (!username.trim() || !displayName.trim())) {
      setError('Please fill in all required fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      if (isSignUp) {
        await onSignUp(email.trim(), password, username.trim(), displayName.trim(), selectedGender);
      } else {
        await onLogin(email.trim(), password, rememberMe, selectedGender);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  const getThemeStyles = () => {
    if (selectedGender === 'male') {
      return {
        gradient: 'from-blue-50 via-indigo-50 to-blue-50',
        primary: 'from-blue-500 to-indigo-600',
        primaryHover: 'from-blue-600 to-indigo-700',
        accent: 'text-blue-600',
        ring: 'focus:ring-blue-500',
        border: 'border-blue-400 bg-blue-50',
        icon: '👑',
        title: isSignUp ? 'Join the Brotherhood!' : 'Welcome Back, Champion!',
        subtitle: isSignUp 
          ? 'Create your account to begin your learning journey with Max'
          : 'Your epic learning adventure continues here',
        companion: '🐺'
      };
    } else {
      return {
        gradient: 'from-rose-50 via-purple-50 to-pink-50',
        primary: 'from-rose-500 to-purple-600',
        primaryHover: 'from-rose-600 to-purple-700',
        accent: 'text-rose-600',
        ring: 'focus:ring-rose-500',
        border: 'border-rose-400 bg-rose-50',
        icon: '👑',
        title: isSignUp ? 'Join the Kingdom!' : 'Welcome Back, Princess!',
        subtitle: isSignUp 
          ? 'Create your royal account to begin your learning journey with Koko'
          : 'Your magical learning journey continues here',
        companion: '🧸'
      };
    }
  };

  const theme = getThemeStyles();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} flex items-center justify-center p-4`}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md">
        {/* Gender Selection */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              type="button"
              onClick={() => setSelectedGender('female')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                selectedGender === 'female'
                  ? 'bg-rose-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Princess</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedGender('male')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                selectedGender === 'male'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>Champion</span>
            </button>
          </div>
        </div>

        <div className="text-center mb-6 md:mb-8">
          <div className={`bg-gradient-to-r ${theme.primary} p-4 rounded-full w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 flex items-center justify-center`}>
            <Crown className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {theme.title}
            <Sparkles className="inline ml-2 h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            {theme.subtitle}
          </p>
          <div className="text-4xl mt-2">{theme.companion}</div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {isSignUp && (
            <>
              <div>
                <label htmlFor="username" className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a unique username..."
                  className={`w-full p-3 border border-gray-300 rounded-lg ${theme.ring} focus:border-transparent transition-all duration-200 text-sm md:text-base`}
                  required
                />
              </div>

              <div>
                <label htmlFor="displayName" className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Display Name *
                </label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={selectedGender === 'male' ? "What shall we call you, Champion?" : "What shall we call you, Princess?"}
                  className={`w-full p-3 border border-gray-300 rounded-lg ${theme.ring} focus:border-transparent transition-all duration-200 text-sm md:text-base`}
                  required
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className={`w-full p-3 border border-gray-300 rounded-lg ${theme.ring} focus:border-transparent transition-all duration-200 text-sm md:text-base`}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password..."
                className={`w-full p-3 pr-12 border border-gray-300 rounded-lg ${theme.ring} focus:border-transparent transition-all duration-200 text-sm md:text-base`}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
          </div>

          {!isSignUp && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={`h-4 w-4 ${theme.accent} ${theme.ring} border-gray-300 rounded`}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-xs md:text-sm text-gray-700">
                Remember me for next time
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r ${theme.primary} hover:${theme.primaryHover} disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm md:text-base`}
          >
            <Heart className="h-4 w-4 md:h-5 md:w-5" />
            <span>
              {loading 
                ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
                : (isSignUp ? 'Create My Account' : selectedGender === 'male' ? 'Begin My Quest' : 'Begin My Journey')
              }
            </span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setEmail('');
              setPassword('');
              setUsername('');
              setDisplayName('');
            }}
            className={`${theme.accent} hover:opacity-80 font-medium text-sm md:text-base`}
          >
            {isSignUp 
              ? 'Already have an account? Sign in here' 
              : "Don't have an account? Create one here"
            }
          </button>
        </div>

        <div className="mt-6 md:mt-8 text-center">
          <div className={`bg-gradient-to-r ${selectedGender === 'male' ? 'from-blue-100 to-indigo-100' : 'from-purple-100 to-pink-100'} p-3 md:p-4 rounded-lg border ${selectedGender === 'male' ? 'border-blue-200' : 'border-purple-200'}`}>
            <p className="text-xs md:text-sm text-gray-600 italic">
              {selectedGender === 'male' 
                ? '"The strongest warriors are forged through consistent training."'
                : '"Every expert was once a beginner. Every pro was once an amateur."'
              }
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {selectedGender === 'male' ? '— Ancient Warrior Wisdom' : '— Robin Sharma'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;