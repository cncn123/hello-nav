import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { getGitHubStars } from '../utils/github';
import type { NavigationItem } from '../types/nav';
import { NavCard } from './NavCard';
import { NavSearch } from './NavSearch';
import { NavCategories } from './NavCategories';
import { ThemeToggle } from './ThemeToggle';
import { LangToggle } from './LangToggle';
import { useTranslation } from 'react-i18next';

export const NavList: React.FC = () => {
  const { t } = useTranslation();
  const { items, categories, error } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [localItems, setLocalItems] = useState<NavigationItem[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [starCounts, setStarCounts] = useState<Record<string, number>>({});

  // 更新本地数据
  useEffect(() => {
    if (items) {
      setLocalItems(items);
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    }
  }, [items, isInitialLoad]);

  // 获取 GitHub Star 数
  useEffect(() => {
    const fetchStars = async () => {
      const newStarCounts: Record<string, number> = {};
      
      for (const item of localItems) {
        if (item.url.toLowerCase().includes('github.com')) {
          console.log('Fetching stars for:', item.url);
          const stars = await getGitHubStars(item.url);
          console.log('Stars for', item.url, ':', stars);
          if (stars !== null) {
            newStarCounts[item.url] = stars;
          }
        }
      }
      
      console.log('All star counts:', newStarCounts);
      setStarCounts(newStarCounts);
    };

    fetchStars();
  }, [localItems]);

  // 过滤数据
  const filteredItems = useMemo(() => {
    if (!localItems.length) return [];
    
    return localItems.filter(item => {
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.url.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [localItems, searchQuery, selectedCategory]);

  // 按分类分组
  const groupedItems = useMemo(() => {
    const grouped: Record<string, NavigationItem[]> = {};
    filteredItems.forEach(item => {
      const category = item.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });
    return grouped;
  }, [filteredItems]);

  // 处理搜索
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="relative min-h-screen">
      {/* 标题区域 */}
      <div className="relative z-10 pt-8 pb-4">
        <h1 className="text-center font-bold tracking-tight">
          <span className="block text-4xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
            dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('subtitle')}
        </p>
      </div>

      {/* 背景装饰 */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* 基础渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white/80
          dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"></div>
        
        {/* 动态渐变球 */}
        <div className="absolute -top-[10%] -left-[10%] w-[50rem] h-[50rem] 
          bg-gradient-to-br from-blue-400/20 to-cyan-400/20 
          dark:from-blue-400/[0.04] dark:to-cyan-400/[0.04] 
          rounded-full mix-blend-multiply dark:mix-blend-plus-lighter 
          filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] -right-[5%] w-[45rem] h-[45rem] 
          bg-gradient-to-br from-purple-400/20 to-pink-400/20 
          dark:from-purple-400/[0.04] dark:to-pink-400/[0.04] 
          rounded-full mix-blend-multiply dark:mix-blend-plus-lighter 
          filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[40rem] h-[40rem] 
          bg-gradient-to-br from-pink-400/20 to-orange-400/20 
          dark:from-pink-400/[0.04] dark:to-orange-400/[0.04] 
          rounded-full mix-blend-multiply dark:mix-blend-plus-lighter 
          filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        
        {/* 图案装饰 */}
        <div className="absolute inset-0">
          {/* 点阵图案 */}
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-[length:32px_32px] opacity-40 dark:opacity-[0.06]"></div>
          
          {/* 光束效果 */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 
              bg-blue-400/20 dark:bg-blue-400/[0.03]
              rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 
              bg-purple-400/20 dark:bg-purple-400/[0.03]
              rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
          </div>
          
          {/* 渐变光晕 */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent 
            dark:from-transparent dark:via-gray-800/5 dark:to-transparent"></div>
        </div>
        
        {/* 玻璃反光效果 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 
          dark:from-white/[0.01] dark:via-transparent dark:to-white/[0.01]"></div>

        {/* 暗色模式额外装饰 */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-1000">
          {/* 星光效果 */}
          <div className="absolute inset-0">
            <div className="absolute top-[15%] left-[35%] w-1 h-1 bg-blue-400 rounded-full animate-twinkle"></div>
            <div className="absolute top-[25%] left-[65%] w-0.5 h-0.5 bg-purple-400 rounded-full animate-twinkle animation-delay-1000"></div>
            <div className="absolute top-[45%] left-[25%] w-1 h-1 bg-pink-400 rounded-full animate-twinkle animation-delay-2000"></div>
            <div className="absolute top-[65%] left-[55%] w-0.5 h-0.5 bg-orange-400 rounded-full animate-twinkle animation-delay-3000"></div>
          </div>
          
          {/* 极光效果 */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-1/2 h-1/3 
              bg-gradient-to-b from-blue-400/[0.03] via-purple-400/[0.02] to-transparent 
              rotate-12 transform-gpu animate-aurora"></div>
            <div className="absolute top-0 right-1/4 w-1/2 h-1/3 
              bg-gradient-to-b from-pink-400/[0.03] via-orange-400/[0.02] to-transparent 
              -rotate-12 transform-gpu animate-aurora animation-delay-2000"></div>
          </div>
        </div>
      </div>

      {/* 顶部导航区域 */}
      <div className="sticky top-4 z-10 mx-auto max-w-[1800px] px-4">
        <div className="relative mx-auto max-w-5xl">
          {/* 背景渐变 */}
          <div className="absolute -inset-[2px] bg-gradient-to-r 
            from-blue-500/50 via-purple-500/50 to-pink-500/50 
            dark:from-blue-400/30 dark:via-purple-400/30 dark:to-pink-400/30 
            rounded-2xl blur-lg opacity-20 transition duration-1000"></div>
          
          {/* 主容器 */}
          <div className="relative backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 
            rounded-2xl border border-white/20 dark:border-white/10 
            shadow-lg shadow-black/5 dark:shadow-black/20">
            {/* 搜索和分类区域 */}
            <div className="p-3 space-y-3">
              <div className="flex items-center gap-3">
                <NavSearch 
                  value={searchQuery} 
                  onChange={handleSearch} 
                  placeholder={t('search.placeholder')}
                />
                <ThemeToggle />
                <LangToggle />
              </div>
              <NavCategories
                categories={categories || []}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-w-[1800px] mx-auto px-4 mt-8">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className="space-y-5 mb-12">
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 
              tracking-wide pl-1 flex items-center gap-2">
              {category.toUpperCase()}
              <span className="text-sm text-gray-400 dark:text-gray-500 font-normal">
                ({categoryItems.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {categoryItems.map((item) => (
                <NavCard
                  key={item._id}
                  item={item}
                  starCount={starCounts[item.url]}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
