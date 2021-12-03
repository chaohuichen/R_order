import orderHistoryReducer from './orderHistoryReducer'
import {
  GET_ORDER_HISTORY,
  REMOVE_ORDER_HISTORY,
  CLEAR_ORDER_HISTORY,
  ADD_ORDER_HISTORY,
  FETCH_ORDER_HISTORY,
} from './orderHistoryActionTypes'
import { getOrderHistory } from './orderHistoryActionCreator'

export default orderHistoryReducer

export {
  GET_ORDER_HISTORY,
  REMOVE_ORDER_HISTORY,
  CLEAR_ORDER_HISTORY,
  ADD_ORDER_HISTORY,
  FETCH_ORDER_HISTORY,
  getOrderHistory,
}
