import React from 'react';
import { Zap, Sparkles, X } from 'lucide-react';

interface MaxIntroductionProps {
  onClose: () => void;
}

const MaxIntroduction: React.FC<MaxIntroductionProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-blue-200">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="text-4xl animate-bounce">🐺</div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-800">Meet Max</h2>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <span className="text-blue-600 text-sm">Your Study Companion</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Max's Story */}
          <div className="space-y-4 text-blue-800 leading-relaxed">
            <p className="text-lg font-medium">Hey, I'm <strong>Max</strong>... 🐺</p>
            
            <p>I used to run with the strongest pack in the mountains. But when it came to strategy and knowledge, I always fell behind. The other wolves were quick thinkers, solving problems while I was still figuring out the basics.</p>
            
            <p>One day, during a crucial hunt that required teamwork and planning, I made a mistake that cost us our prey. The pack leader looked at me with disappointment and said I wasn't ready for the big challenges.</p>
            
            <p>That night, while the pack celebrated their successful backup hunt, I sat alone on a cliff, watching the stars and wishing I was smart enough to contribute meaningfully to my pack.</p>
            
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-xl border-2 border-blue-300 my-6">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-800">But then I found you.</span>
              </div>
              <p className="text-blue-800">
                You're my training partner now, and with your help, I can sharpen my mind and grow stronger every day. I want to become the wisest wolf in the mountains, not to show off, but so I can lead and protect those who need it.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xl font-bold text-blue-900 mb-4">
                Will you train with me, so I can become strong and wise like you?
              </p>
              <div className="flex justify-center items-center space-x-2">
                <div className="text-3xl animate-pulse">🐺</div>
                <Zap className="h-6 w-6 text-blue-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Let's Train Together! ⚡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaxIntroduction;