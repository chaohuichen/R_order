import produce from "immer";
import {
  GET_ORDER,
  REMOVE_ORDER,
  ADD_ORDER,
  CLEAR_ORDER,
} from "./orderActionTypes";

/**
 * INITIAL STATE
 */
const defaultOrder = {};
/**
 * REDUCER
 */
const orderReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_ORDER:
      // draft = action.user
      return action.order;
    case REMOVE_ORDER:
      draft = defaultOrder;
      return draft;
    case ADD_ORDER:
      return draft;
    case CLEAR_ORDER:
      draft = defaultOrder;
    default: {
      return draft;
    }
  }
}, defaultOrder);

export default orderReducer;
