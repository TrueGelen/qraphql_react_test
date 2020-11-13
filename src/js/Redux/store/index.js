/* libs */
import { createStore, applyMiddleware, compose } from 'redux'
/* other imports */
import { rootReducer } from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware()
));

export default store