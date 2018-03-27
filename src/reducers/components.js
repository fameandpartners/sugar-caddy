import { fromJS } from 'immutable';
import {
  FETCH_COMPONENTS_LOADING,
  FETCH_COMPONENTS_FAILURE,
  FETCH_COMPONENTS_SUCCESS,
  UPDATE_COMPONENT_LOADING,
  UPDATE_COMPONENT_FAILURE,
  UPDATE_COMPONENT_SUCCESS,
} from 'constants/components';

const initialState = fromJS({
  data: {},
  loading: false,
  error: '',
});

export default function components(state = initialState, { type, payload }) {
  switch (type) {
  case FETCH_COMPONENTS_LOADING:
  case UPDATE_COMPONENT_LOADING:
    return state.set('loading', true).set('error', '');
  case FETCH_COMPONENTS_FAILURE:
  case UPDATE_COMPONENT_FAILURE:
    return state.set('error', payload).set('loading', false);
  case FETCH_COMPONENTS_SUCCESS:
    return state.merge({
      data: fromJS(payload),
      error: '',
      loading: false,
    });
  case UPDATE_COMPONENT_SUCCESS: {
    const { componentId, update } = payload;
    return state.mergeIn(['data', componentId], fromJS(update));
  }
  default:
    return state;
  }
}
