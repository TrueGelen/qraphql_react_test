/* libs */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom'
import {
  useQuery,
  gql
} from '@apollo/client';

/* components */
import NoticeError from '../components/errors/notice'
import LoadingSpinner from '../components/loadingSpinner'

/* styles */
import moduleStyles from './app.module.scss'
import mainStyles from '../../scss/main.module.scss'

/* other */
import { routes, routesMap } from '../routes'
import {
  errorHide,
  showError,
  errorShow
} from '../Redux/actionCreators'
import { baseUrl } from '../Redux/constants'

const GET_USER_BY_ID = gql`
  query ($id: Int!){
    userById(id: $id){
      id
    }
  }
`;

function App(props) {
  // let loading = false
  // let error = false
  const { loading, error, data } = useQuery(GET_USER_BY_ID,
    {
      variables: { id: 1 }
    });

  const dispatch = useDispatch()
  const errStore = useSelector(state => state.errStore)

  // if (error) {
  // console.log("SDF:LJKSD:FLKJSD:LKFJSD:LKJFS:DLKJF")
  // dispatch(errorShow("JIB<RF"))
  // }
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

  const authRouters = ["login", "registration"]

  let authorizedRouters = []
  let nonAuthorizedRouters = []
  routes.forEach((route) => {
    if (!(route.name === authRouters[0]) && !(route.name === authRouters[1])) {
      authorizedRouters.push(<Route path={route.url}
        component={route.container}
        exact={route.exact}
        key={route.url}
      />
      )
    } else
      nonAuthorizedRouters.push(<Route path={route.url}
        component={route.container}
        exact={route.exact}
        key={route.url}
      />)
  })

  return (
    <Router>
      <>
        {loading ? <LoadingSpinner />
          :

          isAuthorized ?
            <>
              < header className={moduleStyles.header}>
                <div className={moduleStyles.btnMenu}>
                  <img src={`${baseUrl}assets/imgs/menu.png`} />
                  <p>Меню</p>
                </div>
              </header>
              {/* content */}
              <main className={moduleStyles.content}>
                <Switch>
                  {authorizedRouters}
                </Switch>
              </main>
            </>
            :
            <>
              <Redirect
                to={{
                  pathname: "/login"
                }}
              />
              <Switch>
                {nonAuthorizedRouters}
              </Switch>
            </>

        }

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