import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const propTypes = {
  pathname: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

const defaultProps = {
  active: false,
};

const ModeLink = ({
  pathname, to, children, active,
}) => (
  <Link
    to={`${pathname}?mode=${to}`}
    className={classnames('ModeButton', { 'ModeButton--active': active })}
  >
    {children}
  </Link>
);

ModeLink.propTypes = propTypes;
ModeLink.defaultProps = defaultProps;

export default connect(state => ({
  pathname: state.router.location.pathname,
}))(ModeLink);
