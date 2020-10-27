import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR
} from '../actionTypes'

export const initialState = {
  authorized: false,
  isLoading: false,
  firstName: '',
  secondName: '',
  email: ''
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    // case AUTH_REQUEST:
    //   return { ...state, ...action.payload }
    //   break
    case AUTH_SUCCESS:
      return { ...state, ...action.payload }
      break
    default:
      return state
      break;
  }
}