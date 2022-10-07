import { webApi } from '../../libs/api'

export const getProfile = () => webApi({ auth: true }).get('/v1/profile')
