import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Play, BookOpen, Target, Clock, Save } from 'lucide-react';
import { Course, StudySession } from '../types';

interface StudyModeProps {
  courses: Course[];
  sessions: StudySession[];
  onSessionSave: (session: Omit<StudySession, 'id'>) => void;
  onCourseAdd: (course: Omit<Course, 'id' | 'totalSessions' | 'totalMinutes'>) => void;
}

const StudyMode: React.FC<StudyModeProps> = ({ courses, sessions, onSessionSave, onCourseAdd }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'courses' | 'session' | 'add-course'>('courses');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [isStudying, setIsStudying] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [notes, setNotes] = useState('');
  const [mood, setMood] = useState(3);
  const [focusRating, setFocusRating] = useState(3);
  const [newCourse, setNewCourse] = useState({
    name: '',
    color: 'rose',
    icon: '📚',
    goal: ''
  });

  // Get user gender from localStorage
  const getUserGender = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.user_metadata?.gender || 'female';
  };

  const gender = getUserGender();
  const isMale = gender === 'male';

  const colors = [
    { name: 'rose', class: 'bg-rose-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'yellow', class: 'bg-yellow-500' },
    { name: 'pink', class: 'bg-pink-500' }
  ];

  const icons = ['📚', '🧬', '⚗️', '🫀', '🧠', '💊', '🔬', '📊', '🎨', '🌟'];

  const startSession = (courseId: string) => {
    setSelectedCourse(courseId);
    setActiveView('session');
    setIsStudying(true);
    
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev === 0) {
          setMinutes(prevMin => {
            if (prevMin === 0) {
              clearInterval(timer);
              setIsStudying(false);
              return 25;
            }
            return prevMin - 1;
          });
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const saveSession = () => {
    if (!selectedCourse) return;

    const session: Omit<StudySession, 'id'> = {
      courseId: selectedCourse,
      date: new Date().toISOString().split('T')[0],
      duration: 25,
      notes,
      reflection: '',
      mood,
      focusRating,
    };

    onSessionSave(session);
    setActiveView('courses');
    setNotes('');
    setMood(3);
    setFocusRating(3);
  };

  const addCourse = () => {
    if (!newCourse.name.trim()) return;
    
    onCourseAdd(newCourse);
    setNewCourse({ name: '', color: 'rose', icon: '📚', goal: '' });
    setActiveView('courses');
  };

  const renderHeader = () => (
    <div className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-rose-200'} border-b px-4 py-4 safe-area-top`}>
      <div className="max-w-sm mx-auto flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className={`p-2 rounded-lg ${isMale ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className={`text-lg font-semibold ${isMale ? 'text-gray-100' : 'text-gray-800'}`}>
          {isMale ? 'Training Center' : 'Study Hub'}
        </h1>
        <div className="w-10" />
      </div>
    </div>
  );

  const renderCourses = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-6"
    >
      <div className="max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-base font-semibold ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
            {isMale ? 'Training Modules' : 'Your Courses'}
          </h2>
          <button
            onClick={() => setActiveView('add-course')}
            className={`p-2 rounded-lg ${isMale ? 'bg-slate-700 text-gray-300' : 'bg-rose-100 text-rose-600'}`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {courses.length === 0 ? (
          <div className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-8 text-center`}>
            <BookOpen className={`h-16 w-16 mx-auto mb-4 ${isMale ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`font-semibold mb-2 ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
              {isMale ? 'No Training Modules' : 'No Courses Yet'}
            </h3>
            <p className={`text-sm mb-4 ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
              {isMale ? 'Create your first tactical module' : 'Create your first course to begin'}
            </p>
            <button
              onClick={() => setActiveView('add-course')}
              className={`bg-gradient-to-r ${isMale ? 'from-slate-600 to-gray-700' : 'from-rose-400 to-pink-500'} text-white px-6 py-3 rounded-xl font-medium`}
            >
              {isMale ? 'Create Module' : 'Create Course'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-4`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-${course.color}-500 rounded-xl flex items-center justify-center text-white text-xl`}>
                      {course.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
                        {course.name}
                      </h3>
                      <p className={`text-xs ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
                        {course.totalSessions} sessions • {Math.floor(course.totalMinutes / 60)}h
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => startSession(course.id)}
                    className={`p-3 rounded-xl ${isMale ? 'bg-slate-700 text-blue-400' : 'bg-rose-100 text-rose-600'}`}
                  >
                    <Play className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderAddCourse = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="px-4 py-6"
    >
      <div className="max-w-sm mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setActiveView('courses')}
            className={`p-2 rounded-lg mr-3 ${isMale ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className={`text-lg font-semibold ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
            {isMale ? 'New Training Module' : 'New Course'}
          </h2>
        </div>

        <div className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6 space-y-4`}>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
              {isMale ? 'Module Name' : 'Course Name'}
            </label>
            <input
              type="text"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              placeholder={isMale ? 'e.g., Advanced Tactics' : 'e.g., Biochemistry'}
              className={`w-full p-3 rounded-lg border ${isMale ? 'bg-slate-700 border-slate-600 text-gray-200' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
              Goal (Optional)
            </label>
            <input
              type="text"
              value={newCourse.goal}
              onChange={(e) => setNewCourse({ ...newCourse, goal: e.target.value })}
              placeholder={isMale ? 'e.g., Master strategic planning' : 'e.g., Master molecular mechanisms'}
              className={`w-full p-3 rounded-lg border ${isMale ? 'bg-slate-700 border-slate-600 text-gray-200' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
              Color
            </label>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setNewCourse({ ...newCourse, color: color.name })}
                  className={`w-8 h-8 rounded-lg ${color.class} ${
                    newCourse.color === color.name ? 'ring-2 ring-blue-400' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
              Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {icons.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setNewCourse({ ...newCourse, icon })}
                  className={`w-12 h-12 text-xl border rounded-lg ${
                    newCourse.icon === icon 
                      ? `${isMale ? 'border-blue-400 bg-slate-700' : 'border-rose-400 bg-rose-50'}` 
                      : `${isMale ? 'border-slate-600 hover:bg-slate-700' : 'border-gray-300 hover:bg-gray-50'}`
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={addCourse}
            disabled={!newCourse.name.trim()}
            className={`w-full py-3 rounded-xl font-medium ${
              isMale 
                ? 'bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 text-white'
                : 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white'
            } disabled:opacity-50`}
          >
            {isMale ? 'Deploy Module' : 'Create Course'}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderSession = () => {
    const course = courses.find(c => c.id === selectedCourse);
    const progress = ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="px-4 py-6"
      >
        <div className="max-w-sm mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setActiveView('courses')}
              className={`p-2 rounded-lg mr-3 ${isMale ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className={`text-lg font-semibold ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
                {isMale ? 'Training Session' : 'Study Session'}
              </h2>
              <p className={`text-sm ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
                {course?.name}
              </p>
            </div>
          </div>

          {/* Timer */}
          <div className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6 text-center`}>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className={isMale ? 'text-slate-600' : 'text-gray-200'}
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                  className={isMale ? 'text-blue-400' : 'text-rose-500'}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-2xl font-bold ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
              </div>
            </div>
            
            <p className={`text-sm ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
              {isStudying ? (isMale ? 'Training in progress...' : 'Focus time...') : (isMale ? 'Ready for training' : 'Ready to study')}
            </p>
          </div>

          {/* Notes */}
          <div className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-4 mb-6`}>
            <label className={`block text-sm font-medium mb-2 ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
              {isMale ? 'Training Notes' : 'Study Notes'}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isMale ? 'Document your tactical insights...' : 'What are you learning?'}
              className={`w-full h-24 p-3 rounded-lg border resize-none ${
                isMale 
                  ? 'bg-slate-700 border-slate-600 text-gray-200 placeholder-gray-400' 
                  : 'bg-white border-gray-300 placeholder-gray-500'
              } focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Ratings */}
          <div className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-4 mb-6 space-y-4`}>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
                {isMale ? 'Morale Level' : 'Mood'} (1-5)
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMood(rating)}
                    className={`w-10 h-10 rounded-lg border-2 font-medium ${
                      mood === rating
                        ? `${isMale ? 'bg-blue-500 border-blue-500 text-white' : 'bg-rose-500 border-rose-500 text-white'}`
                        : `${isMale ? 'border-slate-600 text-gray-400' : 'border-gray-300 text-gray-600'}`
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
                {isMale ? 'Focus Level' : 'Focus Rating'} (1-5)
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFocusRating(rating)}
                    className={`w-10 h-10 rounded-lg border-2 font-medium ${
                      focusRating === rating
                        ? `${isMale ? 'bg-green-500 border-green-500 text-white' : 'bg-purple-500 border-purple-500 text-white'}`
                        : `${isMale ? 'border-slate-600 text-gray-400' : 'border-gray-300 text-gray-600'}`
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={saveSession}
            disabled={isStudying}
            className={`w-full py-4 rounded-xl font-medium flex items-center justify-center space-x-2 ${
              isMale 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
            } disabled:opacity-50`}
          >
            <Save className="h-5 w-5" />
            <span>{isMale ? 'Log Training Session' : 'Save Study Session'}</span>
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`min-h-screen ${isMale ? 'bg-slate-900' : 'bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50'}`}>
      {renderHeader()}
      
      {activeView === 'courses' && renderCourses()}
      {activeView === 'add-course' && renderAddCourse()}
      {activeView === 'session' && renderSession()}
    </div>
  );
};

export default StudyMode;