import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProduct, setCurrentId } from 'actions/products';
import DeleteProductModal from './DeleteProductModal';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
};

const DeleteProductModalContainer = props => (
  <DeleteProductModal
    {...props}
    onClose={() => {
      props.onClose();
      props.setCurrentProduct();
    }}
  />
);

DeleteProductModalContainer.propTypes = propTypes;

export default connect(
  (state) => {
    const currentId = state.products.get('currentId');
    const products = state.products.get('data');
    const currentProduct = products.find(prod => prod.get('id') === currentId);
    return {
      currentProduct,
    };
  },
  { deleteProd: deleteProduct, setCurrentProduct: setCurrentId },
)(DeleteProductModalContainer);
