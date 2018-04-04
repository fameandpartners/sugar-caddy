import {
  FETCH_COMPONENTS,
  FETCH_COMPONENTS_LOADING,
  FETCH_COMPONENTS_FAILURE,
  FETCH_COMPONENTS_SUCCESS,
  UPDATE_COMPONENT_LOADING,
  UPDATE_COMPONENT_FAILURE,
  UPDATE_COMPONENT_SUCCESS,
  ADD_COMPONENT,
  SET_CURRENT_COMPONENT,
  DELETE_COMPONENT_LOADING,
  DELETE_COMPONENT_FAILURE,
  DELETE_COMPONENT_SUCCESS,
} from 'constants/components';
import fetch from 'utils/fetch';
import requestWrapper from 'utils/request-wrapper';
import {
  fetchComponentsApi,
  createComponentApi,
  deleteComponentApi,
} from 'requests';

export const fetchComponentsLoading = () => ({
  type: FETCH_COMPONENTS_LOADING,
});

export const fetchComponentsFailure = err => ({
  type: FETCH_COMPONENTS_FAILURE,
  payload: err,
});

export const fetchComponentsSuccess = payload => ({
  type: FETCH_COMPONENTS_SUCCESS,
  payload,
});

export const fetchComponents = requestWrapper(
  FETCH_COMPONENTS,
  fetchComponentsApi,
);

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
    return fetch(`/components/${componentId}.json`, {
      method: 'PATCH',
      'content-type': 'Application/json',
      body: JSON.stringify(update),
    })
      .then((data) => {
        dispatch(updateComponentSuccess({ componentId, update: data }));
        return data;
      })
      .catch((err) => {
        dispatch(updateComponentFailure(err));
        return Promise.reject(err);
      });
  };
}

export const createComponent = requestWrapper(
  ADD_COMPONENT,
  createComponentApi,
);

export const setCurrentId = (payload = '') => ({
  type: SET_CURRENT_COMPONENT,
  payload,
});

export const deleteComponentLoading = () => ({
  type: DELETE_COMPONENT_LOADING,
});

export const deleteComponentFailure = err => ({
  type: DELETE_COMPONENT_FAILURE,
  payload: err,
});

export const deleteComponentSuccess = payload => ({
  type: DELETE_COMPONENT_SUCCESS,
  payload,
});

export const deleteComponent = componentId => (dispatch) => {
  dispatch(deleteComponentLoading());
  return deleteComponentApi(componentId)
    .then((data) => {
      dispatch(deleteComponentSuccess(componentId));
      return data;
    })
    .catch((err) => {
      dispatch(deleteComponentFailure(err));
      return err;
    });
};
