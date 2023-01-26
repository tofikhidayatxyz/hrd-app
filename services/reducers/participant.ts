import { PARTICIPANT } from '../constants/participant'
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
    case PARTICIPANT.LIST:
      draft.list.status = 'REQUEST'
      draft.list.data = []
      break
    case PARTICIPANT.LIST_SUCCESS:
      draft.list.status = 'SUCCESS'
      draft.list.data = action.payload.data
      break
    case PARTICIPANT.LIST_FAILURE:
      draft.list.status = 'FAILURE'
      draft.list.data = []
      break

    case PARTICIPANT.CREATE:
      draft.create.status = 'REQUEST'
      draft.create.data = {}
      break
    case PARTICIPANT.CREATE_SUCCESS:
      draft.create.status = 'SUCCESS'
      draft.create.data = action.payload
      break
    case PARTICIPANT.CREATE_FAILURE:
      draft.create.status = 'FAILURE'
      draft.create.data = action.payload
      break
  }
}, initialState)
