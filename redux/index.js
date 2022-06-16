import { createStore, combineReducers, applyMiddleware } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './Reducers'
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
export const store = createStore(persistedReducer, middleware)

export * from './Reducers/userReducer'
export * from './Reducers/orderHistoryReducer'
export * from './Reducers/orderReducer'
export * from './Reducers/instructionReducer'
export * from './Reducers/locationReducer'
