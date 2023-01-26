import { DEVELOPER } from '../constants/developer'

export const listDeveloper = () => ({
  type: DEVELOPER.LIST,
})

export const listDeveloperSuccess = (payload: any) => ({
  type: DEVELOPER.LIST_SUCCESS,
  payload,
})

export const listDeveloperFailure = (payload: any) => ({
  type: DEVELOPER.LIST_FAILURE,
  payload,
})

export const createDeveloper = (data: any) => ({
  type: DEVELOPER.CREATE,
  data,
})

export const createDeveloperSuccess = (payload: any) => ({
  type: DEVELOPER.CREATE_SUCCESS,
  payload,
})

export const createDeveloperFailure = (payload: any) => ({
  type: DEVELOPER.CREATE_FAILURE,
  payload,
})
