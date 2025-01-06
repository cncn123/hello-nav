import React from 'react';
import { NavigationItem } from '../types/nav';
import { getIconUrl, getThumbnailUrl } from '../utils/image';

interface NavCardProps {
  item: NavigationItem;
  starCount?: number;
}

export const NavCard: React.FC<NavCardProps> = ({ item, starCount }) => {
  return (
    <div 
      className="group relative backdrop-blur-2xl 
        bg-gradient-to-br from-white/40 via-white/30 to-white/20 
        dark:from-gray-800/30 dark:via-gray-800/25 dark:to-gray-800/20
        rounded-2xl overflow-hidden
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
        border border-white/20 dark:border-white/[0.08]
        hover:border-blue-500/20 dark:hover:border-blue-400/10
        hover:from-blue-50/40 hover:via-white/30 hover:to-white/20
        dark:hover:from-gray-800/35 dark:hover:via-gray-800/30 dark:hover:to-gray-800/25
        transition-colors"
    >
      {/* 网站缩略图 */}
      <div className="relative w-full aspect-[3/2] overflow-hidden rounded-t-2xl">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-gray-800/[0.02] dark:bg-grid-gray-100/[0.01] rounded-t-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-gray-800/30 dark:to-gray-800/0
            mix-blend-overlay opacity-70 transition-colors rounded-t-2xl" />
          <div className="absolute -inset-1 bg-gradient-to-t from-white/80 via-white/0 to-white/0 dark:from-gray-800/50 dark:via-gray-800/0 dark:to-gray-800/0 backdrop-blur-[2px]
            group-hover:from-blue-50/80 dark:group-hover:from-gray-800/60 transition-colors rounded-t-2xl" />
        </div>

        {/* 网站截图 */}
        <div className="relative h-full">
          <div className="absolute inset-4 rounded-xl 
            shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.12)]
            before:absolute before:inset-0 before:rounded-xl before:ring-1 before:ring-inset before:ring-black/[0.02] dark:before:ring-white/[0.02]
            after:absolute after:inset-0 after:rounded-xl after:ring-1 after:ring-inset after:ring-white/[0.05] dark:after:ring-white/[0.03]">
            <img
              src={getThumbnailUrl(item.url)}
              alt={item.title}
              className="h-full w-full object-cover opacity-0 transition-opacity duration-300 rounded-xl"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.classList.add('hidden');
                const parent = target.parentElement;
                if (parent) {
                  const placeholder = document.createElement('div');
                  placeholder.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl transition-colors duration-300';
                  placeholder.innerHTML = `
                    <div class="relative flex flex-col items-center gap-2">
                      <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-white dark:from-gray-700 dark:to-gray-800
                        flex items-center justify-center shadow-sm
                        before:absolute before:inset-0 before:rounded-xl before:ring-1 
                        before:ring-inset before:ring-black/[0.02] dark:before:ring-white/[0.02]">
                        <span class="relative text-2xl font-medium text-gray-400 dark:text-gray-500 transition-colors duration-300">
                          ${item.title.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  `;
                  parent.appendChild(placeholder);
                }
              }}
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                target.classList.remove('opacity-0');
                target.classList.add('opacity-100');
              }}
            />
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="relative p-4 bg-white/10 dark:bg-gray-800/10 
        group-hover:bg-blue-50/20 dark:group-hover:bg-gray-800/20 
        transition-colors duration-300">
        <div className="flex items-start gap-3">
          {/* 网站图标 */}
          {item.icon && (
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-xl p-1.5 
                bg-gradient-to-br from-white/90 to-white/70 
                dark:from-gray-800/90 dark:to-gray-800/70
                shadow-[0_2px_8px_rgb(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgb(0,0,0,0.2)]
                group-hover:from-white group-hover:to-white/80
                dark:group-hover:from-gray-800 dark:group-hover:to-gray-800/80
                transition-colors duration-300">
                <img
                  src={getIconUrl(item.icon)}
                  alt={`${item.title} icon`}
                  className="w-full h-full object-contain opacity-0 transition-opacity duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.classList.add('hidden');
                    const parent = target.parentElement;
                    if (parent) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'w-full h-full rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center transition-colors duration-300';
                      placeholder.innerHTML = `
                        <span class="text-lg font-medium text-gray-400 dark:text-gray-500 transition-colors duration-300">
                          ${item.title.charAt(0).toUpperCase()}
                        </span>
                      `;
                      parent.appendChild(placeholder);
                    }
                  }}
                  onLoad={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.classList.remove('opacity-0');
                    target.classList.add('opacity-100');
                  }}
                />
              </div>
            </div>
          )}

          {/* 标题和描述 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 
                group-hover:text-blue-700 dark:group-hover:text-blue-400 
                truncate transition-colors duration-300">
                {item.title}
              </h3>
              {item.url.toLowerCase().includes('github.com') && starCount !== undefined && (
                <div className="flex items-center gap-1 px-1.5 py-0.5 
                  bg-yellow-50/90 dark:bg-yellow-900/90 rounded-full
                  transition-colors duration-300">
                  <svg className="w-3.5 h-3.5 text-yellow-500 dark:text-yellow-400" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" />
                  </svg>
                  <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                    {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(starCount)}
                  </span>
                </div>
              )}
            </div>
            {item.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 
                group-hover:text-blue-600/70 dark:group-hover:text-blue-300/70 
                mt-1 line-clamp-2 transition-colors duration-300">
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
  );
};
