// API configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 
    (import.meta.env.PROD 
      ? 'https://api.bobbyspace.com/api'  // 生产环境默认值
      : 'http://localhost:3000/api')     // 开发环境默认值
};
