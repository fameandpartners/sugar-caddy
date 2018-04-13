import {
  FETCH_COMPONENTS_LOADING,
  FETCH_COMPONENTS_FAILURE,
  FETCH_COMPONENTS_SUCCESS,
  FETCH_ATTACHMENTS_LOADING,
  FETCH_ATTACHMENTS_FAILURE,
  FETCH_ATTACHMENTS_SUCCESS,
  UPDATE_COMPONENT_LOADING,
  UPDATE_COMPONENT_FAILURE,
  UPDATE_COMPONENT_SUCCESS,
  UPDATE_ATTACHMENTS_LOADING,
  UPDATE_ATTACHMENTS_FAILURE,
  UPDATE_ATTACHMENTS_SUCCESS,
  ADD_COMPONENT_LOADING,
  ADD_COMPONENT_FAILURE,
  ADD_COMPONENT_SUCCESS,
  SET_CURRENT_COMPONENT,
  DELETE_COMPONENT_LOADING,
  DELETE_COMPONENT_FAILURE,
  DELETE_COMPONENT_SUCCESS,
} from 'constants/components';
import firebase from 'utils/firebase';

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

export const fetchComponents = () => (dispatch) => {
  dispatch(fetchComponentsLoading());
  return firebase
    .database()
    .ref('components')
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      dispatch(fetchComponentsSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(fetchComponentsFailure(err));
      return Promise.reject(err);
    });
};

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

export const updateComponent = (componentId, update) => (dispatch) => {
  dispatch(updateComponentLoading());
  return firebase
    .database()
    .ref(`/components/${componentId}`)
    .update(update)
    .then(() => {
      dispatch(updateComponentSuccess({ componentId, update }));
      return update;
    })
    .catch((err) => {
      dispatch(updateComponentFailure(err));
      return Promise.reject(err);
    });
};

export const createComponentLoading = () => ({
  type: ADD_COMPONENT_LOADING,
});

export const createComponentFailure = err => ({
  type: ADD_COMPONENT_FAILURE,
  payload: err,
});

export const createComponentSuccess = payload => ({
  type: ADD_COMPONENT_SUCCESS,
  payload,
});

export const createComponent = component => (dispatch) => {
  dispatch(createComponentLoading());
  return firebase
    .database()
    .ref(`/components/${component.id}`)
    .set(component)
    .then(() => {
      dispatch(createComponentSuccess(component));
      return component;
    })
    .catch((err) => {
      dispatch(createComponentFailure(err));
      return Promise.reject(err);
    });
};

export const fetchAttachmentsLoading = () => ({
  type: FETCH_ATTACHMENTS_LOADING,
});

export const fetchAttachmentsFailure = err => ({
  type: FETCH_ATTACHMENTS_FAILURE,
  payload: err,
});

export const fetchAttachmentsSuccess = payload => ({
  type: FETCH_ATTACHMENTS_SUCCESS,
  payload,
});

export const fetchAttachments = productId => (dispatch) => {
  dispatch(fetchAttachmentsLoading());
  return firebase
    .database()
    .ref(`attachedModules/${productId}`)
    .once('value')
    .then((snapshot) => {
      const data = snapshot.val() || {};
      dispatch(fetchAttachmentsSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(fetchAttachmentsFailure(err));
    });
};

export const updateAttachmentsLoading = () => ({
  type: UPDATE_ATTACHMENTS_LOADING,
});

export const updateAttachmentsFailure = err => ({
  type: UPDATE_ATTACHMENTS_FAILURE,
  payload: err,
});

export const updateAttachmentsSuccess = payload => ({
  type: UPDATE_ATTACHMENTS_SUCCESS,
  payload,
});

export const updateAttachments = (productId, levelId, update) => (dispatch) => {
  dispatch(updateAttachmentsLoading());
  return firebase
    .database()
    .ref(`attachedModules/${productId}/${levelId}`)
    .set(update)
    .then(() => update)
    .catch((err) => {
      dispatch(updateAttachmentsFailure(err));
      return Promise.reject(err);
    });
};

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
  return firebase
    .database()
    .ref(`/components/${componentId}`)
    .remove()
    .then(() => {
      dispatch(deleteComponentSuccess(componentId));
      return componentId;
    })
    .catch((err) => {
      dispatch(deleteComponentFailure(err));
      return err;
    });
};
