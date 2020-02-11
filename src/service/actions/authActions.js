import { AUTH_LOGIN, AUTH_LOGOUT, SET_AUTH } from './types'

export const setAuth = newState => ({
  type: SET_AUTH,
  newState
})

export const login = token => ({
  type: AUTH_LOGIN,
  token
})

export const loginAsync = token => {
  return (dispatch, getState) => {
    dispatch(login(token))
    return getState().auth.token
  }
}

export const logout = () => ({
  type: AUTH_LOGOUT
})

export const logoutAsync = () => {
  return (dispatch, getState) => {
    dispatch(logout())
    return getState().auth.token
  }
}
