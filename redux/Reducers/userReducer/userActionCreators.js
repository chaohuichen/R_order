import { GET_USER, REMOVE_USER } from './userActionTypes'

/**
 * ACTION CREATORS
 */
export const getUser = (user) => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })
