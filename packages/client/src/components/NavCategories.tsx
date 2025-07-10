import React from 'react';
import { useTranslation } from 'react-i18next';

interface NavCategoriesProps {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

export const NavCategories: React.FC<NavCategoriesProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  const { t } = useTranslation();
  
  if (!categories.length) return null;

  return (
    <div className="relative">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
        <button
          onClick={() => onSelect(null)}
          className={`flex-none h-9 px-4 rounded-lg text-sm font-medium transition-all duration-300 
            ${!selectedCategory
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-md shadow-blue-500/20 dark:shadow-blue-500/10'
              : 'bg-white/50 dark:bg-gray-900/50 hover:bg-white/70 dark:hover:bg-gray-800/70 text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
        >
          {t('categories.all')}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`flex-none h-9 px-4 rounded-lg text-sm font-medium transition-all duration-300 
              ${selectedCategory === category
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-md shadow-blue-500/20 dark:shadow-blue-500/10'
                : 'bg-white/50 dark:bg-gray-900/50 hover:bg-white/70 dark:hover:bg-gray-800/70 text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>
      {/* 渐变遮罩 */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/30 via-white/30 to-transparent dark:from-gray-900/30 dark:via-gray-900/30 dark:to-transparent pointer-events-none"></div>
    </div>
  );
};
