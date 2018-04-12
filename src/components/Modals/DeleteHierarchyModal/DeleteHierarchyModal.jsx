import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

const propTypes = {
  currentLevel: PropTypes.instanceOf(Immutable.Map).isRequired,
  currentProduct: PropTypes.instanceOf(Immutable.Map).isRequired,
  deleteHierarchy: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const DeleteHierarchyModal = ({
  currentLevel,
  currentProduct,
  deleteHierarchy,
  onClose,
}) => (
  <div id="delete-hierarchy-modal">
    <div className="text-2xl font-thin">
      Are you sure you want to delete {currentProduct.get('code')}:{' '}
      {currentProduct.get('name')} -- {currentLevel.get('name')}?
    </div>
    <div className="flex my-8">
      <button
        className="btn btn-error"
        onClick={() => {
          deleteHierarchy(currentProduct.get('id'), currentLevel.get('id'));
          onClose();
        }}
      >
        Yes, Delete
      </button>
      <button className="btn btn-link" onClick={onClose}>
        No, Cancel
      </button>
    </div>
  </div>
);

DeleteHierarchyModal.propTypes = propTypes;

export default DeleteHierarchyModal;
