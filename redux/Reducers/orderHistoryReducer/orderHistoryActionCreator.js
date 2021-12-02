import {
  GET_ORDER_HISTORY,
  REMOVE_ORDER_HISTORY,
  CLEAR_ORDER_HISTORY,
  ADD_ORDER_HISTORY,
  FETCH_ORDER_HISTORY,
} from './orderHistoryActionTypes'

/**
 * ACTION CREATORS
 */
export const getOrderHistory = (orderHistory) => ({
  type: GET_ORDER_HISTORY,
  orderHistory,
})

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
//TODO need to fix
// export const removeOrder = (order, orderIdx, sectionTitle) => ({
//   type: REMOVE_ORDER_HISTORY,
//   order,
//   orderIdx,
//   sectionTitle,
// })
// export const addOrder = (order, orderIdx, sectionTitle) => ({
//   type: ADD_ORDER_HISTORY,
//   order,
//   orderIdx,
//   sectionTitle,
// })
// export const clearOrder = () => ({
//   type: CLEAR_ORDER_HISTORY,
// })
// export const fetchOrder = () => ({
//   type: FETCH_ORDER_HISTORY,
// })
