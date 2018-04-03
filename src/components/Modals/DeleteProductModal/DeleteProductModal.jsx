import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

const propTypes = {
  currentProduct: PropTypes.instanceOf(Immutable.Map).isRequired,
  deleteProd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const DeleteProductModal = ({ currentProduct, onClose, deleteProd }) => (
  <div id="delete-product-modal" className="w-1/2 mx-auto my-8">
    <div className="text-2xl font-thin">
      Are you sure you want to delete {currentProduct.get('code')},{' '}
      {currentProduct.get('name')}?
    </div>
    <div className="flex flex-wrap my-8 font-light">
      <div className="flex w-1/2 py-2">
        <div className="mr-1">0</div>
        <div>Pricing</div>
      </div>
      <div className="flex w-1/2 py-2">
        <div className="mr-1">0</div>
        <div>Customizations</div>
      </div>
      <div className="flex w-1/2 py-2">
        <div className="mr-1">0</div>
        <div>Colors</div>
      </div>
      <div className="flex w-1/2 py-2">
        <div className="mr-1">0</div>
        <div>Old Customizations</div>
      </div>
      <div className="flex w-1/2 py-2">
        <div className="mr-1">0</div>
        <div>Images</div>
      </div>
    </div>
    <div className="flex my-8">
      <button
        className="btn btn-error"
        onClick={() => {
          deleteProd(currentProduct.get('id'));
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

DeleteProductModal.propTypes = propTypes;

export default DeleteProductModal;
