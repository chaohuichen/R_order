import produce from 'immer'
import { GET_USER, REMOVE_USER } from './userActionTypes'

/**
 * INITIAL STATE
 */
const defaultUser = {}
/**
 * REDUCER
 */
const userReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_USER:
      draft = action.user
      return draft
    case REMOVE_USER:
      draft = defaultUser
      return draft

    default: {
      return draft
    }
  }
}, defaultUser)

export default userReducer
