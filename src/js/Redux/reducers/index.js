/* libs */
import { combineReducers } from 'redux'
/* reducers */
import { errorReducer } from '../reducers/errorReducer'

export const rootReducer = combineReducers({
  errStore: errorReducer,
})