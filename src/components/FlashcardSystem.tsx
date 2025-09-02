import React, { useState } from 'react';
import { Plus, Brain, RotateCcw, Check, X, Edit } from 'lucide-react';
import { Flashcard, Course } from '../types';

interface FlashcardSystemProps {
  flashcards: Flashcard[];
  courses: Course[];
  onFlashcardAdd: (flashcard: Omit<Flashcard, 'id'>) => void;
  onFlashcardUpdate: (id: string, updates: Partial<Flashcard>) => void;
}

const FlashcardSystem: React.FC<FlashcardSystemProps> = ({
  flashcards,
  courses,
  onFlashcardAdd,
  onFlashcardUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'review' | 'create' | 'manage'>('review');
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newCard, setNewCard] = useState({
    courseId: '',
    question: '',
    answer: '',
    difficulty: 'medium' as const,
  });

  // Get cards due for review today
  const today = new Date().toISOString().split('T')[0];
  const dueCards = flashcards.filter(card => 
    card.nextReview <= today
  );

  const handleCreateCard = () => {
    if (!newCard.courseId || !newCard.question || !newCard.answer) {
      alert('Please fill in all fields');
      return;
    }

    const flashcard: Omit<Flashcard, 'id'> = {
      ...newCard,
      nextReview: today,
      reviewCount: 0,
    };

    onFlashcardAdd(flashcard);
    setNewCard({
      courseId: '',
      question: '',
      answer: '',
      difficulty: 'medium',
    });
    alert('Flashcard created! 🌟');
  };

  const handleReview = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (dueCards.length === 0) return;

    const card = dueCards[currentCard];
    const intervals = {
      easy: 7,
      medium: 3,
      hard: 1,
    };

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + intervals[difficulty]);

    onFlashcardUpdate(card.id, {
      nextReview: nextReviewDate.toISOString().split('T')[0],
      reviewCount: card.reviewCount + 1,
      lastReviewed: today,
      difficulty,
    });

    if (currentCard < dueCards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      setCurrentCard(0);
    }
    setShowAnswer(false);
  };

  const renderReviewTab = () => {
    if (dueCards.length === 0) {
      return (
        <div className="text-center py-12">
          <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No cards due for review! 🎉
          </h3>
          <p className="text-gray-500">
            Great job staying on top of your studies!
          </p>
        </div>
      );
    }

    const card = dueCards[currentCard];
    const course = courses.find(c => c.id === card.courseId);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Card {currentCard + 1} of {dueCards.length}
          </p>
          <p className="text-lg font-medium text-gray-800">
            {course?.name}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg min-h-[300px] flex flex-col justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {showAnswer ? 'Answer:' : 'Question:'}
            </h3>
            <p className="text-xl text-gray-700 mb-6">
              {showAnswer ? card.answer : card.question}
            </p>
            
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
              >
                Show Answer
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  How well did you know this?
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleReview('hard')}
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    <X size={16} />
                    <span>Hard</span>
                  </button>
                  <button
                    onClick={() => handleReview('medium')}
                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    <RotateCcw size={16} />
                    <span>Medium</span>
                  </button>
                  <button
                    onClick={() => handleReview('easy')}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    <Check size={16} />
                    <span>Easy</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCreateTab = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Create New Flashcard ✨
        </h3>
        <p className="text-gray-600">
          Transform your notes into memorable flashcards
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course
          </label>
          <select
            value={newCard.courseId}
            onChange={(e) => setNewCard({ ...newCard, courseId: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="">Select a course...</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question
          </label>
          <textarea
            value={newCard.question}
            onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
            placeholder="What is the question you want to remember?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Answer
          </label>
          <textarea
            value={newCard.answer}
            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
            placeholder="What is the answer or explanation?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty
          </label>
          <select
            value={newCard.difficulty}
            onChange={(e) => setNewCard({ ...newCard, difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          onClick={handleCreateCard}
          className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Create Flashcard</span>
        </button>
      </div>
    </div>
  );

  const renderManageTab = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Manage Flashcards 📚
        </h3>
        <p className="text-gray-600">Total cards: {flashcards.length}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((card) => {
          const course = courses.find(c => c.id === card.courseId);
          return (
            <div key={card.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-500">{course?.name}</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit size={14} />
                </button>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                {card.question}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Reviews: {card.reviewCount}</span>
                <span className={`px-2 py-1 rounded ${
                  card.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {card.difficulty}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-md">
          {[
            { id: 'review', label: 'Review', count: dueCards.length },
            { id: 'create', label: 'Create' },
            { id: 'manage', label: 'Manage', count: flashcards.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-2 text-xs bg-rose-200 text-rose-800 px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'review' && renderReviewTab()}
        {activeTab === 'create' && renderCreateTab()}
        {activeTab === 'manage' && renderManageTab()}
      </div>
    </div>
  );
};

export default FlashcardSystem;