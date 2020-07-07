export const AUTH_USER_SET = "AUTH_USER_SET";

export const setAuthUser = (authUser) => ({
  type: AUTH_USER_SET,
  payload: authUser,
});
