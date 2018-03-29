import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'components/common/Modal';
import * as allModals from 'components/Modals';
import * as modalActions from 'actions/modals';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalName: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  modalStyles: PropTypes.object,
  contentLabel: PropTypes.string,
};

const defaultProps = {
  modalStyles: {},
  contentLabel: '',
};

const ModalPortal = ({
  isOpen, modalName, modalStyles, contentLabel, hideModal,
}) => {
  const CurrentModal = allModals[modalName];
  return (
    <Modal styles={modalStyles} contentLabel={contentLabel} isOpen={isOpen} onRequestClose={hideModal}>
      {isOpen && <CurrentModal onClose={hideModal} />}
    </Modal>
  );
};

ModalPortal.propTypes = propTypes;
ModalPortal.defaultProps = defaultProps;

export default connect(state => ({
  isOpen: !!state.modals.get('name'),
  modalName: state.modals.get('name'),
  modalStyles: state.modals.get('styles').toJS(),
  contentLabel: state.modals.get('contentLabel'),
}), modalActions)(ModalPortal);
