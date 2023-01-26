import {
  createParticipantFailure,
  createParticipantSuccess,
  listParticipantFailure,
  listParticipantSuccess,
} from '../actions/participant'
import { PARTICIPANT } from '../constants/participant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { call, fork, put, takeLatest } from 'redux-saga/effects'
import callApi from './api'
import { login } from '../apis/auth'
import * as navigation from '../routers/root-navigation'
import { createParticipant, listParticipant } from '../apis/participant'
import { Alert } from 'react-native'

function* listParticipantSaga() {
  const { ok, data: response } = yield call(callApi, listParticipant)
  if (ok) {
    yield put(listParticipantSuccess(response))
  } else {
    yield put(listParticipantFailure(response))
  }
}

function* createParticipantSaga({ data }: any) {
  const { ok, data: response } = yield call(callApi, createParticipant, data)
  if (ok) {
    yield put(createParticipantSuccess(response))
    yield navigation.navigate('participant.index', {})
    yield call(listParticipantSaga)
  } else {
    yield put(createParticipantFailure(response))
  }
}

export default function* rootSaga() {
  yield takeLatest(PARTICIPANT.CREATE, createParticipantSaga)
  yield takeLatest(PARTICIPANT.LIST, listParticipantSaga)
}
