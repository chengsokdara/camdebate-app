import { combineReducers } from 'redux'
import authReducer from './authReducer'
import mainReducer from './mainReducers'
import signinReducer from './signinReducer'
import signupReducer from './signupReducer'

export default combineReducers({
  auth: authReducer,
  main: mainReducer,
  signin: signinReducer,
  signup: signupReducer
})
