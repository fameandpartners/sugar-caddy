import { fromJS } from 'immutable';
import {
  FETCH_PRODUCTS_LOADING,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  ADD_PRODUCT_LOADING,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_SUCCESS,
} from 'constants/products';

const initialState = fromJS({
  data: {},
  mode: 'view',
  loading: false,
  error: '',
});

export default function products(state = initialState, { type, payload }) {
  switch (type) {
  case FETCH_PRODUCTS_LOADING:
  case ADD_PRODUCT_LOADING:
    return state.set('loading', true).set('error', '');
  case FETCH_PRODUCTS_FAILURE:
  case ADD_PRODUCT_FAILURE:
    return state.set('error', payload).set('loading', false);
  case FETCH_PRODUCTS_SUCCESS:
    return state.merge({
      data: fromJS(payload),
      loading: false,
      error: '',
    });
  case ADD_PRODUCT_SUCCESS:
    return state.setIn(['data', payload.id], fromJS(payload));
  default:
    return state;
  }
}
