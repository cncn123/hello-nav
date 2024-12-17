import { useEffect, useState, useCallback } from 'react'
import './index.less'

interface PandaBtnProps {
  onClick?: (event: React.SyntheticEvent) => void
}

const STATUS_CLASS_NAME = 'theme--dark'

function toggleTheme(isDarkMode: boolean) {
  const pageClassList = document.documentElement.classList
  if (isDarkMode) {
    pageClassList.add(STATUS_CLASS_NAME)
    window.localStorage.__THEME__ = STATUS_CLASS_NAME
  } else {
    pageClassList.remove(STATUS_CLASS_NAME)
    window.localStorage.__THEME__ = ''
  }
  const themeMateEle = document.querySelector('meta[name="theme-color"]')
  if (themeMateEle) {
    themeMateEle.setAttribute('content', isDarkMode ? 'rgba(45, 46, 48, 0.9)' : '#f6f7f9')
  }
}

export default function PandaBtn({ onClick }: PandaBtnProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = window.localStorage.__THEME__
    if (savedTheme === STATUS_CLASS_NAME) return true
    if (savedTheme === '') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const handleThemeChange = useCallback((e: MediaQueryListEvent | MediaQueryList) => {
    const newIsDarkMode = e.matches
    setIsDarkMode(newIsDarkMode)
    toggleTheme(newIsDarkMode)
  }, [])

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    // 初始化主题
    handleThemeChange(darkModeMediaQuery)

    // 监听系统主题变化
    darkModeMediaQuery.addEventListener('change', handleThemeChange)

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [handleThemeChange])

  const handleClick: React.MouseEventHandler = e => {
    const newIsDarkMode = !isDarkMode
    setIsDarkMode(newIsDarkMode)
    toggleTheme(newIsDarkMode)
    if (onClick) {
      onClick(e)
    }
  }

  const classNames = ['panda-btn', isDarkMode ? 'active' : ''].join(' ')

  return <span className={classNames} onClick={handleClick} onKeyDown={() => {}} />
}
