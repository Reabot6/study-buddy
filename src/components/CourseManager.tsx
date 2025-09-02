import React, { useState } from 'react';
import { Plus, Edit, Trash2, BookOpen, Target } from 'lucide-react';
import { Course } from '../types';
import EmptyState from './EmptyState';

interface CourseManagerProps {
  courses: Course[];
  onCourseAdd: (course: Omit<Course, 'id' | 'totalSessions' | 'totalMinutes'>) => void;
  onCourseUpdate: (id: string, updates: Partial<Course>) => void;
  onCourseDelete: (id: string) => void;
}

const CourseManager: React.FC<CourseManagerProps> = ({
  courses,
  onCourseAdd,
  onCourseUpdate,
  onCourseDelete,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    color: 'rose',
    icon: '📚',
    goal: '',
  });

  const colors = [
    { name: 'rose', label: 'Rose', class: 'bg-rose-500' },
    { name: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { name: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { name: 'green', label: 'Green', class: 'bg-green-500' },
    { name: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
    { name: 'pink', label: 'Pink', class: 'bg-pink-500' },
  ];

  const icons = ['📚', '🧬', '⚗️', '🫀', '🧠', '💊', '🔬', '📊', '🎨', '🌟'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCourse) {
      onCourseUpdate(editingCourse.id, formData);
      setEditingCourse(null);
    } else {
      onCourseAdd(formData);
    }

    setFormData({ name: '', color: 'rose', icon: '📚', goal: '' });
    setShowForm(false);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      color: course.color,
      icon: course.icon,
      goal: course.goal || '',
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCourse(null);
    setFormData({ name: '', color: 'rose', icon: '📚', goal: '' });
  };

  if (courses.length === 0 && !showForm) {
    return <EmptyState type="courses" onAction={() => setShowForm(true)} />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Courses 📚</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Course</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editingCourse ? 'Edit Course' : 'Add New Course'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Biochemistry"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal (Optional)
                </label>
                <input
                  type="text"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  placeholder="e.g., Master molecular mechanisms"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme
              </label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: color.name })}
                    className={`w-8 h-8 rounded-full ${color.class} ${
                      formData.color === color.name ? 'ring-2 ring-gray-400' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <div className="flex space-x-2 flex-wrap">
                {icons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`w-10 h-10 text-xl border rounded-lg hover:bg-gray-50 ${
                      formData.icon === icon ? 'border-rose-500 bg-rose-50' : 'border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
              >
                {editingCourse ? 'Update Course' : 'Add Course'}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-${course.color}-500 rounded-lg flex items-center justify-center text-white text-xl`}>
                  {course.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{course.name}</h3>
                  {course.goal && (
                    <p className="text-sm text-gray-600 flex items-center">
                      <Target size={12} className="mr-1" />
                      {course.goal}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onCourseDelete(course.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Sessions:</span>
                <span className="font-medium">{course.totalSessions}</span>
              </div>
              <div className="flex justify-between">
                <span>Study Time:</span>
                <span className="font-medium">{Math.round(course.totalMinutes / 60)}h {course.totalMinutes % 60}m</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManager;