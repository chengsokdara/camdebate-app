import { combineReducers } from 'redux'
import authReducer from './authReducer'
import mainReducer from './mainReducers'
import signupReducer from './signupReducer'

export default combineReducers({
  auth: authReducer,
  main: mainReducer,
  signup: signupReducer
})
