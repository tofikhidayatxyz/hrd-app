import { all } from 'redux-saga/effects'
import auth from './auth'
import profile from './profile'
import employee from './employee'

// sagas call
function* rootSaga() {
  yield all([auth(), profile(), employee()])
}

export default rootSaga
