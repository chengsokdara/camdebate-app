import { SIGNIN_INPUT_CHANGE } from './types'

export const signinInputChange = (name, value) => ({
  type: SIGNIN_INPUT_CHANGE,
  name,
  value
})
