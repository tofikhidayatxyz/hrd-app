import { webApi } from '../../libs/api'

export const listEmployee = () => webApi().get('/v1/employee')
export const createEmployee = (data: any) =>
  webApi().post('/v1/employee', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
export const showEmployee = (id: any) => webApi().get(`/v1/employee/${id}`)
export const updateEmployee = (id: any, data: any) =>
  webApi().post(`/v1/employee/${id}`, data)
export const deleteEmployee = (id: any) => webApi().delete(`/v1/employee/${id}`)
