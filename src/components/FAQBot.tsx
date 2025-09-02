import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { FAQSection, FAQQuestion } from '../types';

interface FAQBotProps {
  onClose: () => void;
}

const FAQBot: React.FC<FAQBotProps> = ({ onClose }) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<FAQQuestion | null>(null);

  const faqSections: FAQSection[] = [
    {
      id: 'koko',
      title: 'About Koko',
      icon: '🧸',
      questions: [
        {
          id: 'who-is-koko',
          question: 'Who is Koko?',
          answer: 'Koko is your adorable study companion! He\'s a little bear who wants to become the smartest bear in the forest with your help. Every time you study, you\'re helping Koko grow stronger and smarter!'
        },
        {
          id: 'koko-story',
          question: 'What is Koko\'s story?',
          answer: 'Koko used to struggle at Bear School and was left behind when his classmates went on a trip to the Honey Forest. Now he studies with you to become smart and strong so no one will ever leave him behind again!'
        },
        {
          id: 'help-koko',
          question: 'Why does Koko need my help?',
          answer: 'Koko believes that studying together makes both of you stronger! Your study sessions are like "meals" that help Koko grow. The more you study, the happier and smarter Koko becomes!'
        },
        {
          id: 'make-koko-happy',
          question: 'How can I make Koko happy?',
          answer: 'Study regularly to maintain your streak! Complete 25-minute study sessions, set and achieve goals, and use all the study features. Koko gets excited when you earn coins and bus tickets!'
        }
      ]
    },
    {
      id: 'streaks',
      title: 'Study Streaks',
      icon: '🔥',
      questions: [
        {
          id: 'what-is-streak',
          question: 'What is a study streak?',
          answer: 'A study streak tracks how many consecutive days you\'ve completed at least one 25-minute study session. It\'s like feeding Koko every day - he gets stronger with consistency!'
        },
        {
          id: 'streaks-feed-koko',
          question: 'How do streaks feed Koko?',
          answer: 'Each day you complete a 25-minute study session, your streak increases by 1, which is like giving Koko a meal! Koko gets happier and more energetic with longer streaks.'
        },
        {
          id: 'miss-day',
          question: 'What happens if I miss a day?',
          answer: 'If you miss a day, your streak goes negative by 3 points (like owing Koko 3 meals). Don\'t worry though - you can always start fresh and get back on track!'
        },
        {
          id: 'restart-streak',
          question: 'How can I restart my streak?',
          answer: 'Simply complete a 25-minute study session! If your streak is negative, it will start climbing back up. If it\'s positive, keep the momentum going by studying daily!'
        }
      ]
    },
    {
      id: 'bus-tickets',
      title: 'Bus Ticket Collectibles',
      icon: '🎫',
      questions: [
        {
          id: 'what-are-tickets',
          question: 'What are bus tickets?',
          answer: 'Bus tickets are special collectibles that represent Koko\'s dream of visiting the Honey Forest! They\'re earned through consistent studying and represent major milestones in your learning journey.'
        },
        {
          id: 'earn-tickets',
          question: 'How do I earn a bus ticket?',
          answer: 'You earn a bus ticket for each complete week of study streaks (7 consecutive days of 25-minute sessions). It\'s like helping Koko save up for his dream trip!'
        },
        {
          id: 'see-tickets',
          question: 'Where can I see my collected tickets?',
          answer: 'Your bus tickets are displayed in Koko\'s stats section on the dashboard and in his profile display. Each ticket brings him closer to his Honey Forest adventure!'
        },
        {
          id: 'many-tickets',
          question: 'What happens when I collect many tickets?',
          answer: 'The more tickets you collect, the closer Koko gets to his dream! While he can\'t visit the Honey Forest yet, each ticket represents your amazing dedication to learning together.'
        }
      ]
    },
    {
      id: 'outfits',
      title: 'Outfit & Accessories',
      icon: '👕',
      questions: [
        {
          id: 'buy-outfits',
          question: 'How do I buy outfits for Koko?',
          answer: 'Use the coins you earn from studying! Click on Koko\'s outfit shop to browse available items. Each 25-minute study session earns you coins, and completing goals gives bonus coins!'
        },
        {
          id: 'available-outfits',
          question: 'What outfits are available?',
          answer: 'Koko can wear smart glasses, fancy hats, study backpacks, pretty bows, and even a royal crown! Each outfit gives him a unique look and shows your progress together.'
        },
        {
          id: 'outfits-affect-learning',
          question: 'Do outfits affect Koko\'s learning?',
          answer: 'Outfits are purely cosmetic but they make Koko feel special and confident! A well-dressed bear is a happy bear, and a happy Koko means a motivated study buddy!'
        }
      ]
    },
    {
      id: 'courses',
      title: 'Courses',
      icon: '📚',
      questions: [
        {
          id: 'what-are-courses',
          question: 'What are courses and how do I add them?',
          answer: 'Courses are your study subjects! Go to the Courses tab, click "Add Course", choose a name, color, icon, and optional goal. Courses help organize your study sessions and track progress by subject.'
        }
      ]
    },
    {
      id: 'study',
      title: 'Study Sessions',
      icon: '⏰',
      questions: [
        {
          id: 'study-sessions',
          question: 'How do I start studying and what does it offer?',
          answer: 'Go to the Study tab, select a course, and click "Start Focus Session". You\'ll get a 25-minute timer with note-taking space, motivational quotes every 5 minutes, and mood/focus tracking. Complete sessions to feed Koko and earn coins!'
        }
      ]
    },
    {
      id: 'daily-learning',
      title: 'Daily Learning',
      icon: '📝',
      questions: [
        {
          id: 'daily-learning-use',
          question: 'How do I use daily learning?',
          answer: 'Visit the Daily Learning tab to write what you learned each day! You can add tags, associate with courses, search past entries, and download your learning notes as text files. It\'s your personal knowledge diary!'
        }
      ]
    },
    {
      id: 'goals',
      title: 'Goals',
      icon: '🎯',
      questions: [
        {
          id: 'what-are-goals',
          question: 'What are goals and how do I add them?',
          answer: 'Goals help you stay motivated and track long-term progress! Go to Goals tab, click "Add Goal", set a title, description, target date, and optional course. Track progress with sliders and celebrate when you complete them!'
        }
      ]
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      icon: '🧠',
      questions: [
        {
          id: 'flashcards-how',
          question: 'How do I add flashcards and what are they?',
          answer: 'Flashcards help with memory and retention! Go to Flashcards tab, click "Create", add a question and answer, select difficulty and course. Review them regularly - the system uses spaced repetition to optimize your learning!'
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: '📊',
      questions: [
        {
          id: 'analytics-use',
          question: 'How do I use analytics and what is it?',
          answer: 'Analytics shows your learning insights! View your weekly study patterns, course performance, goal completion rates, and detailed statistics. It helps you understand your study habits and celebrate your progress!'
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      questions: [
        {
          id: 'settings-options',
          question: 'What can I do in settings?',
          answer: 'In Settings, you can change your display name, select from 6 beautiful themes, export/import your data, clear all data, and logout. Your data is saved locally in your browser!'
        }
      ]
    },
    {
      id: 'using-site',
      title: 'Using This Site',
      icon: '💻',
      questions: [
        {
          id: 'start-session',
          question: 'How do I start a study session?',
          answer: 'First add a course, then go to Study tab, select your course, and click "Start Focus Session". Use the 25-minute timer while taking notes, then save your session with mood and focus ratings!'
        },
        {
          id: 'track-progress',
          question: 'How do I track my progress?',
          answer: 'Check your Dashboard for overview stats, visit Analytics for detailed insights, monitor your streak with Koko, and review your goals progress. Everything is tracked automatically as you study!'
        },
        {
          id: 'logout',
          question: 'How do I log out?',
          answer: 'Go to Settings tab and click the "Logout" button at the bottom. Don\'t worry - all your data is saved locally and will be there when you log back in!'
        },
        {
          id: 'data-saved',
          question: 'Is my data saved if I change devices?',
          answer: 'Data is saved locally in your browser. To transfer to another device, export your data from Settings and import it on the new device. Always backup important data!'
        }
      ]
    }
  ];

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(selectedSection === sectionId ? null : sectionId);
    setSelectedQuestion(null);
  };

  const handleQuestionClick = (question: FAQQuestion) => {
    setSelectedQuestion(question);
  };

  const handleBackToSections = () => {
    setSelectedQuestion(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-4 border-blue-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🤖</div>
              <div>
                <h2 className="text-xl font-bold">Koko's Help Center</h2>
                <p className="text-blue-100 text-sm">I'm here to help you learn everything about our study app!</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Help Topics</h3>
              <div className="space-y-2">
                {faqSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                      selectedSection === section.id
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{section.icon}</span>
                      <span className="font-medium text-sm">{section.title}</span>
                    </div>
                    <ChevronRight 
                      size={16} 
                      className={`transform transition-transform duration-200 ${
                        selectedSection === section.id ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {selectedQuestion ? (
              /* Question Answer View */
              <div className="p-6">
                <button
                  onClick={handleBackToSections}
                  className="text-blue-600 hover:text-blue-800 mb-4 flex items-center space-x-2"
                >
                  <ChevronRight size={16} className="transform rotate-180" />
                  <span>Back to questions</span>
                </button>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedQuestion.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedQuestion.answer}</p>
                </div>
              </div>
            ) : selectedSection ? (
              /* Questions List View */
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{faqSections.find(s => s.id === selectedSection)?.icon}</span>
                    <h3 className="text-xl font-bold text-gray-800">
                      {faqSections.find(s => s.id === selectedSection)?.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">Click on any question to see the answer:</p>
                </div>
                <div className="space-y-3">
                  {faqSections.find(s => s.id === selectedSection)?.questions.map((question) => (
                    <button
                      key={question.id}
                      onClick={() => handleQuestionClick(question)}
                      className="w-full text-left p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{question.question}</span>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Welcome View */
              <div className="p-6 text-center">
                <div className="text-6xl mb-4">🧸</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Hi! I'm Koko!</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  I'm here to help you understand everything about our study app! 
                  Select a topic from the left to get started, or ask me anything about studying together!
                </p>
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-xl border-2 border-amber-200 max-w-md mx-auto">
                  <p className="text-amber-800 italic">
                    "Every question you ask helps both of us learn something new! 🌟"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQBot;