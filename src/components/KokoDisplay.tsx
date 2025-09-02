import React from 'react';
import { Coins, Ticket, ShoppingBag } from 'lucide-react';
import { KokoData } from '../types';

interface KokoDisplayProps {
  kokoData: KokoData;
  onOutfitShop: () => void;
}

const KokoDisplay: React.FC<KokoDisplayProps> = ({ kokoData, onOutfitShop }) => {
  const getKokoEmoji = () => {
    const outfitEmojis: { [key: string]: string } = {
      'default': '🧸',
      'glasses': '🤓🧸',
      'hat': '🎩🧸',
      'backpack': '🎒🧸',
      'bow': '🎀🧸',
      'crown': '👑🧸'
    };
    return outfitEmojis[kokoData.currentOutfit] || '🧸';
  };

  const getEmotionalEmoji = () => {
    switch (kokoData.emotionalState) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'excited': return '🤩';
      case 'sleepy': return '😴';
      case 'proud': return '🥰';
      default: return '😊';
    }
  };

  const getMotivationalPhrase = () => {
    const phrases = [
      "Thank you for helping me today. I feel smarter already! 🧠✨",
      "One page at a time, we're growing stronger together.",
      "I believe in you... and I hope you believe in me too. 💛",
      "Even when it's hard, we'll keep going, right?",
      "I want to make you proud today!",
      "Every study session makes me a little braver! 🌟",
      "Together, we can reach the Honey Forest! 🍯",
      "You're the best study buddy a bear could ask for! 🐻💕"
    ];
    
    const today = new Date().toDateString();
    const phraseIndex = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % phrases.length;
    return phrases[phraseIndex];
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-4 rounded-xl border-2 border-amber-200 shadow-md">
      {/* Koko Display */}
      <div className="text-center mb-4">
        <div className="relative inline-block">
          <div className="text-6xl animate-bounce mb-2">
            {getKokoEmoji()}
          </div>
          <div className="absolute -top-2 -right-2 text-2xl animate-pulse">
            {getEmotionalEmoji()}
          </div>
        </div>
        <h3 className="font-bold text-amber-800 text-lg">Koko</h3>
        <p className="text-sm text-amber-600 italic">"{getMotivationalPhrase()}"</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white p-2 rounded-lg text-center border border-amber-200">
          <Coins className="h-4 w-4 text-yellow-600 mx-auto mb-1" />
          <div className="text-xs text-amber-800 font-medium">{kokoData.funds}</div>
          <div className="text-xs text-amber-600">Coins</div>
        </div>
        <div className="bg-white p-2 rounded-lg text-center border border-amber-200">
          <Ticket className="h-4 w-4 text-blue-600 mx-auto mb-1" />
          <div className="text-xs text-amber-800 font-medium">{kokoData.busTickets}</div>
          <div className="text-xs text-amber-600">Tickets</div>
        </div>
        <div className="bg-white p-2 rounded-lg text-center border border-amber-200">
          <ShoppingBag className="h-4 w-4 text-purple-600 mx-auto mb-1" />
          <div className="text-xs text-amber-800 font-medium">{kokoData.outfits.length}</div>
          <div className="text-xs text-amber-600">Outfits</div>
        </div>
      </div>

      {/* Shop Button */}
      <button
        onClick={onOutfitShop}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm"
      >
        🛍️ Outfit Shop
      </button>
    </div>
  );
};

export default KokoDisplay;