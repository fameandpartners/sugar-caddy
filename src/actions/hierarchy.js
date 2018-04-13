import {
  FETCH_HIERARCHY_LOADING,
  FETCH_HIERARCHY_FAILURE,
  FETCH_HIERARCHY_SUCCESS,
  ADD_HIERARCHY_LOADING,
  ADD_HIERARCHY_FAILURE,
  ADD_HIERARCHY_SUCCESS,
  UPDATE_HIERARCHY_LOADING,
  UPDATE_HIERARCHY_FAILURE,
  UPDATE_HIERARCHY_SUCCESS,
  DELETE_HIERARCHY_LOADING,
  DELETE_HIERARCHY_FAILURE,
  DELETE_HIERARCHY_SUCCESS,
  SET_CURRENT_HIERARCHY,
  TOGGLE_HIERARCHY_MODE,
  UPDATE_CURRENT_PATH,
  FETCH_ATTACHMENTS_LOADING,
  FETCH_ATTACHMENTS_FAILURE,
  FETCH_ATTACHMENTS_SUCCESS,
  UPDATE_ATTACHMENTS_LOADING,
  UPDATE_ATTACHMENTS_FAILURE,
  UPDATE_ATTACHMENTS_SUCCESS,
  ADD_ATTACHMENT_CLIENT,
  DELETE_ATTACHMENT_CLIENT,
  SET_ATTACHMENT_LOADING,
  SET_ATTACHMENT_FAILURE,
  SET_ATTACHMENT_SUCCESS,
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

export const createHierarchyLoading = () => ({
  type: ADD_HIERARCHY_LOADING,
});

export const createHierarchyFailure = err => ({
  type: ADD_HIERARCHY_FAILURE,
  payload: err,
});

export const createHierarchySuccess = payload => ({
  type: ADD_HIERARCHY_SUCCESS,
  payload,
});

export const createHierarchy = (productId, level) => (dispatch) => {
  dispatch(createHierarchyLoading());
  return firebase
    .database()
    .ref(`hierarchy/${productId}/${level.id}`)
    .set(level)
    .then(() => {
      dispatch(createHierarchySuccess(level));
      return level;
    })
    .catch((err) => {
      dispatch(createHierarchyFailure(err));
      return Promise.reject(err);
    });
};

export const updateHierarchyLoading = () => ({
  type: UPDATE_HIERARCHY_LOADING,
});

export const updateHierarchyFailure = err => ({
  type: UPDATE_HIERARCHY_FAILURE,
  payload: err,
});

export const updateHierarchySuccess = payload => ({
  type: UPDATE_HIERARCHY_SUCCESS,
  payload,
});

export const updateHierarchy = (productId, levelId, update) => (dispatch) => {
  dispatch(updateHierarchyLoading());
  return firebase
    .database()
    .ref(`hierarchy/${productId}/${levelId}`)
    .update(update)
    .then(() => {
      dispatch(updateHierarchySuccess({ levelId, update }));
      return update;
    })
    .catch((err) => {
      dispatch(updateHierarchyFailure(err));
      return Promise.reject(err);
    });
};

export const setCurrentHierarchy = (payload = '') => ({
  type: SET_CURRENT_HIERARCHY,
  payload,
});

export const deleteHierarchyLoading = () => ({
  type: DELETE_HIERARCHY_LOADING,
});

export const deleteHierarchyFailure = err => ({
  type: DELETE_HIERARCHY_FAILURE,
  payload: err,
});

export const deleteHierarchySuccess = payload => ({
  type: DELETE_HIERARCHY_SUCCESS,
  payload,
});

export const deleteHierarchy = (productId, levelId) => (dispatch) => {
  dispatch(deleteHierarchyLoading());
  return firebase
    .database()
    .ref(`/hierarchy/${productId}/${levelId}`)
    .remove()
    .then(() => {
      dispatch(deleteHierarchySuccess(levelId));
      return levelId;
    })
    .catch((err) => {
      dispatch(deleteHierarchyFailure(err));
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
    .then(() => {
      dispatch(updateAttachmentsSuccess({ levelId, update }));
      return update;
    })
    .catch((err) => {
      dispatch(updateAttachmentsFailure(err));
      return Promise.reject(err);
    });
};

export const addAttachmentClient = payload => ({
  type: ADD_ATTACHMENT_CLIENT,
  payload,
});

export const deleteAttachmentClient = payload => ({
  type: DELETE_ATTACHMENT_CLIENT,
  payload,
});

export const setAttachmentLoading = () => ({
  type: SET_ATTACHMENT_LOADING,
});

export const setAttachmentFailure = err => ({
  type: SET_ATTACHMENT_FAILURE,
  payload: err,
});

export const setAttachmentSuccess = payload => ({
  type: SET_ATTACHMENT_SUCCESS,
  payload,
});

export const setAttachment = (
  productId,
  levelId,
  moduleId,
  value,
) => (dispatch) => {
  dispatch(setAttachmentLoading());
  return firebase
    .database()
    .ref(`attachedModules/${productId}/${levelId}/${moduleId}`)
    .set(value)
    .then(() => {
      dispatch(setAttachmentSuccess({ levelId, moduleId, value }));
      return value;
    })
    .catch((err) => {
      dispatch(setAttachmentFailure(err));
      return Promise.reject(err);
    });
};

export default {
  fetchHierarchy,
};
