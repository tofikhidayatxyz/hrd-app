import { EMPLOYEE } from '../constants/employee'

export const listEmployee = () => ({
  type: EMPLOYEE.LIST,
})

export const listEmployeeSuccess = (payload: any) => ({
  type: EMPLOYEE.LIST_SUCCESS,
  payload,
})

export const listEmployeeFailure = (payload: any) => ({
  type: EMPLOYEE.LIST_FAILURE,
  payload,
})

export const createEmployee = (data: any) => ({
  type: EMPLOYEE.CREATE,
  data,
})

export const createEmployeeSuccess = (payload: any) => ({
  type: EMPLOYEE.CREATE_SUCCESS,
  payload,
})

export const createEmployeeFailure = (payload: any) => ({
  type: EMPLOYEE.CREATE_FAILURE,
  payload,
})
