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
  useEffect(() => {
    const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    const handleChange = (e: MediaQueryListEvent) => {
      const isLightMode = e.matches
      toggleTheme(isLightMode)
      setStatus(isLightMode)
    }

    // Set initial theme based on system preference
    const isLightMode = lightModeMediaQuery.matches
    toggleTheme(isLightMode)
    setStatus(isLightMode)

    // Listen for changes in system theme preference
    lightModeMediaQuery.addEventListener('change', handleChange)

    return () => {
      lightModeMediaQuery.removeEventListener('change', handleChange)
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
