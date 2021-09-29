import {
  GET_ORDER,
  REMOVE_ORDER,
  CLEAR_ORDER,
  ADD_ORDER,
} from './orderActionTypes'

/**
 * ACTION CREATORS
 */
export const getOrder = (order) => ({ type: GET_ORDER, order })
export const removeOrder = (order) => ({
  type: REMOVE_ORDER,
  order,
})
export const addOrder = (order) => ({
  type: ADD_ORDER,
  order,
})
export const clearOrder = () => ({ type: CLEAR_ORDER })
