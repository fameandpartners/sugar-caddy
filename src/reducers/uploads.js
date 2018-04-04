import {
  UPLOAD_ITEM_START,
  UPLOAD_ITEM_FAILURE,
  UPLOAD_ITEM_SUCCESS,
} from 'constants/uploads';
import { fromJS } from 'immutable';

const initialState = fromJS({
  items: [],
  error: '',
});

export default function uploads(state = initialState, { type, payload }) {
  switch (type) {
  case UPLOAD_ITEM_START: {
    const newItem = fromJS(payload).set('status', 'loading');
    return state.update('items', items => items.push(newItem));
  }
  case UPLOAD_ITEM_FAILURE: {
    return state.update('items', items =>
      items.map(item =>
        (item.get('id') === payload ? item.set('status', 'error') : item)));
  }
  case UPLOAD_ITEM_SUCCESS:
    return state.update('items', items =>
      items.map(item =>
        (item.get('id') === payload ? item.set('status', 'finished') : item)));
  default:
    return state;
  }
}
