import AsyncStorage from '@react-native-async-storage/async-storage'
import { call, put, takeLatest } from 'redux-saga/effects'
import callApi from './api'
import { getProfile } from '../apis/profile'
import { getProfileSuccess } from '../actions/profile'
import { PROFILE } from '../constants/profile'
import * as navigation from '../routers/root-navigation'

export function* getProfileSaga() {
  const { ok, data: response } = yield call(callApi, getProfile, {})

  if (ok) {
    yield put(getProfileSuccess(response.data))
  } else {
    yield AsyncStorage.removeItem('--app-auth-token')
    navigation.navigate('auth.signin', {})
  }
}

export default function* rootSaga() {
  yield takeLatest(PROFILE.GET_PROFILE, getProfileSaga)
}
