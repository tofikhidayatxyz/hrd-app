import { webApi } from '../../libs/api'

export const login = (payload: any) => webApi().post('/v1/auth/login', payload)

export const register = (payload: any) =>
  webApi().post('/v1/auth/register', payload)
