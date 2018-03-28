import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';

const propTypes = {
  product: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const Product = ({ product }) => (
  <li className="flex px-6 py-4 border border-grey-darker items-center">
    <div className="w-8 mr-2">{product.get('order')}</div>
    <div className="w-32 mr-2">{product.get('code')}</div>
    <div className="w-1/6 mr-2">{product.get('name')}</div>
    <Link to="/" className="w-24 mr-2">
      Open
    </Link>
    <Link to="/" className="w-24 mr-2">
      Open
    </Link>
    <Link to="/" className="w-24 mr-2">
      Open
    </Link>
    <Link to="/" className="w-24 mr-2">
      Open
    </Link>
    <Link to="/" className="w-32 mr-2">
      Open
    </Link>
  </li>
);

Product.propTypes = propTypes;

export default Product;
