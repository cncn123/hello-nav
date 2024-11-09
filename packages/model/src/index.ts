// 文件名匹配正则：匹配形如 "01-category_name.ts" 的文件
// 例如：'01-common.ts' 将提取出 'common'
const PATH_REG = /^.*\d{2}-(.*)\.ts$/

/**
 * 将导入的模块数据转换为分类树结构
 * @param context - 从 module 目录导入的原始数据，key 为文件路径，value 为应用列表
 * @returns CateItem[] - 转换后的分类树数组
 */
function getModules(context: Record<string, AppItem[]>): CateItem[] {
  return Object.keys(context).map((path: string) => ({
    // 从文件路径提取分类标题
    // 例如：'./module/01-common.ts' -> 'common'
    // $1 表示正则中第一个捕获组的内容
    title: path.replace(PATH_REG, (_, $1) => $1.replace('_', ' ')),
    // 处理该分类下的所有应用
    children: context[path].map(item => ({
      ...item,  // 保留应用的原有属性
      icon: getIconUrl(item.icon),  // 处理图标路径
    })),
  }))
}

// 使用 Vite 的 importGlob 功能自动导入 module 目录下的所有 .ts 文件
// eager: true 表示立即加载，而不是按需加载
// import: 'default' 表示只导入默认导出
const context: Record<string, AppItem[]> = import.meta.importGlob('./module/*.ts', {
  eager: true,
  import: 'default',
})

/**
 * 处理图标 URL
 * @param filename - 图标文件名
 * @returns 完整的图标 URL
 */
function getIconUrl(filename: string): string {
  if (typeof window !== 'undefined') {
    // 浏览器环境：生成完整的 URL
    // 例如：'/src/assets/icons/github.png'
    return new URL(`../public/icons/${filename}`, import.meta.url).href
  } else {
    // 服务器端环境：使用相对路径
    // 例如：'./icons/github.png'
    return `./icons/${filename}`
  }
}

// 导出最终的分类树数据
// 类型断言确保返回类型为 CateItem[]
export default <CateItem[]>getModules(context)

/**
 * 类型定义示例：
 * 
 * interface AppItem {
 *   name: string;      // 应用名称
 *   url: string;       // 应用链接
 *   icon?: string;     // 图标文件名
 *   desc?: string;     // 应用描述
 * }
 * 
 * interface CateItem {
 *   title: string;     // 分类标题
 *   children: AppItem[]; // 分类下的应用列表
 * }
 */
