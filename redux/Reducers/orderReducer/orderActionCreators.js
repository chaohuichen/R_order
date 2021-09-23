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
export const removeOrder = (order, orderIndex) => ({
  type: REMOVE_ORDER,
  order,
  orderIndex,
})
export const addOrder = (order, orderIndex) => ({
  type: ADD_ORDER,
  order,
  orderIndex,
})
export const clearOrder = () => ({ type: CLEAR_ORDER })
