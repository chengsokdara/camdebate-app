import { AUTH_LOGIN, AUTH_LOGOUT, SET_AUTH } from './types'

export const setAuth = newState => ({
  type: SET_AUTH,
  newState
})

export const login = () => ({
  type: AUTH_LOGIN
})

export const loginAsync = () => {
  return (dispatch, getState) => {
    dispatch(login())
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
