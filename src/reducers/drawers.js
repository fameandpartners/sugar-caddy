import { OPEN_DRAWER, CLOSE_DRAWER } from 'constants/drawers';
import { fromJS } from 'immutable';

const initialState = fromJS({
  name: '',
  data: {},
  styles: {},
  error: '',
});

export default function drawers(state = initialState, { type, payload }) {
  switch (type) {
  case OPEN_DRAWER:
    return state.set('name', payload);
  case CLOSE_DRAWER:
    return initialState;
  default:
    return state;
  }
}
