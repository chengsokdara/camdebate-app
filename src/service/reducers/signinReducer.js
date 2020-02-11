import { SIGNIN_INPUT_CHANGE } from '../actions/types'

const INITIAL_STATE = {
  Phone: undefined,
  Password: undefined
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNIN_INPUT_CHANGE:
      return {
        ...state,
        [action.name]: action.value
      }
    default:
      return state
  }
}
