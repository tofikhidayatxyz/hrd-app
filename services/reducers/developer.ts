import { DEVELOPER } from '../constants/developer'
import produce from 'immer'

const initialState: any = {
  list: {
    status: 'REQUEST',
    data: [],
  },
  create: {
    status: 'REQUEST',
    data: {},
  },
}

export default produce((draft, action) => {
  switch (action.type) {
    case DEVELOPER.LIST:
      draft.list.status = 'REQUEST'
      draft.list.data = []
      break
    case DEVELOPER.LIST_SUCCESS:
      draft.list.status = 'SUCCESS'
      draft.list.data = action.payload.data
      break
    case DEVELOPER.LIST_FAILURE:
      draft.list.status = 'FAILURE'
      draft.list.data = []
      break

    case DEVELOPER.CREATE:
      draft.create.status = 'REQUEST'
      draft.create.data = {}
      break
    case DEVELOPER.CREATE_SUCCESS:
      draft.create.status = 'SUCCESS'
      draft.create.data = action.payload
      break
    case DEVELOPER.CREATE_FAILURE:
      draft.create.status = 'FAILURE'
      draft.create.data = action.payload
      break
  }
}, initialState)
