import {
  /* ERRORS */
  ERROR_SHOW,
  ERROR_HIDE,
  /* USER */
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR
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

/* USER */
export function authRequest() {
  return {
    type: AUTH_REQUEST
  }
}

export function authSuccess({ firstName, secondName, email }) {
  return {
    type: AUTH_SUCCESS,
    payload: {
      firstName,
      secondName,
      email
    }
  }
}

export function authError() {
  return {
    type: AUTH_ERROR
  }
}