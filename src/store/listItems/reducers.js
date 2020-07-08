import { SET_LIST_ITEMS } from "./actions";

const initialState = {
  list: [],
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_ITEMS:
      return {
        list: action.payload,
      };
    default:
      return state;
  }
};
