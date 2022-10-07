import { LOGIN, LOGOUT } from '../constants/auth'

export const login = (data: any) => ({
  type: LOGIN.POST,
  data,
})

export const loginSuccess = (payload: any) => ({
  type: LOGIN.SUCCESS,
  payload,
})

export const loginFailure = (payload: any) => ({
  type: LOGIN.FAILURE,
  payload,
})

export const logout = () => ({
  type: LOGOUT.POST,
})
