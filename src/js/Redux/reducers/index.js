/* libs */
import { combineReducers } from 'redux'
/* reducers */
import { errorReducer } from '../reducers/errorReducer'
import { userReducer } from '../reducers/userReducer'

export const rootReducer = combineReducers({
  errStore: errorReducer,
  user: userReducer
})