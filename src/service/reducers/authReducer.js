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
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  SET_MAIN,
  SET_PROFILE
} from '../actions/types'

const INITIAL_STATE = {
  token: undefined,
  profile: undefined
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        token: action.token,
        profile: action.profile
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        token: undefined,
        profile: undefined
      }
    case SET_MAIN:
      return {
        ...state,
        ...action.newState
      }
    case SET_PROFILE:
      return {
        ...state,
        profile: action.newProfile
      }
    default:
      return state
  }
}
