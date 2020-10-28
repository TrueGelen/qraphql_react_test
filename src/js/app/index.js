/* libs */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom'
import {
  useQuery,
  gql
} from '@apollo/client';

/* components */
import NoticeError from '../components/errors/notice'
import LogInPage from '../pages/login'

/* styles */
import moduleStyles from './app.module.scss'
import mainStyles from '../../scss/main.module.scss'

/* other */
import { routes, routesMap } from '../routes'
import {
  errorHide
} from '../Redux/actionCreators'
import { baseUrl } from '../Redux/constants'

const GET_USER_BY_ID = gql`
  query ($id: Int!){
    userById(id: $id){
      id
    }
  }
`;

export default function App(props) {
  const { loading, error, data } = useQuery(GET_USER_BY_ID,
    {
      variables: { id: 1 }
    });

  /*if (loading) return <p>loading...</p>
  if (error) return <p>`Error! ${error}`</p>*/

  const dispatch = useDispatch()
  const errStore = useSelector(state => state.errStore)

  /* state = {
    authorized: false
  } */

  // let isAuthorized = data ? true : false
  let isAuthorized = false
  /*openMobMenu = () => {
    this.setState({ mobMenu: true })
  }
 
  hideMobMenu = () => {
    this.setState({ mobMenu: false })
  } */

  let routsContainers = routes.map((route) => {
    return <Route path={route.url}
      component={route.container}
      exact={route.exact}
      key={route.url}
    />
  })
  return (
    <Router>
      <>
        {isAuthorized ?
          <>
            <header className={moduleStyles.header}>
              <div className={moduleStyles.btnMenu}>
                <img src={`${baseUrl}assets/imgs/menu.png`} />
                <p>Меню</p>
              </div>
            </header>
            {/* content */}
            <main className={moduleStyles.content}>
              <Switch>
                {routsContainers}
              </Switch>
            </main>
          </>
          :
          <LogInPage />
        }

        <NoticeError
          text={errStore.errMessage}
          onClose={() => { dispatch(errorHide) }}
          isError={errStore.isError}
        />

      </>
    </Router >
  )
}