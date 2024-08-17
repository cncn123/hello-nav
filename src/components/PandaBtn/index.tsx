import { useEffect, useState } from 'react'
import './index.less'

interface PandaBtnProps {
  onClick?: (event: React.SyntheticEvent) => void
}

const STATUS_CLASS_NAME = 'theme--dark'

function toggleTheme(status: boolean) {
  const pageClassList = document.documentElement.classList
  if (status) {
    // Remove dark theme class and clear local storage
    pageClassList.remove(STATUS_CLASS_NAME)
    window.localStorage.__THEME__ = ''
  } else {
    // Add dark theme class and set local storage
    pageClassList.add(STATUS_CLASS_NAME)
    window.localStorage.__THEME__ = STATUS_CLASS_NAME
  }
  const themeMateEle = document.querySelector('meta[name="theme-color"]')
  if (themeMateEle) {
    themeMateEle.setAttribute('content', status ? '#f6f7f9' : 'rgba(45, 46, 48, 0.9)')
  }
}

export default function PandaBtn({ onClick }: PandaBtnProps) {
  const [status, setStatus] = useState(!!window.localStorage.__THEME__)
  console.log('status', status)
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    console.log('darkModeMediaQuery', darkModeMediaQuery)
    const handleChange = (e: MediaQueryListEvent) => {
      const isDarkMode = e.matches
      toggleTheme(isDarkMode)
      setStatus(isDarkMode)
    }

    // Set initial theme based on system preference
    const isLightMode = !darkModeMediaQuery.matches
    console.log('isDarkMode', isLightMode)
    toggleTheme(isLightMode)
    setStatus(isLightMode)

    // Listen for changes in system theme preference
    darkModeMediaQuery.addEventListener('change', handleChange)

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  const classNames = ['panda-btn', status ? 'active' : ''].join(' ')

  const handleClick: React.MouseEventHandler = e => {
    toggleTheme(status)
    setStatus(!status)
    if (onClick) {
      ;(onClick as React.MouseEventHandler)(e)
    }
  }

  return <span className={classNames} onClick={handleClick} onKeyDown={() => {}} />
}
