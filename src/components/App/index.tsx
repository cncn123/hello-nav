import { useState, useContext, useEffect } from 'react'
import { IGNORE_KEYWORD_REG, transformAppKeyWords } from '../../utils'
import { AppsContext } from '../../hooks/index'
import libraryTree from '@hello-nav/model'
import Header from '../Header'
import ActionBar from '../ActionBar'
import ContainWrap from '../Contain'
import WithError from '../WithError'
import Message from '../WithError/Message'
import Sidebar from '../Sidebar'
import Footer from '../Footer'

const CATEGORY_TYPES: CategoryTypes = ['category', 'list']
const ContainWithNotFind = WithError<ContainWrapProp>(ContainWrap, Message)

// libraryMap 用于存储两种展示模式的数据：分类模式和列表模式
const libraryMap: LibraryMap = {
  // 分类模式：保持原有的树形结构
  // libraryTree 的结构为：Array<{ title: string, children: AppItem[] }>
  category: libraryTree,

  // 列表模式：将所有应用平铺到一个数组中
  list: libraryTree.reduce((res: AppItem[], item: CateItem) => {
    // 处理每个应用的关键词，用于搜索功能
    // transformAppKeyWords 会将应用的名称和其他属性转换为搜索关键词
    item.children.forEach(transformAppKeyWords)

    // 将当前分类下的所有应用添加到结果数组中
    // 使用展开运算符 (...) 将子数组中的元素添加到主数组
    res.push(...item.children)

    // 返回累积的结果数组，供下一次迭代使用
    return res
  }, []), // 初始值为空数组
}

const filterListByKey = (list: AppItem[], key: string) =>
  list.filter(app => (app.keywords as string[]).some(k => k.includes(key)))

const genFilteredByList = (list: (AppItem | CateItem)[], type: CategoryType, filterKey: string) => {
  if (type === 'list') {
    return filterListByKey(list as AppItem[], filterKey)
  }
  return (list as CateItem[]).map(cate => ({
    title: cate.title,
    children: filterListByKey(cate.children, filterKey),
  }))
}

function App() {
  const { __CATEGORY_TYPE__ } = window.localStorage
  const [type, setType] = useState<CategoryType>(__CATEGORY_TYPE__ || CATEGORY_TYPES[0])
  if (!__CATEGORY_TYPE__) {
    window.localStorage.__CATEGORY_TYPE__ = type
  }

  const [isSettingMode, setIsSettingMode] = useState(false)
  const { favoriteApps, filterKey, setFilterKey } = useContext(AppsContext)
  const newFilterKey = filterKey.trim().toLowerCase().replace(IGNORE_KEYWORD_REG, '')
  const libraries: (AppItem | CateItem)[] =
    type === 'category'
      ? [
          {
            title: 'favorites',
            children: favoriteApps,
          },
          ...libraryMap[type],
        ]
      : [...favoriteApps, ...libraryMap[type]]

  let filteredLibraries = genFilteredByList(libraries, type, newFilterKey)

  useEffect(() => {
    window.localStorage.__CATEGORY_TYPE__ = type
  }, [type])

  function toggleType() {
    const typeIndex = CATEGORY_TYPES.indexOf(type)
    setType(CATEGORY_TYPES[(typeIndex + 1) % 2])
  }

  const resultAppCount =
    type === 'list'
      ? (filteredLibraries as AppItem[]).length
      : (filteredLibraries as CateItem[]).reduce((c, cate) => c + cate.children.length, 0)

  return (
    <div className="body">
      <Header />
      <ActionBar
        filterKey={filterKey}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setFilterKey(e.target.value)}
        onClear={() => setFilterKey('')}
        type={type}
        isSettingMode={isSettingMode}
        toggleType={toggleType}
        toggleSetting={() => setIsSettingMode(!isSettingMode)}
      />
      <div className="main">
        <ContainWithNotFind
          list={filteredLibraries}
          type={type}
          filterKey={filterKey}
          isSettingMode={isSettingMode}
          resultAppCount={resultAppCount}
          isError={!resultAppCount}
        />
      </div>
      {resultAppCount && <Sidebar list={filteredLibraries} type={type} hasFavorite={!!favoriteApps.length} />}
      <Footer />
    </div>
  )
}

export default App
