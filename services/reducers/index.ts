import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

// auth
import auth from '../reducers/auth'
import profile from '../reducers/profile'
import employee from '../reducers/employee'
import participant from '../reducers/participant'
import developer from '../reducers/developer'

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

const persistedParticipant = persistReducer(
  {
    key: 'partipant',
    storage: AsyncStorage,
    blacklist: ['create'],
  },
  participant
)

const persistedDeveloper = persistReducer(
  {
    key: 'developer',
    storage: AsyncStorage,
    blacklist: ['create'],
  },
  developer
)

/**
 * App default
 */
const app = {
  auth,
  profile: persistedprofile,
  employee: persistedEmployee,
  participant: persistedParticipant,
  developer: persistedDeveloper,
}

/**
 * Export
 */
export default combineReducers({
  ...app,
})
