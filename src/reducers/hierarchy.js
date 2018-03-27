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
  case UPDATE_COMPONENT_LOADING:
  case FETCH_HIERARCHY_LOADING:
    return state.set('loading', true);
  case UPDATE_COMPONENT_FAILURE:
  case FETCH_HIERARCHY_FAILURE:
    return state
      .set('loading', false)
      .set('error', 'Error fetching product hierarchy');
  case FETCH_HIERARCHY_SUCCESS:
    return state.merge({
      data: fromJS(payload),
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
  case SET_CURRENT_ID:
    return state.set('currentId', payload);
  case UPDATE_COMPONENT_SUCCESS: {
    const { componentId, update } = payload;
    return state.mergeIn(['data', 'components', componentId], fromJS(update));
  }
  default:
    return state;
  }
}
