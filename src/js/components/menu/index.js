/* libs */
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
/* styles */
import md from './styles.module.scss'
/* imgs */
import menu_icon_png from '../../../img/menu.png'
import user_icon_png from '../../../img/user_icon.png'
import process_icon_png from '../../../img/process_icon.png'

function Menu({
  className,
  isOpened,
  onClose,
  routes
}) {

  return (
    <div className={`${md.menuWrapper} ${isOpened && md.menuWrapper_show} ${className && className}`}>
      {console.log("========MENU RENDER=======")}
      <menu className={`${md.menuLeftPart} ${isOpened && md.menuLeftPart_show}`}>
        <div className={`${md.btnMenu} ${md.btnMenu_opened}`}
          onClick={onClose}>
          <img src={menu_icon_png} />
          <p>proceset</p>
        </div>
        <ul className={md.menu}>
          <li className={md.menu__item}>
            <NavLink
              className={md.menu__link}
              to={routes.lk}
              activeClassName={md.menu__link_active}
              onClick={onClose}>
              <img src={user_icon_png} />
              <p>Профиль</p>
            </NavLink>
          </li>
          <li className={md.menu__item}>
            <NavLink
              className={md.menu__link}
              to={routes.processes}
              activeClassName={md.menu__link_active}
              onClick={onClose}>
              <img src={process_icon_png} />
              <p>Список процессов</p>
            </NavLink>
          </li>
        </ul>
      </menu>
      <div className={md.menuRightPart}
        onClick={onClose}></div>
    </div>
  )
}

export default memo(Menu)

Menu.defaultProps = {
  className: undefined,
  onClose: () => { },
  routes: {}
}

Menu.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  routes: PropTypes.object.isRequired
}