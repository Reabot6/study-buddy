import React from 'react';
import { X, Coins, Check } from 'lucide-react';
import { MaxData } from '../types';

interface MaxOutfitShopProps {
  maxData: MaxData;
  onClose: () => void;
  onPurchase: (outfitId: string, cost: number) => void;
  onEquip: (outfitId: string) => void;
}

const MaxOutfitShop: React.FC<MaxOutfitShopProps> = ({ maxData, onClose, onPurchase, onEquip }) => {
  const outfits = [
    { id: 'glasses', name: 'Tactical Glasses', emoji: '🤓', cost: 50, description: 'For the strategic wolf!' },
    { id: 'hat', name: 'Alpha Cap', emoji: '🎩', cost: 75, description: 'Lead with confidence!' },
    { id: 'backpack', name: 'Training Pack', emoji: '🎒', cost: 100, description: 'Carry all your gear!' },
    { id: 'bow', name: 'Battle Bandana', emoji: '🎀', cost: 60, description: 'Ready for action!' },
    { id: 'crown', name: 'Champion Crown', emoji: '👑', cost: 200, description: 'For the ultimate warrior!' }
  ];

  const canAfford = (cost: number) => maxData.funds >= cost;
  const isOwned = (outfitId: string) => maxData.outfits.includes(outfitId);
  const isEquipped = (outfitId: string) => maxData.currentOutfit === outfitId;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-blue-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-blue-800">🛍️ Max's Gear Shop</h2>
              <div className="flex items-center space-x-2 mt-1">
                <Coins className="h-4 w-4 text-yellow-600" />
                <span className="text-blue-600 font-medium">{maxData.funds} coins</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Current Outfit */}
          <div className="bg-white p-4 rounded-xl border-2 border-blue-200 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Currently Equipped:</h3>
            <div className="flex items-center space-x-3">
              <div className="text-4xl">
                {maxData.currentOutfit === 'default' ? '🐺' : 
                 maxData.currentOutfit === 'glasses' ? '🤓🐺' :
                 maxData.currentOutfit === 'hat' ? '🎩🐺' :
                 maxData.currentOutfit === 'backpack' ? '🎒🐺' :
                 maxData.currentOutfit === 'bow' ? '🎀🐺' :
                 maxData.currentOutfit === 'crown' ? '👑🐺' : '🐺'}
              </div>
              <div>
                <p className="font-medium text-blue-800">
                  {maxData.currentOutfit === 'default' ? 'Default Look' : 
                   outfits.find(o => o.id === maxData.currentOutfit)?.name || 'Default Look'}
                </p>
              </div>
            </div>
          </div>

          {/* Outfit Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {outfits.map((outfit) => (
              <div key={outfit.id} className="bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">{outfit.emoji}🐺</div>
                  <h4 className="font-semibold text-gray-800">{outfit.name}</h4>
                  <p className="text-sm text-gray-600">{outfit.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Coins className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-gray-800">{outfit.cost}</span>
                  </div>
                  
                  {isOwned(outfit.id) ? (
                    isEquipped(outfit.id) ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Check size={16} />
                        <span className="text-sm font-medium">Equipped</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onEquip(outfit.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
                      >
                        Equip
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => canAfford(outfit.cost) && onPurchase(outfit.id, outfit.cost)}
                      disabled={!canAfford(outfit.cost)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        canAfford(outfit.cost)
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Buy
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Default Outfit Option */}
          <div className="mt-4">
            <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">🐺</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Default Look</h4>
                    <p className="text-sm text-gray-600">Classic Max</p>
                  </div>
                </div>
                {maxData.currentOutfit === 'default' ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Check size={16} />
                    <span className="text-sm font-medium">Equipped</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onEquip('default')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Equip
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaxOutfitShop;