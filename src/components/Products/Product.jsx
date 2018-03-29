import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showModal } from 'actions/modals';

const propTypes = {
  product: PropTypes.instanceOf(Immutable.Map).isRequired,
  spawnModal: PropTypes.func.isRequired,
};

const Product = ({ product, spawnModal }) => (
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
    <Link to="/" className="w-24 mr-2">
      Open
    </Link>
    <div
      role="button"
      tabIndex={0}
      className="w-16 text-red underline font-light cursor-pointer"
      onClick={() => spawnModal('DeleteProductModal')}
    >
      Delete
    </div>
  </li>
);

Product.propTypes = propTypes;

export default connect(null, { spawnModal: showModal })(Product);
