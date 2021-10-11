import produce from 'immer'
import {
  GET_ORDER,
  REMOVE_ORDER,
  ADD_ORDER,
  CLEAR_ORDER,
} from './orderActionTypes'

/**
 * INITIAL STATE
 */
const defaultOrder = {
  order: [],
}
/**
 * REDUCER
 */
const orderReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_ORDER:
      // draft = action.user
      return action.order
    case REMOVE_ORDER:
      const isOrder = draft.order.find(
        (order) => order.name === action.order.name
      )
      let count = 0
      if (isOrder) {
        const orderFound = draft.order.map((singleOrder, index) => {
          if (singleOrder.name === action.order.name) {
            const copySingleOrder = { ...singleOrder }
            copySingleOrder.count--
            count = copySingleOrder.count
            if (copySingleOrder.count > 0) {
              return copySingleOrder
            }
          }
          return singleOrder
        })
        if (count === 0) {
          draft.order = draft.order.filter(
            (myOrder) => myOrder.name !== action.order.name
          )
          return draft
        } else {
          draft.order = orderFound
          return draft
        }
      }
      return draft

    case ADD_ORDER:
      const isOrderFound = draft.order.find(
        (order) => order.name === action.order.name
      )
      if (isOrderFound) {
        const orderFound = draft.order.map((singleOrder) => {
          if (singleOrder.name === action.order.name) {
            const copySingleOrder = { ...singleOrder }
            if (copySingleOrder.count < 21) {
              copySingleOrder.count++
            }
            return copySingleOrder
          }
          return singleOrder
        })
        draft.order = orderFound
        return draft
      } else {
        action.order.count += 1
        draft.order.push(action.order)
        return draft
      }
    case CLEAR_ORDER:
      return defaultOrder
    default: {
      return draft
    }
  }
}, defaultOrder)

export default orderReducer
