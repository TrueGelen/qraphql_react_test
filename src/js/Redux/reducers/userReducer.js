import {
  LOGIN,
  LOGOUT
} from '../actionTypes'

export const initialState = {
  id: null,
  isAuthorized: false
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload }
      break
    case LOGOUT:
      return { ...state, ...action.payload }
      break
    default:
      return state
      break;
  }
}