import { siteActions } from "./types";

const toggleNightMode = (mode) => ({
  type: siteActions.TOGGLE_NIGHT_MODE,
  mode,
});

export { toggleNightMode };
