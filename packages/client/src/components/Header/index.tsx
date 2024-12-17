import React from 'react'
import './index.less'

const Header: React.FC = () => {
  return (
    <header className="nav-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span className="logo-text">Bobby's Space</span>
          </div>
          <div className="divider"></div>
          <div className="subtitle">Bobby的空间</div>
        </div>
      </div>
    </header>
  )
}

export default Header
