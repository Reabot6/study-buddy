import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Dumbbell, Target, Edit3 } from 'lucide-react';

interface ChampionTimerProps {
  onSessionComplete: (duration: number, notes: string) => void;
  courseName: string;
}

const ChampionTimer: React.FC<ChampionTimerProps> = ({ onSessionComplete, courseName }) => {
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

  const tacticalQuotes = [
    "Every champion was once a beginner who refused to give up! ⚡",
    "Your future victories are built on today's training! 🏆",
    "Knowledge is your most powerful weapon, Champion! ⚔️",
    "You're forging your legend one session at a time! 🔥",
    "Strong minds create unstoppable warriors! 💪",
    "Every page you conquer makes you more formidable! 📚",
    "Your dedication today shapes tomorrow's triumphs! 🌟",
    "Learning is your superpower, use it wisely! ⚡",
    "You're not just studying, you're becoming legendary! 🚀",
    "Your mind is your fortress, strengthen it daily! 🏰"
  ];

  const startTimer = () => {
    setIsRunning(true);
    quoteIntervalRef.current = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % tacticalQuotes.length);
      setShowQuote(true);
      setTimeout(() => setShowQuote(false), 4000);
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
                setIsRunning(false);
                if (quoteIntervalRef.current) {
                  clearInterval(quoteIntervalRef.current);
                }
                
                if (!isBreak) {
                  setSessionsCompleted(prev => prev + 1);
                  onSessionComplete(25, notes);
                }
                
                if (isBreak) {
                  setMinutes(25);
                  setIsBreak(false);
                } else {
                  setMinutes(5);
                  setIsBreak(true);
                }
                setSeconds(0);
                setNotes('');
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
      {/* Tactical Quote Overlay */}
      {showQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-r from-slate-800 to-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl border-4 border-slate-600 max-w-md mx-auto animate-pulse">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <p className="text-base md:text-lg font-medium text-gray-200 italic">
                "{tacticalQuotes[currentQuote]}"
              </p>
              <div className="mt-4 text-2xl">🔥</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Timer Section */}
        <div className="bg-slate-800 p-4 md:p-8 rounded-xl shadow-lg border border-slate-600">
          <div className="text-center mb-4 md:mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              {isBreak ? (
                <Dumbbell className="h-6 w-6 text-blue-400" />
              ) : (
                <Target className="h-6 w-6 text-slate-400" />
              )}
              <h3 className="text-lg md:text-xl font-semibold text-gray-200">
                {isBreak ? 'Recovery Time' : 'Training Mode'}
              </h3>
            </div>
            <p className="text-sm md:text-base text-gray-400">
              {courseName}
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              {isBreak ? 'Recharge for the next battle!' : 'Focus and dominate! 💪'}
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
                className="text-slate-600"
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
                className={isBreak ? "text-blue-400" : "text-slate-400"}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl md:text-4xl font-bold text-gray-200">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-gray-400">
                  Mission {sessionsCompleted + 1}
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
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-slate-600 hover:bg-slate-700 text-white'
              }`}
            >
              {isRunning ? <Pause size={16} className="md:w-5 md:h-5" /> : <Play size={16} className="md:w-5 md:h-5" />}
              <span className="text-sm md:text-base">{isRunning ? 'Pause' : 'Start'}</span>
            </button>
            
            <button
              onClick={resetTimer}
              className="flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-200"
            >
              <Square size={16} className="md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Reset</span>
            </button>
          </div>

          {/* Mode Switch */}
          <div className="text-center">
            <button
              onClick={switchMode}
              className="text-xs md:text-sm text-gray-400 hover:text-gray-200 underline"
            >
              Switch to {isBreak ? 'Training' : 'Recovery'} Mode
            </button>
          </div>

          {/* Sessions Completed */}
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-xs md:text-sm text-gray-400">
              Missions completed today: <span className="font-bold text-slate-400">{sessionsCompleted}</span>
            </p>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-slate-800 p-4 md:p-6 rounded-xl shadow-lg border border-slate-600">
          <h3 className="text-base md:text-lg font-semibold text-gray-200 mb-4 flex items-center">
            <Edit3 className="h-5 w-5 mr-2 text-blue-400" />
            Training Notes
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                What tactical knowledge are you gaining? ⚡
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Document your strategic insights, key concepts, battle plans, or any knowledge you're acquiring during this training session..."
                className="w-full h-32 md:h-64 p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm md:text-base text-gray-200 placeholder-gray-400"
                disabled={!isRunning && !isBreak}
              />
            </div>
            
            <div className="bg-slate-700 p-3 md:p-4 rounded-lg border border-slate-600">
              <h4 className="text-xs md:text-sm font-medium text-blue-400 mb-2">⚡ Tactical Tips:</h4>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Record strategic concepts as you master them</li>
                <li>• Note any tactical questions that arise</li>
                <li>• Summarize key intelligence in your own words</li>
                <li>• Connect new knowledge to your existing arsenal</li>
              </ul>
            </div>

            {notes && (
              <div className="bg-slate-700 p-3 rounded-lg border border-slate-600">
                <p className="text-xs md:text-sm text-blue-400">
                  ⚡ Excellent tactical documentation! Your future battles will benefit from this intel.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionTimer;