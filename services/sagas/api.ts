import { call } from 'redux-saga/effects'

export default function* callApi(api: any, ...params: any) {
  const response = yield call(api, ...params)
  const { ok, code } = response
  if (ok) {
    return response
  }
  if (code == 401) {
    console.log('OPS')
  }
  return response
}
