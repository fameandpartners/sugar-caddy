import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import merge from 'lodash/merge';

const propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  contentLabel: PropTypes.string,
  styles: PropTypes.object,
};

const defaultProps = {
  contentLabel: '',
  styles: {},
};

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 100,
    overflow: 'auto',
  },
  content: {
    position: 'relative',
    margin: '6rem auto',
    width: '50rem',
    top: 'unset',
    left: 'unset',
    right: 'unset',
    bottom: 'unset',
    border: '1px solid #ccc',
    background: '#fff',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  },
};

ReactModal.setAppElement('#root');

const Modal = ({
  children, contentLabel, isOpen, onRequestClose, styles,
}) => (
  <ReactModal
    contentLabel={contentLabel}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={merge({}, customStyles, styles)}
  >
    {children}
  </ReactModal>
);

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
