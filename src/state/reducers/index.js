import { combineReducers } from "redux";

import {
  HYDRATE,
  // UPDATE_LAST_SAVED_TIMESTAMP,
  TOGGLE_TAB,
  UPDATE_CONFIG_VALUE,
  UPDATE_CONFIG_CURSOR,
  UPDATE_CONFIG_SELECTION,
  UPDATE_CONFIG_SCROLL,
  REQUEST_DEFAULT_CONFIG_VALUE,
  RECEIVE_DEFAULT_CONFIG_VALUE,
  UPDATE_CONTENT_VALUE,
  UPDATE_CONTENT_CURSOR,
  UPDATE_CONTENT_SELECTION,
  UPDATE_CONTENT_SCROLL,
  REQUEST_DEFAULT_CONTENT_VALUE,
  RECEIVE_DEFAULT_CONTENT_VALUE,
  SLIDE
} from "../../constants/action-types";

const tabState = {
    activeTab: 0,
    // lastSavedTimestamp: ""
}
const configState = {
  isFetching: false,
  value : "Config Editor",
  cursorPos : null,
  selection : null,
  lastCached : null,
  scrollTo : { x : 0, y : 0 }
};
const contentState = {
  isFetching: false,
  value : "Content Editor",
  cursorPos : null,
  selection : null,
  lastCached : null,
  scrollTo : { x : 0, y : 0 }
};
const previewState = {
  slide : { current : 0 }
};

const tabs = (state = tabState, action) => {
  switch (action.type) {
    case TOGGLE_TAB:
      return {...state, activeTab : action.payload};
    // case UPDATE_LAST_SAVED_TIMESTAMP:
    //   return {...state, lastSavedTimestamp : action.payload};
    default:
      return state;
  }
};

const config = (state = configState, action) => {
  switch (action.type) {
    case UPDATE_CONFIG_VALUE:
      return { ...state, value: action.payload };
    case UPDATE_CONFIG_CURSOR:
      return { ...state, cursorPos: action.payload };
    case UPDATE_CONFIG_SELECTION:
      return { ...state, selection: action.payload };
    case UPDATE_CONFIG_SCROLL:
      return { ...state, scrollTo: action.payload };
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

const content = (state = contentState, action) => {
  switch (action.type) {
    case UPDATE_CONTENT_VALUE:
      return { ...state, value: action.payload };
    case UPDATE_CONTENT_CURSOR:
      return { ...state, cursorPos: action.payload };
    case UPDATE_CONTENT_SELECTION:
      return { ...state, selection: action.payload };
    case UPDATE_CONTENT_SCROLL:
      return { ...state, scrollTo: action.payload };
    case REQUEST_DEFAULT_CONTENT_VALUE:
      return { ...state,
        isFetching: true
      };
    case RECEIVE_DEFAULT_CONTENT_VALUE:
      return { ...state,
        isFetching: false,
        value: action.payload
      };
    default:
      return state;
  }
};

const preview = (state = previewState, action) => {
  switch (action.type) {
    case SLIDE:
      return {...state, slide : { current : action.payload }};
    default:
      return state;
  }
};

const reducers = combineReducers({
    tabs,
    config,
    content,
    preview
});

const rootReducer = (state = {}, action) => action.type === HYDRATE ? action.payload : reducers(state, action);

export default rootReducer;
