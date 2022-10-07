import { PROFILE } from '../constants/profile'

export const getProfile = () => ({
  type: PROFILE.GET_PROFILE,
})

export const getProfileSuccess = (payload: any) => ({
  type: PROFILE.GET_PROFILE_SUCCESS,
  payload,
})

export const getProfileFailure = (payload: any) => ({
  type: PROFILE.GET_PROFILE_FAILURE,
  payload,
})
