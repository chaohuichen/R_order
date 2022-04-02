import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'
import user from './userReducer'
import order from './orderReducer'
import orderHistory from './orderHistoryReducer'
import instruction from './instructionReducer'
import location from './locationReducer'

const rootReducer = combineReducers({
  user,
  order,
  orderHistory,
  instruction,
  location,
})

export default (state, action) => {
  // if (action.type === RESET_ALL) {
  //   state = undefined
  //   AsyncStorage.clear()
  // }

  return rootReducer(state, action)
}
