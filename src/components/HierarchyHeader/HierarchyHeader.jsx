import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'querystring';
import AngleLeft from 'components/common/AngleLeft';
import ModeLink from './ModeLink';

const propTypes = {
  currentProduct: PropTypes.instanceOf(Immutable.Map).isRequired,
  mode: PropTypes.string,
};

const defaultProps = {
  mode: 'add',
};

const HierarchyHeader = ({ mode, currentProduct }) => (
  <Fragment>
    <div className="bg-grey border-b border-grey-darkest px-8 py-3 flex items-center">
      <div className="w-1/3 flex">
        <Link
          to="/?tab=products"
          className="hover:text-grey-darker no-underline text-grey-darkest flex items-center"
        >
          <AngleLeft />
          Back to products
        </Link>
      </div>
      <div className="w-1/3 text-center text-grey-darkest">
        {currentProduct.get('name') ? `${currentProduct.get('code')}: ${currentProduct.get('name')}` : ''}
      </div>
    </div>
    <div className="py-6 px-8 border-t border-b border-grey-darkest bg-grey">
      <ModeLink to="add" active={mode === 'add'}>
        Add Modules
      </ModeLink>
      <ModeLink to="preview" active={mode === 'preview'}>
        Preview
      </ModeLink>
      <ModeLink to="view" active={mode === 'view'}>
        View
      </ModeLink>
    </div>
  </Fragment>
);

HierarchyHeader.propTypes = propTypes;
HierarchyHeader.defaultProps = defaultProps;

export default connect((state) => {
  const { pathname, search } = state.router.location;
  const { mode } = qs.parse(search.slice(1));
  const currentId = state.products.get('currentId');
  return {
    pathname,
    mode,
    currentProduct: currentId
      ? state.products.getIn(['data', currentId])
      : Immutable.Map(),
  };
})(HierarchyHeader);
