import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as allDrawers from 'components/Drawers';
import { closeDrawer } from 'actions/drawers';
import LowerDrawer from 'components/common/LowerDrawer';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

const DrawerPortal = ({ isOpen, name, closeDrawer: onClose }) => {
  const CurrentDrawer = allDrawers[name];
  if (!CurrentDrawer) {
    console.warn('Drawer contents do not exist!');
    return null;
  }
  return (
    <LowerDrawer isOpen={isOpen}>
      <CurrentDrawer onClose={onClose} />
    </LowerDrawer>
  );
};

DrawerPortal.propTypes = propTypes;

export default connect(
  state => ({
    name: state.drawers.get('name'),
    isOpen: !!state.drawers.get('name'),
  }),
  { closeDrawer },
)(DrawerPortal);
