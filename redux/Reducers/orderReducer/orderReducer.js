import produce from 'immer'
import {
  GET_ORDER,
  REMOVE_ORDER,
  ADD_ORDER,
  CLEAR_ORDER,
  FETCH_ORDER,
} from './orderActionTypes'
import { db } from '../../../API/FirebaseDatabase'
/**
 * INITIAL STATE
 */
const defaultOrder = []
/**
 * REDUCER
 */
const orderReducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_ORDER:
      db.ref('/productData').once('value', (snapshot) => {
        if (snapshot.exists()) {
          let productsData = []
          for (let key in snapshot.val()) {
            let title = key
            let data = Object.values(snapshot.val()[`${title}`])
            if (title && data) {
              let payload = {
                title,
                data,
              }
              productsData.push(payload)
            }
          }
          // setData(productsData)
          draft = productsData
          // console.log('draft ', draft)
        }
      })
      return draft
    case GET_ORDER:
      return action.order
    case REMOVE_ORDER: {
      const copyOrder = draft.map((singleData) => {
        if (singleData.title === action.sectionTitle) {
          const copySingleData = singleData.data.map((singleOrder) => {
            if (singleOrder.name === action.order.name) {
              const count =
                singleOrder.count - 1 > 0 ? singleOrder.count - 1 : 0
              return { ...singleOrder, count: count }
            } else {
              return singleOrder
            }
          })
          return { data: copySingleData, title: singleData.title }
        } else {
          return singleData
        }
      })
      return copyOrder
    }
    case ADD_ORDER: {
      const copyOrder = draft.map((singleData) => {
        if (singleData.title === action.sectionTitle) {
          const copySingleData = singleData.data.map((singleOrder) => {
            if (singleOrder.name === action.order.name) {
              return { ...singleOrder, count: singleOrder.count + 1 }
            } else {
              return singleOrder
            }
          })
          return { data: copySingleData, title: singleData.title }
        } else {
          return singleData
        }
      })
      return copyOrder
    }
    case CLEAR_ORDER:
      const data = draft.map((singleOrder) => {
        return {
          data: singleOrder.data.map((singleItem) => {
            return { ...singleItem, count: 0 }
          }),
          title: singleOrder.title,
        }
      })

      return data
    default: {
      return draft
    }
  }
}, defaultOrder)

export default orderReducer
