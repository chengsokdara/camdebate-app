import AsyncStorage from '@react-native-community/async-storage'
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
  return async (dispatch, getState) => {
    await AsyncStorage.setItem('token', token)
    dispatch(login(token))
    return getState().auth.token
  }
}

export const logout = () => ({
  type: AUTH_LOGOUT
})

export const logoutAsync = () => {
  return async (dispatch, getState) => {
    await AsyncStorage.removeItem('token')
    dispatch(logout())
    return getState().auth.token
  }
}
