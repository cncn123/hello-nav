// 1. 首先定义常量和函数
const PATH_REG = /^.*\d{2}-(.*)\.ts$/

function getModules(context: Record<string, AppItem[]>): CateItem[] {
  // 4. 当 getModules 被调用时，执行这里的逻辑
  return Object.keys(context).map((path: string) => ({
    title: path.replace(PATH_REG, (_, $1) => $1.replace('_', ' ')),
    children: context[path].map(item => ({
      ...item,
      // 5. 对每个 item 处理时会调用 getIconUrl
      icon: getIconUrl(item.icon),
    })),
  }))
}

// 2. 模块初始化时，执行 importGlob
// 立即加载所有匹配的模块文件，结果存储在 context 中
const context: Record<string, AppItem[]> = import.meta.importGlob('./module/*.ts', {
  eager: true,
  import: 'default',
})

function getIconUrl(filename: string): string {
  // 6. 根据运行环境返回相应的图标 URL
  if (typeof window !== 'undefined') {
    return new URL(`../public/icons/${filename}`, import.meta.url).href
  } else {
    return `./icons/${filename}`
  }
}

// 3. 模块初始化时，执行 getModules(context)
// 将结果作为默认导出
export default <CateItem[]>getModules(context)
