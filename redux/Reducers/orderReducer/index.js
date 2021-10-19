import orderReducer from './orderReducer'
import {
  GET_ORDER,
  REMOVE_ORDER,
  ADD_ORDER,
  CLEAR_ORDER,
  FETCH_ORDER,
} from './orderActionTypes'
import {
  getOrder,
  removeOrder,
  addOrder,
  clearOrder,
  fetchOrder,
} from './orderActionCreators'

export default orderReducer

export {
  GET_ORDER,
  REMOVE_ORDER,
  ADD_ORDER,
  CLEAR_ORDER,
  FETCH_ORDER,
  fetchOrder,
  clearOrder,
  addOrder,
  getOrder,
  removeOrder,
}
