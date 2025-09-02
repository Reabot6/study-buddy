import React, { useState } from 'react';
import { Plus, Edit, Trash2, Target, Calendar, CheckCircle } from 'lucide-react';
import { Goal, Course } from '../types';
import EmptyState from './EmptyState';

interface GoalManagerProps {
  goals: Goal[];
  courses: Course[];
  onGoalAdd: (goal: Omit<Goal, 'id'>) => void;
  onGoalUpdate: (id: string, updates: Partial<Goal>) => void;
  onGoalDelete: (id: string) => void;
}

const GoalManager: React.FC<GoalManagerProps> = ({
  goals,
  courses,
  onGoalAdd,
  onGoalUpdate,
  onGoalDelete,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetDate: '',
    courseId: '',
    progress: 0,
  });

  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.targetDate) return;

    const goalData = {
      ...formData,
      completed: false,
      courseId: formData.courseId || undefined,
    };

    if (editingGoal) {
      onGoalUpdate(editingGoal.id, goalData);
      setEditingGoal(null);
    } else {
      onGoalAdd(goalData);
    }

    setFormData({ title: '', description: '', targetDate: '', courseId: '', progress: 0 });
    setShowForm(false);
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description,
      targetDate: goal.targetDate,
      courseId: goal.courseId || '',
      progress: goal.progress,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingGoal(null);
    setFormData({ title: '', description: '', targetDate: '', courseId: '', progress: 0 });
  };

  const toggleGoalCompletion = (goal: Goal) => {
    onGoalUpdate(goal.id, { 
      completed: !goal.completed,
      progress: goal.completed ? goal.progress : 100
    });
  };

  const updateProgress = (goalId: string, progress: number) => {
    onGoalUpdate(goalId, { progress });
  };

  if (goals.length === 0 && !showForm) {
    return <EmptyState type="goals" onAction={() => setShowForm(true)} />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Goals 🎯</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Goal</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editingGoal ? 'Edit Goal' : 'Add New Goal'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Complete Chapter 3 of Biochemistry"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your goal in detail..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Date
                </label>
                <input
                  type="date"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Course (Optional)
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">No specific course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {editingGoal && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progress: {formData.progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
              >
                {editingGoal ? 'Update Goal' : 'Add Goal'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeGoals.map((goal) => {
              const course = courses.find(c => c.id === goal.courseId);
              const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={goal.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{goal.title}</h4>
                      {goal.description && (
                        <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                      )}
                      {course && (
                        <span className={`inline-block px-2 py-1 text-xs rounded-full bg-${course.color}-100 text-${course.color}-800`}>
                          {course.name}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => toggleGoalCompletion(goal)}
                        className="text-gray-400 hover:text-green-600 transition-colors duration-200"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(goal)}
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onGoalDelete(goal.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        Due: {new Date(goal.targetDate).toLocaleDateString()}
                      </span>
                      <span className={`font-medium ${daysLeft < 0 ? 'text-red-600' : daysLeft < 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Completed Goals 🎉</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedGoals.map((goal) => {
              const course = courses.find(c => c.id === goal.courseId);
              
              return (
                <div key={goal.id} className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1 line-through">{goal.title}</h4>
                      {goal.description && (
                        <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                      )}
                      {course && (
                        <span className={`inline-block px-2 py-1 text-xs rounded-full bg-${course.color}-100 text-${course.color}-800`}>
                          {course.name}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => toggleGoalCompletion(goal)}
                        className="text-green-600 hover:text-gray-600 transition-colors duration-200"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button
                        onClick={() => onGoalDelete(goal.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    ✅ Completed!
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalManager;