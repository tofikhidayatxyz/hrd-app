import { webApi } from '../../libs/api'

export const listParticipant = () => webApi().get('/v1/participant')
export const createParticipant = (data: any) =>
  webApi().post('/v1/participant', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
