import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Coffee, BookOpen, Edit3 } from 'lucide-react';

interface StudyTimerProps {
  onSessionComplete: (duration: number, notes: string) => void;
  courseName: string;
}

const StudyTimer: React.FC<StudyTimerProps> = ({ onSessionComplete, courseName }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [notes, setNotes] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const quoteIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const motivationalQuotes = [
    "Every expert was once a beginner, Princess! 👑",
    "Your future self will thank you for studying today! ✨",
    "Knowledge is the most beautiful accessory you can wear! 💎",
    "You're building your empire one study session at a time! 🏰",
    "Smart is the new pretty, and you're absolutely radiant! 🌟",
    "Every page you read makes you more powerful! 📚",
    "Your dedication today creates tomorrow's success! 🌸",
    "Learning is your superpower, Princess! 💪",
    "You're not just studying, you're becoming unstoppable! 🚀",
    "Your mind is a garden, and knowledge is the most beautiful flower! 🌺"
  ];

  const startTimer = () => {
    setIsRunning(true);
    // Start quote rotation every 5 minutes (300 seconds)
    quoteIntervalRef.current = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length);
      setShowQuote(true);
      setTimeout(() => setShowQuote(false), 4000); // Show for 4 seconds
    }, 300000);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (quoteIntervalRef.current) {
      clearInterval(quoteIntervalRef.current);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setNotes('');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (quoteIntervalRef.current) {
      clearInterval(quoteIntervalRef.current);
    }
  };

  const switchMode = () => {
    setIsRunning(false);
    if (isBreak) {
      setMinutes(25);
      setIsBreak(false);
    } else {
      setMinutes(5);
      setIsBreak(true);
    }
    setSeconds(0);
    setNotes('');
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 0) {
                // Timer completed
                setIsRunning(false);
                if (quoteIntervalRef.current) {
                  clearInterval(quoteIntervalRef.current);
                }
                
                if (!isBreak) {
                  setSessionsCompleted(prev => prev + 1);
                  onSessionComplete(25, notes); // Pass notes to parent
                }
                
                // Auto switch to break or study
                if (isBreak) {
                  setMinutes(25);
                  setIsBreak(false);
                } else {
                  setMinutes(5);
                  setIsBreak(true);
                }
                setSeconds(0);
                setNotes(''); // Clear notes after session
                return isBreak ? 25 : 5;
              }
              return prevMinutes - 1;
            });
            return 59;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (quoteIntervalRef.current) {
        clearInterval(quoteIntervalRef.current);
      }
    };
  }, [isRunning, isBreak, onSessionComplete, notes]);

  const progress = isBreak 
    ? ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100
    : ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Motivational Quote Overlay */}
      {showQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-r from-rose-100 to-purple-100 p-6 md:p-8 rounded-2xl shadow-2xl border-4 border-rose-300 max-w-md mx-auto animate-pulse">
            <div className="text-center">
              <div className="text-4xl mb-4">👑</div>
              <p className="text-base md:text-lg font-medium text-gray-800 italic">
                "{motivationalQuotes[currentQuote]}"
              </p>
              <div className="mt-4 text-2xl">✨</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Timer Section */}
        <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
          <div className="text-center mb-4 md:mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              {isBreak ? (
                <Coffee className="h-6 w-6 text-green-500" />
              ) : (
                <BookOpen className="h-6 w-6 text-rose-500" />
              )}
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                {isBreak ? 'Break Time' : 'Study Time'}
              </h3>
            </div>
            <p className="text-sm md:text-base text-gray-600">
              {courseName}
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              {isBreak ? 'Take a well-deserved break!' : 'Focus and make it count! 💪'}
            </p>
          </div>

          {/* Timer Display */}
          <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 md:mb-6">
            <svg className="w-32 h-32 md:w-48 md:h-48 transform -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - progress / 100)}`}
                className={isBreak ? "text-green-500" : "text-rose-500"}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl md:text-4xl font-bold text-gray-800">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  Session {sessionsCompleted + 1}
                </div>
              </div>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 md:mb-6">
            <button
              onClick={isRunning ? pauseTimer : startTimer}
              className={`flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all duration-200 ${
                isRunning
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  : 'bg-rose-500 hover:bg-rose-600 text-white'
              }`}
            >
              {isRunning ? <Pause size={16} className="md:w-5 md:h-5" /> : <Play size={16} className="md:w-5 md:h-5" />}
              <span className="text-sm md:text-base">{isRunning ? 'Pause' : 'Start'}</span>
            </button>
            
            <button
              onClick={resetTimer}
              className="flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200"
            >
              <Square size={16} className="md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Reset</span>
            </button>
          </div>

          {/* Mode Switch */}
          <div className="text-center">
            <button
              onClick={switchMode}
              className="text-xs md:text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Switch to {isBreak ? 'Study' : 'Break'} Mode
            </button>
          </div>

          {/* Sessions Completed */}
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-xs md:text-sm text-gray-600">
              Sessions completed today: <span className="font-bold text-rose-600">{sessionsCompleted}</span>
            </p>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Edit3 className="h-5 w-5 mr-2 text-purple-500" />
            Study Notes
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                What are you learning right now? ✨
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your thoughts, key concepts, questions, or anything you're learning during this session..."
                className="w-full h-32 md:h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm md:text-base"
                disabled={!isRunning && !isBreak}
              />
            </div>
            
            <div className="bg-purple-50 p-3 md:p-4 rounded-lg border border-purple-200">
              <h4 className="text-xs md:text-sm font-medium text-purple-800 mb-2">💡 Study Tips:</h4>
              <ul className="text-xs text-purple-700 space-y-1">
                <li>• Write down key concepts as you learn them</li>
                <li>• Note any questions that come up</li>
                <li>• Summarize important points in your own words</li>
                <li>• Connect new information to what you already know</li>
              </ul>
            </div>

            {notes && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-xs md:text-sm text-green-700">
                  📝 Great job taking notes! Your future self will thank you for this.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;