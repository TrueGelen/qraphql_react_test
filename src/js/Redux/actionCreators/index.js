import {
  /* ERRORS */
  ERROR_SHOW,
  ERROR_HIDE
} from '../actionTypes'

/* ERRORS */
export function errorShow(text) {
  return {
    type: ERROR_SHOW,
    payload: {
      isError: true,
      errMessage: text
    }
  }
}

export function errorHide() {
  return {
    type: ERROR_HIDE,
    payload: {
      isError: false,
      errMessage: ''
    }
  }
}