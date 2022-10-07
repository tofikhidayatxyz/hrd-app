import {
  createEmployeeFailure,
  createEmployeeSuccess,
  listEmployeeFailure,
  listEmployeeSuccess,
} from './../actions/employee'
import { EMPLOYEE } from './../constants/employee'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { call, fork, put, takeLatest } from 'redux-saga/effects'
import callApi from './api'
import { login } from '../apis/auth'
import * as navigation from '../routers/root-navigation'
import { createEmployee, listEmployee } from '../apis/employee'
import { Alert } from 'react-native'

function* listEmployeeSaga() {
  const { ok, data: response } = yield call(callApi, listEmployee)
  if (ok) {
    yield put(listEmployeeSuccess(response))
  } else {
    yield put(listEmployeeFailure(response))
  }
}

function* createEmployeeSaga({ data }: any) {
  const { ok, data: response } = yield call(callApi, createEmployee, data)
  if (ok) {
    yield put(createEmployeeSuccess(response))
    yield navigation.navigate('employee.index', {})
    yield call(listEmployeeSaga)
  } else {
    yield put(createEmployeeFailure(response))
  }
}

export default function* rootSaga() {
  yield takeLatest(EMPLOYEE.CREATE, createEmployeeSaga)
  yield takeLatest(EMPLOYEE.LIST, listEmployeeSaga)
}
