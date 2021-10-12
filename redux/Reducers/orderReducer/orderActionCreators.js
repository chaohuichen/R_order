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
export const removeOrder = (order, orderIdx, sectionTitle) => ({
  type: REMOVE_ORDER,
  order,
  orderIdx,
  sectionTitle,
})
export const addOrder = (order, orderIdx, sectionTitle) => ({
  type: ADD_ORDER,
  order,
  orderIdx,
  sectionTitle,
})
export const clearOrder = () => ({
  type: CLEAR_ORDER,
})
