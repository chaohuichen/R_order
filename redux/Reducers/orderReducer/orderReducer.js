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
  orderData: [],
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
      console.log('draft 1 ', draft[action.orderIndex])
      // console.log('1 draft ', draft)
      // console.log('action ', action.order, ' index ', action.orderIndex)
      // draft.map((item, index) => {
      //   console.log('......', item)
      // })

      // draft = draft.data.filter((currItem, index) => {
      //   if (index === action.orderIndex) {
      //     console.log('1 draft ', draft)
      //   }
      // })
      if (draft[action.orderIndex].count <= 0) {
      } else {
        draft[action.orderIndex].count -= 1
      }

      console.log('draft 2 ', draft[action.orderIndex])
      // console.log('2 draft ', draft)
      // console.log(' action ', action)

      return draft
    case ADD_ORDER:
      console.log('redux add order')
      console.log(' action ', action)
      console.log('action ', action.order, ' index ', action.orderIndex)
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
