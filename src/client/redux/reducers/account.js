import { accountActions } from "./../actions/types";

let initialState = {
  loggedIn: false,
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case accountActions.LOGIN:
      return Object.assign({}, state, { loggedIn: true });

    case accountActions.LOGOUT:
      return Object.assign({}, state, { loggedIn: false });

    default:
      return state;
  }
};

export default account;
