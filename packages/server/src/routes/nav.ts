import express from 'express';
import { NavItem } from '../models/NavItem';

const router = express.Router();

// 获取所有导航项
router.get('/items', async (req, res) => {
  try {
    const items = await NavItem.find().sort({ category: 1, title: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: '获取导航项失败' });
  }
});

// 添加新导航项
router.post('/items', async (req, res) => {
  try {
    const navItem = new NavItem(req.body);
    const savedItem = await navItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ error: '添加导航项失败' });
  }
});

// 获取所有分类
router.get('/categories', async (req, res) => {
  try {
    const categories = await NavItem.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: '获取分类失败' });
  }
});

// 添加到收藏
router.post('/favorites', async (req, res) => {
  const { user_id, nav_item_id } = req.body;
  try {
    const result = await NavItem.findByIdAndUpdate(nav_item_id, { $addToSet: { favorites: user_id } }, { new: true });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: '添加收藏失败' });
  }
});

// 搜索导航项
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: '搜索词不能为空' });
    }
    
    const items = await NavItem.find(
      { $text: { $search: q as string } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
    
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: '搜索失败' });
  }
});

export default router;
