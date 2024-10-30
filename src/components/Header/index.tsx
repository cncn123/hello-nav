import React, { useState, useEffect } from 'react'
import './index.less'

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 增加触发距离到 200px
      if (currentScrollY > 200) {
        // 增加滚动距离判断，使其不那么敏感
        if (currentScrollY < lastScrollY - 20) {
          setIsVisible(true)  // 向上滚动超过 20px 时显示
        } else if (currentScrollY > lastScrollY + 20) {
          setIsVisible(false) // 向下滚动超过 20px 时隐藏
        }
      } else {
        setIsVisible(true)  // 回到顶部区域时显示
      }

      setLastScrollY(currentScrollY)
    }

    // 添加节流以提高性能
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [lastScrollY])

  return (
    <header className={`nav-header ${isVisible ? '' : 'nav-header--hidden'}`}>
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span className="logo-text">Bobby's Space</span>
          </div>
          <div className="subtitle">Bobby 空间</div>
        </div>
      </div>
    </header>
  )
}

export default Header
