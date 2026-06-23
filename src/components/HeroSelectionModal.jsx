import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { getLocalHeroes } from '../utils/mockData';

const HeroSelectionModal = ({ isOpen, onClose, onSelectHero, currentHeroId }) => {
  const [heroes, setHeroes] = useState([]);
  const [selectedId, setSelectedId] = useState(currentHeroId);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const allHeroes = getLocalHeroes();
        setHeroes(allHeroes.filter(h => h.status === 'Active'));
        setSelectedId(currentHeroId);
      }, 0);
    }
  }, [isOpen, currentHeroId]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onSelectHero(selectedId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl mx-auto overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700 bg-gradient-to-r from-orange-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Your Hero</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select an instructor style for this course.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-white/50 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroes.map((hero) => {
              const isSelected = selectedId === hero.id;
              return (
                <div 
                  key={hero.id}
                  onClick={() => setSelectedId(hero.id)}
                  className={`
                    relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                    ${isSelected 
                      ? 'ring-4 ring-brand-orange shadow-lg bg-orange-50 dark:bg-orange-900/20' 
                      : 'bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700 hover:border-brand-orange-light'
                    }
                  `}
                >
                  {/* Image Header */}
                  <div className="h-48 overflow-hidden relative">
                    {hero.image ? (
                      <img 
                        src={hero.image} 
                        alt={hero.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 bg-brand-orange text-white p-1.5 rounded-full shadow-lg transform scale-110 animate-bounce">
                        <Check className="w-5 h-5" />
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-lg font-bold text-white truncate">{hero.name}</h4>
                      <p className="text-sm text-gray-200 truncate">{hero.title}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 min-h-[2.5rem]">
                      {hero.bio || 'No bio available.'}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t dark:border-gray-700">
                      {hero.tags && hero.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {heroes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No heroes available right now.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedId}
            className="px-5 py-2.5 text-sm font-medium text-white bg-brand-orange rounded-lg hover:bg-brand-orange-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Confirm Selection
          </button>
        </div>

      </div>
    </div>
  );
};

export default HeroSelectionModal;
