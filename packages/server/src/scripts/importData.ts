import mongoose from 'mongoose';
import { NavItem } from '../models/NavItem';
import { connectDB } from '../db/config';
import * as path from 'path';
import * as fs from 'fs';

// 导入所有模块数据
const importData = async () => {
  try {
    // 连接数据库
    await connectDB();
    
    // 清空现有数据
    await NavItem.deleteMany({});
    
    const moduleDir = path.join(__dirname, '../../../model/src/module');
    const files = fs.readdirSync(moduleDir).sort();
    
    for (const file of files) {
      if (file.endsWith('.ts')) {
        const category = file.replace(/^\d+-/, '').replace('.ts', '');
        const filePath = path.join(moduleDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        // 提取数组内容
        const match = fileContent.match(/export default <AppItem\[\]>\[([\s\S]*)\]/);
        if (match) {
          const items = eval(`[${match[1]}]`);
          
          // 转换并保存每个项目
          for (const item of items) {
            const navItem = new NavItem({
              title: item.name,
              url: item.homepage,
              category: category.replace(/_/g, ' '),
              description: item.description || `${item.name} - ${item.homepage}`,
              icon: item.icon,
              repository: item.repository,
              keywords: item.keywords
            });
            
            await navItem.save();
            console.log(`Imported: ${item.name}`);
          }
        }
      }
    }
    
    console.log('数据导入完成！');
    process.exit(0);
  } catch (error) {
    console.error('导入失败:', error);
    process.exit(1);
  }
};

// 运行导入
importData();
