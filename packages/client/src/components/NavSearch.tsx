import React from 'react';

interface NavSearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NavSearch: React.FC<NavSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="搜索导航项..."
        value={value}
        onChange={onChange}
        className="w-full pl-11 pr-4 h-11 
          bg-white/50 dark:bg-gray-900/50 
          backdrop-blur-xl rounded-xl 
          border border-white/20 dark:border-white/10
          focus:outline-none focus:ring-2 
          focus:ring-blue-500/30 dark:focus:ring-blue-400/30 
          focus:border-blue-500/30 dark:focus:border-blue-400/30
          transition-all duration-300 
          placeholder-gray-400/80 dark:placeholder-gray-500/80
          text-gray-700 dark:text-gray-200"
      />
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 
          text-gray-400/80 dark:text-gray-500/80 
          transition-colors duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};
