import { PROFILE } from '../constants/profile'
import produce from 'immer'

const initialState: any = {
  profile: {
    status: false,
    data: {},
  },
}

export default produce((draft, action) => {
  switch (action.type) {
    case PROFILE.GET_PROFILE:
      draft.profile.status = 'REQUEST'
      break
    case PROFILE.GET_PROFILE_SUCCESS:
      draft.profile.status = 'SUCCESS'
      draft.profile.data = action.payload
      break
    case PROFILE.GET_PROFILE_FAILURE:
      draft.profile.status = 'FAILURE'
      break
  }
}, initialState)
