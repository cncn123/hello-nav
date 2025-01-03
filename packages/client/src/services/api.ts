import axios from 'axios';
import type { NavItem } from './types';
import { API_CONFIG } from '../config';

const api = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: 10000,
});

export const navApi = {
  // 获取所有导航项
  getAllItems: async (): Promise<NavItem[]> => {
    const response = await api.get<NavItem[]>('/nav/items');
    return response.data;
  },

  // 获取所有分类
  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/nav/categories');
    return response.data;
  },

  // 搜索导航项
  searchItems: async (query: string): Promise<NavItem[]> => {
    const response = await api.get<NavItem[]>(`/nav/search`, {
      params: { q: query }
    });
    return response.data;
  }
};
