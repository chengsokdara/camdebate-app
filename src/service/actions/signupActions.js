import { SIGNUP_INPUT_CHANGE } from './types'

export const signupInputChange = (name, value) => ({
  type: SIGNUP_INPUT_CHANGE,
  name,
  value
})
