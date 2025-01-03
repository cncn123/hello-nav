// API configuration
export const API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.bobbyspace.com/api'  // 使用自定义域名
    : 'http://localhost:3000/api'
};
