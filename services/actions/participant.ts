import { PARTICIPANT } from '../constants/participant'

export const listParticipant = () => ({
  type: PARTICIPANT.LIST,
})

export const listParticipantSuccess = (payload: any) => ({
  type: PARTICIPANT.LIST_SUCCESS,
  payload,
})

export const listParticipantFailure = (payload: any) => ({
  type: PARTICIPANT.LIST_FAILURE,
  payload,
})

export const createParticipant = (data: any) => ({
  type: PARTICIPANT.CREATE,
  data,
})

export const createParticipantSuccess = (payload: any) => ({
  type: PARTICIPANT.CREATE_SUCCESS,
  payload,
})

export const createParticipantFailure = (payload: any) => ({
  type: PARTICIPANT.CREATE_FAILURE,
  payload,
})
