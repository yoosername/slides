import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

//import {updateLastSavedTimestamp} from "./actions/index"
import rootReducer from "./reducers/index";
import {loadState,saveState} from "./storage/localStorage";

// Create logger middleware
const loggerMiddleware = createLogger()

// Load initial state from cache
const persistedState = loadState();
const store = window.store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

// Save state to cache on changes
store.subscribe((action) => {
  saveState(store.getState());
});

export default store;
