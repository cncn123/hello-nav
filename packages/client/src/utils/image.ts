export const getIconUrl = (icon: string) => {
  if (!icon) return null;
  if (icon.startsWith('http')) return icon;
  return `/icons/${icon}`;
};

export const getThumbnailUrl = (url: string) => {
  // 使用 Automattic/mShots
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=720&h=540`;
};

export const getPlaceholderImage = (title: string) => {
  // 生成渐变背景的占位图
  const colors = ['4F46E5', '7C3AED', 'DB2777', 'DC2626', 'D97706', '059669'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `https://via.placeholder.com/720x540/${color}/ffffff?text=${encodeURIComponent(title.charAt(0))}`;
};
