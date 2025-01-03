import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import type { NavigationItem } from '../types/nav';

const getIconUrl = (icon: string) => {
  if (!icon) return null;
  if (icon.startsWith('http')) return icon;
  return `/icons/${icon}`;
};

const getThumbnailUrl = (url: string) => {
  // 使用 Automattic/mShots
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=720&h=540`;
};

const getPlaceholderImage = (title: string) => {
  // 生成渐变背景的占位图
  const colors = ['4F46E5', '7C3AED', 'DB2777', 'DC2626', 'D97706', '059669'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `https://via.placeholder.com/720x540/${color}/ffffff?text=${encodeURIComponent(title.charAt(0))}`;
};

export const NavList: React.FC = () => {
  const { items, categories, error } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [localItems, setLocalItems] = useState<NavigationItem[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 更新本地数据
  useEffect(() => {
    if (items) {
      setLocalItems(items);
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    }
  }, [items, isInitialLoad]);

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
    <div className="space-y-8">
      {/* 顶部导航区域 */}
      <div className="sticky top-4 z-10 mx-auto max-w-[1800px] px-4">
        <div className="relative group mx-auto max-w-2xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative backdrop-blur-xl bg-white/30 rounded-2xl border border-white/20 shadow-lg shadow-black/5 overflow-hidden transition-all duration-300">
            <div className="flex items-center p-2">
              {/* 网站标题 */}
              <h1 className="flex-shrink-0 px-3 py-1">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
                  Bobby's Space
                </span>
              </h1>

              {/* 分隔线 */}
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300/20 to-transparent mx-2"></div>

              {/* 搜索框 */}
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="搜索导航项..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 
                    focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent 
                    transition-all duration-300 placeholder-gray-400
                    text-gray-700"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-300 group-hover:text-gray-500"
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
            </div>
          </div>
        </div>
      </div>

      {/* 分类列表 */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 mt-8 max-w-[1800px] mx-auto">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-xl ${
              !selectedCategory
                ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/20 border border-white/20 scale-105'
                : 'bg-white/10 text-gray-600 hover:bg-white/20 border border-white/10 hover:scale-105'
            }`}
          >
            全部
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-xl ${
                selectedCategory === category
                  ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/20 border border-white/20 scale-105'
                  : 'bg-white/10 text-gray-600 hover:bg-white/20 border border-white/10 hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* 加载状态 */}
      {isInitialLoad ? (
        <div className="max-w-[1800px] mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse backdrop-blur-2xl bg-white/20 rounded-2xl border border-white/10 shadow-lg shadow-black/5 overflow-hidden w-full max-w-sm mx-auto"
              >
                <div className="w-full aspect-[3/2] bg-gray-200/30" />
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-200/30" />
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200/30 rounded w-3/4" />
                      <div className="mt-2 h-4 bg-gray-200/30 rounded w-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-[1800px] mx-auto px-4 mt-8">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="space-y-5 mb-12">
              <h2 className="text-lg font-medium text-gray-800 tracking-wide pl-1 flex items-center gap-2">
                {category}
                <span className="text-sm text-gray-400 font-normal">({categoryItems.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {categoryItems.map((item, index) => (
                  <div 
                    key={item._id} 
                    className="group relative backdrop-blur-2xl bg-white/20 rounded-2xl border border-white/10 shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 hover:bg-white/30 overflow-hidden animate-fade-up w-full max-w-sm mx-auto"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {/* 网站缩略图 */}
                    <div className="relative w-full aspect-[3/2] overflow-hidden bg-gradient-to-br from-gray-100/30 to-gray-200/30">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 to-gray-200/30 animate-pulse" />
                      <img
                        src={getThumbnailUrl(item.url)}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-0 transition-opacity duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getPlaceholderImage(item.title);
                        }}
                        onLoad={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.classList.add('opacity-100');
                          const parent = target.parentElement;
                          if (parent) {
                            const placeholder = parent.querySelector('.animate-pulse');
                            if (placeholder) {
                              placeholder.classList.add('opacity-0');
                            }
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 transition-opacity duration-300 group-hover:opacity-70" />
                    </div>

                    {/* 内容区域 */}
                    <div className="relative p-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0"></div>
                      <div className="relative flex items-start gap-3">
                        {/* 图标 */}
                        {item.icon && (
                          <div className="flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                            <img
                              src={getIconUrl(item.icon) || undefined}
                              alt={item.title}
                              className="w-10 h-10 object-contain rounded-xl p-1.5 bg-white/70 backdrop-blur-xl shadow-sm border border-white/20 transition-all duration-300 group-hover:shadow-md group-hover:border-white/40 group-hover:bg-white/90"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = getPlaceholderImage(item.title);
                              }}
                            />
                          </div>
                        )}

                        {/* 标题和描述 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900 truncate transition-colors duration-300 group-hover:text-blue-600">
                              {item.title}
                            </h3>
                            {item.repository && (
                              <a
                                href={item.repository}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2 transition-all duration-300 group-hover:text-gray-600">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 链接覆盖 */}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0"
                      aria-label={item.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
