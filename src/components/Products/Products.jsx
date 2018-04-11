import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { reset } from 'redux-form';
import classnames from 'classnames';
import uuidV4 from 'uuid/v4';
import { fetchProducts, createProduct, setProductMode } from 'actions/products';
import ProductHeading from './ProductHeading';
import ProductList from './ProductList';
import CreateProductForm from './CreateProductForm';

class Products extends Component {
  static propTypes = {
    products: PropTypes.instanceOf(Immutable.Map).isRequired,
    mode: PropTypes.string.isRequired,
    createNewProduct: PropTypes.func.isRequired,
    setMode: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchProducts();
  }

  handleCreateSubmit = (data) => {
    const { products, resetForm, createNewProduct } = this.props;
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

  handleEditClick = () =>
    (this.props.mode === 'view'
      ? this.props.setMode('edit')
      : this.props.setMode('view'));

  render() {
    const { products, mode } = this.props;
    return (
      <div id="products" className="md:mx-8 sm:mx-6 mx-3 my-6">
        <div className="flex justify-end text-sm">
          <button
            className={classnames('py-2 px-4', {
              'btn btn-grey-inverse': mode === 'view',
              'btn btn-grey': mode === 'edit',
            })}
            onClick={this.handleEditClick}
          >
            Edit Products
          </button>
        </div>
        <ProductHeading />
        <ProductList products={products} />
        {mode === 'view' && (
          <CreateProductForm
            onSubmit={this.handleCreateSubmit}
            size={products.size}
          />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    products: state.products.get('data'),
    mode: state.products.get('mode'),
  }),
  {
    createNewProduct: createProduct,
    resetForm: reset,
    setMode: setProductMode,
    fetchProducts,
  },
)(Products);
