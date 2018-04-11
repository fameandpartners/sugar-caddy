import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'querystring';
import AngleLeft from 'components/common/AngleLeft';
import ModeLink from './ModeLink';

const propTypes = {
  mode: PropTypes.string,
};

const defaultProps = {
  mode: 'add',
};

const HierarchyHeader = ({ mode }) => (
  <Fragment>
    <div className="bg-grey border-b border-grey-darkest px-8 py-6">
      <Link
        to="/?tab=products"
        className="hover:text-grey-darker no-underline text-grey-darkest flex items-center"
      >
        <AngleLeft />
        Back to products
      </Link>
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
  return {
    pathname,
    mode,
  };
})(HierarchyHeader);
