import { fromJS } from 'immutable';
import {
  FETCH_COMPONENTS_LOADING,
  FETCH_COMPONENTS_FAILURE,
  FETCH_COMPONENTS_SUCCESS,
  UPDATE_COMPONENT_LOADING,
  UPDATE_COMPONENT_FAILURE,
  UPDATE_COMPONENT_SUCCESS,
  ADD_COMPONENT_LOADING,
  ADD_COMPONENT_FAILURE,
  ADD_COMPONENT_SUCCESS,
  SET_CURRENT_COMPONENT,
  DELETE_COMPONENT_LOADING,
  DELETE_COMPONENT_FAILURE,
  DELETE_COMPONENT_SUCCESS,
} from 'constants/components';

const initialState = fromJS({
  data: {},
  currentId: '',
  loading: false,
  error: '',
});

export default function components(state = initialState, { type, payload }) {
  switch (type) {
  case FETCH_COMPONENTS_LOADING:
  case UPDATE_COMPONENT_LOADING:
  case ADD_COMPONENT_LOADING:
  case DELETE_COMPONENT_LOADING:
    return state.set('loading', true).set('error', '');
  case FETCH_COMPONENTS_FAILURE:
  case UPDATE_COMPONENT_FAILURE:
  case ADD_COMPONENT_FAILURE:
  case DELETE_COMPONENT_FAILURE:
    return state.set('error', payload).set('loading', false);
  case FETCH_COMPONENTS_SUCCESS:
    return state.merge({
      data: fromJS(payload),
      error: '',
      loading: false,
    });
  case UPDATE_COMPONENT_SUCCESS: {
    const { componentId, update } = payload;
    return state.mergeIn(['data', componentId], fromJS(update)).set('loading', false);
  }
  case ADD_COMPONENT_SUCCESS: {
    return state.setIn(['data', payload.id], fromJS(payload)).set('loading', false);
  }
  case SET_CURRENT_COMPONENT:
    return state.set('currentId', payload);
  case DELETE_COMPONENT_SUCCESS:
    return state.update('data', value =>
      value.filter((_, key) => key !== payload)).set('loading', false);
  default:
    return state;
  }
}
