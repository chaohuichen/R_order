import userReducer from './userReducer'
import { GET_USER, REMOVE_USER } from './userActionTypes'
import { getUser, removeUser } from './userActionCreators'

export default userReducer

export { GET_USER, REMOVE_USER, getUser, removeUser }
