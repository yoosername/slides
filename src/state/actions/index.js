import fetch from 'cross-fetch'; // browser compat

import {
  TOGGLE_TAB,
  UPDATE_CONFIG_VALUE,
  UPDATE_CONFIG_CURSOR,
  UPDATE_CONFIG_SELECTION,
  REQUEST_DEFAULT_CONFIG_VALUE,
  RECEIVE_DEFAULT_CONFIG_VALUE,
  UPDATE_CONTENT_VALUE,
  UPDATE_CONTENT_CURSOR,
  UPDATE_CONTENT_SELECTION,
  REQUEST_DEFAULT_CONTENT_VALUE,
  RECEIVE_DEFAULT_CONTENT_VALUE
} from "../../constants/action-types";

// UI Actions
export const toggleTab = window.toggleTab = tab => ({ type: TOGGLE_TAB, payload: tab });
export const updateConfigValue = val => ({ type: UPDATE_CONFIG_VALUE, payload: val });
export const updateConfigCursor = cursor => ({ type: UPDATE_CONFIG_CURSOR, payload: cursor });
export const updateConfigSelection = ranges => ({ type: UPDATE_CONFIG_SELECTION, payload: ranges });
export const updateContentValue = val => ({ type: UPDATE_CONTENT_VALUE, payload: val });
export const updateContentCursor = cursor => ({ type: UPDATE_CONTENT_CURSOR, payload: cursor });
export const updateContentSelection = ranges => ({ type: UPDATE_CONTENT_SELECTION, payload: ranges });

// Network Actions
export const requestDefaultConfigValue = (url) => {
  return {
    type: REQUEST_DEFAULT_CONFIG_VALUE, payload: url
  }
};
export const requestDefaultContentValue = (url) => {
  return {
    type: REQUEST_DEFAULT_CONTENT_VALUE, payload: url
  }
};

export const receiveDefaultConfigValue = (value) => {
  return {
    type: RECEIVE_DEFAULT_CONFIG_VALUE,
    payload : value
  }
};
export const receiveDefaultContentValue = (value) => {
  return {
    type: RECEIVE_DEFAULT_CONTENT_VALUE,
    payload : value
  }
};

export const fetchDefaultConfigValue = window.fetchDefaultConfigValue = function fetchDefaultConfigValue(url) {
 
  return function (dispatch) {

    dispatch(requestDefaultConfigValue(url))
 
    return fetch('/config.js')
      .then(
        response => response.text(),
        error => console.log('[error] while fetching config value: ', error)
      )
      .then(val =>
        dispatch(receiveDefaultConfigValue(val))
      )
  }
}

export const fetchDefaultContentValue = window.fetchDefaultContentValue = function fetchDefaultContentValue(url) {
 
  return function (dispatch) {

    dispatch(requestDefaultContentValue(url))
 
    return fetch('/presentation.html')
      .then(
        response => response.text(),
        error => console.log('[error] while fetching config value: ', error)
      )
      .then(val =>
        dispatch(receiveDefaultContentValue(val))
      )
  }
}
