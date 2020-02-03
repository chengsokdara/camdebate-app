import { SET_MAIN } from '../actions/types'

const INITIAL_STATE = {
  test: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MAIN:
      return {
        ...state,
        ...action.newState
      }
    default:
      return state
  }
}
