import { SIGNUP_INPUT_CHANGE } from '../actions/types'

const INITIAL_STATE = {
  Title: undefined,
  GivenName: undefined,
  FamilyName: undefined,
  Nationality: undefined,
  Country: undefined,
  Phone: undefined,
  Email: undefined,
  Password: undefined
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_INPUT_CHANGE:
      return {
        ...state,
        [action.name]: action.value
      }
    default:
      return state
  }
}
