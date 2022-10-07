import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

// auth
import auth from '../reducers/auth'
import profile from '../reducers/profile'
import employee from '../reducers/employee'

const persistedprofile = persistReducer(
  {
    key: 'profile',
    storage: AsyncStorage,
  },
  profile
)

const persistedEmployee = persistReducer(
  {
    key: 'employee',
    storage: AsyncStorage,
    blacklist: ['create'],
  },
  employee
)

/**
 * App default
 */
const app = {
  auth,
  profile: persistedprofile,
  employee: persistedEmployee,
}

/**
 * Export
 */
export default combineReducers({
  ...app,
})
