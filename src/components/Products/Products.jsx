import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { reset } from 'redux-form';
import classnames from 'classnames';
import uuidV4 from 'uuid/v4';
import { createProduct, setProductMode } from 'actions/products';
import ProductHeading from './ProductHeading';
import ProductList from './ProductList';
import CreateProductForm from './CreateProductForm';

const propTypes = {
  products: PropTypes.instanceOf(Immutable.Map).isRequired,
  mode: PropTypes.string.isRequired,
  createNewProduct: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

const Products = ({
  products, mode, createNewProduct, setMode, resetForm,
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

  const handleEditClick = () =>
    (mode === 'view' ? setMode('edit') : setMode('view'));

  return (
    <div id="products">
      <div className="flex justify-end text-sm">
        <button className={classnames('py-2 px-4', { 'btn btn-grey-inverse': mode === 'view', 'btn btn-grey': mode === 'edit' })} onClick={handleEditClick}>
          Edit Products
        </button>
      </div>
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
  {
    createNewProduct: createProduct,
    resetForm: reset,
    setMode: setProductMode,
  },
)(Products);
