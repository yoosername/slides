import { combineReducers } from "redux";

import {
  HYDRATE,
  ACTIVATE_TAB,
  UPDATE_CONFIG_VALUE,
  UPDATE_CONFIG_CURSOR,
  UPDATE_CONFIG_SELECTION,
  REQUEST_DEFAULT_CONFIG_VALUE,
  RECEIVE_DEFAULT_CONFIG_VALUE
} from "../../constants/action-types";

const tabState = {
    activeTab: 0
}
const configState = {
  isFetching: false,
  value : "Config Editor",
  cursorPos : null,
  selection : null
};

const tabs = (state = tabState, action) => {
  return (action.type === ACTIVATE_TAB) ? [...state, action.payload] : state;
};
const config = (state = configState, action) => {
  switch (action.type) {
    case UPDATE_CONFIG_VALUE:
      return { ...state, value: action.payload };
    case UPDATE_CONFIG_CURSOR:
      return { ...state, cursorPos: action.payload };
    case UPDATE_CONFIG_SELECTION:
      return { ...state, selection: action.payload };
    case REQUEST_DEFAULT_CONFIG_VALUE:
      return { ...state,
        isFetching: true
      };
    case RECEIVE_DEFAULT_CONFIG_VALUE:
      return { ...state,
        isFetching: false,
        value: action.payload
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
    tabs,
    config
});

const rootReducer = (state = {}, action) => action.type === HYDRATE ? action.payload : reducers(state, action);

export default rootReducer;
