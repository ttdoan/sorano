import { siteActions } from "./../actions/types";

let initialState = {
  nightMode: false,
};

const site = (state = initialState, action) => {
  switch (action.type) {
    case siteActions.TOGGLE_NIGHT_MODE:
      return Object.assign({}, state, { nightMode: action.mode });

    default:
      return state;
  }
};

export default site;
