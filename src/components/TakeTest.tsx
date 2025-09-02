import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, FileText, CheckCircle, X, Brain } from 'lucide-react';
import { Course } from '../types';

interface TakeTestProps {
  courses: Course[];
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const TakeTest: React.FC<TakeTestProps> = ({ courses }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'upload' | 'questions' | 'results'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  // Get user gender
  const getUserGender = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.user_metadata?.gender || 'female';
  };

  const gender = getUserGender();
  const isMale = gender === 'male';

  // Mock OpenAI API call
  const generateQuestions = async (text: string): Promise<Question[]> => {
    // Simulate API processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock questions based on educational topics
    const mockQuestions: Question[] = [
      {
        id: '1',
        question: 'What is the primary function of mitochondria in cells?',
        options: ['Protein synthesis', 'Energy production', 'DNA replication', 'Waste removal'],
        correctAnswer: 1
      },
      {
        id: '2',
        question: 'Which process converts glucose into ATP?',
        options: ['Photosynthesis', 'Cellular respiration', 'Transcription', 'Translation'],
        correctAnswer: 1
      },
      {
        id: '3',
        question: 'What is the basic unit of heredity?',
        options: ['Chromosome', 'Gene', 'Allele', 'DNA'],
        correctAnswer: 1
      },
      {
        id: '4',
        question: 'Which organelle is responsible for protein synthesis?',
        options: ['Nucleus', 'Ribosome', 'Golgi apparatus', 'Endoplasmic reticulum'],
        correctAnswer: 1
      },
      {
        id: '5',
        question: 'What is the process by which plants make their own food?',
        options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Digestion'],
        correctAnswer: 1
      }
    ];

    return mockQuestions;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsProcessing(true);

    try {
      // Mock text extraction from PDF
      const mockText = "This is extracted text from the PDF document about biology and cellular processes...";
      
      // Generate questions using mock API
      const generatedQuestions = await generateQuestions(mockText);
      setQuestions(generatedQuestions);
      setAnswers(new Array(generatedQuestions.length).fill(-1));
      setActiveView('questions');
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const submitTest = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    setScore(Math.round((correctCount / questions.length) * 100));
    setActiveView('results');
  };

  const resetTest = () => {
    setSelectedFile(null);
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestion(0);
    setScore(0);
    setActiveView('upload');
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
          {isMale ? 'Combat Assessment' : 'Take Test'}
        </h1>
        <div className="w-10" />
      </div>
    </div>
  );

  const renderUpload = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-6"
    >
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${isMale ? 'bg-slate-700' : 'bg-rose-100'} flex items-center justify-center`}>
            <FileText className={`h-10 w-10 ${isMale ? 'text-blue-400' : 'text-rose-500'}`} />
          </div>
          <h2 className={`text-xl font-bold mb-2 ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
            {isMale ? 'Upload Training Material' : 'Upload Study Material'}
          </h2>
          <p className={`text-sm ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
            {isMale ? 'Upload a PDF to generate tactical assessments' : 'Upload a PDF to generate quiz questions'}
          </p>
        </div>

        <div className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-2 border-dashed rounded-xl p-8 text-center`}>
          {isProcessing ? (
            <div>
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full border-4 ${isMale ? 'border-blue-400' : 'border-rose-500'} border-t-transparent animate-spin`}></div>
              <p className={`text-sm ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
                {isMale ? 'Analyzing tactical data...' : 'Processing your document...'}
              </p>
            </div>
          ) : (
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className={`h-12 w-12 mx-auto mb-4 ${isMale ? 'text-gray-500' : 'text-gray-400'}`} />
              <p className={`text-sm font-medium mb-2 ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
                {isMale ? 'Upload Training Document' : 'Upload PDF Document'}
              </p>
              <p className={`text-xs ${isMale ? 'text-gray-500' : 'text-gray-500'}`}>
                PDF files only
              </p>
            </label>
          )}
        </div>

        {selectedFile && !isProcessing && (
          <div className={`mt-4 p-4 ${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl`}>
            <div className="flex items-center space-x-3">
              <FileText className={`h-8 w-8 ${isMale ? 'text-blue-400' : 'text-rose-500'}`} />
              <div>
                <p className={`font-medium ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
                  {selectedFile.name}
                </p>
                <p className={`text-xs ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderQuestions = () => {
    const question = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;
    const canProceed = answers[currentQuestion] !== -1;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-4 py-6"
      >
        <div className="max-w-sm mx-auto">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className={`text-sm ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className={`w-full h-2 ${isMale ? 'bg-slate-700' : 'bg-gray-200'} rounded-full`}>
              <div
                className={`h-2 rounded-full ${isMale ? 'bg-blue-400' : 'bg-rose-500'} transition-all duration-300`}
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
            <h3 className={`text-lg font-semibold mb-4 ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
              {question.question}
            </h3>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQuestion] === index
                      ? `${isMale ? 'border-blue-400 bg-slate-700' : 'border-rose-400 bg-rose-50'}`
                      : `${isMale ? 'border-slate-600 hover:bg-slate-700' : 'border-gray-200 hover:bg-gray-50'}`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === index
                        ? `${isMale ? 'border-blue-400 bg-blue-400' : 'border-rose-400 bg-rose-400'}`
                        : `${isMale ? 'border-slate-500' : 'border-gray-300'}`
                    }`}>
                      {answers[currentQuestion] === index && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className={`${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex space-x-3">
            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion(prev => prev - 1)}
                className={`flex-1 py-3 rounded-xl font-medium ${
                  isMale 
                    ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
            )}
            
            <button
              onClick={() => {
                if (isLastQuestion) {
                  submitTest();
                } else {
                  setCurrentQuestion(prev => prev + 1);
                }
              }}
              disabled={!canProceed}
              className={`flex-1 py-3 rounded-xl font-medium ${
                isMale 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white'
                  : 'bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white'
              } disabled:opacity-50`}
            >
              {isLastQuestion ? (isMale ? 'Complete Assessment' : 'Submit Test') : 'Next'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderResults = () => {
    const getScoreMessage = () => {
      if (isMale) {
        if (score >= 90) return 'Outstanding tactical performance! 🏆';
        if (score >= 80) return 'Excellent combat readiness! ⚡';
        if (score >= 70) return 'Good strategic knowledge! 💪';
        if (score >= 60) return 'Adequate preparation, keep training! 🎯';
        return 'More training required, Champion! 🔥';
      } else {
        if (score >= 90) return 'Absolutely brilliant, Princess! 🌟';
        if (score >= 80) return 'Excellent work, you\'re shining! ✨';
        if (score >= 70) return 'Great job, keep blooming! 🌸';
        if (score >= 60) return 'Good effort, you\'re growing! 🌱';
        return 'Keep learning, you\'ve got this! 💖';
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="px-4 py-6"
      >
        <div className="max-w-sm mx-auto text-center">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full ${isMale ? 'bg-slate-700' : 'bg-rose-100'} flex items-center justify-center`}>
            <Brain className={`h-12 w-12 ${isMale ? 'text-blue-400' : 'text-rose-500'}`} />
          </div>

          <h2 className={`text-2xl font-bold mb-2 ${isMale ? 'text-gray-200' : 'text-gray-800'}`}>
            {isMale ? 'Assessment Complete!' : 'Test Complete!'}
          </h2>

          <div className={`text-6xl font-bold mb-4 ${
            score >= 80 ? (isMale ? 'text-green-400' : 'text-green-500') :
            score >= 60 ? (isMale ? 'text-yellow-400' : 'text-yellow-500') :
            (isMale ? 'text-red-400' : 'text-red-500')
          }`}>
            {score}%
          </div>

          <p className={`text-lg font-medium mb-6 ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
            {getScoreMessage()}
          </p>

          <div className={`${isMale ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-4 mb-6`}>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className={`font-medium ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
                  Correct Answers
                </p>
                <p className={`text-lg font-bold ${isMale ? 'text-green-400' : 'text-green-500'}`}>
                  {questions.filter((_, index) => answers[index] === questions[index].correctAnswer).length}
                </p>
              </div>
              <div>
                <p className={`font-medium ${isMale ? 'text-gray-300' : 'text-gray-700'}`}>
                  Total Questions
                </p>
                <p className={`text-lg font-bold ${isMale ? 'text-gray-400' : 'text-gray-600'}`}>
                  {questions.length}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={resetTest}
              className={`w-full py-3 rounded-xl font-medium ${
                isMale 
                  ? 'bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 text-white'
                  : 'bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white'
              }`}
            >
              {isMale ? 'New Assessment' : 'Take Another Test'}
            </button>
            
            <button
              onClick={() => navigate('/')}
              className={`w-full py-3 rounded-xl font-medium ${
                isMale 
                  ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isMale ? 'Return to Command Center' : 'Back to Home'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`min-h-screen ${isMale ? 'bg-slate-900' : 'bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50'}`}>
      {renderHeader()}
      
      {activeView === 'upload' && renderUpload()}
      {activeView === 'questions' && renderQuestions()}
      {activeView === 'results' && renderResults()}
    </div>
  );
};

export default TakeTest;