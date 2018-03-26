import { fromJS } from 'immutable';

const initialState = fromJS({

});

export default function components(state = initialState, { type, payload }) {
  switch (type) {
  default:
    return state;
  }
}
