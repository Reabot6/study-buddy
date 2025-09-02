import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Hand, Video, Play, Pause, RotateCcw, Camera, Square } from 'lucide-react';

const SignLanguage: React.FC = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'lessons' | 'translate'>('lessons');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Get user gender
  const getUserGender = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.user_metadata?.gender || 'female';
  };

  const gender = getUserGender();
  const isMale = gender === 'male';

  const lessons = [
    { id: 'hello', word: 'Hello', description: 'Basic greeting', video: '/videos/hello.mp4' },
    { id: 'thank-you', word: 'Thank You', description: 'Express gratitude', video: '/videos/thank-you.mp4' },
    { id: 'please', word: 'Please', description: 'Polite request', video: '/videos/please.mp4' },
    { id: 'sorry', word: 'Sorry', description: 'Apologize', video: '/videos/sorry.mp4' },
    { id: 'help', word: 'Help', description: 'Ask for assistance', video: '/videos/help.mp4' },
    { id: 'yes', word: 'Yes', description: 'Affirmative response', video: '/videos/yes.mp4' },
    { id: 'no', word: 'No', description: 'Negative response', video: '/videos/no.mp4' },
    { id: 'good', word: 'Good', description: 'Positive expression', video: '/videos/good.mp4' },
    { id: 'bad', word: 'Bad', description: 'Negative expression', video: '/videos/bad.mp4' }
  ];

  const quizQuestions = [
    { sign: 'hello', options: ['Hello', 'Goodbye', 'Thank You', 'Please'], correct: 'Hello' },
    { sign: 'thank-you', options: ['Sorry', 'Thank You', 'Help', 'Good'], correct: 'Thank You' },
    { sign: 'help', options: ['Help', 'Please', 'Yes', 'No'], correct: 'Help' }
  ];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        
        // Mock real-time translation
        const translations = ['Detecting...', 'Hello', 'Thank you', 'Please', 'Help'];
        let index = 0;
        const interval = setInterval(() => {
          setTranslatedText(translations[index % translations.length]);
          index++;
        }, 2000);

        setTimeout(() => {
          clearInterval(interval);
        }, 10000);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access is required for sign language translation.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setTranslatedText('');
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

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
          Sign Language
        </h1>
        <div className="w-10" />
      </div>
    </div>
  );

  const renderTabNavigation = () => (
    <div className="px-4 py-4">
      <div className="max-w-sm mx-auto">
        <div className={`${isMale ? 'bg-slate-800' : 'bg-white'} rounded-xl p-1 flex`}>
          <button
            onClick={() => setActiveView('lessons')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeView === 'lessons'
                ? `${isMale ? 'bg-slate-600 text-gray-200' : 'bg-rose-500 text-white'}`
                : `${isMale ? 'text-gray-400' : 'text-gray-600'}`
            }`}
          >
            Learn
          </button>
          <button
            onClick={() => setActiveView('translate')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeView === 'translate'
                ? `${isMale ? 'bg-slate-600 text-gray-200' : 'bg-rose-500 text-white'}`
                : `${isMale ? 'text-gray-400' : 'text-gray-600'}`
            }`}
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );

  const renderLessons = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 pb-6"
    >
      <div className="max-w-sm mx-auto">
        <h2 className={`text-lg font-semibold mb-4 ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
          Basic Signs
        </h2>
        
        <div className="grid grid-cols-3 gap-3">
          {lessons.map((lesson) => (
            <motion.button
              key={lesson.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLesson(lesson.id)}
              className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-4 text-center`}
            >
              <Hand className={`h-8 w-8 mx-auto mb-2 ${isMale ? 'text-blue-400' : 'text-rose-500'}`} />
              <h3 className={`font-medium text-sm ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
                {lesson.word}
              </h3>
              <p className={`text-xs ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
                {lesson.description}
              </p>
            </motion.button>
          ))}
        </div>

        {selectedLesson && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 ${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}
          >
            <div className="text-center">
              <h3 className={`text-xl font-bold mb-4 ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
                {lessons.find(l => l.id === selectedLesson)?.word}
              </h3>
              
              {/* Mock Video Player */}
              <div className={`w-full h-48 ${isMale ? 'bg-slate-700' : 'bg-gray-100'} rounded-lg mb-4 flex items-center justify-center`}>
                <div className="text-center">
                  <Video className={`h-16 w-16 mx-auto mb-2 ${isMale ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-sm ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
                    Video demonstration
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setIsQuizMode(true)}
                  className={`flex-1 py-3 rounded-xl font-medium ${
                    isMale 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                      : 'bg-gradient-to-r from-rose-500 to-purple-600 text-white'
                  }`}
                >
                  Practice Quiz
                </button>
                <button
                  onClick={() => setSelectedLesson(null)}
                  className={`px-4 py-3 rounded-xl ${
                    isMale 
                      ? 'bg-slate-700 text-gray-300'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  const renderTranslate = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 pb-6"
    >
      <div className="max-w-sm mx-auto">
        <h2 className={`text-lg font-semibold mb-4 ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
          Real-Time Translation
        </h2>
        
        <div className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          {!cameraActive ? (
            <div className="text-center">
              <Camera className={`h-16 w-16 mx-auto mb-4 ${isMale ? 'text-gray-500' : 'text-gray-400'}`} />
              <h3 className={`font-semibold mb-2 ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
                Start Camera
              </h3>
              <p className={`text-sm mb-6 ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
                Allow camera access to translate sign language in real-time
              </p>
              <button
                onClick={startCamera}
                className={`w-full py-3 rounded-xl font-medium ${
                  isMale 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                }`}
              >
                Start Translation
              </button>
            </div>
          ) : (
            <div>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-48 bg-black rounded-lg mb-4"
              />
              
              <div className={`${isMale ? 'bg-slate-700' : 'bg-gray-50'} rounded-lg p-4 mb-4`}>
                <h4 className={`font-medium mb-2 ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
                  Translation:
                </h4>
                <p className={`text-lg ${isMale ? 'text-blue-400' : 'text-rose-600'}`}>
                  {translatedText || 'Waiting for signs...'}
                </p>
              </div>

              <button
                onClick={stopCamera}
                className={`w-full py-3 rounded-xl font-medium ${
                  isMale 
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                } flex items-center justify-center space-x-2`}
              >
                <Square className="h-5 w-5" />
                <span>Stop Translation</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen ${isMale ? 'bg-slate-900' : 'bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50'}`}>
      {renderHeader()}
      {renderTabNavigation()}
      
      {activeView === 'lessons' && renderLessons()}
      {activeView === 'translate' && renderTranslate()}
    </div>
  );
};

export default SignLanguage;