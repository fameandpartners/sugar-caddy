import { fromJS } from 'immutable';
import {
  FETCH_PRODUCTS_LOADING,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
} from 'constants/products';

const initialState = fromJS({
  data: {},
  loading: false,
  error: '',
});

export default function products(state = initialState, { type, payload }) {
  switch (type) {
  case FETCH_PRODUCTS_LOADING:
    return state.set('loading', true).set('error', '');
  case FETCH_PRODUCTS_FAILURE:
    return state.set('error', payload).set('loading', false);
  case FETCH_PRODUCTS_SUCCESS:
    return state.merge({
      data: fromJS(payload),
      loading: false,
      error: '',
    });
  default:
    return state;
  }
}
