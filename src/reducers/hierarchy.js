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
  TOGGLE_HIERARCHY_MODE,
  UPDATE_CURRENT_PATH,
  SET_CURRENT_HIERARCHY,
  FETCH_ATTACHMENTS_LOADING,
  FETCH_ATTACHMENTS_FAILURE,
  FETCH_ATTACHMENTS_SUCCESS,
  UPDATE_ATTACHMENTS_LOADING,
  UPDATE_ATTACHMENTS_FAILURE,
  UPDATE_ATTACHMENTS_SUCCESS,
  ADD_ATTACHMENT_CLIENT,
  DELETE_ATTACHMENT_CLIENT,
} from 'constants/hierarchy';
import { fromJS } from 'immutable';

const initialState = fromJS({
  data: {},
  currentPath: [],
  currentId: '',
  error: '',
  loading: false,
  mode: 'edit',
});

export default function hierarchy(state = initialState, { type, payload }) {
  switch (type) {
  case ADD_HIERARCHY_LOADING:
  case UPDATE_HIERARCHY_LOADING:
  case DELETE_HIERARCHY_LOADING:
  case FETCH_HIERARCHY_LOADING:
  case FETCH_ATTACHMENTS_LOADING:
  case UPDATE_ATTACHMENTS_LOADING:
    return state.set('loading', true);
  case ADD_HIERARCHY_FAILURE:
  case UPDATE_HIERARCHY_FAILURE:
  case DELETE_HIERARCHY_FAILURE:
  case FETCH_HIERARCHY_FAILURE:
  case FETCH_ATTACHMENTS_FAILURE:
  case UPDATE_ATTACHMENTS_FAILURE:
    return state
      .set('loading', false)
      .set('error', 'Error fetching product hierarchy');
  case FETCH_HIERARCHY_SUCCESS:
    return state.merge({
      data: fromJS(payload || {}),
      error: '',
      loading: false,
    });
  case TOGGLE_HIERARCHY_MODE: {
    const currentMode = state.get('mode');
    return state.set('mode', currentMode === 'view' ? 'edit' : 'view');
  }
  case UPDATE_CURRENT_PATH: {
    const { customizationId, order } = payload;
    const currentPath = state.get('currentPath');
    const currentIndex = currentPath.indexOf(customizationId);
    if (currentIndex === -1 && order <= currentPath.size + 1) {
      const newPath = currentPath.slice(0, order - 1).concat(customizationId);
      return state.set('currentPath', newPath);
    } else {
      const newPath = currentPath.slice(0, order - 1);
      return state.set('currentPath', newPath);
    }
  }
  case ADD_HIERARCHY_SUCCESS: {
    return state.setIn(['data', payload.id], fromJS(payload));
  }
  case UPDATE_HIERARCHY_SUCCESS: {
    const { levelId, update } = payload;
    return state.mergeIn(['data', levelId], fromJS(update));
  }
  case DELETE_HIERARCHY_SUCCESS:
    return state.update('data', value =>
      value.filter((_, key) => key !== payload));
  case SET_CURRENT_HIERARCHY:
    return state.set('currentId', payload);
  case FETCH_ATTACHMENTS_SUCCESS:
    return state
      .update('data', data =>
        data.map(level =>
          level.set(
            'attachedModules',
            fromJS(payload[level.get('id')] || {}),
          )))
      .set('error', '')
      .set('loading', false);
  case ADD_ATTACHMENT_CLIENT: {
    const { levelId, componentId } = payload;
    return state.setIn(
      ['data', levelId, 'attachedModules', componentId],
      false,
    );
  }
  case DELETE_ATTACHMENT_CLIENT: {
    const { levelId, componentId } = payload;
    return state.deleteIn(['data', levelId, 'attachedModules', componentId]);
  }
  case UPDATE_ATTACHMENTS_SUCCESS: {
    const { levelId, update } = payload;
    return state
      .setIn(['data', levelId, 'attachedModules'], fromJS(update))
      .set('error', '')
      .set('loading', false);
  }
  default:
    return state;
  }
}
