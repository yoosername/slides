import fetch from 'cross-fetch'; // browser compat

import {
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
  RECEIVE_DEFAULT_CONTENT_VALUE
} from "../../constants/action-types";

// UI Actions
export const toggleTab = window.toggleTab = tab => ({ type: TOGGLE_TAB, payload: tab });
export const updateConfigValue = val => ({ type: UPDATE_CONFIG_VALUE, payload: val });
export const updateConfigCursor = cursor => ({ type: UPDATE_CONFIG_CURSOR, payload: cursor });
export const updateConfigSelection = ranges => ({ type: UPDATE_CONFIG_SELECTION, payload: ranges });
export const updateConfigScroll = pos => ({ type: UPDATE_CONFIG_SCROLL, payload: pos });
export const updateContentValue = val => ({ type: UPDATE_CONTENT_VALUE, payload: val });
export const updateContentCursor = cursor => ({ type: UPDATE_CONTENT_CURSOR, payload: cursor });
export const updateContentSelection = ranges => ({ type: UPDATE_CONTENT_SELECTION, payload: ranges });
export const updateContentScroll = pos => ({ type: UPDATE_CONTENT_SCROLL, payload: pos });

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

export const fetchDefaultConfigValue = window.fetchDefaultConfigValue = function fetchDefaultConfigValue(url, should_fetch) {
 
  return function (dispatch) {

    if(should_fetch){

      console.log('[fetchDefaultConfigValue] editor has no value so loading default');

      dispatch(requestDefaultConfigValue(url))
   
      return fetch(url)
        .then(
          response => response.text(),
          error => console.log('[fetchDefaultConfigValue] error while fetching config value: ', error)
        )
        .then(val =>
          dispatch(receiveDefaultConfigValue(val))
        )
    }else{
      console.log('[fetchDefaultConfigValue] not fetching as editor has value');
    }

  }
}

export const fetchDefaultContentValue = window.fetchDefaultContentValue = function fetchDefaultContentValue(url, should_fetch) {
 
  return function (dispatch) {

    if(should_fetch){

      console.log('[fetchDefaultContentValue] editor has no value so loading default');

      dispatch(requestDefaultContentValue(url))
   
      return fetch('/presentation.html')
        .then(
          response => response.text(),
          error => console.log('[error] while fetching config value: ', error)
        )
        .then(val =>
          dispatch(receiveDefaultContentValue(val))
        )

    }else{
      console.log('[fetchDefaultContentValue] not fetching as editor has value');
    }

  }
}
