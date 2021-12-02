import {
  GET_ORDER_HISTORY,
  REMOVE_ORDER_HISTORY,
  CLEAR_ORDER_HISTORY,
  ADD_ORDER_HISTORY,
  FETCH_ORDER_HISTORY,
} from './orderHistoryActionTypes'
import * as FileSystem from 'expo-file-system'

/**
 * ACTION CREATORS
 */
export const gotOrderHistory = (orderHistory) => ({
  type: GET_ORDER_HISTORY,
  orderHistory,
})

/**
 * THUNK CREATORS
 */
export const getOrderHistory = () => async (dispatch) => {
  try {
    const localCacheDir = FileSystem.documentDirectory
    const systemFiles = await FileSystem.readDirectoryAsync(localCacheDir)

    const filtedsystemFiles = systemFiles.filter((singleFile) =>
      singleFile.includes('pdf')
    )
    dispatch(gotOrderHistory(filtedsystemFiles))
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
