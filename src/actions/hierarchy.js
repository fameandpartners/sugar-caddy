import {
  FETCH_HIERARCHY_LOADING,
  FETCH_HIERARCHY_FAILURE,
  FETCH_HIERARCHY_SUCCESS,
  TOGGLE_HIERARCHY_MODE,
  UPDATE_CURRENT_PATH,
  SET_CURRENT_ID,
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
  return (dispatch) => {
    dispatch(fetchHierarchyLoading());
    return fetch('/hierarchy.json')
      .then((data) => {
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

export const setCurrentId = (payload = '') => ({
  type: SET_CURRENT_ID,
  payload,
});

export default {
  fetchHierarchy,
};
