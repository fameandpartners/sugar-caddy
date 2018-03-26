import {
  FETCH_HIERARCHY_LOADING,
  FETCH_HIERARCHY_FAILURE,
  FETCH_HIERARCHY_SUCCESS,
  SET_HIERARCHY_MODE,
} from 'constants/hierarchy';
import { fromJS } from 'immutable';

const initialState = fromJS({
  data: {},
  error: '',
  loading: false,
  mode: 'edit',
});

export default function hierarchy(state = initialState, { type, payload }) {
  console.log('hierarchy reducer');
  switch (type) {
  case FETCH_HIERARCHY_LOADING:
    return state.set('loading', true);
  case FETCH_HIERARCHY_FAILURE:
    return state.set('loading', false).set('error', 'Error fetching product hierarchy');
  case FETCH_HIERARCHY_SUCCESS:
    return state.merge({
      data: fromJS(payload),
      error: '',
      loading: false,
    });
  case SET_HIERARCHY_MODE:
    return state.set('mode', payload);
  default:
    return state;
  }
}
