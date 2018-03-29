import { SHOW_MODAL, ADD_MODAL_STYLES, HIDE_MODAL } from 'constants/modals';

export const showModal = (name, data = {}) => ({ type: SHOW_MODAL, payload: { name, data } });

export const addModalStyles = payload => ({ type: ADD_MODAL_STYLES, payload });

export const hideModal = () => ({ type: HIDE_MODAL });
