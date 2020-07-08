import { AUTH_USER_SET } from "./actions";

const initialState = {
  authUser: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_SET:
      return {
        authUser: action.payload,
      };
    default:
      return state;
  }
};
