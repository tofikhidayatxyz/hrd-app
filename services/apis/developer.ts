import { webApi } from '../../libs/api'

export const listDeveloper = () => webApi().get('/v1/developer')
export const createDeveloper = (data: any) =>
  webApi().post('/v1/developer', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
