import fetch from 'cross-fetch';

import {
  UPDATE_CONFIG_VALUE,
  UPDATE_CONFIG_CURSOR,
  UPDATE_CONFIG_SELECTION,
  REQUEST_DEFAULT_CONFIG_VALUE,
  RECEIVE_DEFAULT_CONFIG_VALUE
} from "../../constants/action-types";

// UI Actions
export const updateConfigValue = val => ({ type: UPDATE_CONFIG_VALUE, payload: val });
export const updateConfigCursor = cursor => ({ type: UPDATE_CONFIG_CURSOR, payload: cursor });
export const updateConfigSelection = ranges => ({ type: UPDATE_CONFIG_SELECTION, payload: ranges });

// Network Actions
export const requestDefaultConfigValue = (url) => {
  return {
    type: REQUEST_DEFAULT_CONFIG_VALUE, payload: url
  }
};

export const receiveDefaultConfigValue = (value) => {
  return {
    type: RECEIVE_DEFAULT_CONFIG_VALUE,
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
