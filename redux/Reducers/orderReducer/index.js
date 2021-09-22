import userReducer from "./userReducer";
import { GET_ORDER, REMOVE_ORDER } from "./userActionTypes";
import { getOrder, removeOrder } from "./userActionCreators";

export default orderReducer;

export { GET_ORDER, REMOVE_ORDER, getOrder, removeOrder };
