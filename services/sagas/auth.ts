import AsyncStorage from '@react-native-async-storage/async-storage'
import { call, fork, put, takeLatest } from 'redux-saga/effects'
import callApi from './api'
import { login } from '../apis/auth'
import { LOGIN, LOGOUT } from '../constants/auth'
import { loginFailure, loginSuccess } from '../actions/auth'
import * as navigation from '../routers/root-navigation'
import { getProfileSaga } from './profile'
import { Alert } from 'react-native'

function* loginSaga({ data }: any) {
  const { ok, data: response } = yield call(callApi, login, data)
  if (ok) {
    yield put(loginSuccess(response))
    yield AsyncStorage.setItem('--app-auth-token', response.data.token)
    yield fork(getProfileSaga)
    yield navigation.navigate('home', {})
  } else {
    Alert.alert('Login Failure, Check your credential')
    yield put(loginFailure(response.data))
    yield navigation.navigate('auth.signin', {})
  }
}

function* logoutSaga() {
  AsyncStorage.removeItem('--app-auth-token')
  yield navigation.navigate('auth.signin', {})
}

export default function* rootSaga() {
  yield takeLatest(LOGIN.POST, loginSaga)
  yield takeLatest(LOGOUT.POST, logoutSaga)
}
