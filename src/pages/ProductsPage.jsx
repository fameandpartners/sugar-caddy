import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Products from 'components/Products';
import { fetchProducts } from 'actions/products';

class ProductsPage extends Component {
  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div id="products-page" className="container my-8">
        <h1 className="text-lg font-semibold">Products</h1>
        <Products />
      </div>
    );
  }
}

export default connect(null, { fetchProducts })(ProductsPage);
