import produce from 'immer'
import {
  GET_ORDER_HISTORY,
  REMOVE_ORDER_HISTORY,
  CLEAR_ORDER_HISTORY,
  ADD_ORDER_HISTORY,
  FETCH_ORDER_HISTORY,
} from './orderHistoryActionTypes'
import * as FileSystem from 'expo-file-system'

/**
 * INITIAL STATE
 */
const defaultOrderHistory = []
/**
 * REDUCER
 */
const orderHistoryReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return draft.orderHistory
    default: {
      return draft
    }
  }
}, defaultOrderHistory)

export default orderHistoryReducer
