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
  orderData: [
    {
      name: 'Bean 1',
      size: '3oz',
      count: 0,
    },
    {
      name: 'Bean 2',
      size: '5oz',
      count: 0,
    },
    {
      name: 'Bean 3',
      size: '3oz',
      count: 0,
    },
    {
      name: 'Bean 4',
      size: '3oz',
      count: 0,
    },
    {
      name: 'Bean 5',
      size: '7oz',
      count: 0,
    },
    {
      name: 'Bean 6',
      size: '9oz',
      count: 0,
    },
    {
      name: 'Bean 7',
      size: '2oz',
      count: 0,
    },
    {
      name: 'Bean 8',
      size: '8oz',
      count: 0,
    },
  ],
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
      console.log('draft ', draft.data.name)
      console.log('action ', action.order, ' index ', action.orderIndex)
      // draft.data.map((item) => {
      //   console.log('redux remove order ', item.name)
      // })
      // console.log(' action ', action)

      return draft
    case ADD_ORDER:
      console.log('redux add order')
      console.log(' action ', action)
      console.log('action ', action.order, ' index ', action.orderIndex)

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
