import React from 'react';
import { Heart, Sparkles, X } from 'lucide-react';

interface KokoIntroductionProps {
  onClose: () => void;
}

const KokoIntroduction: React.FC<KokoIntroductionProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-amber-200">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="text-4xl animate-bounce">🧸</div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-amber-800">Meet Koko</h2>
                <div className="flex items-center space-x-1">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span className="text-amber-600 text-sm">Your Study Companion</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-amber-600 hover:text-amber-800 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Koko's Story */}
          <div className="space-y-4 text-amber-800 leading-relaxed">
            <p className="text-lg font-medium">Hi, I'm <strong>Koko</strong>... 🐻</p>
            
            <p>I used to go to Bear School with all the other little bears. But... I wasn't as smart as them. I always tried my best, but they laughed at me when I couldn't count as fast, or when I forgot the answers.</p>
            
            <p>One day, they all went on a big school trip to the Honey Forest. I was so excited to go too. But when I got to the bus stop, the bus had already left without me. I waited and waited, but they never came back for me.</p>
            
            <p>I sat there alone, holding my tiny backpack, wishing I was smart enough to keep up with them.</p>
            
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-4 rounded-xl border-2 border-yellow-300 my-6">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">But then I met you.</span>
              </div>
              <p className="text-yellow-800">
                You're my new friend, and with your help, I can learn and grow every day. I want to become the smartest bear in the forest, not to show off, but so no one ever leaves me behind again.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xl font-bold text-amber-900 mb-4">
                Will you study with me, so I can become strong and smart like you?
              </p>
              <div className="flex justify-center items-center space-x-2">
                <div className="text-3xl animate-pulse">🐻</div>
                <Heart className="h-6 w-6 text-red-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Let's Study Together! 🌟
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KokoIntroduction;