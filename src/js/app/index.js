/* libs */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from 'react-router-dom'
import {
  useQuery,
  gql
} from '@apollo/client';
/* components */
import NoticeError from '../components/errors/notice'
import LoadingSpinner from '../components/loadingSpinner'
/* styles */
import md from './app.module.scss'
import mainStyles from '../../scss/main.module.scss'
/* other */
import { routes, routesMap } from '../routes'
import {
  errorHide,
  login
} from '../Redux/actionCreators'
/* imgs */
import menu_icon_png from '../../img/menu.png'
import user_icon_png from '../../img/user_icon.png'
import process_icon_png from '../../img/process_icon.png'

const CURRENT_USER = gql`
	query{
		currentUser{
      id,
      email,
      firstName,
      secondName
		}
	}
`;

function App(props) {
  // console.log("App")
  const [menu, setMenu] = useState(false)
  const { loading, error, data = null } = useQuery(CURRENT_USER);

  const dispatch = useDispatch()
  const errStore = useSelector(state => state.errStore)
  const userId = useSelector(state => state.user.id)

  let isAuthorized = data ? true : false
  if (data && data.currentUser.id !== userId) {
    dispatch(login(data.currentUser.id))
  }

  const openMenu = () => {
    setMenu(true)
  }

  const hideMenu = () => {
    setMenu(false)
  }

  const routesComponents = routes.map((route) => {
    return <Route path={route.url}
      component={route.container}
      exact={route.exact}
      key={route.url}
    />
  })

  let serverErr = null
  if (error) {
    if (error.networkError)
      serverErr = error.networkError.statusCode
    else
      serverErr = null
  }

  return (
    <Router>
      <>
        {loading ? <LoadingSpinner />
          :
          <>
            {
              !isAuthorized && !serverErr ?
                <>
                  <Redirect
                    to={{
                      pathname: location.pathname === "/registration" && "/registration" || "/login"
                      // pathname: location.pathname === "/login" && "/login" || "/registration"
                    }}
                  />
                  <Switch>
                    {routesComponents}
                  </Switch>
                </>
                :
                <>
                  <header className={md.header}>
                    <div>
                      <div className={`${md.btnMenu} ${menu && md.btnMenu_invisible}`}
                        onClick={openMenu}>
                        <img src={menu_icon_png} />
                        <p>Меню</p>
                      </div>
                    </div>
                  </header>
                  {/* content */}
                  <main className={md.content}>
                    {
                      !serverErr ?
                        <Switch>
                          {routesComponents}
                        </Switch>
                        :
                        <p className={md.badRequest}>
                          Не удалось получить ответ от сервера :(<br />
                          Попробуйте позже...
                          </p>
                    }
                  </main>
                </>
            }
          </>
        }

        {/* MENU */}
        <div className={`${md.menuWrapper} ${menu && md.menuWrapper_show}`}>
          <menu className={`${md.menuLeftPart} ${menu && md.menuLeftPart_show}`}>
            <div className={`${md.btnMenu} ${md.btnMenu_opened}`}
              onClick={hideMenu}>
              <img src={menu_icon_png} />
              <p>proceset</p>
            </div>
            <ul className={md.menu}>
              <li className={md.menu__item}>
                <NavLink
                  className={md.menu__link}
                  to={routesMap.lk}
                  activeClassName={md.menu__link_active}
                  onClick={hideMenu}>
                  <img src={user_icon_png} />
                  <p>Профиль</p>
                </NavLink>
              </li>
              <li className={md.menu__item}>
                <NavLink
                  className={md.menu__link}
                  to={routesMap.processes}
                  activeClassName={md.menu__link_active}
                  onClick={hideMenu}>
                  <img src={process_icon_png} />
                  <p>Список процессов</p>
                </NavLink>
              </li>
            </ul>
          </menu>
          <div className={md.menuRightPart}
            onClick={hideMenu}></div>
        </div>

        <NoticeError
          text={errStore.errMessage}
          onClose={() => { dispatch(errorHide()) }}
          isError={errStore.isError}
        />
      </>
    </Router >
  )
}

export default App