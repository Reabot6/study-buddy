import React from 'react';
import { Coins, Ticket, ShoppingBag } from 'lucide-react';
import { MaxData } from '../types';

interface MaxDisplayProps {
  maxData: MaxData;
  onOutfitShop: () => void;
}

const MaxDisplay: React.FC<MaxDisplayProps> = ({ maxData, onOutfitShop }) => {
  const getMaxEmoji = () => {
    const outfitEmojis: { [key: string]: string } = {
      'default': '🐺',
      'glasses': '🤓🐺',
      'hat': '🎩🐺',
      'backpack': '🎒🐺',
      'bow': '🎀🐺', // Bandana for male
      'crown': '👑🐺'
    };
    return outfitEmojis[maxData.currentOutfit] || '🐺';
  };

  const getEmotionalEmoji = () => {
    switch (maxData.emotionalState) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'excited': return '🤩';
      case 'sleepy': return '😴';
      case 'proud': return '💪';
      default: return '😊';
    }
  };

  const getMotivationalPhrase = () => {
    const phrases = [
      "Thanks for training with me today. I feel stronger already! 💪⚡",
      "One challenge at a time, we're becoming unstoppable together.",
      "I believe in you... and I hope you believe in me too. 🔥",
      "Even when it's tough, we'll keep pushing forward, right?",
      "I want to make you proud today!",
      "Every study session makes me a little braver! ⚡",
      "Together, we can conquer any challenge! 🏔️",
      "You're the best training partner a wolf could ask for! 🐺💙"
    ];
    
    const today = new Date().toDateString();
    const phraseIndex = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % phrases.length;
    return phrases[phraseIndex];
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border-2 border-blue-200 shadow-md">
      {/* Max Display */}
      <div className="text-center mb-4">
        <div className="relative inline-block">
          <div className="text-6xl animate-bounce mb-2">
            {getMaxEmoji()}
          </div>
          <div className="absolute -top-2 -right-2 text-2xl animate-pulse">
            {getEmotionalEmoji()}
          </div>
        </div>
        <h3 className="font-bold text-blue-800 text-lg">Max</h3>
        <p className="text-sm text-blue-600 italic">"{getMotivationalPhrase()}"</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white p-2 rounded-lg text-center border border-blue-200">
          <Coins className="h-4 w-4 text-yellow-600 mx-auto mb-1" />
          <div className="text-xs text-blue-800 font-medium">{maxData.funds}</div>
          <div className="text-xs text-blue-600">Coins</div>
        </div>
        <div className="bg-white p-2 rounded-lg text-center border border-blue-200">
          <Ticket className="h-4 w-4 text-indigo-600 mx-auto mb-1" />
          <div className="text-xs text-blue-800 font-medium">{maxData.busTickets}</div>
          <div className="text-xs text-blue-600">Tickets</div>
        </div>
        <div className="bg-white p-2 rounded-lg text-center border border-blue-200">
          <ShoppingBag className="h-4 w-4 text-purple-600 mx-auto mb-1" />
          <div className="text-xs text-blue-800 font-medium">{maxData.outfits.length}</div>
          <div className="text-xs text-blue-600">Gear</div>
        </div>
      </div>

      {/* Shop Button */}
      <button
        onClick={onOutfitShop}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm"
      >
        🛍️ Gear Shop
      </button>
    </div>
  );
};

export default MaxDisplay;