import { fromJS } from 'immutable';
import { SHOW_MODAL, HIDE_MODAL, ADD_MODAL_STYLES } from 'constants/modals';

const initialState = fromJS({
  name: '',
  data: {},
  styles: {},
  error: '',
  contentLabel: '',
});

export default function modals(state = initialState, { type, payload }) {
  switch (type) {
  case SHOW_MODAL:
    return state.merge(fromJS(payload));
  case HIDE_MODAL:
    return initialState;
  case ADD_MODAL_STYLES:
    return state.set('styles', payload);
  default:
    return state;
  }
}
