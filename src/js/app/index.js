/* libs */
import React, { useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/client';
/* components */
import NoticeError from '../components/errors/notice'
import LoadingSpinner from '../components/loadingSpinner'
import Menu from '../components/menu'
/* styles */
import md from './app.module.scss'
/* other */
import { routes, routesMap } from '../routes'
import {
  errorHide,
  login
} from '../Redux/actionCreators'
/* imgs */
import menu_icon_png from '../../img/menu.png'
/* queries */
import { CURRENT_USER } from './queries'

function App(props) {
  const [menu, setMenu] = useState(false)
  //проверяем актуальность token'a и за одно получаем id пользователя
  const { loading = false, error = false, data = null } = useQuery(CURRENT_USER);

  const dispatch = useDispatch()
  const errStore = useSelector(state => state.errStore)
  const userId = useSelector(state => state.user.id)


  let isAuthorized = useMemo(() => {
    return data ? true : false
  }, [data])

  if (data && data.currentUser.id !== userId) {
    dispatch(login(data.currentUser.id))
  }

  const openMenu = useCallback(() => {
    setMenu(true)
  }, [])

  const hideMenu = useCallback(() => {
    setMenu(false)
  }, [])

  const hideNoticeError = useCallback(() => {
    dispatch(errorHide())
  }, [])

  const routesComponents = useMemo(() => {
    return routes.map((route) => {
      return <Route path={route.url}
        component={route.container}
        exact={route.exact}
        key={route.url}
      />
    })
  }, [routes])

  const template = useMemo(() => {
    let jsx = null
    if (!error) {
      if (isAuthorized) {

        jsx =
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
            <main className={md.content}>
              <Switch>
                {routesComponents}
              </Switch>
            </main>
          </>

      } else {
        jsx =
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
      }
    } else {
      jsx = <p className={md.badRequest}>
        Не удалось получить ответ от сервера :(<br />
                          Попробуйте позже...
                          </p>
    }
    return jsx
  }, [error, isAuthorized])

  return (
    <Router>
      <>
        {loading ? <LoadingSpinner />
          :
          template
        }

        <Menu
          routes={routesMap}
          isOpened={menu}
          onClose={hideMenu} />

        <NoticeError
          text={errStore.errMessage}
          onClose={hideNoticeError}
          isError={errStore.isError} />
      </>
    </Router >
  )
}

export default App