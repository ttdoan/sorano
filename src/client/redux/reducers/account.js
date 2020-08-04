import { accountActions } from "./../actions/types";

let initialState = {
  token: "",
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case accountActions.LOGIN:
      return Object.assign({}, state, { token: action.token });

    case accountActions.LOGOUT:
      return Object.assign({}, state, { token: "" });

    default:
      return state;
  }
};

export default account;
