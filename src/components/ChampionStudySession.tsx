import React, { useState } from 'react';
import { Save, Clock, Shield, Target, Sword } from 'lucide-react';
import ChampionTimer from './ChampionTimer';
import { Course, StudySession as StudySessionType } from '../types';

interface ChampionStudySessionProps {
  courses: Course[];
  onSessionSave: (session: Omit<StudySessionType, 'id'>) => void;
}

const ChampionStudySession: React.FC<ChampionStudySessionProps> = ({ courses, onSessionSave }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [reflection, setReflection] = useState('');
  const [mood, setMood] = useState(3);
  const [focusRating, setFocusRating] = useState(3);
  const [showTimer, setShowTimer] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [sessionNotes, setSessionNotes] = useState('');

  const handleSessionComplete = (duration: number, timerNotes: string) => {
    setSessionDuration(duration);
    setSessionNotes(timerNotes);
    setShowTimer(false);
  };

  const handleSaveSession = () => {
    if (!selectedCourse) {
      return;
    }

    const session: Omit<StudySessionType, 'id'> = {
      courseId: selectedCourse,
      date: new Date().toISOString().split('T')[0],
      duration: sessionDuration,
      notes: sessionNotes + (notes ? '\n\nAdditional Intel:\n' + notes : ''),
      reflection,
      mood,
      focusRating,
    };

    onSessionSave(session);
    
    // Reset form
    setNotes('');
    setReflection('');
    setMood(3);
    setFocusRating(3);
    setSessionDuration(0);
    setSessionNotes('');
  };

  const tacticalPrompts = [
    "What strategic advantage did I gain today?",
    "Which concepts need further tactical analysis?",
    "How can I deploy this knowledge in real scenarios?",
    "What intelligence gaps do I still need to fill?"
  ];

  if (showTimer) {
    const selectedCourseName = courses.find(c => c.id === selectedCourse)?.name || 'Unknown Module';
    return (
      <div className="min-h-screen bg-slate-900 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">Tactical Training Mode ⚡</h2>
            <p className="text-sm md:text-base text-gray-400">Document your strategic insights!</p>
          </div>
          <ChampionTimer 
            onSessionComplete={handleSessionComplete} 
            courseName={selectedCourseName}
          />
          <div className="text-center mt-6">
            <button
              onClick={() => setShowTimer(false)}
              className="text-gray-400 hover:text-gray-200 underline text-sm md:text-base"
            >
              Return to Mission Briefing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">
            Time to Dominate Your Training! ⚡
          </h2>
          <p className="text-sm md:text-base text-gray-400">Every session builds your tactical advantage</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {/* Left Column - Mission Setup */}
          <div className="space-y-4 md:space-y-6">
            {/* Course Selection */}
            <div className="bg-slate-800 border border-slate-600 p-4 md:p-6 rounded-xl shadow-lg">
              <h3 className="text-base md:text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <Sword className="h-5 w-5 mr-2 text-blue-400" />
                Select Training Module
              </h3>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base text-gray-200"
              >
                <option value="">Choose your battlefield...</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Timer Section */}
            <div className="bg-slate-800 border border-slate-600 p-4 md:p-6 rounded-xl shadow-lg">
              <h3 className="text-base md:text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-400" />
                Training Timer
              </h3>
              <button
                onClick={() => selectedCourse ? setShowTimer(true) : null}
                disabled={!selectedCourse}
                className="w-full bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 md:px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm md:text-base"
              >
                <Clock size={20} />
                <span>Begin Tactical Session</span>
              </button>
              {sessionDuration > 0 && (
                <div className="mt-4 p-3 bg-slate-700 rounded-lg border border-slate-600">
                  <p className="text-center text-green-400 font-medium text-sm md:text-base">
                    ⚡ Completed {sessionDuration} minute training session!
                  </p>
                  {sessionNotes && (
                    <div className="mt-2 p-2 bg-slate-600 rounded border border-slate-500">
                      <p className="text-xs md:text-sm text-gray-300 font-medium mb-1">Session Intel:</p>
                      <p className="text-xs md:text-sm text-gray-400 whitespace-pre-wrap">{sessionNotes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mood & Focus Rating */}
            <div className="bg-slate-800 border border-slate-600 p-4 md:p-6 rounded-xl shadow-lg">
              <h3 className="text-base md:text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-yellow-400" />
                Combat Readiness
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                    Morale Level (1-5) ⚡
                  </label>
                  <div className="flex space-x-1 md:space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMood(rating)}
                        className={`w-8 h-8 md:w-10 md:h-10 text-sm md:text-base rounded-full border-2 transition-all duration-200 ${
                          mood === rating
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'border-slate-600 hover:border-blue-400 text-gray-300'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                    Focus Level (1-5) 🎯
                  </label>
                  <div className="flex space-x-1 md:space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFocusRating(rating)}
                        className={`w-8 h-8 md:w-10 md:h-10 text-sm md:text-base rounded-full border-2 transition-all duration-200 ${
                          focusRating === rating
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-slate-600 hover:border-green-400 text-gray-300'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Intel & Analysis */}
          <div className="space-y-4 md:space-y-6">
            {/* Additional Intel */}
            <div className="bg-slate-800 border border-slate-600 p-4 md:p-6 rounded-xl shadow-lg">
              <h3 className="text-base md:text-lg font-semibold text-gray-100 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-red-400" />
                Additional Intel
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional tactical insights, strategic concepts, or intelligence to add to your session notes..."
                className="w-full h-24 md:h-32 p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm md:text-base text-gray-200 placeholder-gray-400"
              />
            </div>

            {/* Tactical Analysis */}
            <div className="bg-slate-800 border border-slate-600 p-4 md:p-6 rounded-xl shadow-lg">
              <h3 className="text-base md:text-lg font-semibold text-gray-100 mb-4">
                Tactical Analysis ⚡
              </h3>
              <div className="mb-3">
                <p className="text-xs md:text-sm text-gray-300 mb-2">Analysis prompts:</p>
                <ul className="text-xs text-gray-400 space-y-1 hidden md:block">
                  {tacticalPrompts.map((prompt, index) => (
                    <li key={index}>• {prompt}</li>
                  ))}
                </ul>
              </div>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Analyze your tactical progress and strategic insights..."
                className="w-full h-24 md:h-32 p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm md:text-base text-gray-200 placeholder-gray-400"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveSession}
              disabled={!selectedCourse || sessionDuration === 0}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 md:px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm md:text-base"
            >
              <Save size={20} />
              <span>Log Training Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionStudySession;