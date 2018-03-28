import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Product from './Product';

const propTypes = {
  products: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const ProductList = ({ products }) => (
  <ul id="product-list" className="list-reset">
    {products
      .toArray()
      .sort((a, b) => a.get('order') - b.get('order'))
      .map(product => <Product key={product.get('id')} product={product} />)}
  </ul>
);

ProductList.propTypes = propTypes;

export default ProductList;
