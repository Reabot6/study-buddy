import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface MobileNotificationProps {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  gender: 'male' | 'female';
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const MobileNotification: React.FC<MobileNotificationProps> = ({
  message,
  type,
  gender,
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

  const isMale = gender === 'male';

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: isMale ? 'bg-slate-800 border-slate-600' : 'bg-green-50 border-green-200',
          text: isMale ? 'text-gray-200' : 'text-green-800',
          icon: CheckCircle,
          iconColor: isMale ? 'text-green-400' : 'text-green-500'
        };
      case 'warning':
        return {
          bg: isMale ? 'bg-orange-900 border-orange-700' : 'bg-yellow-50 border-yellow-200',
          text: isMale ? 'text-orange-200' : 'text-yellow-800',
          icon: AlertTriangle,
          iconColor: isMale ? 'text-orange-400' : 'text-yellow-500'
        };
      case 'error':
        return {
          bg: isMale ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200',
          text: isMale ? 'text-red-200' : 'text-red-800',
          icon: AlertCircle,
          iconColor: isMale ? 'text-red-400' : 'text-red-500'
        };
      default:
        return {
          bg: isMale ? 'bg-slate-800 border-slate-600' : 'bg-blue-50 border-blue-200',
          text: isMale ? 'text-gray-200' : 'text-blue-800',
          icon: Info,
          iconColor: isMale ? 'text-blue-400' : 'text-blue-500'
        };
    }
  };

  const styles = getTypeStyles();
  const Icon = styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      className={`${styles.bg} border-2 rounded-xl shadow-lg p-4 mx-auto max-w-sm`}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`h-5 w-5 mt-0.5 ${styles.iconColor}`} />
        <div className="flex-1">
          <p className={`text-sm font-medium ${styles.text} leading-relaxed`}>
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className={`${isMale ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors duration-200`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default MobileNotification;