import { accountActions } from "./types";

const logIn = (token) => ({
  type: accountActions.LOGIN,
  token,
});

const logOut = () => ({
  type: accountActions.LOGOUT,
});

export { logIn, logOut };
