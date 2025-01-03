import { useContext } from 'react'
import { AppsContext } from '../../hooks/index'
import gitHubIcon from '../../assets/images/github.png'
import './index.less'

function onClickApp(appItem: AppItem) {
  try {
    gtag('event', 'click', {
      event_category: 'App',
      event_label: 'app',
      value: appItem.name,
    })
  } catch (e) {
  }
}

function onCornerClick(e: React.SyntheticEvent, appItem: AppItem) {
  e.preventDefault()
  e.stopPropagation()
  try {
    gtag('event', 'click', {
      event_category: 'App',
      event_label: 'app-repo',
      value: appItem.name,
    })
  } catch (e) {
  }
  window.open(appItem.repository)
  return false
}

const Cell = (appItem: AppItem & { title: string | undefined; isSettingMode: boolean }) => {
  const { name, icon, homepage, repository, darkInvert, lessRadius } = appItem
  const { filterKey, moveLeft, moveRight, toggleFavorite, hiddenAppNames } =
    useContext(AppsContext)
  const imgClass = [darkInvert ? 'dark-invert' : '', lessRadius ? 'less-radius' : ''].join(' ')
  const size =
    name.length > 11
      ? name.length > 12
        ? name.length > 13
          ? name.length > 14
            ? 'micro'
            : 'mini'
          : 'tiny'
        : 'small'
      : 'normal'

  const isHiddenApp = hiddenAppNames.includes(appItem.name)

  return (
    <li className={`cell ${isHiddenApp ? 'hide' : ''} ${appItem.favorite ? 'favorite' : ''}`}>
      <a className="app" href={homepage} title={name} onClick={() => onClickApp(appItem)}>
        <div className="img-box">
          <img src={icon} className={imgClass} alt={name} />
        </div>
        <p className="title" data-size={size}
           style={{ whiteSpace: 'nowrap', overflow: 'visible', textOverflow: 'ellipsis' }}>
          {name}
        </p>
        {repository && (
          <div onKeyDown={() => {
          }} onClick={e => onCornerClick(e, appItem)} className="corner">
            <div className="corner-icon-wrap">
              <img className="corner-icon" draggable={false} src={gitHubIcon} alt="" />
            </div>
          </div>
        )}
      </a>
      <div className="app-back">
        {/* 头部：显示图标和名称 */}
        <div className="app-setting-head">
          <img src={icon} className={imgClass} alt={name} />
          <p className="title" data-size={size} title={name}>
            {name}
          </p>
        </div>
        <div className="app-setting-content">
          {appItem.favorite && !filterKey && (
            <div
              className={`icon icon-left ${appItem.first ? 'disabled' : ''}`}
              onClick={() => moveLeft(appItem)}
            ></div>
          )}
          <div
            className={`icon ${appItem.favorite ? 'icon-favorite-active' : 'icon-favorite'}`}
            onClick={() => toggleFavorite(appItem)}
          ></div>
          {appItem.favorite && !filterKey && (
            <div
              className={`icon icon-right ${appItem.final ? 'disabled' : ''}`}
              onClick={() => moveRight(appItem)}
            ></div>
          )}
        </div>
      </div>
    </li>
  )
}

export const PlaceholderCell = () => (
  <li className="cell">
    <div className="app-placeholder">
      <span className="icon icon-add"></span>
    </div>
  </li>
)

export default Cell
