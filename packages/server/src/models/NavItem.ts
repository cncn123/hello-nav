import mongoose from 'mongoose';

const navItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  repository: {
    type: String,
    trim: true
  },
  keywords: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true,
  versionKey: false
});

// 添加索引以提高查询性能
navItemSchema.index({ category: 1 });
navItemSchema.index({ title: 'text', description: 'text', keywords: 'text' });

export const NavItem = mongoose.model('NavItem', navItemSchema);
