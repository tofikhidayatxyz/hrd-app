import {
  createDeveloperFailure,
  createDeveloperSuccess,
  listDeveloperFailure,
  listDeveloperSuccess,
} from '../actions/developer'
import { DEVELOPER } from '../constants/developer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { call, fork, put, takeLatest } from 'redux-saga/effects'
import callApi from './api'
import { login } from '../apis/auth'
import * as navigation from '../routers/root-navigation'
import { createDeveloper, listDeveloper } from '../apis/developer'

function* listDeveloperSaga() {
  const { ok, data: response } = yield call(callApi, listDeveloper)
  if (ok) {
    yield put(listDeveloperSuccess(response))
  } else {
    yield put(listDeveloperFailure(response))
  }
}

function* createDeveloperSaga({ data }: any) {
  const { ok, data: response } = yield call(callApi, createDeveloper, data)
  if (ok) {
    yield put(createDeveloperSuccess(response))
    yield navigation.navigate('developer.index', {})
    yield call(listDeveloperSaga)
  } else {
    yield put(createDeveloperFailure(response))
  }
}

export default function* rootSaga() {
  yield takeLatest(DEVELOPER.CREATE, createDeveloperSaga)
  yield takeLatest(DEVELOPER.LIST, listDeveloperSaga)
}
