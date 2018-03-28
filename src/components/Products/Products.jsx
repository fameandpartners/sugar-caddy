import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { reset } from 'redux-form';
import uuidV4 from 'uuid/v4';
import { createProduct } from 'actions/products';
import ProductHeading from './ProductHeading';
import ProductList from './ProductList';
import CreateProductForm from './CreateProductForm';

const propTypes = {
  products: PropTypes.instanceOf(Immutable.Map).isRequired,
  mode: PropTypes.string.isRequired,
  createNewProduct: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

const Products = ({
  products, mode, createNewProduct, resetForm,
}) => {
  const handleCreateSubmit = (data) => {
    const product = Object.assign({}, data, {
      id: uuidV4(),
      pricing: { audPrice: '', usdPrice: '' },
      colors: [],
      image: '',
      order: products.size + 1,
    });
    createNewProduct(product).then(() => {
      resetForm('CreateProductForm');
    });
  };

  return (
    <div id="products">
      <ProductHeading />
      <ProductList products={products} />
      {mode === 'view' && (
        <CreateProductForm onSubmit={handleCreateSubmit} size={products.size} />
      )}
    </div>
  );
};

Products.propTypes = propTypes;

export default connect(
  state => ({
    products: state.products.get('data'),
    mode: state.products.get('mode'),
  }),
  { createNewProduct: createProduct, resetForm: reset },
)(Products);
