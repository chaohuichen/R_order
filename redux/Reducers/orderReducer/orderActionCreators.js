import { GET_ORDER, REMOVE_ORDER, REMOVE_ORDER } from "./orderActionTypes";

/**
 * ACTION CREATORS
 */
export const getUser = (order) => ({ type: GET_ORDER, order });
export const removeUser = () => ({ type: REMOVE_ORDER });
