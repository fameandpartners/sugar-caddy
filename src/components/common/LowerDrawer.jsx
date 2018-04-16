import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  styles: PropTypes.object,
};

const defaultProps = {
  isOpen: false,
  className: '',
  styles: {},
};

const LowerDrawer = ({
  isOpen, children, className, styles,
}) =>
  isOpen && (
    <div
      className={classnames('bg-grey h-48 fixed pin-l pin-r pin-b', className)}
      style={styles}
    >
      {children}
    </div>
  );

LowerDrawer.propTypes = propTypes;
LowerDrawer.defaultProps = defaultProps;

export default LowerDrawer;
