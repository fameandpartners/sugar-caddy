import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

const propTypes = {
  products: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const Products = ({ products }) => <div id="products">{products.size}</div>;

Products.propTypes = propTypes;

export default connect(state => ({ products: state.products.get('data') }))(Products);
