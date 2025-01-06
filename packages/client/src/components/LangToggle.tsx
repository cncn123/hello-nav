import React from 'react';
import { useTranslation } from 'react-i18next';

export const LangToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl
        hover:bg-white/20 active:bg-white/30
        dark:bg-gray-800/20 dark:hover:bg-gray-800/30 dark:active:bg-gray-800/40
        transition-all duration-300
        border border-white/20 dark:border-white/10
        shadow-lg shadow-black/5
        group"
      aria-label={`Switch to ${i18n.language === 'zh' ? 'English' : '中文'}`}
    >
      {/* English text */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500
        ${i18n.language === 'zh' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
        <span className="text-sm font-medium text-violet-500">EN</span>
      </div>
      
      {/* Chinese text */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500
        ${i18n.language === 'en' ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
        <span className="text-sm font-medium text-emerald-500">中</span>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/20 to-violet-600/20 
        dark:from-emerald-400/20 dark:to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};
