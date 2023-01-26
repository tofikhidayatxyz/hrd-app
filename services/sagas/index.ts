import { all } from 'redux-saga/effects'
import auth from './auth'
import profile from './profile'
import employee from './employee'
import participant from './participant'
import developer from './developer'

// sagas call
function* rootSaga() {
  yield all([auth(), profile(), employee(), participant(), developer()])
}

export default rootSaga
