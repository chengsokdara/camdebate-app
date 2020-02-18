/**
 * Author: Mr. Cheng Sokdara
 * Repository: https://github.com/chengsokdara/camdebate-app
 *
 * Email: chengsokdara@gmail.com
 * Phone: 086558716
 * Website: https://rawewhat-team.web.app
 * License: MIT
 *
 * Created At: 03/02/2020
 */
import AsyncStorage from '@react-native-community/async-storage'
import { AUTH_LOGIN, AUTH_LOGOUT, SET_AUTH, SET_PROFILE } from './types'

export const login = (token, profile) => ({
  type: AUTH_LOGIN,
  token,
  profile
})

export const loginAsync = (token, profile) => {
  return async (dispatch, getState) => {
    await AsyncStorage.setItem('token', token)
    dispatch(login(token, profile))
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

export const setAuth = newState => ({
  type: SET_AUTH,
  newState
})

export const setProfile = newProfile => ({
  type: SET_PROFILE,
  newProfile
})

export const setProfileAsync = newProfile => {
  return async (dispatch, getState) => {
    dispatch(setProfile(newProfile))
    return getState().auth.profile
  }
}
