import orderReducer from "./orderReducer";
import {
  GET_ORDER,
  REMOVE_ORDER,
  ADD_ORDER,
  CLEAR_ORDER,
} from "./orderActionTypes";
import {
  getOrder,
  removeOrder,
  addOrder,
  clearOrder,
} from "./orderActionCreators";

export default orderReducer;

export {
  GET_ORDER,
  REMOVE_ORDER,
  ADD_ORDER,
  CLEAR_ORDER,
  clearOrder,
  addOrder,
  getOrder,
  removeOrder,
};
