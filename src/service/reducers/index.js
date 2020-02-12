import { combineReducers } from 'redux'
import authReducer from './authReducer'
import mainReducer from './mainReducers'

export default combineReducers({
  auth: authReducer,
  main: mainReducer
})
