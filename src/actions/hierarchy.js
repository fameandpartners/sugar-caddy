import {
  FETCH_HIERARCHY_LOADING,
  FETCH_HIERARCHY_FAILURE,
  FETCH_HIERARCHY_SUCCESS,
  TOGGLE_HIERARCHY_MODE,
  UPDATE_CURRENT_PATH,
} from 'constants/hierarchy';
import firebase from 'utils/firebase';

export const fetchHierarchyLoading = () => ({ type: FETCH_HIERARCHY_LOADING });

export const fetchHierarchyFailure = err => ({
  type: FETCH_HIERARCHY_FAILURE,
  payload: err,
});

export const fetchHierarchySuccess = payload => ({
  type: FETCH_HIERARCHY_SUCCESS,
  payload,
});

export const fetchHierarchy = productId => (dispatch) => {
  dispatch(fetchHierarchyLoading());
  return firebase
    .database()
    .ref(`hierarchy/${productId}`)
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      dispatch(fetchHierarchySuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(fetchHierarchyFailure(err));
      return Promise.reject(err);
    });
};

export const toggleMode = payload => ({ type: TOGGLE_HIERARCHY_MODE, payload });

export const updateCurrentPath = payload => ({
  type: UPDATE_CURRENT_PATH,
  payload,
});

export default {
  fetchHierarchy,
};
