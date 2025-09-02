import React, { useEffect } from 'react';
import { X, Crown, Sparkles } from 'lucide-react';

interface MessageNotificationProps {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const MessageNotification: React.FC<MessageNotificationProps> = ({
  message,
  type,
  onClose,
  autoClose = true,
  duration = 3000
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  // Get user gender from localStorage or context
  const getUserGender = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.user_metadata?.gender || 'female';
  };

  const gender = getUserGender();

  const getTypeStyles = () => {
    const baseStyles = {
      success: {
        icon: gender === 'male' ? '⚡' : '✨'
      },
      warning: {
        icon: gender === 'male' ? '🔥' : '⚠️'
      },
      error: {
        icon: gender === 'male' ? '💥' : '💔'
      },
      info: {
        icon: gender === 'male' ? '🎯' : '👑'
      }
    };

    switch (type) {
      case 'success':
        return {
          bg: gender === 'male' 
            ? 'bg-gradient-to-r from-slate-800 to-gray-800' 
            : 'bg-gradient-to-r from-green-100 to-emerald-100',
          border: gender === 'male' ? 'border-slate-600' : 'border-green-300',
          text: gender === 'male' ? 'text-gray-200' : 'text-green-800',
          icon: baseStyles.success.icon
        };
      case 'warning':
        return {
          bg: gender === 'male' 
            ? 'bg-gradient-to-r from-orange-900 to-red-900' 
            : 'bg-gradient-to-r from-yellow-100 to-orange-100',
          border: gender === 'male' ? 'border-orange-600' : 'border-yellow-300',
          text: gender === 'male' ? 'text-orange-200' : 'text-yellow-800',
          icon: baseStyles.warning.icon
        };
      case 'error':
        return {
          bg: gender === 'male' 
            ? 'bg-gradient-to-r from-red-900 to-pink-900' 
            : 'bg-gradient-to-r from-red-100 to-pink-100',
          border: gender === 'male' ? 'border-red-600' : 'border-red-300',
          text: gender === 'male' ? 'text-red-200' : 'text-red-800',
          icon: baseStyles.error.icon
        };
      default:
        return {
          bg: gender === 'male' 
            ? 'bg-gradient-to-r from-slate-800 to-gray-800' 
            : 'bg-gradient-to-r from-purple-100 to-pink-100',
          border: gender === 'male' ? 'border-slate-600' : 'border-purple-300',
          text: gender === 'male' ? 'text-gray-200' : 'text-purple-800',
          icon: baseStyles.info.icon
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className={`${styles.bg} ${styles.border} border-2 rounded-xl shadow-lg p-4 max-w-sm mx-auto`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="text-2xl">{styles.icon}</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <Crown className={`h-4 w-4 ${gender === 'male' ? 'text-slate-400' : 'text-purple-600'}`} />
              <span className={`text-sm font-semibold ${gender === 'male' ? 'text-gray-300' : 'text-purple-800'}`}>
                {gender === 'male' ? 'Champion Notification' : 'Princess Notification'}
              </span>
            </div>
            <p className={`text-sm ${styles.text} leading-relaxed`}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`flex-shrink-0 ${gender === 'male' ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors duration-200`}
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <Sparkles className={`h-4 w-4 ${gender === 'male' ? 'text-slate-400' : 'text-purple-400'} animate-pulse`} />
        </div>
      </div>
    </div>
  );
};

export default MessageNotification;