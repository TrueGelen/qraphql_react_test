import {
  ERROR_SHOW,
  ERROR_HIDE
} from '../actionTypes'

export const initialState = {
  isError: false,
  errMessage: 'Упс, что то пошло нет так :('
}

export function errorReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_SHOW:
      return { ...state, ...action.payload }
      break
    case ERROR_HIDE:
      return { ...state, ...action.payload }
      break
    default:
      return state
      break;
  }
}