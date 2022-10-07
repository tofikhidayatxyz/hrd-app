import { LOGIN, LOGOUT } from '../constants/auth'
import produce from 'immer'

const initialState: any = {
  login: {
    status: false,
    message: null,
  },
}

export default produce((draft, action) => {
  switch (action.type) {
    case LOGIN.POST:
      draft.login.status = 'REQUEST'
      draft.login.message = null
      break
    case LOGIN.SUCCESS:
      draft.login.status = 'SUCCESS'
      draft.login.message = action.payload
      break
    case LOGIN.FAILURE:
      draft.login.status = 'FAILURE'
      draft.login.message = action?.payload?.errors || {}
      break
    case LOGOUT.POST:
      break
  }
}, initialState)
