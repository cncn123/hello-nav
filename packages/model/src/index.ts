// 添加新的类型定义
interface AppResponse {
  success: boolean;
  data: CateItem[];
  message?: string;
}

// 修改 getModules 函数，添加 API 调用
async function getModules(): Promise<CateItem[]> {
  try {
    const response = await fetch('/api/apps');
    const result: AppResponse = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || '获取应用列表失败');
    }
    
    return result.data.map(category => ({
      ...category,
      children: category.children.map(item => ({
        ...item,
        icon: getIconUrl(item.icon),
      })),
    }));
  } catch (error) {
    console.error('获取应用列表出错:', error);
    return [];
  }
}

function getIconUrl(filename: string): string {
  console.log(filename)
  // 6. 根据运行环境返回相应的图标 URL
  if (typeof window !== 'undefined') {
    return new URL(`../public/icons/${filename}`, import.meta.url).href
  } else {
    return `./icons/${filename}`
  }
}

// 3. 模块初始化时，执行 getModules()
// 将结果作为默认导出
export { getModules }  // 导出函数而不是直接导出 Promise

// 最终导出的格式
// [
//   {
//     title: "other",  // 从文件名 06-other.ts 转换而来
//     children: [      // 原始的 AppItem[] 数组，但 icon 属性被处理过
//       {
//         homepage: "https://www.python.org/",
//         repository: "https://github.com/python",
//         icon: "/icons/python.png",  // 被 getIconUrl 处理过的路径
//         keywords: ["python lang"],
//         name: "Python"
//       },
//       // ... 其他项目
//     ]
//   },
//   // ... 其他分类
// ]
