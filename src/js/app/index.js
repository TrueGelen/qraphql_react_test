/* libs */
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, concat } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { connect } from 'react-redux'

/* components */
import NoticeError from '../components/errors/notice'

/* styles */
import moduleStyles from './app.module.scss'
import mainStyles from '../../scss/main.module.scss'

/* other */
import { routes, routesMap } from '../routes'
import {
  errorHide
} from '../Redux/actionCreators'


const httpLink = new HttpLink({ uri: 'http://localhost:4000/api' });
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}` || null,
    }
  });
  return forward(operation);
})
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/api',
//   cache: new InMemoryCache()
// });
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

class App extends React.Component {

  state = {
    authorized: false
  }

  /*openMobMenu = () => {
    this.setState({ mobMenu: true })
  }
 
  hideMobMenu = () => {
    this.setState({ mobMenu: false })
  } */

  render() {
    //to del later
    // this.cartStore = this.props.rootStore.cart

    let routsContainers = routes.map((route) => {
      return <Route path={route.url}
        component={route.container}
        exact={route.exact}
        key={route.url}
      />
    })
    return (
      <ApolloProvider client={client}>
        <Router>
          <>
            <header className={moduleStyles.header}>
            </header>

            {/* content */}
            <main className={moduleStyles.content}>
              <div className={`${mainStyles.container} ${moduleStyles.container_mod}`}>
                <Switch>
                  {routsContainers}
                </Switch>
              </div>
            </main>

            <NoticeError
              text={this.props.errStore.errMessage}
              onClose={this.props.hideError}
              isError={this.props.errStore.isError}
            />

          </>
        </Router >
      </ApolloProvider>
    )
  }
}

const mapStateToProps = state => ({
  errStore: state.errStore
})

const mapDispatchToProps = dispatch => ({
  hideError: () => { dispatch(errorHide()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default withStore(App)

