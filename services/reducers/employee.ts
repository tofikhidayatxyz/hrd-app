import { EMPLOYEE } from '../constants/employee'
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
    case EMPLOYEE.LIST:
      draft.list.status = 'REQUEST'
      draft.list.data = []
      break
    case EMPLOYEE.LIST_SUCCESS:
      draft.list.status = 'SUCCESS'
      draft.list.data = action.payload.data
      break
    case EMPLOYEE.LIST_FAILURE:
      draft.list.status = 'FAILURE'
      draft.list.data = []
      break

    case EMPLOYEE.CREATE:
      draft.create.status = 'REQUEST'
      draft.create.data = {}
      break
    case EMPLOYEE.CREATE_SUCCESS:
      draft.create.status = 'SUCCESS'
      draft.create.data = action.payload
      break
    case EMPLOYEE.CREATE_FAILURE:
      draft.create.status = 'FAILURE'
      draft.create.data = action.payload
      break
  }
}, initialState)
