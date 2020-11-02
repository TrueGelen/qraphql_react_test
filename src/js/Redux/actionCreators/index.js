import {
  /* ERRORS */
  ERROR_SHOW,
  ERROR_HIDE,
  /* USER */
  LOGIN,
  LOGOUT
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
export function login(id) {
  return {
    type: LOGIN,
    payload: {
      id,
      isAuthorized: true
    }
  }
}

export function logout() {
  return {
    type: LOGOUT,
    payload: {
      id: null,
      isAuthorized: false
    }
  }
}

export function authError() {
  return {
    type: AUTH_ERROR
  }
}