import { AUTH_LOGIN, AUTH_LOGOUT, SET_MAIN } from '../actions/types'

const INITIAL_STATE = {
  token: undefined
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MAIN:
      return {
        ...state,
        ...action.newState
      }
    case AUTH_LOGIN:
      return {
        ...state,
        token: action.token
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        token: undefined
      }
    default:
      return state
  }
}
