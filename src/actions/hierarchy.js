import {
  FETCH_HIERARCHY_LOADING,
  FETCH_HIERARCHY_FAILURE,
  FETCH_HIERARCHY_SUCCESS,
  TOGGLE_HIERARCHY_MODE,
  UPDATE_CURRENT_PATH,
  SET_CURRENT_ID,
  UPDATE_COMPONENT_LOADING,
  UPDATE_COMPONENT_FAILURE,
  UPDATE_COMPONENT_SUCCESS,
} from 'constants/hierarchy';
import fetch from 'utils/fetch';

export const fetchHierarchyLoading = () => ({ type: FETCH_HIERARCHY_LOADING });

export const fetchHierarchyFailure = err => ({
  type: FETCH_HIERARCHY_FAILURE,
  payload: err,
});

export const fetchHierarchySuccess = payload => ({
  type: FETCH_HIERARCHY_SUCCESS,
  payload,
});

export function fetchHierarchy() {
  console.log('fetch hierarchy');
  return (dispatch) => {
    dispatch(fetchHierarchyLoading());
    console.log('after dispatch');
    return fetch('/.json')
      .then((data) => {
        console.log('after fetch', data);
        dispatch(fetchHierarchySuccess(data));
        return data;
      })
      .catch((err) => {
        dispatch(fetchHierarchyFailure(err));
        return Promise.reject(err);
      });
  };
}

export const toggleMode = payload => ({ type: TOGGLE_HIERARCHY_MODE, payload });

export const updateCurrentPath = payload => ({
  type: UPDATE_CURRENT_PATH,
  payload,
});

export const setCurrentId = payload => ({
  type: SET_CURRENT_ID,
  payload,
});

export const updateComponentLoading = () => ({
  type: UPDATE_COMPONENT_LOADING,
});

export const updateComponentFailure = err => ({
  type: UPDATE_COMPONENT_FAILURE,
  payload: err,
});

export const updateComponentSuccess = payload => ({
  type: UPDATE_COMPONENT_SUCCESS,
  payload,
});

export function updateComponent(componentId, update) {
  return (dispatch) => {
    dispatch(updateComponentLoading());
    fetch(`/${componentId}.json`, {
      method: 'PATCH',
      'content-type': 'Application/json',
      body: JSON.stringify(update),
    })
      .then((data) => {
        dispatch(updateComponentSuccess({ componentId, update }));
        return data;
      })
      .catch((err) => {
        dispatch(updateComponentFailure(err));
        return Promise.reject(err);
      });
  };
}

export default {
  fetchHierarchy,
};
