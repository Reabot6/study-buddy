import React, { useEffect } from 'react';
import { X, Shield, Zap } from 'lucide-react';

interface ChampionNotificationProps {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const ChampionNotification: React.FC<ChampionNotificationProps> = ({
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

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-slate-800 to-gray-800',
          border: 'border-slate-600',
          text: 'text-gray-200',
          icon: '⚡'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-orange-900 to-red-900',
          border: 'border-orange-600',
          text: 'text-orange-200',
          icon: '🔥'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-900 to-pink-900',
          border: 'border-red-600',
          text: 'text-red-200',
          icon: '💥'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-slate-800 to-gray-800',
          border: 'border-slate-600',
          text: 'text-gray-200',
          icon: '🎯'
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
              <Shield className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-semibold text-gray-300">
                Champion Alert
              </span>
            </div>
            <p className={`text-sm ${styles.text} leading-relaxed`}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-500 hover:text-gray-300 transition-colors duration-200"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <Zap className="h-4 w-4 text-slate-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ChampionNotification;