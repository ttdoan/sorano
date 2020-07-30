import { accountActions } from "./types";

const logIn = () => ({
  type: accountActions.LOGIN,
});

const logOut = () => ({
  type: accountActions.LOGOUT,
});

export { logIn, logOut };
