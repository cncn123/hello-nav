import { useState, useEffect } from 'react';
import { navApi } from '../services/api';
import type { NavItem } from '../services/types';

export const useNavigation = () => {
  const [items, setItems] = useState<NavItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 加载所有导航项
  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await navApi.getAllItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载导航项失败');
    } finally {
      setLoading(false);
    }
  };

  // 加载所有分类
  const loadCategories = async () => {
    try {
      const data = await navApi.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载分类失败');
    }
  };

  // 搜索导航项
  const searchItems = async (query: string) => {
    try {
      setLoading(true);
      const data = await navApi.searchItems(query);
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '搜索失败');
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadItems();
    loadCategories();
  }, []);

  return {
    items,
    categories,
    loading,
    error,
    searchItems,
    refreshItems: loadItems,
  };
};
