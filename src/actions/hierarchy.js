import {
  FETCH_HIERARCHY_LOADING,
  FETCH_HIERARCHY_FAILURE,
  FETCH_HIERARCHY_SUCCESS,
  SET_HIERARCHY_MODE,
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

export const setMode = payload => ({ type: SET_HIERARCHY_MODE, payload });

export default {
  fetchHierarchy,
};
