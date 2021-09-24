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
      if (draft[action.orderIndex].count <= 0) {
      } else {
        draft[action.orderIndex].count -= 1
      }
      return draft
    case ADD_ORDER:
      if (draft[action.orderIndex].count >= 20) {
      } else {
        draft[action.orderIndex].count += 1
      }
      // console.log('action ', action.name, ' ', action.index)
      return draft
    case CLEAR_ORDER:
      draft = defaultOrder
    default: {
      return draft
    }
  }
}, defaultOrder)

export default orderReducer
