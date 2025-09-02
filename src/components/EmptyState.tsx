import React from 'react';
import { BookOpen, Target, Brain, Plus } from 'lucide-react';

interface EmptyStateProps {
  type: 'courses' | 'sessions' | 'goals' | 'flashcards';
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, onAction }) => {
  const configs = {
    courses: {
      icon: BookOpen,
      title: "No courses yet!",
      description: "Add your first course to start your learning journey",
      actionText: "Add Course",
      color: "rose"
    },
    sessions: {
      icon: BookOpen,
      title: "No study sessions yet!",
      description: "Start your first study session to begin building your streak",
      actionText: "Start Studying",
      color: "purple"
    },
    goals: {
      icon: Target,
      title: "No goals set yet!",
      description: "Set your first goal to stay motivated and track progress",
      actionText: "Set Goal",
      color: "green"
    },
    flashcards: {
      icon: Brain,
      title: "No flashcards yet!",
      description: "Create flashcards to boost your memory and retention",
      actionText: "Create Flashcard",
      color: "blue"
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="text-center py-12">
      <div className={`bg-${config.color}-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center`}>
        <Icon className={`h-12 w-12 text-${config.color}-500`} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {config.title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {config.description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className={`bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 hover:from-${config.color}-600 hover:to-${config.color}-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 mx-auto`}
        >
          <Plus size={20} />
          <span>{config.actionText}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;