import React, { useState } from 'react';
import { Save, Clock, Heart, Brain, BookOpen } from 'lucide-react';
import StudyTimer from './StudyTimer';
import { Course, StudySession as StudySessionType } from '../types';

interface StudySessionProps {
  courses: Course[];
  onSessionSave: (session: Omit<StudySessionType, 'id'>) => void;
}

const StudySession: React.FC<StudySessionProps> = ({ courses, onSessionSave }) => {
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
      notes: sessionNotes + (notes ? '\n\nAdditional Notes:\n' + notes : ''),
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

  const reflectionPrompts = [
    "What was the most interesting thing I learned today?",
    "What concepts do I need to review more?",
    "How can I apply this knowledge in real life?",
    "What questions do I still have about this topic?"
  ];

  if (showTimer) {
    const selectedCourseName = courses.find(c => c.id === selectedCourse)?.name || 'Unknown Course';
    return (
      <div className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Focus Time ✨</h2>
            <p className="text-sm md:text-base text-gray-600">Take notes while you study!</p>
          </div>
          <StudyTimer 
            onSessionComplete={handleSessionComplete} 
            courseName={selectedCourseName}
          />
          <div className="text-center mt-6">
            <button
              onClick={() => setShowTimer(false)}
              className="text-gray-600 hover:text-gray-800 underline text-sm md:text-base"
            >
              Return to Session Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Time to Bloom with Knowledge! 🌸
        </h2>
        <p className="text-sm md:text-base text-gray-600">Every study session is a step toward your dreams</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Left Column - Session Setup */}
        <div className="space-y-4 md:space-y-6">
          {/* Course Selection */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-rose-500" />
              Select Your Course
            </h3>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
            >
              <option value="">Choose a course...</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Timer Section */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-500" />
              Study Timer
            </h3>
            <button
              onClick={() => selectedCourse ? setShowTimer(true) : null}
              disabled={!selectedCourse}
              className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 md:px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm md:text-base"
            >
              <Clock size={20} />
              <span>Start Focus Session</span>
            </button>
            {sessionDuration > 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-center text-green-600 font-medium text-sm md:text-base">
                  ✅ Completed {sessionDuration} minute session!
                </p>
                {sessionNotes && (
                  <div className="mt-2 p-2 bg-white rounded border">
                    <p className="text-xs md:text-sm text-gray-600 font-medium mb-1">Session Notes:</p>
                    <p className="text-xs md:text-sm text-gray-700 whitespace-pre-wrap">{sessionNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mood & Focus Rating */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-pink-500" />
              How Are You Feeling?
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Mood (1-5) 😊
                </label>
                <div className="flex space-x-1 md:space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMood(rating)}
                      className={`w-8 h-8 md:w-10 md:h-10 text-sm md:text-base rounded-full border-2 transition-all duration-200 ${
                        mood === rating
                          ? 'bg-pink-500 border-pink-500 text-white'
                          : 'border-gray-300 hover:border-pink-300'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                  Focus Level (1-5) 🎯
                </label>
                <div className="flex space-x-1 md:space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFocusRating(rating)}
                      className={`w-8 h-8 md:w-10 md:h-10 text-sm md:text-base rounded-full border-2 transition-all duration-200 ${
                        focusRating === rating
                          ? 'bg-purple-500 border-purple-500 text-white'
                          : 'border-gray-300 hover:border-purple-300'
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

        {/* Right Column - Notes & Reflection */}
        <div className="space-y-4 md:space-y-6">
          {/* Additional Study Notes */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-500" />
              Additional Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional thoughts, concepts, or notes to add to your session notes..."
              className="w-full h-24 md:h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm md:text-base"
            />
          </div>

          {/* Reflection */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">
              Daily Reflection ✨
            </h3>
            <div className="mb-3">
              <p className="text-xs md:text-sm text-gray-600 mb-2">Reflection prompts:</p>
              <ul className="text-xs text-gray-500 space-y-1 hidden md:block">
                {reflectionPrompts.map((prompt, index) => (
                  <li key={index}>• {prompt}</li>
                ))}
              </ul>
            </div>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Reflect on your learning journey today..."
              className="w-full h-24 md:h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none text-sm md:text-base"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveSession}
            disabled={!selectedCourse || sessionDuration === 0}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 md:px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm md:text-base"
          >
            <Save size={20} />
            <span>Save Study Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudySession;