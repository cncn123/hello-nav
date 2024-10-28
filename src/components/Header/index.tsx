import React from 'react'
import './index.less'

const Header: React.FC = () => {
  return (
    <header className="nav-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span className="logo-text">DevNav</span>
          </div>
          <div className="subtitle">开发者导航</div>
        </div>
      </div>
    </header>
  )
}

export default Header
